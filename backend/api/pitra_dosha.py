import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class PitraDoshaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

@router.post("/pitra-dosha")
async def calculate_pitra_dosha(data: PitraDoshaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        
        if not ascendant:
            raise HTTPException(status_code=400, detail="Ascendant data not found in chart")
            
        asc_sign = ascendant.get("sign", "Aries")
        
        sun = planets.get("Sun", {}).get("d1", {})
        rahu = planets.get("Rahu", {}).get("d1", {})
        ketu = planets.get("Ketu", {}).get("d1", {})
        saturn = planets.get("Saturn", {}).get("d1", {})
        moon = planets.get("Moon", {}).get("d1", {})
        
        if not all([sun, rahu, ketu]):
            raise HTTPException(status_code=400, detail="Required planetary data (Sun/Rahu/Ketu) missing")
            
        sun_sign = sun.get("sign", "Aries")
        rahu_sign = rahu.get("sign", "Aries")
        ketu_sign = ketu.get("sign", "Aries")
        saturn_sign = saturn.get("sign", "Aries") if saturn else "Aries"
        moon_sign = moon.get("sign", "Aries") if moon else "Aries"
        
        SIGNS = [
            "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
            "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
        ]
        
        def house_of(planet_sign, asc_sign):
            if planet_sign not in SIGNS or asc_sign not in SIGNS:
                return 1
            return (SIGNS.index(planet_sign) - SIGNS.index(asc_sign)) % 12 + 1
            
        sun_house = house_of(sun_sign, asc_sign)
        rahu_house = house_of(rahu_sign, asc_sign)
        ketu_house = house_of(ketu_sign, asc_sign)
        saturn_house = house_of(saturn_sign, asc_sign)
        moon_house = house_of(moon_sign, asc_sign)
        
        # Conjunction checks (same sign and within 10 degrees)
        def is_conjunct(p1_info, p2_info):
            if not p1_info or not p2_info:
                return False
            if p1_info.get("sign") != p2_info.get("sign"):
                return False
            deg1 = p1_info.get("degree", 0.0) % 30
            deg2 = p2_info.get("degree", 0.0) % 30
            return abs(deg1 - deg2) <= 10.0
            
        sun_rahu_conjunct = is_conjunct(sun, rahu)
        sun_ketu_conjunct = is_conjunct(sun, ketu)
        moon_rahu_conjunct = is_conjunct(moon, rahu)
        moon_ketu_conjunct = is_conjunct(moon, ketu)
        
        # Aspects checker: aspects is list of aspects (e.g. Mars: 4, 7, 8)
        # In Vedic, aspect count is inclusive from occupant house
        def aspects_house(from_house, target_house, aspects):
            for asp in aspects:
                # e.g., if from_house = 5, aspect is 5: (5 + 5 - 1) = 9
                if ((from_house + asp - 1 - 1) % 12) + 1 == target_house:
                    return True
            return False
            
        # Determine 9th house sign and lord
        asc_idx = SIGNS.index(asc_sign)
        ninth_house_sign = SIGNS[(asc_idx + 8) % 12]
        
        SIGN_LORDS = {
            "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
            "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
            "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
            "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
        }
        ninth_lord = SIGN_LORDS.get(ninth_house_sign, "Mars")
        ninth_lord_sign = planets.get(ninth_lord, {}).get("d1", {}).get("sign", "Aries")
        ninth_lord_house = house_of(ninth_lord_sign, asc_sign)
        
        reasons = []
        
        # Rule 1: Sun conjunct Rahu or Ketu (within 10 degrees)
        if sun_rahu_conjunct:
            reasons.append("Sun conjunct Rahu")
        if sun_ketu_conjunct:
            reasons.append("Sun conjunct Ketu")
            
        # Rule 2: Sun in 9th house afflicted by Rahu, Ketu, or Saturn
        if sun_house == 9:
            rahu_afflicting = (rahu_house == 9) or aspects_house(rahu_house, 9, [5, 9]) # Rahu aspects 5, 7, 9. 7 is opposite, already covered
            ketu_afflicting = (ketu_house == 9) or aspects_house(ketu_house, 9, [5, 9])
            saturn_afflicting = (saturn_house == 9) or aspects_house(saturn_house, 9, [3, 10]) # Saturn aspects 3, 7, 10
            if rahu_afflicting or ketu_afflicting or saturn_afflicting or (rahu_house == 3) or (ketu_house == 3) or (rahu_house == 7) or (ketu_house == 7):
                reasons.append("Sun in 9th house afflicted by Rahu/Ketu/Saturn")
                
        # Rule 3: 9th house or 9th lord afflicted by Rahu/Ketu
        # 9th house occupied or aspected by Rahu/Ketu
        ninth_house_afflicted = (rahu_house == 9 or ketu_house == 9 or
                                 aspects_house(rahu_house, 9, [5, 9]) or
                                 aspects_house(ketu_house, 9, [5, 9]))
        
        # 9th lord conjunct or aspected by Rahu/Ketu
        ninth_lord_afflicted = (ninth_lord_sign == rahu_sign or ninth_lord_sign == ketu_sign or
                                aspects_house(rahu_house, ninth_lord_house, [5, 9]) or
                                aspects_house(ketu_house, ninth_lord_house, [5, 9]))
                                
        if ninth_house_afflicted and not (rahu_house == 9 or ketu_house == 9):
            reasons.append("9th house afflicted by Rahu/Ketu aspect")
        if ninth_lord_afflicted:
            reasons.append(f"9th house lord ({ninth_lord}) afflicted by Rahu/Ketu")
            
        # Rule 4: Rahu or Ketu in 9th house
        if rahu_house == 9:
            reasons.append("Rahu in 9th house")
        if ketu_house == 9:
            reasons.append("Ketu in 9th house")
            
        # Rule 5: Moon conjunct Rahu or Ketu (Grahan Yoga)
        if moon_rahu_conjunct or moon_ketu_conjunct:
            reasons.append("Moon conjunct Rahu/Ketu (Grahan Yoga)")
            
        has_pitra_dosha = len(reasons) > 0
        
        if not has_pitra_dosha:
            severity = "None"
        elif "Sun conjunct Rahu" in reasons or "Sun conjunct Ketu" in reasons:
            severity = "High"
        elif "Rahu in 9th house" in reasons or "Ketu in 9th house" in reasons:
            severity = "Medium"
        else:
            severity = "Low"
            
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        
        prompt = f"""You are a Vedic astrologer. Write a personalised 400-word Pitra Dosha reading in 4 paragraphs. Address as "you/your".

Chart data:
- Has Pitra Dosha: {has_pitra_dosha}
- Severity: {severity}
- Reasons: {', '.join(reasons) if reasons else 'None detected'}
- Sun in house: {sun_house}
- Rahu in house: {rahu_house}  
- Ketu in house: {ketu_house}
- Current Mahadasha: {current_mahadasha}
- Ascendant: {asc_sign}

{"Write for someone WITH Pitra Dosha:" if has_pitra_dosha else "Write for someone WITHOUT significant Pitra Dosha:"}

Paragraph 1: {"Explain what their specific Pitra Dosha formation means — which planets are involved, which houses, and what karmic patterns from ancestors this indicates." if has_pitra_dosha else "Explain what Pitra Dosha is and confirm they do not have significant indicators in their chart. Explain what this means."}

Paragraph 2: {"How " + severity + " severity Pitra Dosha might manifest in their life — which areas (career, relationships, health, finances) may feel the ancestral weight most." if has_pitra_dosha else "Mention any minor ancestral karma indicators and how to maintain good ancestral relations through general practices."}

Paragraph 3: How their current {current_mahadasha} Mahadasha interacts with {"the Pitra Dosha — is this a period when its effects are amplified or reduced?" if has_pitra_dosha else "their ancestral karma theme."}

Paragraph 4: {"3 specific and powerful Pitra Dosha remedies tailored to their specific formation." if has_pitra_dosha else "General ancestral gratitude practices that benefit everyone regardless of Pitra Dosha."}

400 words max. Flowing prose."""

        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=4096,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        reading = response.text or ""
        
        return {
            "success": True,
            "has_pitra_dosha": has_pitra_dosha,
            "severity": severity,
            "reasons": reasons,
            "sun_house": sun_house,
            "rahu_house": rahu_house,
            "ketu_house": ketu_house,
            "reading": reading
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
