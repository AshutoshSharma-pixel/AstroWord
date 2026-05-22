import os
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class SadeSatiRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']

# Hardcoded data for each Moon sign based on Saturn transit in Pisces (index 11) for 2026
SADE_SATI_MAP = {
    "Aries": {
        "is_active": True,
        "phase": "Rising",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "2025",
        "end_year": "2032",
        "current_phase_end": "Feb 2028",
        "next_start": "2025"
    },
    "Taurus": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "N/A",
        "next_start": "June 2027"
    },
    "Gemini": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "N/A",
        "next_start": "June 2034"
    },
    "Cancer": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "N/A",
        "next_start": "2037"
    },
    "Leo": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": True,
        "dhaiya_type": "Ashtama Shani",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "Feb 2028",
        "next_start": "2041"
    },
    "Virgo": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "N/A",
        "next_start": "2044"
    },
    "Libra": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "N/A",
        "next_start": "2046"
    },
    "Scorpio": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "N/A",
        "next_start": "2049"
    },
    "Sagittarius": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": True,
        "dhaiya_type": "Kantaka Shani",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "Feb 2028",
        "next_start": "2052"
    },
    "Capricorn": {
        "is_active": False,
        "phase": "None",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "N/A",
        "end_year": "N/A",
        "current_phase_end": "N/A",
        "next_start": "2054"
    },
    "Aquarius": {
        "is_active": True,
        "phase": "Setting",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "2020",
        "end_year": "Feb 2028",
        "current_phase_end": "Feb 2028",
        "next_start": "2049"
    },
    "Pisces": {
        "is_active": True,
        "phase": "Peak",
        "has_dhaiya": False,
        "dhaiya_type": "None",
        "start_year": "2023",
        "end_year": "June 2030",
        "current_phase_end": "Feb 2028",
        "next_start": "2052"
    }
}

@router.post("/sade-sati")
async def calculate_sade_sati(data: SadeSatiRequest):
    try:
        planets = data.chart_data.get("planets", {})
        moon_data = planets.get("Moon", {}).get("d1", {})
        
        if not moon_data:
            raise HTTPException(status_code=400, detail="Moon data not found in chart")
            
        moon_sign = moon_data.get("sign", "")
        if moon_sign not in SIGNS:
            raise HTTPException(status_code=400, detail="Invalid Moon sign in chart")
            
        sign_info = SADE_SATI_MAP.get(moon_sign)
        if not sign_info:
            raise HTTPException(status_code=500, detail=f"Sade Sati mapping not found for sign {moon_sign}")
            
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        
        # Build prompt
        prompt = f"""You are a Vedic astrologer expert in Sade Sati. Write a personalised 400-word reading in 4 paragraphs. Address as "you/your".

Chart data:
- Moon sign: {moon_sign}
- Saturn sign: Pisces (2026 transit)
- Sade Sati Active: {sign_info['is_active']}
- Current Phase: {sign_info['phase']}
- Shani Dhaiya: {sign_info['dhaiya_type']}
- Start Year: {sign_info['start_year']}
- End Year: {sign_info['end_year']}
- Current Phase End: {sign_info['current_phase_end']}
- Current Mahadasha: {current_mahadasha}

Paragraph 1: Explain their current status. If active, explain what {sign_info['phase']} phase means for their Moon sign {moon_sign} and what challenges or growth areas are highlighted. If inactive (or Dhaiya), explain their current situation and when their next Sade Sati starts (which is {sign_info['next_start']}).

Paragraph 2: Detailed analysis of how Saturn's transit affects their emotional well-being, mind, and personal relationships based on {moon_sign} Moon. If Dhaiya is active ({sign_info['dhaiya_type']}), explain its specific impact (Kantaka Shani affects career/health/stability, Ashtama Shani affects finance/sudden changes/lessons).

Paragraph 3: How their current {current_mahadasha} Mahadasha interacts with this Saturn transit — does their Dasha lord support them or add to the lessons?

Paragraph 4: 3 specific, practical remedies for Shani (Saturn) tailored to their situation — mantra, charitable activity, and a Saturday ritual. Be specific (exact mantra text, exact ritual).

No headers. Pure flowing prose. 400 words max."""

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
            "is_active": sign_info["is_active"],
            "phase": sign_info["phase"],
            "has_dhaiya": sign_info["has_dhaiya"],
            "dhaiya_type": sign_info["dhaiya_type"],
            "moon_sign": moon_sign,
            "saturn_sign": "Pisces",
            "start_year": sign_info["start_year"],
            "end_year": sign_info["end_year"],
            "current_phase_end": sign_info["current_phase_end"],
            "next_start": sign_info["next_start"],
            "reading": reading
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
