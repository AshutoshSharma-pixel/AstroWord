import os
import json
import re
import traceback
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class KarakaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict
    karaka_type: str | None = None

# Nakshatra syllables (aksharas) — sounds associated with each nakshatra
NAKSHATRA_SYLLABLES = {
    "Ashwini": ["Chu", "Che", "Cho", "La"],
    "Bharani": ["Li", "Lu", "Le", "Lo"],
    "Krittika": ["A", "I", "U", "E"],
    "Rohini": ["O", "Va", "Vi", "Vu"],
    "Mrigashira": ["Ve", "Vo", "Ka", "Ki"],
    "Ardra": ["Ku", "Gha", "Ing", "Jha"],
    "Punarvasu": ["Ke", "Ko", "Ha", "Hi"],
    "Pushya": ["Hu", "He", "Ho", "Da"],
    "Ashlesha": ["Di", "Du", "De", "Do"],
    "Magha": ["Ma", "Mi", "Mu", "Me"],
    "Purva Phalguni": ["Mo", "Ta", "Ti", "Tu"],
    "Uttara Phalguni": ["Te", "To", "Pa", "Pi"],
    "Hasta": ["Pu", "Sha", "Na", "Tha"],
    "Chitra": ["Pe", "Po", "Ra", "Ri"],
    "Swati": ["Ru", "Re", "Ro", "Ta"],
    "Vishakha": ["Ti", "Tu", "Te", "To"],
    "Anuradha": ["Na", "Ni", "Nu", "Ne"],
    "Jyeshtha": ["No", "Ya", "Yi", "Yu"],
    "Mula": ["Ye", "Yo", "Ba", "Bi"],
    "Purva Ashadha": ["Bu", "Dha", "Bha", "Dha"],
    "Uttara Ashadha": ["Be", "Bo", "Ja", "Ji"],
    "Shravana": ["Ju", "Je", "Jo", "Sha"],
    "Dhanishta": ["Ga", "Gi", "Gu", "Ge"],
    "Shatabhisha": ["Go", "Sa", "Si", "Su"],
    "Purva Bhadrapada": ["Se", "So", "Da", "Di"],
    "Uttara Bhadrapada": ["Du", "Tha", "Jha", "Da"],
    "Revati": ["De", "Do", "Cha", "Chi"]
}

@router.post("/marriage-type")
async def marriage_type(data: KarakaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        description = data.chart_data.get("description_text", "")
        
        prompt = f"""
You are a precision Vedic astrology expert specializing in marriage analysis.

Analyze this birth chart to determine whether this person is likely to have a 
LOVE MARRIAGE, ARRANGED MARRIAGE, or a combination of both.

CHART DATA:
{description}

Analyze these specific factors:

LOVE MARRIAGE INDICATORS (check each):
- Rahu in 7th house or aspecting 7th house
- Venus conjunct or aspecting 5th lord
- 5th lord and 7th lord connection (conjunction, aspect, or exchange)
- Mars in 7th house (for female charts)
- Moon in 7th house
- Venus in 1st, 5th, 7th, or 11th house
- Rahu conjunct Venus
- 7th lord in 5th house or 5th lord in 7th house

ARRANGED MARRIAGE INDICATORS (check each):
- Jupiter in 7th house (for female charts — indicates traditional marriage)
- Saturn in 7th house or aspecting 7th house
- 7th lord in 12th house
- No malefic planets in 5th house
- Strong benefic influence on 7th house

Provide a highly detailed, expansive reading.
Do not give generic answers. Be specific — cite actual planets and houses from THIS chart.

Return ONLY VALID JSON. IMPORTANT: You must escape all newlines as \\n and quotes as \\" within the reading string so the JSON parses correctly!
{{
    "result": "Love Marriage" OR "Arranged Marriage" OR "Love-Cum-Arranged Marriage",
    "percentage": {{
        "love": 70,
        "arranged": 30
    }},
    "reading": "detailed markdown reading explaining why with \\n for newlines",
    "key_indicators": ["list of specific chart factors that determined this"],
    "timing": "when marriage is likely based on dasha",
    "keywords": ["3-4 descriptive keywords"]
}}
"""

        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=8192,
                response_mime_type="application/json"
            )
        )
        response_text = response.text.strip()
        
        # Clean JSON wrappers if Model hallucinates them
        for prefix in ["```json", "```"]:
            if response_text.startswith(prefix):
                response_text = response_text[len(prefix):]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        try:
            result = json.loads(response_text)
        except json.JSONDecodeError:
            # Fallback regex salvage attempt
            salvaged_text = response_text
            reading_text = "Analysis unavailable due to complex planetary alignments."
            if salvaged_text.strip().startswith('{') and '"reading":' in salvaged_text:
                match = re.search(r'"reading"\s*:\s*"(.*?)"\s*,\s*"key_indicators"', salvaged_text, re.DOTALL)
                if match:
                    reading_text = match.group(1).replace('\\n', '\n').replace('\\"', '"')
            
            result = {
                "result": "Analysis unavailable",
                "percentage": {"love": 50, "arranged": 50},
                "reading": reading_text,
                "key_indicators": [],
                "timing": "Check current dasha period",
                "keywords": []
            }
        
        return {"success": True, **result}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/spouse-initial")
