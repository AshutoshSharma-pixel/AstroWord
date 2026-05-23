import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class MoonSignRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

@router.post("/moon-sign")
async def calculate_moon_sign(data: MoonSignRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        
        moon = planets.get("Moon", {}).get("d1", {})
        if not moon:
            raise HTTPException(status_code=400, detail="Moon data not found in chart")
            
        moon_sign = moon.get("sign", "")
        moon_nakshatra = moon.get("nakshatra", "")
        moon_pada = moon.get("pada", 1)
        moon_degree = round(moon.get("degree", 0.0) % 30, 2)
        moon_retrograde = moon.get("retrograde", False)
        
        asc_sign = ascendant.get("sign", "Aries")
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        
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
        
        SYMBOLS = {
            "Aries": "Ram", "Taurus": "Bull", "Gemini": "Twins",
            "Cancer": "Crab", "Leo": "Lion", "Virgo": "Virgin",
            "Libra": "Scales", "Scorpio": "Scorpion", "Sagittarius": "Archer",
            "Capricorn": "Sea-Goat", "Aquarius": "Water Bearer", "Pisces": "Fish"
        }
        
        moon_sign_lord = SIGN_LORDS.get(moon_sign, "Unknown")
        element = ELEMENTS.get(moon_sign, "Unknown")
        quality = QUALITIES.get(moon_sign, "Unknown")
        symbol = SYMBOLS.get(moon_sign, "Unknown")
        
        prompt = f"""You are a Vedic astrologer. Write a personalised 400-word Moon sign reading in 4 paragraphs. Address as "you/your".

Chart data:
- Moon Sign (Rashi): {moon_sign}
- Moon Nakshatra: {moon_nakshatra} Pada {moon_pada}
- Moon Degree: {moon_degree:.2f}°
- Moon Sign Lord: {moon_sign_lord}
- Ascendant: {asc_sign}
- Current Mahadasha: {current_mahadasha}

Paragraph 1: Their {moon_sign} Moon's core emotional nature — how they feel, react, and process emotions. What makes them feel safe and what triggers them. Be specific to {moon_sign} energy, not generic.

Paragraph 2: How {moon_nakshatra} nakshatra Pada {moon_pada} refines their Moon sign energy. The nakshatra's ruling deity, planetary lord, and specific personality nuances it adds.

Paragraph 3: How their {moon_sign} Moon interacts with their {asc_sign} Ascendant — the tension or harmony between their outer and inner self.

Paragraph 4: How their current {current_mahadasha} Mahadasha is affecting their emotional life and mental patterns right now.

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
            "moon_sign": moon_sign,
            "moon_nakshatra": moon_nakshatra,
            "moon_pada": moon_pada,
            "moon_degree": moon_degree,
            "moon_sign_lord": moon_sign_lord,
            "element": element,
            "quality": quality,
            "symbol": symbol,
            "reading": reading
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
