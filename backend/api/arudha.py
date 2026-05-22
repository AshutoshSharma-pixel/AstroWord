import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class ArudhaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
         "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

# Sign lords (Jaimini — Mars rules both Aries and Scorpio)
SIGN_LORDS = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
    "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
    "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
    "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
}


def sign_number(sign: str) -> int:
    return SIGNS.index(sign) + 1


def sign_from_number(n: int) -> str:
    return SIGNS[(n - 1) % 12]


def count_signs(from_sign: str, to_sign: str) -> int:
    f = sign_number(from_sign)
    t = sign_number(to_sign)
    diff = (t - f) % 12
    return diff + 1


def calculate_arudha(house_sign: str, lord_sign: str) -> str:
    """
    Jaimini Arudha:
    1. Count signs from house_sign to lord_sign inclusive = N
    2. Project N signs from lord_sign = Arudha
    Exception: if lands on house_sign or its 7th, add 10 more signs.
    """
    n = count_signs(house_sign, lord_sign)
    arudha_num = (sign_number(lord_sign) + n - 1 - 1) % 12 + 1
    arudha_sign = sign_from_number(arudha_num)

    house_num = sign_number(house_sign)
    seventh_num = (house_num + 6 - 1) % 12 + 1

    if arudha_num == house_num or arudha_num == seventh_num:
        arudha_num = (arudha_num + 10 - 1) % 12 + 1
        arudha_sign = sign_from_number(arudha_num)

    return arudha_sign


