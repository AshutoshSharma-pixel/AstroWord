import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class UpapadaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
         "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

# Sign lords (Jaimini — Mars rules Scorpio, not Ketu)
SIGN_LORDS = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
    "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
    "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
    "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
}


def sign_number(sign: str) -> int:
    """Return 1-based sign number (Aries=1 ... Pisces=12)."""
    return SIGNS.index(sign) + 1


def sign_from_number(n: int) -> str:
    """Return sign name from 1-based number (wraps around zodiac)."""
    return SIGNS[(n - 1) % 12]


def count_signs(from_sign: str, to_sign: str) -> int:
    """Count signs from 'from_sign' to 'to_sign' inclusive (1–12)."""
    f = sign_number(from_sign)
    t = sign_number(to_sign)
    diff = (t - f) % 12
    return diff + 1  # 1 if same sign, 12 if one step back


def calculate_arudha(house_sign: str, lord_sign: str) -> str:
    """
    Jaimini Arudha calculation:
    1. Count signs from house_sign to lord_sign (inclusive) = N
    2. Project N signs from lord_sign = Arudha sign
    Exception: if Arudha lands on house_sign or its 7th, add 10 more signs.
    """
    n = count_signs(house_sign, lord_sign)
    arudha_num = (sign_number(lord_sign) + n - 1 - 1) % 12 + 1
    arudha_sign = sign_from_number(arudha_num)

    # Exception rule: Arudha cannot be the house itself or its 7th
    house_num = sign_number(house_sign)
    seventh_from_house_num = (house_num + 6 - 1) % 12 + 1

    if arudha_num == house_num or arudha_num == seventh_from_house_num:
        arudha_num = (arudha_num + 10 - 1) % 12 + 1
        arudha_sign = sign_from_number(arudha_num)

    return arudha_sign


