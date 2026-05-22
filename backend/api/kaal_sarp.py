import os
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class KaalSarpRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']

TYPES = {
    1: "Anant Kaal Sarp Dosha",
    2: "Kulik Kaal Sarp Dosha", 
    3: "Vasuki Kaal Sarp Dosha",
    4: "Shankhpal Kaal Sarp Dosha",
    5: "Padma Kaal Sarp Dosha",
    6: "Mahapadma Kaal Sarp Dosha",
    7: "Takshak Kaal Sarp Dosha",
    8: "Karkotak Kaal Sarp Dosha",
    9: "Shankhnaad Kaal Sarp Dosha",
    10: "Ghatak Kaal Sarp Dosha",
    11: "Vishdhar Kaal Sarp Dosha",
    12: "Sheshnag Kaal Sarp Dosha"
}

@router.post("/kaal-sarp-dosha")
async def calculate_kaal_sarp(data: KaalSarpRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        
        rahu_data = planets.get("Rahu", {}).get("d1", {})
        ketu_data = planets.get("Ketu", {}).get("d1", {})
        
        if not rahu_data or not ketu_data:
            raise HTTPException(status_code=400, detail="Rahu or Ketu data not found in chart")
            
        rahu_sign = rahu_data.get("sign", "")
        ketu_sign = ketu_data.get("sign", "")
        
        if rahu_sign not in SIGNS or ketu_sign not in SIGNS:
            raise HTTPException(status_code=400, detail="Invalid Rahu or Ketu sign in chart")
            
        rahu_idx = SIGNS.index(rahu_sign)
        ketu_idx = SIGNS.index(ketu_sign)
        
        asc_sign = ascendant.get("sign", "Aries")
        if asc_sign not in SIGNS:
            asc_sign = "Aries"
        asc_idx = SIGNS.index(asc_sign)
        
        # Count planets in between Rahu and Ketu (clockwise and counter-clockwise)
        anulom_count = 0
        vilom_count = 0
        anulom_planets = []
        vilom_planets = []
        
        target_planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]
        
        for name in target_planets:
            p_data = planets.get(name, {}).get("d1", {})
            p_sign = p_data.get("sign", "")
            if p_sign not in SIGNS:
                continue
            p_idx = SIGNS.index(p_sign)
            
            # Check Anulom (Rahu -> Ketu clockwise)
            if rahu_idx < ketu_idx:
                in_anulom = (p_idx > rahu_idx) and (p_idx < ketu_idx)
            else:
                in_anulom = (p_idx > rahu_idx) or (p_idx < ketu_idx)
                
            # Check Vilom (Ketu -> Rahu clockwise)
            if ketu_idx < rahu_idx:
                in_vilom = (p_idx > ketu_idx) and (p_idx < rahu_idx)
            else:
                in_vilom = (p_idx > ketu_idx) or (p_idx < rahu_idx)
                
            if in_anulom:
                anulom_count += 1
                anulom_planets.append(name)
            if in_vilom:
                vilom_count += 1
                vilom_planets.append(name)
                
        # Determine KSD status
        has_kaal_sarp = False
        is_partial = False
        is_vilom = False
        planets_in_between = []
        
        if anulom_count == 7:
            has_kaal_sarp = True
            is_partial = False
            is_vilom = False
            planets_in_between = anulom_planets
        elif anulom_count == 6:
            has_kaal_sarp = True
            is_partial = True
            is_vilom = False
            planets_in_between = anulom_planets
        elif vilom_count == 7:
            has_kaal_sarp = True
            is_partial = False
            is_vilom = True
            planets_in_between = vilom_planets
        elif vilom_count == 6:
            has_kaal_sarp = True
            is_partial = True
            is_vilom = True
            planets_in_between = vilom_planets
            
        rahu_house = (rahu_idx - asc_idx) % 12 + 1
        ketu_house = (ketu_idx - asc_idx) % 12 + 1
        ksd_type = TYPES.get(rahu_house, "Anant Kaal Sarp Dosha")
        
        # Severity
        if is_partial:
            severity = "Partial"
        elif rahu_house in [1, 2, 7, 8]:
            severity = "High"
        elif rahu_house in [3, 4, 5, 6]:
            severity = "Medium"
        else:
            severity = "Low"
            
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        planets_str = ", ".join(planets_in_between) if planets_in_between else "None"
        
        # Build prompt
        prompt = f"""You are a Vedic astrologer expert in Kaal Sarp Dosha. Write a personalised 400-word reading in 4 paragraphs. Address as "you/your".

Chart data:
- Ascendant: {asc_sign}
- Kaal Sarp Type: {ksd_type}
- Rahu in house {rahu_house} ({rahu_sign})
- Ketu in house {ketu_house} ({ketu_sign})
- Severity: {severity}
- Vilom (reverse): {is_vilom}
- Current Mahadasha: {current_mahadasha}
- Planets between Rahu-Ketu: {planets_str}

Paragraph 1: Explain their specific {ksd_type} — what Rahu in house {rahu_house} means for their life, which areas are most affected, and what the karmic lesson of this placement is.

Paragraph 2: How {severity} severity manifests in their specific life areas based on houses {rahu_house} and {ketu_house}. {"Note this is Vilom (reverse) KSD which is less intense than standard." if is_vilom else ""}

Paragraph 3: How their current {current_mahadasha} Mahadasha interacts with the Kaal Sarp Dosha — is this a peak period or relief period?

Paragraph 4: 3 specific remedies tailored to their {ksd_type} — mantra, fasting day, and one ritual. Be specific (exact mantra text, exact day).

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
            "has_kaal_sarp": has_kaal_sarp,
            "is_partial": is_partial,
            "is_vilom": is_vilom,
            "ksd_type": ksd_type,
            "rahu_house": rahu_house,
            "ketu_house": ketu_house,
            "rahu_sign": rahu_sign,
            "ketu_sign": ketu_sign,
            "affected_houses": [rahu_house, ketu_house],
            "planets_in_between": planets_in_between,
            "severity": severity,
            "reading": reading
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
