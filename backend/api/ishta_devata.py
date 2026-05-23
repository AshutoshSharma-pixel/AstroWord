import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class IshtaDevataRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

@router.post("/ishta-devata")
async def calculate_ishta_devata(data: IshtaDevataRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        
        # Exclude Rahu and Ketu for Atmakaraka
        eligible = {
            k: v for k, v in planets.items()
            if k not in ["Rahu", "Ketu"]
        }
        
        if len(eligible) < 7:
            raise HTTPException(
                status_code=400,
                detail="Insufficient planet data for Ishta Devata / Atmakaraka calculation"
            )
            
        # Sort by degree within sign (0-30°) to find Atmakaraka
        sorted_planets = sorted(
            eligible.items(),
            key=lambda x: round(x[1]["d1"]["degree"] % 30, 4),
            reverse=True  # Highest first
        )
        
        atmakaraka = sorted_planets[0][0]
        atmakaraka_info = sorted_planets[0][1]
        atmakaraka_sign = atmakaraka_info["d1"]["sign"]
        
        # Atmakaraka sign in Navamsa (D9)
        navamsa_sign = atmakaraka_info.get("d9", {}).get("sign", "")
        if not navamsa_sign:
            raise HTTPException(status_code=400, detail="Navamsa sign not found for Atmakaraka")
            
        SIGNS = [
            "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
            "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
        ]
        
        if navamsa_sign not in SIGNS:
            raise HTTPException(status_code=400, detail=f"Invalid Navamsa sign: {navamsa_sign}")
            
        # Find 12th house from Atmakaraka sign in Navamsa
        nav_index = SIGNS.index(navamsa_sign)
        twelfth_index = (nav_index + 11) % 12
        twelfth_sign = SIGNS[twelfth_index]
        
        # Deity map based on the 12th sign from Karakamsha (Atmakaraka in D9)
        DEITY_MAP = {
            "Aries": {"deity": "Kartikeya/Muruga", "mantra": "Om Saravanabhavaya Namah", "planet": "Mars"},
            "Taurus": {"deity": "Lakshmi/Shukra", "mantra": "Om Shreem Mahalakshmiyei Namah", "planet": "Venus"},
            "Gemini": {"deity": "Vishnu", "mantra": "Om Namo Bhagavate Vasudevaya", "planet": "Mercury"},
            "Cancer": {"deity": "Shiva", "mantra": "Om Namah Shivaya", "planet": "Moon"},
            "Leo": {"deity": "Shiva/Durga", "mantra": "Om Aim Hreem Kleem Chamundayai Viche", "planet": "Sun"},
            "Virgo": {"deity": "Vishnu", "mantra": "Om Namo Bhagavate Vasudevaya", "planet": "Mercury"},
            "Libra": {"deity": "Shiva", "mantra": "Om Namah Shivaya", "planet": "Venus"},
            "Scorpio": {"deity": "Ganesha", "mantra": "Om Gam Ganapataye Namah", "planet": "Mars"},
            "Sagittarius": {"deity": "Dattatreya/Brahma", "mantra": "Om Draam Dreem Draum Sah Dattatreyaya Namah", "planet": "Jupiter"},
            "Capricorn": {"deity": "Yama/Shani", "mantra": "Om Sham Shanaischaraya Namah", "planet": "Saturn"},
            "Aquarius": {"deity": "Shiva/Rudra", "mantra": "Om Namah Shivaya", "planet": "Saturn"},
            "Pisces": {"deity": "Vishnu/Krishna", "mantra": "Om Namo Bhagavate Vasudevaya", "planet": "Jupiter"}
        }
        
        deity_info = DEITY_MAP.get(twelfth_sign, {"deity": "Unknown", "mantra": "Unknown", "planet": "Unknown"})
        ishta_devata = deity_info["deity"]
        ishta_devata_mantra = deity_info["mantra"]
        ishta_devata_planet = deity_info["planet"]
        
        # Secondary method: Moon nakshatra deity mapping
        NAKSHATRA_DEITIES = {
            "Ashwini": "Ashwini Kumaras",
            "Bharani": "Yama",
            "Krittika": "Agni",
            "Rohini": "Brahma",
            "Mrigashira": "Soma",
            "Ardra": "Rudra",
            "Punarvasu": "Aditi",
            "Pushya": "Brihaspati",
            "Ashlesha": "Nagas",
            "Magha": "Pitras",
            "Purva Phalguni": "Bhaga",
            "Uttara Phalguni": "Aryaman",
            "Hasta": "Savitar",
            "Chitra": "Vishwakarma",
            "Swati": "Vayu",
            "Vishakha": "Indra/Agni",
            "Anuradha": "Mitra",
            "Jyeshtha": "Indra",
            "Mula": "Nirriti",
            "Purva Ashadha": "Apas",
            "Uttara Ashadha": "Vishwadevas",
            "Shravana": "Vishnu",
            "Dhanishtha": "Ashta Vasus",
            "Dhanishta": "Ashta Vasus",
            "Shatabhisha": "Varuna",
            "Purva Bhadrapada": "Aja Ekapada",
            "Uttara Bhadrapada": "Ahir Budhyana",
            "Revati": "Pushan"
        }
        
        moon = planets.get("Moon", {}).get("d1", {})
        moon_nakshatra = moon.get("nakshatra", "Anuradha")
        nakshatra_deity = NAKSHATRA_DEITIES.get(moon_nakshatra, "Unknown")
        
        moon_sign = moon.get("sign", "Unknown")
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        
        prompt = f"""You are a Vedic astrologer and spiritual guide. Write a deeply personalised 400-word Ishta Devata reading in 4 paragraphs. Address as "you/your". This is a sacred, spiritually meaningful reading.

Chart data:
- Atmakaraka (Soul Planet): {atmakaraka}
- Atmakaraka in Navamsa: {navamsa_sign}
- 12th from Atmakaraka in Navamsa: {twelfth_sign}
- Ishta Devata: {ishta_devata}
- Ishta Devata Mantra: {ishta_devata_mantra}
- Nakshatra Deity (secondary): {nakshatra_deity}
- Moon Sign: {moon_sign}
- Current Mahadasha: {current_mahadasha}

Paragraph 1: Why {ishta_devata} is your Ishta Devata — the Jaimini calculation explained in accessible terms, why this deity's energy aligns with your soul's purpose through your Atmakaraka {atmakaraka}.

Paragraph 2: The qualities and gifts {ishta_devata} brings to your life — what this deity represents, how their energy has already been working in your life, and what they protect you from.

Paragraph 3: How to deepen your connection — specific day to worship, specific mantra (give exact text: {ishta_devata_mantra}), specific offerings, and any fasting practice associated with {ishta_devata}.

Paragraph 4: How your current {current_mahadasha} Mahadasha interacts with your Ishta Devata — is this a time of strong divine support or a time requiring more devotion?

Write with reverence and warmth. This is a sacred reading. 400 words max."""

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
            "atmakaraka": atmakaraka,
            "atmakaraka_sign": atmakaraka_sign,
            "navamsa_sign": navamsa_sign,
            "twelfth_from_navamsa": twelfth_sign,
            "ishta_devata": ishta_devata,
            "ishta_devata_mantra": ishta_devata_mantra,
            "ishta_devata_planet": ishta_devata_planet,
            "nakshatra_deity": nakshatra_deity,
            "reading": reading
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
