import os
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class KarakaRequest(BaseModel):
    chart_data: dict
    karaka_type: str  # "darakaraka", "atmakaraka", or "amatyakaraka"

KARAKA_PROMPTS = {
    "darakaraka": """
You are a Jaimini Vedic astrology expert. Based on the Darakaraka planet provided,
give a detailed reading about the person's future spouse including:

## Spouse Nature & Personality
- Core personality traits based on the Darakaraka planet
- Emotional nature and temperament
- How they will treat the native

## Physical Appearance
- Likely physical features based on the planet and nakshatra

## Career & Status
- Likely profession of the spouse
- Their social standing and financial nature

## Relationship Dynamics  
- Nature of the marriage
- Challenges and strengths of the partnership

## Timing
- Based on the Darakaraka planet's dasha period, when marriage is likely

Always reference the specific planet, its nakshatra, pada, and sign placement.
Be specific, not generic. This is Jaimini astrology — the Darakaraka is the
planet with the lowest degree within its sign among all 7 planets.

Provide a highly detailed, expansive, and comprehensive reading for each section. Do not restrict the length.

Provide the response in pure Markdown. Do not use JSON.
At the very end of your response, on a new line, provide the keywords like this:
KEYWORDS: word 1, word 2, word 3
""",
    "atmakaraka": """
You are a Jaimini Vedic astrology expert. Based on the Atmakaraka planet provided,
give a detailed reading about the person's soul purpose including:

## Soul's Core Desire
- What the soul craves most in this lifetime
- The central theme of this person's life journey

## Karmic Lessons
- What lessons the soul must master
- Past life karma connected to this planet

## Life Path & Purpose
- How this planet shapes the person's destiny
- What they are here to achieve or experience

## Spiritual Path
- Which spiritual practices align with this Atmakaraka
- How to work with this energy consciously

## Strengths & Challenges
- Natural gifts from this placement
- Obstacles the soul will repeatedly face

Always reference the specific planet, nakshatra, pada, and sign.
The Atmakaraka is the planet with the HIGHEST degree within its sign.

Provide a highly detailed, expansive, and comprehensive reading for each section. Do not restrict the length.

Provide the response in pure Markdown. Do not use JSON.
At the very end of your response, on a new line, provide the keywords like this:
KEYWORDS: word 1, word 2, word 3
""",
    "amatyakaraka": """
You are a Jaimini Vedic astrology expert. Based on the Amatyakaraka planet provided,
give a detailed reading about the person's career destiny including:

## Ideal Career Fields
- Specific professions aligned with this planet
- Industries and sectors that will bring success

## Professional Strengths
- Natural talents in the workplace
- Leadership style and work approach

## Path to Success
- How success will come — gradually or suddenly?
- Key periods for career growth based on this planet's dasha

## Business vs Job
- Whether the person is suited for employment or entrepreneurship
- Best professional environments

## Financial Potential
- Wealth accumulation patterns
- How this planet influences earning capacity

Always reference the specific planet, nakshatra, pada, and sign.
The Amatyakaraka is the planet with the SECOND HIGHEST degree within its sign.

Provide a highly detailed, expansive, and comprehensive reading for each section. Do not restrict the length.

Provide the response in pure Markdown. Do not use JSON.
At the very end of your response, on a new line, provide the keywords like this:
KEYWORDS: word 1, word 2, word 3
"""
}

@router.post("/karaka")
async def calculate_karaka(data: KarakaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        
        # Exclude Rahu and Ketu — they don't participate in Chara Karaka
        eligible = {
            k: v for k, v in planets.items()
            if k not in ["Rahu", "Ketu"]
        }
        
        if len(eligible) < 7:
            raise HTTPException(
                status_code=400,
                detail="Insufficient planet data for Karaka calculation"
            )
        
        # Sort by degree WITHIN sign (0-30°) — this is the Jaimini method
        sorted_planets = sorted(
            eligible.items(),
            key=lambda x: round(x[1]["d1"]["degree"] % 30, 4),
            reverse=True  # Highest first
        )
        
        # Assign karakas
        atmakaraka_data = sorted_planets[0]      # Highest degree
        amatyakaraka_data = sorted_planets[1]    # Second highest
        darakaraka_data = sorted_planets[-1]     # Lowest degree
        
        # Select the requested karaka
        karaka_map = {
            "atmakaraka": atmakaraka_data,
            "amatyakaraka": amatyakaraka_data,
            "darakaraka": darakaraka_data
        }
        
        if data.karaka_type not in karaka_map:
            raise HTTPException(status_code=400, detail="Invalid karaka type")
        
        selected = karaka_map[data.karaka_type]
        planet_name = selected[0]
        planet_info = selected[1]["d1"]
        
        karaka_result = {
            "planet": planet_name,
            "degree": round(planet_info["degree"] % 30, 2),
            "full_degree": round(planet_info["degree"], 2),
            "sign": planet_info["sign"],
            "nakshatra": planet_info["nakshatra"],
            "pada": planet_info["pada"],
            "retrograde": planet_info.get("retrograde", False),
            "combust": planet_info.get("combust", False)
        }
        
        # Build prompt for AI reading
        chart_context = f"""
Karaka Type: {data.karaka_type.upper()}
Planet: {planet_name}
Degree within sign: {karaka_result['degree']}°
Full sidereal degree: {karaka_result['full_degree']}°
Sign: {planet_info['sign']}
Nakshatra: {planet_info['nakshatra']} pada {planet_info['pada']}
Retrograde: {karaka_result['retrograde']}
Combust: {karaka_result['combust']}

Full Chart Ascendant: {data.chart_data.get('ascendant', {}).get('sign', 'Unknown')}
Current Mahadasha: {data.chart_data.get('current_mahadasha', {}).get('lord', 'Unknown') if data.chart_data.get('current_mahadasha') else 'Unknown'}
"""
        
        prompt = KARAKA_PROMPTS[data.karaka_type] + f"\n\nCHART DATA:\n{chart_context}"
        
        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=8192
            )
        )
        response_text = response.text.strip()
        
        # Extract Keywords
        reading = response_text
        keywords = [planet_name, planet_info["sign"], planet_info["nakshatra"]]
        
        if "KEYWORDS:" in response_text:
            parts = response_text.rsplit("KEYWORDS:", 1)
            reading = parts[0].strip()
            kw_raw = parts[1].strip()
            keywords = [k.strip() for k in kw_raw.split(",") if k.strip()]
            
        ai_result = {
            "reading": reading,
            "keywords": keywords
        }
        
        return {
            "success": True,
            "karaka_type": data.karaka_type,
            "karaka": karaka_result,
            "reading": ai_result.get("reading", ""),
            "keywords": ai_result.get("keywords", []),
            "all_karakas": {
                "atmakaraka": {
                    "planet": sorted_planets[0][0],
                    "degree": round(sorted_planets[0][1]["d1"]["degree"] % 30, 2)
                },
                "amatyakaraka": {
                    "planet": sorted_planets[1][0],
                    "degree": round(sorted_planets[1][1]["d1"]["degree"] % 30, 2)
                },
                "darakaraka": {
                    "planet": sorted_planets[-1][0],
                    "degree": round(sorted_planets[-1][1]["d1"]["degree"] % 30, 2)
                }
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