@router.post("/arudha")
async def calculate_arudha_lagna(data: ArudhaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})

        asc_sign = ascendant.get("sign", "")
        if not asc_sign or asc_sign not in SIGNS:
            raise HTTPException(status_code=400, detail="Ascendant sign not found in chart data")

        asc_num = sign_number(asc_sign)

        # Step 1: Find lord of Ascendant (1st house)
        lagna_lord = SIGN_LORDS[asc_sign]

        # Step 2: Find sign of Lagna lord
        lord_data = planets.get(lagna_lord, {}).get("d1", {})
        if not lord_data:
            raise HTTPException(status_code=400, detail=f"{lagna_lord} (lagna lord) data not found in chart")
        lord_sign = lord_data.get("sign", "")
        if not lord_sign or lord_sign not in SIGNS:
            raise HTTPException(status_code=400, detail=f"Sign not found for {lagna_lord}")

        lord_nakshatra = lord_data.get("nakshatra", "")
        lord_degree = round(lord_data.get("degree", 0) % 30, 2)
        lord_retrograde = lord_data.get("retrograde", False)
        lord_house = lord_data.get("house", None)
        if lord_house is None and lord_sign in SIGNS:
            lord_house = ((sign_number(lord_sign) - asc_num) % 12) + 1

        # Step 3: Calculate Arudha Lagna (Arudha of 1st house)
        arudha_sign = calculate_arudha(asc_sign, lord_sign)
        arudha_num = sign_number(arudha_sign)

        # Step 4: Find Arudha Lagna lord
        arudha_lord = SIGN_LORDS[arudha_sign]

        # Step 5: Find placement of Arudha lord
        arudha_lord_data = planets.get(arudha_lord, {}).get("d1", {})
        arudha_lord_sign = arudha_lord_data.get("sign", "Unknown")
        arudha_lord_house = arudha_lord_data.get("house", None)
        if arudha_lord_house is None and arudha_lord_sign in SIGNS:
            arudha_lord_house = ((sign_number(arudha_lord_sign) - asc_num) % 12) + 1

        # Step 6: House number of Arudha Lagna from Ascendant
        arudha_house_from_asc = ((arudha_num - asc_num) % 12) + 1

        # Step 7: Planets in Arudha Lagna sign
        planets_in_arudha = []
        for planet_name, planet_info in planets.items():
            d1_data = planet_info.get("d1", {})
            if d1_data.get("sign") == arudha_sign:
                planets_in_arudha.append(planet_name)

        # Step 8: 7th from Arudha (how others see your relationships)
        seventh_from_arudha_num = (arudha_num + 6 - 1) % 12 + 1
        seventh_from_arudha = sign_from_number(seventh_from_arudha_num)
        planets_in_seventh = []
        for planet_name, planet_info in planets.items():
            d1_data = planet_info.get("d1", {})
            if d1_data.get("sign") == seventh_from_arudha:
                planets_in_seventh.append(planet_name)

        # Step 9: Benefic/malefic check — planets aspecting Arudha
        # Simplified: note Saturn, Rahu, Ketu presence in 3rd or 6th from AL (upachaya from AL)
        third_from_arudha_num = (arudha_num + 2 - 1) % 12 + 1
        third_from_arudha = sign_from_number(third_from_arudha_num)
        planets_in_third = []
        for planet_name, planet_info in planets.items():
            d1_data = planet_info.get("d1", {})
            if d1_data.get("sign") == third_from_arudha:
                planets_in_third.append(planet_name)

        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")

        prompt = f"""
You are a master Jaimini Vedic astrologer with deep expertise in Arudha Lagna, Maya, and social perception.
Write a deeply personalised, second-person reading. Address the person as "you/your" throughout.
Speak like a wise astrologer in a one-on-one session — warm, precise, and insightful.
Do not be generic. Every statement must reference their specific chart data.

CHART DATA:
Ascendant (Lagna): {asc_sign}
Lagna Lord: {lagna_lord} in {lord_sign} (House {lord_house}, Nakshatra: {lord_nakshatra}, {lord_degree}°{" — Retrograde" if lord_retrograde else ""})
Arudha Lagna (AL): {arudha_sign} (House {arudha_house_from_asc} from Ascendant)
Arudha Lord: {arudha_lord} in {arudha_lord_sign} (House {arudha_lord_house})
Planets in Arudha Lagna: {', '.join(planets_in_arudha) if planets_in_arudha else 'None'}
7th from Arudha Lagna: {seventh_from_arudha}
Planets in 7th from AL: {', '.join(planets_in_seventh) if planets_in_seventh else 'None'}
3rd from Arudha Lagna: {third_from_arudha}
Planets in 3rd from AL: {', '.join(planets_in_third) if planets_in_third else 'None'}
Current Mahadasha: {current_mahadasha}

Write the following sections using markdown headers:

## What is Arudha Lagna?
Explain Arudha Lagna in 3-4 clear sentences. What is it? Why is it called the "Maya Lagna" — the lagna of illusion and public image? How is it different from the Ascendant? Make this clear for a modern reader.

## Your Arudha Lagna is {arudha_sign}
Explain what {arudha_sign} Arudha Lagna means for this person's public image, social persona, and how the world perceives them.
Discuss the sign's element, modality, ruling planet, and what kind of "image" this creates in society.
How do strangers and acquaintances tend to see this person before they know them deeply?

## How Your Image Was Formed: {lagna_lord} in {lord_sign}
The {lagna_lord} as your Lagna lord placed in {lord_sign} (House {lord_house}) is what generates your Arudha Lagna of {arudha_sign}.
Explain what this means — how {lagna_lord}'s energy in {lord_sign} manifests as the {arudha_sign} image.
{"Note that {lagna_lord} is retrograde — this often creates a gap between who you truly are (Ascendant) and how you appear to the world (Arudha). Explore this theme." if lord_retrograde else ""}

## Arudha Lagna vs Your True Self
Your Ascendant is {asc_sign} — your true inner nature.
Your Arudha Lagna is {arudha_sign} — your outer projected image.
Explore the relationship between these two signs. Where do they align? Where is there tension or a gap? 
This is the core of the Arudha reading: the space between who you are and how you appear.

## Planets Shaping Your Arudha
{f"These planets occupy your Arudha Lagna sign ({arudha_sign}): {', '.join(planets_in_arudha)}. Each planet here becomes part of how the world sees you. Explain each planet's contribution to your public image and how people read you." if planets_in_arudha else f"No planets sit directly in your Arudha Lagna ({arudha_sign}), placing all emphasis on your Arudha lord {arudha_lord} to carry the image. Explain what this means — the purity and focus of a single planetary archetype defining your social self."}
{f"The 7th from your Arudha ({seventh_from_arudha}) has: {', '.join(planets_in_seventh)}. The 7th from AL shows what people initially expect from you in relationships and partnerships. Interpret this." if planets_in_seventh else ""}
{f"The 3rd from your Arudha ({third_from_arudha}) has: {', '.join(planets_in_third)}. Planets in the 3rd from AL influence your social courage, how you assert your image, and how the media or community perceives you." if planets_in_third else ""}

## Career, Status and Social Reputation
Arudha Lagna is one of the strongest indicators of career reputation and public standing.
Based on {arudha_sign} AL and {arudha_lord} in {arudha_lord_sign} (House {arudha_lord_house}), what career domains and social roles are most aligned with this person's visible energy?
What will they be known for? What reputation will they build?

## The {current_mahadasha} Mahadasha and Your Public Image
How does the current {current_mahadasha} Mahadasha interact with your {arudha_sign} Arudha Lagna?
Is this a period of rising public image, change, or consolidation?
What specific shifts in reputation, visibility, or social standing can be expected during this period?

## Strengthening Your Arudha: Practical Guidance
Give 4-5 specific, practical suggestions to strengthen and harmonise the Arudha Lagna.
Include: which planet to strengthen through remedies, colours and materials to wear, lifestyle alignment with {arudha_sign} energy, mantras if relevant, and any behavioural shifts to align the inner self with the outer image authentically.

Write a focused, insightful reading of 500-600 words total across all sections. Be specific and personal — not lengthy and generic.
Use pure Markdown — no JSON.
At the very end, on a new line:
KEYWORDS: word1, word2, word3
"""

        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.45,
                max_output_tokens=4096,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        full_text = response.text or ""

        keywords = ["Arudha Lagna", arudha_sign, lagna_lord, asc_sign]
        if "KEYWORDS:" in full_text:
            parts = full_text.rsplit("KEYWORDS:", 1)
            full_text = parts[0].rstrip()
            kw_raw = parts[1].strip()
            keywords = [k.strip() for k in kw_raw.split(",") if k.strip()][:6]

        return {
            "success": True,
            "ascendant": asc_sign,
            "lagna_lord": lagna_lord,
            "lagna_lord_sign": lord_sign,
            "lagna_lord_house": lord_house,
            "lagna_lord_nakshatra": lord_nakshatra,
            "lagna_lord_degree": lord_degree,
            "lagna_lord_retrograde": lord_retrograde,
            "arudha_sign": arudha_sign,
            "arudha_house_from_asc": arudha_house_from_asc,
            "arudha_lord": arudha_lord,
            "arudha_lord_house": arudha_lord_house,
            "arudha_lord_sign": arudha_lord_sign,
            "planets_in_arudha": planets_in_arudha,
            "seventh_from_arudha": seventh_from_arudha,
            "planets_in_seventh": planets_in_seventh,
            "reading": full_text,
            "keywords": keywords
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
