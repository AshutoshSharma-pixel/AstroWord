import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from api.gemini_utils import call_gemini_stream
from google.genai import types

router = APIRouter()

TITHI_NAMES = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
]

TITHI_LORDS = [
    "Sun", "Moon", "Mars", "Mercury", "Jupiter",
    "Venus", "Saturn", "Rahu", "Sun", "Moon",
    "Mars", "Mercury", "Jupiter", "Venus", "Moon",
    "Sun", "Moon", "Mars", "Mercury", "Jupiter",
    "Venus", "Saturn", "Rahu", "Sun", "Moon",
    "Mars", "Mercury", "Jupiter", "Venus", "Saturn"
]

TITHI_DEITIES = [
    "Brahma", "Shri Hari", "Vishnu", "Yama", "Chandra",
    "Agni", "Indra", "Vasus", "Naga", "Aryaman",
    "Rudra", "Aditya", "Bhaga", "Kali", "Vishnu",
    "Brahma", "Shri Hari", "Vishnu", "Yama", "Chandra",
    "Agni", "Indra", "Vasus", "Naga", "Aryaman",
    "Rudra", "Aditya", "Bhaga", "Kali", "Vishnu"
]

TITHI_CATEGORIES = [
    "Nanda", "Bhadra", "Jaya", "Rikta", "Poorna",
    "Nanda", "Bhadra", "Jaya", "Rikta", "Poorna",
    "Nanda", "Bhadra", "Jaya", "Rikta", "Poorna",
    "Nanda", "Bhadra", "Jaya", "Rikta", "Poorna",
    "Nanda", "Bhadra", "Jaya", "Rikta", "Poorna",
    "Nanda", "Bhadra", "Jaya", "Rikta", "Poorna"
]

class TithiRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

@router.post("/tithi/stream")
async def calculate_tithi_stream(request: TithiRequest):
    async def generate():
        try:
            chart = request.chart_data
            planets = chart.get("planets", {})
            
            # Get Sun and Moon full sidereal longitudes (0-360)
            sun_deg = planets.get("Sun", {}).get("d1", {}).get("degree", 0)
            moon_deg = planets.get("Moon", {}).get("d1", {}).get("degree", 0)
            
            # Calculate Tithi
            diff = (moon_deg - sun_deg) % 360
            tithi_index = int(diff / 12)  # 0-29
            tithi_number = tithi_index + 1  # 1-30
            
            # Paksha
            paksha = "Shukla Paksha" if tithi_number <= 15 else "Krishna Paksha"
            paksha_meaning = "Waxing Moon (bright fortnight)" if tithi_number <= 15 else "Waning Moon (dark fortnight)"
            
            # Tithi details
            tithi_name = TITHI_NAMES[tithi_index]
            tithi_lord = TITHI_LORDS[tithi_index]
            tithi_deity = TITHI_DEITIES[tithi_index]
            tithi_category = TITHI_CATEGORIES[tithi_index]
            
            # Moon sign and nakshatra for personalisation
            moon_sign = planets.get("Moon", {}).get("d1", {}).get("sign", "")
            moon_nakshatra = planets.get("Moon", {}).get("d1", {}).get("nakshatra", "")
            ascendant_sign = chart.get("ascendant", {}).get("sign", "")
            current_dasha = chart.get("current_mahadasha", {}).get("lord", "")
            
            # Emit metadata first
            meta = {
                "type": "meta",
                "tithi_number": tithi_number,
                "tithi_name": tithi_name,
                "paksha": paksha,
                "paksha_meaning": paksha_meaning,
                "tithi_lord": tithi_lord,
                "tithi_deity": tithi_deity,
                "tithi_category": tithi_category,
                "moon_sign": moon_sign,
                "moon_nakshatra": moon_nakshatra,
            }
            yield f"data: {json.dumps(meta)}\n\n"
            
            # Build Gemini prompt
            prompt = f"""You are an expert Vedic astrologer specialising in Panchang and lunar astrology.

Birth Chart Details:
- Janma Tithi: {tithi_name} ({paksha}, Tithi {tithi_number}/30)
- Tithi Category: {tithi_category} Tithi
- Tithi Ruling Planet: {tithi_lord}
- Presiding Deity: {tithi_deity}
- Moon Sign: {moon_sign}
- Moon Nakshatra: {moon_nakshatra}
- Ascendant: {ascendant_sign}
- Current Mahadasha: {current_dasha}

Write a personalised Janma Tithi reading covering these sections. Be specific to this person's chart — not generic. Total 400-500 words.

**Core Personality & Soul Nature**
2 paragraphs. Cover what {tithi_name} Tithi reveals about this person's core nature, emotional patterns, and soul purpose. Include how {paksha} ({"waxing" if "Shukla" in paksha else "waning"} moon) shapes their energy — Shukla Paksha gives outward, expressive, building energy while Krishna Paksha gives inward, reflective, releasing energy. Include the {tithi_lord} ruling planet's influence on personality.

**Emotional Nature & Relationships**
1 paragraph. How this Tithi affects emotional patterns, relationships, and interpersonal dynamics. Include how Moon in {moon_sign} in {moon_nakshatra} nakshatra modifies the Tithi's energy specifically.

**Strengths & Challenges**
3 strengths and 3 challenges. One line each. Specific to {tithi_name} Tithi.

**Spiritual Life & Auspicious Practices**
1 paragraph. The deity {tithi_deity} associated with this Tithi, spiritual inclinations, recommended practices, and auspicious activities for people born on this Tithi. What days and activities are most powerful for this person.

**Current Life Theme**
1 short paragraph. How the current {current_dasha} Mahadasha interacts with the {tithi_name} Tithi energy — what themes are amplified right now.

End with:
KEYWORDS: [5-7 keywords like tithi name, paksha, ruling planet, themes]"""

            # Stream Gemini response
            async for chunk in call_gemini_stream(prompt, config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=3000,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )):
                yield chunk
                
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"
            yield f"data: {json.dumps({'type': 'done'})}\n\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")