async def spouse_initial(data: KarakaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        asc_sign = ascendant.get("sign", "")
        description = data.chart_data.get("description_text", "")
        
        SIGN_LORDS = {
            "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
            "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
            "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
            "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
        }
        ZODIAC_SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo",
                        "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"]
        
        def get_syllable_info(planet_name):
            p = planets.get(planet_name, {}).get("d1", {})
            nak = p.get("nakshatra", "")
            pada_raw = p.get("pada", 1)
            pada = int(pada_raw) if isinstance(pada_raw, (int, float)) or (isinstance(pada_raw, str) and pada_raw.isdigit()) else 1
            syls = NAKSHATRA_SYLLABLES.get(nak, [])
            primary = syls[pada - 1] if 1 <= pada <= len(syls) else syls[0] if syls else "A"
            return {
                "planet": planet_name,
                "nakshatra": nak,
                "pada": pada,
                "syllables": syls,
                "primary_syllable": primary,
                "primary_letter": primary[0].upper() if primary else "A"
            }
        
        # Method 1 — 7th Lord
        if asc_sign in ZODIAC_SIGNS:
            asc_index = ZODIAC_SIGNS.index(asc_sign)
            seventh_sign = ZODIAC_SIGNS[(asc_index + 6) % 12]
            seventh_lord = SIGN_LORDS.get(seventh_sign, "Venus")
        else:
            seventh_lord = "Venus"
            seventh_sign = "Unknown"
            
        method1 = get_syllable_info(seventh_lord)
        method1["method"] = "7th Lord Method (Parashari)"
        method1["seventh_house_sign"] = seventh_sign
        
        # Method 2 — Darakaraka
        eligible = {k: v for k, v in planets.items() if k not in ["Rahu", "Ketu", "Uranus", "Neptune", "Pluto"]}
        if len(eligible) > 0:
            sorted_planets = sorted(
                eligible.items(),
                key=lambda x: round(x[1]["d1"]["degree"] % 30, 4),
                reverse=True
            )
            dk_planet = sorted_planets[-1][0]
        else:
            dk_planet = "Venus" # Fallback
            
        method2 = get_syllable_info(dk_planet)
        method2["method"] = "Darakaraka Method (Jaimini)"
        
        # Method 3 — Venus
        method3 = get_syllable_info("Venus")
        method3["method"] = "Venus Karaka Method"
        
        # Collect all unique initials across all 3 methods
        all_initials = list(set([
            method1["primary_letter"],
            method2["primary_letter"],
            method3["primary_letter"]
        ]))
        
        all_syllables_combined = list(set(
            method1["syllables"] + 
            method2["syllables"] + 
            method3["syllables"]
        ))
        
        prompt = f"""
You are a Vedic astrology expert. Analyze spouse name initials using three methods.

CHART: {asc_sign} Ascendant
{description[:500]}

THREE METHOD RESULTS:
1. {method1['method']}: 7th lord is {method1['planet']} in {method1['nakshatra']} pada {method1['pada']} → Primary syllable: {method1['primary_syllable']} → Letter: {method1['primary_letter']}
   All syllables: {', '.join(method1['syllables'])}

2. {method2['method']}: Darakaraka is {method2['planet']} in {method2['nakshatra']} pada {method2['pada']} → Primary syllable: {method2['primary_syllable']} → Letter: {method2['primary_letter']}
   All syllables: {', '.join(method2['syllables'])}

3. {method3['method']}: Venus in {method3['nakshatra']} pada {method3['pada']} → Primary syllable: {method3['primary_syllable']} → Letter: {method3['primary_letter']}
   All syllables: {', '.join(method3['syllables'])}

Most likely initials: {', '.join(all_initials)}

Write a reading covering:
## The Sacred Sounds of Your Spouse's Name
Explain the three methods briefly.

## Most Likely Initial(s): {', '.join(all_initials)}
If all three methods agree — this is highly certain.
If they differ — explain which is strongest for this chart and why.

## All Possible Syllables
List all syllables from all three methods with their meanings.

## Popular Names with These Initials
Give 6-8 Indian names and 3-4 international names starting with the most likely initial(s).

Keep it engaging and mystical. Use **bold** for letters and syllables.

Return ONLY VALID JSON. IMPORTANT: You must escape all newlines as \\n and quotes as \\" within the reading string so the JSON parses correctly!
{{
    "most_likely_initials": {json.dumps(all_initials)},
    "primary_initial": "{method1['primary_letter']}",
    "methods": {{
        "seventh_lord": {json.dumps(method1)},
        "darakaraka": {json.dumps(method2)},
        "venus": {json.dumps(method3)}
    }},
    "reading": "full markdown reading with \\n for newlines",
    "sample_names": ["name1", "name2", "name3", "name4", "name5", "name6"],
    "keywords": ["3-4 keywords"]
}}
"""

        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=8192,
                response_mime_type="application/json"
            )
        )
        response_text = response.text.strip()
        for prefix in ["```json", "```"]:
            if response_text.startswith(prefix):
                response_text = response_text[len(prefix):]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        
        try:
            result = json.loads(response_text.strip())
        except json.JSONDecodeError:
            salvaged_text = response_text
            reading_text = "Analysis unavailable due to complex planetary alignments."
            if salvaged_text.strip().startswith('{') and '"reading":' in salvaged_text:
                match = re.search(r'"reading"\s*:\s*"(.*?)"\s*,\s*"sample_names"', salvaged_text, re.DOTALL)
                if match:
                    reading_text = match.group(1).replace('\\n', '\n').replace('\\"', '"')
                    
            result = {
                "most_likely_initials": all_initials,
                "primary_initial": method1["primary_letter"],
                "methods": {
                    "seventh_lord": method1,
                    "darakaraka": method2,
                    "venus": method3
                },
                "reading": reading_text,
                "sample_names": [],
                "keywords": []
            }
        
        return {"success": True, **result}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/marriage-year")