@router.post("/upapada")
async def calculate_upapada(data: UpapadaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})

        asc_sign = ascendant.get("sign", "")
        if not asc_sign or asc_sign not in SIGNS:
            raise HTTPException(status_code=400, detail="Ascendant sign not found in chart data")

        # Step 1: Find the 12th house sign
        asc_num = sign_number(asc_sign)
        twelfth_house_num = (asc_num + 11 - 1) % 12 + 1
        twelfth_house_sign = sign_from_number(twelfth_house_num)

        # Step 2: Find lord of 12th house
        twelfth_lord = SIGN_LORDS[twelfth_house_sign]

        # Step 3: Find sign of 12th lord
        lord_data = planets.get(twelfth_lord, {}).get("d1", {})
        if not lord_data:
            raise HTTPException(status_code=400, detail=f"{twelfth_lord} (12th lord) data not found in chart")
        lord_sign = lord_data.get("sign", "")
        if not lord_sign or lord_sign not in SIGNS:
            raise HTTPException(status_code=400, detail=f"Sign not found for {twelfth_lord}")

        lord_nakshatra = lord_data.get("nakshatra", "")
        lord_degree = round(lord_data.get("degree", 0) % 30, 2)
        lord_retrograde = lord_data.get("retrograde", False)

        # Step 4: Calculate Upapada Lagna (Arudha of 12th house)
        upapada_sign = calculate_arudha(twelfth_house_sign, lord_sign)
        upapada_num = sign_number(upapada_sign)

        # Step 5: Find Upapada lord
        upapada_lord = SIGN_LORDS[upapada_sign]

        # Step 6: Find placement of Upapada lord in the chart
        upapada_lord_data = planets.get(upapada_lord, {}).get("d1", {})
        upapada_lord_sign = upapada_lord_data.get("sign", "Unknown")
        upapada_lord_house = upapada_lord_data.get("house", None)
        if upapada_lord_house is None and upapada_lord_sign in SIGNS:
            upapada_lord_house = ((sign_number(upapada_lord_sign) - asc_num) % 12) + 1

        # Step 7: Find any planets in Upapada sign (conjunct Upapada)
        planets_in_upapada = []
        for planet_name, planet_info in planets.items():
            d1_data = planet_info.get("d1", {})
            if d1_data.get("sign") == upapada_sign:
                planets_in_upapada.append(planet_name)

        # Step 8: Calculate 2nd from Upapada (sustaining house)
        second_from_upapada_num = (upapada_num + 1 - 1) % 12 + 1
        second_from_upapada = sign_from_number(second_from_upapada_num)
        planets_in_second = []
        for planet_name, planet_info in planets.items():
            d1_data = planet_info.get("d1", {})
            if d1_data.get("sign") == second_from_upapada:
                planets_in_second.append(planet_name)

        # Mahadasha
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")

        # Build AI prompt
        prompt = f"""
You are a master Jaimini Vedic astrologer with deep knowledge of Upapada Lagna, Arudha Padas, and marriage karma.
Write a deeply personalised, second-person reading for this person. Address them directly as "you/your".
Use a warm, insightful, and direct tone — like a wise astrologer speaking to them in person.
Do not be generic. Every statement must reference their specific chart data below.

CHART DATA:
Ascendant: {asc_sign}
12th House Sign: {twelfth_house_sign}
12th House Lord: {twelfth_lord}
{twelfth_lord} placed in: {lord_sign} (Nakshatra: {lord_nakshatra}, Degree: {lord_degree}°{" — Retrograde" if lord_retrograde else ""})
Upapada Lagna (UL): {upapada_sign}
Upapada Lord: {upapada_lord} (placed in house {upapada_lord_house} in {upapada_lord_sign})
Planets in Upapada sign: {', '.join(planets_in_upapada) if planets_in_upapada else 'None'}
2nd from Upapada: {second_from_upapada}
Planets in 2nd from Upapada: {', '.join(planets_in_second) if planets_in_second else 'None'}
Current Mahadasha: {current_mahadasha}

Write the following sections using markdown headers:

## What is Upapada Lagna?
Explain Upapada Lagna in 3-4 sentences — what it is, why it matters for marriage, and how it differs from the 7th house in Parashari astrology. Keep it clear and accessible.

## Your Upapada Lagna is {upapada_sign}
Explain what {upapada_sign} Upapada means for this person's marriage destiny. 
Discuss the nature of the sign ({upapada_sign}), its element, modality, and what this reveals about their spouse and marriage.
Be specific about temperament, values, and how the marriage partnership will function.

## The Role of {twelfth_lord} as Your 12th Lord
Explain how {twelfth_lord} placed in {lord_sign} shaped the Upapada calculation.
What does {twelfth_lord} as a planet signify for marriage when it is the 12th lord?
{"Mention that {twelfth_lord} is retrograde and how this adds karmic depth to the marriage theme." if lord_retrograde else ""}

## Your Upapada Lord: {upapada_lord} in House {upapada_lord_house}
The Upapada lord ({upapada_lord}) placed in house {upapada_lord_house} is one of the most important factors.
Interpret this placement deeply — what does it say about:
- The longevity and stability of marriage
- Where you will meet your spouse (what life context)
- What kind of person will sustain this marriage

## Planets Influencing Your Upapada
{f"These planets sit in your Upapada sign ({upapada_sign}): {', '.join(planets_in_upapada)}. Explain each planet's influence on your marriage character and what it adds to the Upapada energy." if planets_in_upapada else f"No planets occupy your Upapada sign ({upapada_sign}) directly, making the Upapada lord ({upapada_lord}) the sole anchor for reading the marriage. Explain what an unoccupied Upapada means."}
{f"The 2nd from your Upapada ({second_from_upapada}) has these planets: {', '.join(planets_in_second)}. Explain what planets in the 2nd from UL mean for the sustaining of the marriage and family life." if planets_in_second else ""}

## Marriage Destiny Reading
Based on all the above factors, give a detailed, personalised narrative about:
- The timing of marriage (connection to current {current_mahadasha} Mahadasha)
- The nature of the spouse — their appearance, profession, and personality
- Whether this is likely a love marriage or arranged marriage
- The overall quality and character of the marital bond

## Strengthening Your Upapada: Vedic Remedies
Give 4-5 specific remedies to strengthen the Upapada Lagna and attract a compatible spouse.
Tailor remedies to {upapada_sign} Upapada and {upapada_lord} as the Upapada lord.
Include mantras, days, colours, rituals, and behavioural suggestions.

Provide an expansive, rich reading. Do not restrict length.
Use pure Markdown — no JSON.
At the very end, on a new line:
KEYWORDS: word1, word2, word3
"""

        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.45,
                max_output_tokens=8192,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        full_text = response.text or ""

        # Extract keywords
        keywords = ["Upapada Lagna", upapada_sign, twelfth_lord, upapada_lord]
        if "KEYWORDS:" in full_text:
            parts = full_text.rsplit("KEYWORDS:", 1)
            full_text = parts[0].rstrip()
            kw_raw = parts[1].strip()
            keywords = [k.strip() for k in kw_raw.split(",") if k.strip()][:6]

        return {
            "success": True,
            "ascendant": asc_sign,
            "twelfth_house_sign": twelfth_house_sign,
            "twelfth_lord": twelfth_lord,
            "twelfth_lord_sign": lord_sign,
            "twelfth_lord_nakshatra": lord_nakshatra,
            "twelfth_lord_degree": lord_degree,
            "twelfth_lord_retrograde": lord_retrograde,
            "upapada_sign": upapada_sign,
            "upapada_lord": upapada_lord,
            "upapada_lord_house": upapada_lord_house,
            "upapada_lord_sign": upapada_lord_sign,
            "planets_in_upapada": planets_in_upapada,
            "second_from_upapada": second_from_upapada,
            "planets_in_second": planets_in_second,
            "reading": full_text,
            "keywords": keywords
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
