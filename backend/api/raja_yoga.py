import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class RajaYogaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
         'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']

EXALTATION = {'Sun': 'Aries', 'Moon': 'Taurus', 'Mars': 'Capricorn',
               'Mercury': 'Virgo', 'Jupiter': 'Cancer', 'Venus': 'Pisces', 'Saturn': 'Libra'}
OWN_SIGNS = {'Sun': ['Leo'], 'Moon': ['Cancer'], 'Mars': ['Aries', 'Scorpio'],
              'Mercury': ['Gemini', 'Virgo'], 'Jupiter': ['Sagittarius', 'Pisces'],
              'Venus': ['Taurus', 'Libra'], 'Saturn': ['Capricorn', 'Aquarius'],
              'Rahu': [], 'Ketu': []}
DEBILITATION = {'Sun': 'Libra', 'Moon': 'Scorpio', 'Mars': 'Cancer',
                'Mercury': 'Pisces', 'Jupiter': 'Capricorn', 'Venus': 'Virgo', 'Saturn': 'Aries'}

# Yogakaraka planets by ascendant
YOGAKARAKA = {
    'Aries': 'Saturn',      # Saturn rules 10th and 11th — no true yogakaraka
    'Taurus': 'Saturn',     # Saturn rules 9th and 10th
    'Gemini': None,
    'Cancer': 'Mars',       # Mars rules 5th and 10th
    'Leo': 'Mars',          # Mars rules 4th and 9th
    'Virgo': None,
    'Libra': 'Saturn',      # Saturn rules 4th and 5th
    'Scorpio': None,
    'Sagittarius': None,
    'Capricorn': 'Venus',   # Venus rules 5th and 10th
    'Aquarius': 'Venus',    # Venus rules 4th and 9th
    'Pisces': None,
}