async def marriage_year_predictor(data: KarakaRequest):
    planets = data.chart_data.get("planets", {})
    ascendant = data.chart_data.get("ascendant", {})
    current_mahadasha = data.chart_data.get("current_mahadasha", {})
    current_antardasha = data.chart_data.get("current_antardasha", {})
    from datetime import datetime
    current_year = datetime.now().year

    chart_summary = f"""
Ascendant: {ascendant.get('sign', 'Unknown')}
Current Year: {current_year}
Mahadasha: {current_mahadasha.get('lord', 'Unknown')} ends {current_mahadasha.get('end', 'Unknown')}
Antardasha: {current_antardasha.get('lord', 'Unknown') if current_antardasha else 'Unknown'}
Venus: {planets.get('Venus', {}).get('d1', {}).get('sign', 'Unknown')} {planets.get('Venus', {}).get('d1', {}).get('nakshatra', 'Unknown')}
Jupiter: {planets.get('Jupiter', {}).get('d1', {}).get('sign', 'Unknown')}
Moon: {planets.get('Moon', {}).get('d1', {}).get('sign', 'Unknown')} {planets.get('Moon', {}).get('d1', {}).get('nakshatra', 'Unknown')}
7th lord: based on {ascendant.get('sign', 'Unknown')} ascendant
"""

    # CALL 1 — Get windows as simple pipe-separated list
    windows_prompt = f"""
Vedic astrology. Marriage timing for this chart:
{chart_summary}

List exactly 3 marriage year windows from {current_year} to {current_year+7}.
Format each window on its own line exactly like this:
YEAR|DASHA|STRENGTH|REASON|MONTHS

Example:
2027|Venus-Mercury|Strong|Venus dasha + Jupiter transit|Apr-Oct
2028|Venus-Ketu|Moderate|Secondary activation|Jan-Jun
2029|Sun-Venus|Possible|Venus antardasha active|Mar-Aug

Output only 3 lines in that format. Nothing else. No explanations.
"""

    # CALL 2 — Get reading as plain markdown
    reading_prompt = f"""Write 5 facts about marriage timing for this Vedic chart. Ascendant: {ascendant.get('sign', 'Unknown')}. Venus in {planets.get('Venus', {}).get('d1', {}).get('sign', 'Unknown')}. Current dasha: {current_mahadasha.get('lord', 'Unknown')} until {current_mahadasha.get('end', 'Unknown')}.

Number each fact 1 to 5. Keep each fact under 15 words. Use **bold** for planet names. Example format:
1. **Venus** rules the 7th house for this ascendant.
2. Current dasha period strongly activates marriage.
3. Best window is 2027 based on transits.
4. **Jupiter** aspecting 7th house confirms timing.
5. Marriage most likely between 2027 and 2028.

Now write 5 facts for this specific chart:"""

    try:
        # Execute both calls using fallback utility
        windows_response = call_gemini_new(
            windows_prompt,
            config=types.GenerateContentConfig(
                temperature=0.1,
                max_output_tokens=200
            )
        )

        reading_response = call_gemini_new(
            reading_prompt,
            config=types.GenerateContentConfig(
                temperature=0.3,
                max_output_tokens=200
            )
        )

        # Parse pipe-separated windows
        windows = []
        most_likely_year = str(current_year + 1)

        for line in windows_response.text.strip().split('\n'):
            line = line.strip()
            if '|' in line:
                parts = line.split('|')
                if len(parts) >= 5:
                    windows.append({
                        "year": parts[0].strip(),
                        "dasha_period": parts[1].strip(),
                        "strength": parts[2].strip(),
                        "reason": parts[3].strip(),
                        "months": parts[4].strip()
                    })

        if windows:
            most_likely_year = windows[0]["year"]

        reading = reading_response.text.strip()
        if not reading:
            reading = f"## Marriage Timing\n\nYour **{current_mahadasha.get('lord', 'Venus')} Mahadasha** is currently active and holds significant promise for relationships."

        return {
            "success": True,
            "most_likely_year": most_likely_year,
            "most_likely_period": f"during {most_likely_year}",
            "windows": windows if windows else [
                {"year": str(current_year+1), "dasha_period": f"{current_mahadasha.get('lord','Venus')} Mahadasha", "strength": "Strong", "reason": "Current dasha favors marriage", "months": "Apr-Sep"},
                {"year": str(current_year+2), "dasha_period": "Next Antardasha", "strength": "Moderate", "reason": "Secondary window", "months": "Jan-Jun"},
                {"year": str(current_year+3), "dasha_period": "Following period", "strength": "Possible", "reason": "Tertiary window", "months": "Mar-Oct"}
            ],
            "reading": reading,
            "delay_factors": "",
            "keywords": ["marriage", "timing", "dasha", "Venus"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

