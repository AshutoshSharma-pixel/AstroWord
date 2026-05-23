import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class NakshatraRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

@router.post("/nakshatra")
async def calculate_nakshatra(data: NakshatraRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        
        moon = planets.get("Moon", {}).get("d1", {})
        if not moon:
            raise HTTPException(status_code=400, detail="Moon data not found in chart")
            
        nakshatra = moon.get("nakshatra", "")
        pada = moon.get("pada", 1)
        moon_sign = moon.get("sign", "")
        
        asc_sign = ascendant.get("sign", "Aries")
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        
        NAKSHATRA_DATA = {
            "Ashwini": {"lord": "Ketu", "deity": "Ashwini Kumaras", "symbol": "Horse head", "quality": "Light/Swift"},
            "Bharani": {"lord": "Venus", "deity": "Yama", "symbol": "Yoni", "quality": "Fierce"},
            "Krittika": {"lord": "Sun", "deity": "Agni", "symbol": "Flame", "quality": "Mixed"},
            "Rohini": {"lord": "Moon", "deity": "Brahma", "symbol": "Chariot", "quality": "Fixed"},
            "Mrigashira": {"lord": "Mars", "deity": "Soma", "symbol": "Deer head", "quality": "Soft"},
            "Ardra": {"lord": "Rahu", "deity": "Rudra", "symbol": "Teardrop", "quality": "Sharp"},
            "Punarvasu": {"lord": "Jupiter", "deity": "Aditi", "symbol": "Quiver", "quality": "Movable"},
            "Pushya": {"lord": "Saturn", "deity": "Brihaspati", "symbol": "Flower", "quality": "Light/Swift"},
            "Ashlesha": {"lord": "Mercury", "deity": "Nagas", "symbol": "Serpent", "quality": "Sharp"},
            "Magha": {"lord": "Ketu", "deity": "Pitras", "symbol": "Throne", "quality": "Fierce"},
            "Purva Phalguni": {"lord": "Venus", "deity": "Bhaga", "symbol": "Hammock", "quality": "Fierce"},
            "Uttara Phalguni": {"lord": "Sun", "deity": "Aryaman", "symbol": "Bed", "quality": "Fixed"},
            "Hasta": {"lord": "Moon", "deity": "Savitar", "symbol": "Hand", "quality": "Light/Swift"},
            "Chitra": {"lord": "Mars", "deity": "Vishwakarma", "symbol": "Pearl", "quality": "Soft"},
            "Swati": {"lord": "Rahu", "deity": "Vayu", "symbol": "Coral", "quality": "Movable"},
            "Vishakha": {"lord": "Jupiter", "deity": "Indra/Agni", "symbol": "Arch", "quality": "Mixed"},
            "Anuradha": {"lord": "Saturn", "deity": "Mitra", "symbol": "Lotus", "quality": "Soft"},
            "Jyeshtha": {"lord": "Mercury", "deity": "Indra", "symbol": "Earring", "quality": "Sharp"},
            "Mula": {"lord": "Ketu", "deity": "Nirriti", "symbol": "Roots", "quality": "Sharp"},
            "Purva Ashadha": {"lord": "Venus", "deity": "Apas", "symbol": "Winnowing fan", "quality": "Fierce"},
            "Uttara Ashadha": {"lord": "Sun", "deity": "Vishwadevas", "symbol": "Elephant tusk", "quality": "Fixed"},
            "Shravana": {"lord": "Moon", "deity": "Vishnu", "symbol": "Ear/Arrow", "quality": "Movable"},
            "Dhanishtha": {"lord": "Mars", "deity": "Ashta Vasus", "symbol": "Drum", "quality": "Movable"},
            "Dhanishta": {"lord": "Mars", "deity": "Ashta Vasus", "symbol": "Drum", "quality": "Movable"},
            "Shatabhisha": {"lord": "Rahu", "deity": "Varuna", "symbol": "Empty circle", "quality": "Movable"},
            "Purva Bhadrapada": {"lord": "Jupiter", "deity": "Aja Ekapada", "symbol": "Sword", "quality": "Fierce"},
            "Uttara Bhadrapada": {"lord": "Saturn", "deity": "Ahir Budhyana", "symbol": "Twins", "quality": "Fixed"},
            "Revati": {"lord": "Mercury", "deity": "Pushan", "symbol": "Fish", "quality": "Soft"},
        }
        
        # Ganas
        DEVA_GANA = ["Ashwini", "Mrigashira", "Punarvasu", "Pushya", "Hasta", "Swati", "Anuradha", "Shravana", "Revati"]
        MANUSHYA_GANA = ["Bharani", "Rohini", "Ardra", "Purva Phalguni", "Uttara Phalguni", "Purva Ashadha", "Uttara Ashadha", "Purva Bhadrapada", "Uttara Bhadrapada"]
        RAKSHASA_GANA = ["Krittika", "Ashlesha", "Magha", "Chitra", "Vishakha", "Jyeshtha", "Mula", "Dhanishtha", "Dhanishta", "Shatabhisha"]
        
        # Resolve Gana
        if nakshatra in DEVA_GANA:
            gana = "Deva"
        elif nakshatra in MANUSHYA_GANA:
            gana = "Manushya"
        elif nakshatra in RAKSHASA_GANA:
            gana = "Rakshasa"
        else:
            gana = "Unknown"
            
        nak_info = NAKSHATRA_DATA.get(nakshatra, {"lord": "Unknown", "deity": "Unknown", "symbol": "Unknown", "quality": "Unknown"})
        nakshatra_lord = nak_info["lord"]
        nakshatra_deity = nak_info["deity"]
        nakshatra_symbol = nak_info["symbol"]
        nakshatra_quality = nak_info["quality"]
        
        # Build prompt
        prompt = f"""You are a Vedic astrologer expert in Nakshatra analysis. Write a personalised 400-word reading in 4 paragraphs. Address as "you/your".

Chart data:
- Nakshatra: {nakshatra} Pada {pada}
- Ruling Planet: {nakshatra_lord}
- Ruling Deity: {nakshatra_deity}
- Moon Sign: {moon_sign}
- Gana: {gana}
- Ascendant: {asc_sign}
- Current Mahadasha: {current_mahadasha}

Paragraph 1: The core personality and spiritual nature of {nakshatra} nakshatra — its deity {nakshatra_deity}, ruling planet {nakshatra_lord}, and what this reveals about this person's deepest nature and life path.

Paragraph 2: How Pada {pada} of {nakshatra} specifically refines their nature. Each pada falls in a different navamsa sign — explain which navamsa sign Pada {pada} of {nakshatra} falls in and what this adds.

Paragraph 3: Their {gana} Gana — what this reveals about their temperament, compatibility in relationships, and how they approach challenges.

Paragraph 4: How their current {current_mahadasha} Mahadasha interacts with their {nakshatra_lord}-ruled nakshatra. Since {nakshatra_lord} rules {nakshatra}, this Mahadasha has special significance.

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
            "nakshatra": nakshatra,
            "pada": pada,
            "moon_sign": moon_sign,
            "nakshatra_lord": nakshatra_lord,
            "nakshatra_deity": nakshatra_deity,
            "nakshatra_symbol": nakshatra_symbol,
            "nakshatra_quality": nakshatra_quality,
            "gana": gana,
            "reading": reading
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
