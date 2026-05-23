import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class LagnaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

@router.post("/lagna")
async def calculate_lagna(data: LagnaRequest):
    try:
        ascendant = data.chart_data.get("ascendant", {})
        planets = data.chart_data.get("planets", {})
        
        if not ascendant:
            raise HTTPException(status_code=400, detail="Ascendant data not found in chart")
            
        lagna_sign = ascendant.get("sign", "")
        lagna_degree = round(ascendant.get("degree", 0.0) % 30, 2)
        
        # Mappings
        SIGN_LORDS = {
            "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
            "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
            "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
            "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
        }
        
        ELEMENTS = {
            "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
            "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
            "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
            "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
        }
        
        QUALITIES = {
            "Aries": "Cardinal", "Cancer": "Cardinal", "Libra": "Cardinal", "Capricorn": "Cardinal",
            "Taurus": "Fixed", "Leo": "Fixed", "Scorpio": "Fixed", "Aquarius": "Fixed",
            "Gemini": "Mutable", "Virgo": "Mutable", "Sagittarius": "Mutable", "Pisces": "Mutable"
        }
        
        SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
        
        lagna_lord = SIGN_LORDS.get(lagna_sign, "Unknown")
        
        # Get Lagna lord's D1 sign
        lord_planet = planets.get(lagna_lord, {})
        lagna_lord_sign = lord_planet.get("d1", {}).get("sign", "Aries")
        
        # Calculate house of Lagna lord relative to Lagna sign
        if lagna_sign in SIGNS and lagna_lord_sign in SIGNS:
            asc_index = SIGNS.index(lagna_sign)
            lord_index = SIGNS.index(lagna_lord_sign)
            lagna_lord_house = ((lord_index - asc_index) % 12) + 1
        else:
            lagna_lord_house = 1
            
        element = ELEMENTS.get(lagna_sign, "Unknown")
        quality = QUALITIES.get(lagna_sign, "Unknown")
        
        moon_sign = planets.get("Moon", {}).get("d1", {}).get("sign", "Unknown")
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        
        # Build prompt
        prompt = f"""You are a Vedic astrologer. Write a personalised 400-word Lagna (Ascendant) reading in 4 paragraphs. Address as "you/your".

Chart data:
- Lagna (Ascendant): {lagna_sign} at {lagna_degree:.2f}°
- Lagna Lord: {lagna_lord} in {lagna_lord_sign} (House {lagna_lord_house})
- Moon Sign: {moon_sign}
- Current Mahadasha: {current_mahadasha}

Paragraph 1: Their {lagna_sign} Ascendant — physical appearance tendencies, first impression they make on others, and overall approach to life. Be specific to {lagna_sign} energy.

Paragraph 2: Their Lagna lord {lagna_lord} placed in {lagna_lord_sign} in house {lagna_lord_house} — what this means for the overall direction of their life and the areas they are most focused on.

Paragraph 3: The relationship between their {lagna_sign} Lagna and {moon_sign} Moon — how their outer personality and inner emotional world relate to each other.

Paragraph 4: How their current {current_mahadasha} Mahadasha is affecting their Lagna themes — their identity, health, and life direction.

No headers. Flowing prose. 400 words max."""

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
            "lagna_sign": lagna_sign,
            "lagna_degree": lagna_degree,
            "lagna_lord": lagna_lord,
            "lagna_lord_sign": lagna_lord_sign,
            "lagna_lord_house": lagna_lord_house,
            "element": element,
            "quality": quality,
            "reading": reading
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