@router.post("/raja-yoga")
async def calculate_raja_yoga(data: RajaYogaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        asc_sign = ascendant.get("sign", "Aries")
        
        if asc_sign not in SIGNS:
            asc_sign = "Aries"
        asc_idx = SIGNS.index(asc_sign)

        def get_house(planet_sign):
            if planet_sign not in SIGNS:
                return None
            return (SIGNS.index(planet_sign) - asc_idx) % 12 + 1

        def get_sign(planet_name):
            return planets.get(planet_name, {}).get("d1", {}).get("sign", "")

        def get_degree(planet_name):
            return planets.get(planet_name, {}).get("d1", {}).get("degree", 0) % 30

        def is_combust(planet_name):
            sun_deg = planets.get("Sun", {}).get("d1", {}).get("degree", 0)
            p_deg = planets.get(planet_name, {}).get("d1", {}).get("degree", 0)
            return abs(sun_deg - p_deg) < 8

        def planet_strength(planet_name):
            sign = get_sign(planet_name)
            if sign == EXALTATION.get(planet_name):
                return "exalted"
            if sign in OWN_SIGNS.get(planet_name, []):
                return "own sign"
            if sign == DEBILITATION.get(planet_name):
                return "debilitated"
            return "neutral"

        def lords_connected(lord1_name, lord2_name):
            """Check if two planets are conjunct, in mutual aspect, or in exchange"""
            s1 = get_sign(lord1_name)
            s2 = get_sign(lord2_name)
            h1 = get_house(s1)
            h2 = get_house(s2)
            if h1 is None or h2 is None:
                return False
            # Conjunction
            if s1 == s2:
                return True
            # Mutual aspect (7th from each other)
            if abs(h1 - h2) == 6 or abs(h1 - h2) == 0:
                return True
            # Exchange (parivartana)
            if s1 in OWN_SIGNS.get(lord2_name, []) and s2 in OWN_SIGNS.get(lord1_name, []):
                return True
            return False

        # House lords by ascendant
        HOUSE_LORDS = {}
        for i, sign in enumerate(SIGNS):
            house_num = (SIGNS.index(sign) - asc_idx) % 12 + 1
            # assign lords
            lords_map = {
                'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury',
                'Cancer': 'Moon', 'Leo': 'Sun', 'Virgo': 'Mercury',
                'Libra': 'Venus', 'Scorpio': 'Mars', 'Sagittarius': 'Jupiter',
                'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
            }
            HOUSE_LORDS[house_num] = lords_map[sign]

        # Kendra houses: 1, 4, 7, 10
        # Trikona houses: 1, 5, 9
        KENDRA = [1, 4, 7, 10]
        TRIKONA = [1, 5, 9]

        yogas_found = []

        # 1. Classical Kendra-Trikona Raja Yoga
        for kendra_h in [4, 7, 10]:
            for trikona_h in [5, 9]:
                kendra_lord = HOUSE_LORDS.get(kendra_h)
                trikona_lord = HOUSE_LORDS.get(trikona_h)
                if kendra_lord and trikona_lord and kendra_lord != trikona_lord:
                    if lords_connected(kendra_lord, trikona_lord):
                        strength1 = planet_strength(kendra_lord)
                        strength2 = planet_strength(trikona_lord)
                        combust1 = is_combust(kendra_lord)
                        combust2 = is_combust(trikona_lord)
                        if not (combust1 and combust2):
                            effective_strength = "Strong" if "exalted" in [strength1, strength2] or "own sign" in [strength1, strength2] else "Moderate" if "debilitated" not in [strength1, strength2] else "Weak"
                            yogas_found.append({
                                "name": f"Kendra-Trikona Raja Yoga ({kendra_h}th + {trikona_h}th)",
                                "type": "Classical Raja Yoga",
                                "planets": [kendra_lord, trikona_lord],
                                "strength": effective_strength,
                                "description": f"{kendra_lord} (lord of {kendra_h}th house) and {trikona_lord} (lord of {trikona_h}th house) are connected — a classical Raja Yoga indicating success, authority and recognition."
                            })

        # 2. Dharma Karmadhipati Yoga (9th + 10th lord)
        lord9 = HOUSE_LORDS.get(9)
        lord10 = HOUSE_LORDS.get(10)
        if lord9 and lord10 and lord9 != lord10:
            if lords_connected(lord9, lord10):
                strength9 = planet_strength(lord9)
                strength10 = planet_strength(lord10)
                effective = "Strong" if "exalted" in [strength9, strength10] or "own sign" in [strength9, strength10] else "Moderate"
                yogas_found.append({
                    "name": "Dharma Karmadhipati Yoga",
                    "type": "Most Powerful Raja Yoga",
                    "planets": [lord9, lord10],
                    "strength": effective,
                    "description": f"The 9th lord ({lord9}) and 10th lord ({lord10}) are connected — the most powerful career and destiny yoga in Vedic astrology. Dharma (9th) and Karma (10th) align to create extraordinary professional success."
                })

        # 3. Panch Mahapurusha Yogas
        PANCH = {
            'Mars': ('Ruchaka', 'Aries', 'Scorpio', 'Capricorn', 'courage, leadership, military success'),
            'Mercury': ('Bhadra', 'Gemini', 'Virgo', 'Virgo', 'intelligence, communication, business'),
            'Jupiter': ('Hamsa', 'Sagittarius', 'Pisces', 'Cancer', 'wisdom, spirituality, teaching'),
            'Venus': ('Malavya', 'Taurus', 'Libra', 'Pisces', 'beauty, luxury, artistic success'),
            'Saturn': ('Shasha', 'Capricorn', 'Aquarius', 'Libra', 'discipline, authority, long-term success'),
        }
        for planet, (yoga_name, own1, own2, exalt, qualities) in PANCH.items():
            p_sign = get_sign(planet)
            p_house = get_house(p_sign)
            if p_house in KENDRA and p_sign in [own1, own2, exalt]:
                combust = is_combust(planet) if planet != 'Saturn' else False
                if not combust:
                    strength = "Strong" if p_sign == exalt else "Good"
                    yogas_found.append({
                        "name": f"{yoga_name} Yoga ({planet})",
                        "type": "Panch Mahapurusha Yoga",
                        "planets": [planet],
                        "strength": strength,
                        "description": f"{planet} is in {p_sign} in the {p_house}th house — forming {yoga_name} Yoga, one of the five great person yogas. This grants {qualities}."
                    })

        # 4. Gaja Kesari Yoga
        moon_sign = get_sign("Moon")
        jupiter_sign = get_sign("Jupiter")
        moon_house = get_house(moon_sign)
        jupiter_house = get_house(jupiter_sign)
        if moon_house and jupiter_house:
            diff = (jupiter_house - moon_house) % 12
            if diff in [0, 3, 6, 9]:  # Kendra from Moon
                j_strength = planet_strength("Jupiter")
                j_combust = is_combust("Jupiter")
                if not j_combust and j_strength != "debilitated":
                    strength = "Strong" if j_strength in ["exalted", "own sign"] else "Moderate"
                    yogas_found.append({
                        "name": "Gaja Kesari Yoga",
                        "type": "Special Raja Yoga",
                        "planets": ["Jupiter", "Moon"],
                        "strength": strength,
                        "description": f"Jupiter is in the {diff//3 + 1 if diff > 0 else 1}th Kendra from Moon — forming Gaja Kesari Yoga. This grants wisdom, wealth, fame, and a respected social position."
                    })

        # 5. Vipreet Raja Yoga
        dusthana_lords = {
            6: HOUSE_LORDS.get(6),
            8: HOUSE_LORDS.get(8),
            12: HOUSE_LORDS.get(12)
        }
        dusthana_signs = {
            h: SIGNS[(asc_idx + h - 1) % 12]
            for h in [6, 8, 12]
        }
        for h1 in [6, 8, 12]:
            for h2 in [6, 8, 12]:
                if h1 >= h2:
                    continue
                lord1 = dusthana_lords[h1]
                lord2 = dusthana_lords[h2]
                if lord1 and lord2 and lord1 != lord2:
                    s1 = get_sign(lord1)
                    s2 = get_sign(lord2)
                    if s1 == dusthana_signs[h2] or s2 == dusthana_signs[h1]:
                        yogas_found.append({
                            "name": f"Vipreet Raja Yoga ({h1}th-{h2}th)",
                            "type": "Special Raja Yoga",
                            "planets": [lord1, lord2],
                            "strength": "Moderate",
                            "description": f"The lords of the {h1}th and {h2}th houses are exchanged — forming Vipreet Raja Yoga. Success emerges from adversity and difficult circumstances become stepping stones."
                        })

        # 6. Neecha Bhanga Raja Yoga
        for planet, debil_sign in DEBILITATION.items():
            p_sign = get_sign(planet)
            if p_sign == debil_sign:
                # Check cancellation conditions
                debil_lord_sign_ruler = {
                    'Sun': 'Venus', 'Moon': 'Mars', 'Mars': 'Moon',
                    'Mercury': 'Jupiter', 'Jupiter': 'Saturn', 'Venus': 'Mercury', 'Saturn': 'Sun'
                }.get(planet)
                if debil_lord_sign_ruler:
                    ruler_sign = get_sign(debil_lord_sign_ruler)
                    ruler_house = get_house(ruler_sign)
                    p_house = get_house(p_sign)
                    if ruler_house in KENDRA or (p_house and ruler_house == p_house):
                        yogas_found.append({
                            "name": f"Neecha Bhanga Raja Yoga ({planet})",
                            "type": "Special Raja Yoga",
                            "planets": [planet],
                            "strength": "Strong",
                            "description": f"{planet} is debilitated in {debil_sign} but its debilitation is cancelled — forming Neecha Bhanga Raja Yoga. Initial struggles transform into extraordinary achievement."
                        })

        # 7. Amala Yoga
        for planet in ["Jupiter", "Venus", "Mercury"]:
            p_sign = get_sign(planet)
            p_house = get_house(p_sign)
            if p_house == 10:
                combust = is_combust(planet)
                if not combust:
                    yogas_found.append({
                        "name": f"Amala Yoga ({planet})",
                        "type": "Special Yoga",
                        "planets": [planet],
                        "strength": "Good",
                        "description": f"{planet} in the 10th house forms Amala Yoga — indicating a spotless reputation, ethical career, and recognition for good deeds."
                    })

        # 8. Yogakaraka
        yogakaraka_planet = YOGAKARAKA.get(asc_sign)
        if yogakaraka_planet:
            yk_sign = get_sign(yogakaraka_planet)
            yk_house = get_house(yk_sign)
            yk_strength = planet_strength(yogakaraka_planet)
            if yk_strength in ["exalted", "own sign"] or yk_house in KENDRA + TRIKONA:
                yogas_found.append({
                    "name": f"Yogakaraka — {yogakaraka_planet}",
                    "type": "Yogakaraka Yoga",
                    "planets": [yogakaraka_planet],
                    "strength": "Strong" if yk_strength in ["exalted", "own sign"] else "Moderate",
                    "description": f"For {asc_sign} ascendant, {yogakaraka_planet} is the Yogakaraka — owning both a Kendra and Trikona house. Placed in {yk_sign} (house {yk_house}), it bestows independent raja yoga results."
                })

        # Sort by strength
        strength_order = {"Strong": 0, "Good": 1, "Moderate": 2, "Weak": 3}
        yogas_found.sort(key=lambda x: strength_order.get(x["strength"], 4))

        # Remove duplicates
        seen = set()
        unique_yogas = []
        for y in yogas_found:
            key = y["name"]
            if key not in seen:
                seen.add(key)
                unique_yogas.append(y)
        yogas_found = unique_yogas

        # Current mahadasha
        current_mahadasha = data.chart_data.get("current_mahadasha", {}).get("lord", "Unknown")

        # Build yoga summary for prompt
        yoga_summary = ""
        for y in yogas_found:
            yoga_summary += f"\n- {y['name']} ({y['strength']}): {y['description']}"

        if not yoga_summary:
            yoga_summary = "No strong Raja Yogas detected — chart shows standard planetary combinations."

        strong_yogas = [y for y in yogas_found if y["strength"] in ["Strong", "Good"]]
        strongest = strong_yogas[0]["name"] if strong_yogas else "None"

        prompt = f"""You are a Vedic astrologer expert in Raja Yogas. Write a personalised 500-word reading in 4 paragraphs using markdown ## headers. Address the person as "you/your". Be specific — cite actual yoga names and planet placements.

Chart:
- Ascendant: {asc_sign}
- Current Mahadasha: {current_mahadasha}
- Raja Yogas detected: {yoga_summary}
- Strongest yoga: {strongest}
- Total yogas found: {len(yogas_found)}

## Your Raja Yogas — What the Stars Say About Your Success
Opening paragraph: Summarise what Raja Yogas mean and what this person specifically has. Name their strongest yoga and what it promises. Be inspiring but accurate.

## The Power of Your {strongest if strongest != 'None' else 'Chart'}
Deep dive into their strongest yoga — which planets form it, which houses they rule, what area of life it governs, and how it will manifest in their career, status and recognition.

## When Will Your Raja Yogas Activate?
Explain Dasha timing — their current {current_mahadasha} Mahadasha and whether it activates any of their yogas. Name specific Antardasha periods within {current_mahadasha} that will be peak periods for success. Be specific with timing.

## Maximising Your Yogic Potential
Practical guidance — what career fields, actions, and life choices will allow these specific yogas to manifest fully. Include one mantra and one planetary remedy specific to their strongest yoga planet.

No generic content. Every sentence must reference their specific yogas and planets."""

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
            "yogas_found": yogas_found,
            "total_yogas": len(yogas_found),
            "strong_yogas": len(strong_yogas),
            "strongest_yoga": strongest,
            "asc_sign": asc_sign,
            "yogakaraka": yogakaraka_planet,
            "reading": reading
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
