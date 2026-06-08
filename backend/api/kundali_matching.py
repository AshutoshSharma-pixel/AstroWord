from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.chart import generate_chart, ChartRequest

router = APIRouter()

# ── 27 NAKSHATRA MAPPINGS ──────────────────────────────────────────────────

NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
]

NAKSHATRA_VARNA = {
    "Ashwini": "Vaishya", "Bharani": "Shudra", "Krittika": "Brahmin",
    "Rohini": "Shudra", "Mrigashira": "Vaishya", "Ardra": "Shudra",
    "Punarvasu": "Vaishya", "Pushya": "Kshatriya", "Ashlesha": "Brahmin",
    "Magha": "Kshatriya", "Purva Phalguni": "Brahmin", "Uttara Phalguni": "Kshatriya",
    "Hasta": "Vaishya", "Chitra": "Shudra", "Swati": "Shudra",
    "Vishakha": "Shudra", "Anuradha": "Shudra", "Jyeshtha": "Shudra",
    "Moola": "Vaishya", "Purva Ashadha": "Brahmin", "Uttara Ashadha": "Kshatriya",
    "Shravana": "Shudra", "Dhanishta": "Shudra", "Shatabhisha": "Shudra",
    "Purva Bhadrapada": "Brahmin", "Uttara Bhadrapada": "Kshatriya", "Revati": "Vaishya"
}

NAKSHATRA_VASYA = {
    "Ashwini": "Chatushpada", "Bharani": "Chatushpada", "Krittika": "Chatushpada",
    "Rohini": "Chatushpada", "Mrigashira": "Chatushpada", "Ardra": "Human",
    "Punarvasu": "Human", "Pushya": "Jalachara", "Ashlesha": "Jalachara",
    "Magha": "Vanachara", "Purva Phalguni": "Vanachara", "Uttara Phalguni": "Vanachara",
    "Hasta": "Human", "Chitra": "Human", "Swati": "Human",
    "Vishakha": "Human", "Anuradha": "Keeta", "Jyeshtha": "Keeta",
    "Moola": "Human", "Purva Ashadha": "Chatushpada", "Uttara Ashadha": "Chatushpada",
    "Shravana": "Chatushpada", "Dhanishta": "Jalachara", "Shatabhisha": "Human",
    "Purva Bhadrapada": "Human", "Uttara Bhadrapada": "Jalachara", "Revati": "Jalachara"
}

NAKSHATRA_YONI = {
    "Ashwini": "Horse", "Bharani": "Elephant", "Krittika": "Sheep",
    "Rohini": "Serpent", "Mrigashira": "Serpent", "Ardra": "Dog",
    "Punarvasu": "Cat", "Pushya": "Sheep", "Ashlesha": "Cat",
    "Magha": "Rat", "Purva Phalguni": "Rat", "Uttara Phalguni": "Cow",
    "Hasta": "Buffalo", "Chitra": "Tiger", "Swati": "Buffalo",
    "Vishakha": "Tiger", "Anuradha": "Deer", "Jyeshtha": "Deer",
    "Moola": "Dog", "Purva Ashadha": "Monkey", "Uttara Ashadha": "Mongoose",
    "Shravana": "Monkey", "Dhanishta": "Lion", "Shatabhisha": "Horse",
    "Purva Bhadrapada": "Lion", "Uttara Bhadrapada": "Cow", "Revati": "Elephant"
}

NAKSHATRA_GANA = {
    "Ashwini": "Deva", "Bharani": "Manushya", "Krittika": "Rakshasa",
    "Rohini": "Manushya", "Mrigashira": "Deva", "Ardra": "Manushya",
    "Punarvasu": "Deva", "Pushya": "Deva", "Ashlesha": "Rakshasa",
    "Magha": "Rakshasa", "Purva Phalguni": "Manushya", "Uttara Phalguni": "Manushya",
    "Hasta": "Deva", "Chitra": "Rakshasa", "Swati": "Deva",
    "Vishakha": "Rakshasa", "Anuradha": "Deva", "Jyeshtha": "Rakshasa",
    "Moola": "Rakshasa", "Purva Ashadha": "Manushya", "Uttara Ashadha": "Manushya",
    "Shravana": "Deva", "Dhanishta": "Rakshasa", "Shatabhisha": "Rakshasa",
    "Purva Bhadrapada": "Manushya", "Uttara Bhadrapada": "Manushya", "Revati": "Deva"
}

NAKSHATRA_NADI = {
    "Ashwini": "Aadi", "Bharani": "Madhya", "Krittika": "Antya",
    "Rohini": "Antya", "Mrigashira": "Madhya", "Ardra": "Aadi",
    "Punarvasu": "Aadi", "Pushya": "Madhya", "Ashlesha": "Antya",
    "Magha": "Antya", "Purva Phalguni": "Madhya", "Uttara Phalguni": "Aadi",
    "Hasta": "Aadi", "Chitra": "Madhya", "Swati": "Antya",
    "Vishakha": "Antya", "Anuradha": "Madhya", "Jyeshtha": "Aadi",
    "Moola": "Aadi", "Purva Ashadha": "Madhya", "Uttara Ashadha": "Antya",
    "Shravana": "Antya", "Dhanishta": "Madhya", "Shatabhisha": "Aadi",
    "Purva Bhadrapada": "Aadi", "Uttara Bhadrapada": "Madhya", "Revati": "Antya"
}

# ── SHARED VEDIC ASTROLOGY CONSTANTS ───────────────────────────────────────

SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
         "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

SIGN_LORDS = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
    "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
    "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
    "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
}

VARNA_HIERARCHY = {"Brahmin": 4, "Kshatriya": 3, "Vaishya": 2, "Shudra": 1}

VASYA_MATRIX = {
    "Chatushpada": {
        "Chatushpada": 2.0, "Human": 1.0, "Jalachara": 1.0, "Vanachara": 1.5, "Keeta": 1.0
    },
    "Human": {
        "Chatushpada": 1.0, "Human": 2.0, "Jalachara": 1.5, "Vanachara": 0.0, "Keeta": 1.0
    },
    "Jalachara": {
        "Chatushpada": 1.0, "Human": 1.5, "Jalachara": 2.0, "Vanachara": 1.0, "Keeta": 1.0
    },
    "Vanachara": {
        "Chatushpada": 0.0, "Human": 0.0, "Jalachara": 0.0, "Vanachara": 2.0, "Keeta": 0.0
    },
    "Keeta": {
        "Chatushpada": 1.0, "Human": 1.0, "Jalachara": 1.0, "Vanachara": 0.0, "Keeta": 2.0
    }
}

YONI_ANIMALS = [
    "Horse", "Elephant", "Sheep", "Serpent", "Dog", "Cat", "Rat", 
    "Cow", "Buffalo", "Tiger", "Deer", "Monkey", "Mongoose", "Lion"
]

YONI_MATRIX = {
    "Horse":    [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 3, 3, 2, 1],
    "Elephant": [2, 4, 3, 3, 2, 2, 3, 2, 3, 1, 2, 3, 2, 0],
    "Sheep":    [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1],
    "Serpent":  [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2],
    "Dog":      [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1],
    "Cat":      [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1],
    "Rat":      [2, 3, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2],
    "Cow":      [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1],
    "Buffalo":  [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1],
    "Tiger":    [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1],
    "Deer":     [3, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1],
    "Monkey":   [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2],
    "Mongoose": [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2],
    "Lion":     [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4]
}

PLANET_RELATIONS = {
    "Sun": {
        "Sun": "Friend", "Moon": "Friend", "Mars": "Friend", "Mercury": "Neutral", "Jupiter": "Friend", "Venus": "Enemy", "Saturn": "Enemy"
    },
    "Moon": {
        "Sun": "Friend", "Moon": "Friend", "Mars": "Neutral", "Mercury": "Friend", "Jupiter": "Neutral", "Venus": "Neutral", "Saturn": "Neutral"
    },
    "Mars": {
        "Sun": "Friend", "Moon": "Friend", "Mars": "Friend", "Mercury": "Enemy", "Jupiter": "Friend", "Venus": "Neutral", "Saturn": "Neutral"
    },
    "Mercury": {
        "Sun": "Friend", "Moon": "Enemy", "Mars": "Neutral", "Mercury": "Friend", "Jupiter": "Neutral", "Venus": "Friend", "Saturn": "Neutral"
    },
    "Jupiter": {
        "Sun": "Friend", "Moon": "Friend", "Mars": "Friend", "Mercury": "Enemy", "Jupiter": "Friend", "Venus": "Enemy", "Saturn": "Neutral"
    },
    "Venus": {
        "Sun": "Enemy", "Moon": "Enemy", "Mars": "Neutral", "Mercury": "Friend", "Jupiter": "Neutral", "Venus": "Friend", "Saturn": "Friend"
    },
    "Saturn": {
        "Sun": "Enemy", "Moon": "Enemy", "Mars": "Enemy", "Mercury": "Friend", "Jupiter": "Neutral", "Venus": "Friend", "Saturn": "Friend"
    }
}

GANA_MATRIX = {
    "Deva":     {"Deva": 6.0, "Manushya": 3.0, "Rakshasa": 1.0},
    "Manushya": {"Deva": 5.0, "Manushya": 6.0, "Rakshasa": 3.0},
    "Rakshasa": {"Deva": 0.0, "Manushya": 0.0, "Rakshasa": 6.0}
}

# ── REQUEST MODELS ─────────────────────────────────────────────────────────

class BirthDetails(BaseModel):
    name: str | None = None
    dob: str  # YYYY-MM-DD
    tob: str  # HH:MM
    pob: str  # Place
    lat: float | None = None
    lon: float | None = None
    timezone: str | None = None

class KundaliMatchingRequest(BaseModel):
    boy: BirthDetails
    girl: BirthDetails

# ── INTERNAL HELPER FUNCTIONS ──────────────────────────────────────────────

def get_vasya_group(rashi: str, degree: float) -> str:
    """Return Rashi Vasya group taking half-sign boundaries into account."""
    if rashi in ["Aries", "Taurus"]:
        return "Chatushpada"
    elif rashi in ["Gemini", "Virgo", "Libra", "Aquarius"]:
        return "Human"
    elif rashi in ["Cancer", "Pisces"]:
        return "Jalachara"
    elif rashi == "Leo":
        return "Vanachara"
    elif rashi == "Scorpio":
        return "Keeta"
    elif rashi == "Sagittarius":
        deg_in_sign = degree % 30
        if deg_in_sign < 15.0:
            return "Human"
        else:
            return "Chatushpada"
    elif rashi == "Capricorn":
        deg_in_sign = degree % 30
        if deg_in_sign < 15.0:
            return "Chatushpada"
        else:
            return "Jalachara"
    return "Human"

def compute_jaimini_karakas(planets: dict) -> dict:
    """Computes Jaimini Karakas by sorting planets by degree % 30 descending."""
    eligible = {
        k: v for k, v in planets.items()
        if k not in ["Rahu", "Ketu"]
    }
    if len(eligible) < 7:
        return {}

    sorted_planets = sorted(
        eligible.items(),
        key=lambda x: round(x[1]["d1"]["degree"] % 30, 4),
        reverse=True
    )
    
    karakas_order = ["Atmakaraka", "Amatyakaraka", "Bhratrukaraka", "Matrukaraka", "Putrakaraka", "Jnatikaraka", "Darakaraka"]
    result = {}
    for idx, karaka_name in enumerate(karakas_order):
        if idx < len(sorted_planets):
            p_name, p_val = sorted_planets[idx]
            result[karaka_name.lower()] = {
                "planet": p_name,
                "degree": round(p_val["d1"]["degree"] % 30, 2)
            }
    return result

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
    n = count_signs(house_sign, lord_sign)
    arudha_num = (sign_number(lord_sign) + n - 1 - 1) % 12 + 1
    arudha_sign = sign_from_number(arudha_num)

    house_num = sign_number(house_sign)
    seventh_from_house_num = (house_num + 6 - 1) % 12 + 1

    if arudha_num == house_num or arudha_num == seventh_from_house_num:
        arudha_num = (arudha_num + 10 - 1) % 12 + 1
        arudha_sign = sign_from_number(arudha_num)

    return arudha_sign

def compute_upapada_lagna_logic(planets: dict, ascendant: dict) -> dict:
    """Computes Upapada Lagna and related variables without AI interpretation."""
    asc_sign = ascendant.get("sign", "")
    if not asc_sign or asc_sign not in SIGNS:
        return {}

    asc_num = sign_number(asc_sign)
    twelfth_house_num = (asc_num + 11 - 1) % 12 + 1
    twelfth_house_sign = sign_from_number(twelfth_house_num)
    twelfth_lord = SIGN_LORDS[twelfth_house_sign]

    lord_data = planets.get(twelfth_lord, {}).get("d1", {})
    if not lord_data:
        return {}
    lord_sign = lord_data.get("sign", "")
    if not lord_sign or lord_sign not in SIGNS:
        return {}

    upapada_sign = calculate_arudha(twelfth_house_sign, lord_sign)
    upapada_num = sign_number(upapada_sign)
    upapada_lord = SIGN_LORDS[upapada_sign]

    upapada_lord_data = planets.get(upapada_lord, {}).get("d1", {})
    upapada_lord_sign = upapada_lord_data.get("sign", "Unknown")
    upapada_lord_house = upapada_lord_data.get("house", None)
    if upapada_lord_house is None and upapada_lord_sign in SIGNS:
        upapada_lord_house = ((sign_number(upapada_lord_sign) - asc_num) % 12) + 1

    planets_in_upapada = []
    for planet_name, planet_info in planets.items():
        d1_data = planet_info.get("d1", {})
        if d1_data.get("sign") == upapada_sign:
            planets_in_upapada.append(planet_name)

    second_from_upapada_num = (upapada_num + 1 - 1) % 12 + 1
    second_from_upapada = sign_from_number(second_from_upapada_num)
    planets_in_second = []
    for planet_name, planet_info in planets.items():
        d1_data = planet_info.get("d1", {})
        if d1_data.get("sign") == second_from_upapada:
            planets_in_second.append(planet_name)

    return {
        "upapada_lagna": upapada_sign,
        "upapada_lord": upapada_lord,
        "upapada_lord_placement": f"{upapada_lord} in {upapada_lord_sign} (House {upapada_lord_house})",
        "planets_in_upapada": planets_in_upapada,
        "second_from_upapada": second_from_upapada,
        "planets_in_second": planets_in_second
    }

def check_mangal_dosha(planets: dict, ascendant: dict) -> tuple[bool, list[str]]:
    """Determine if Manglik (Mars in houses 1, 2, 4, 7, 8, 12) and check cancellations."""
    mars_data = planets.get("Mars", {}).get("d1", {})
    if not mars_data:
        return False, []

    mars_sign = mars_data.get("sign", "")
    mars_house = mars_data.get("house", None)
    mars_retrograde = mars_data.get("retrograde", False)

    asc_sign = ascendant.get("sign", "Aries")
    if mars_house is None and asc_sign in SIGNS and mars_sign in SIGNS:
        asc_index = SIGNS.index(asc_sign)
        mars_index = SIGNS.index(mars_sign)
        mars_house = ((mars_index - asc_index) % 12) + 1

    mangal_houses = [1, 2, 4, 7, 8, 12]
    is_manglik = mars_house in mangal_houses

    cancellations = []
    if is_manglik:
        if mars_sign in ["Aries", "Scorpio"]:
            cancellations.append("Mars in own sign (Aries/Scorpio)")
        if mars_sign == "Capricorn":
            cancellations.append("Mars exalted in Capricorn")
        if mars_retrograde:
            cancellations.append("Mars retrograde")

        # Check Jupiter aspect/conjunction
        jupiter_data = planets.get("Jupiter", {}).get("d1", {})
        jupiter_sign = jupiter_data.get("sign", "")
        if jupiter_sign and asc_sign in SIGNS and jupiter_sign in SIGNS and mars_sign in SIGNS:
            jupiter_house = ((SIGNS.index(jupiter_sign) - SIGNS.index(asc_sign)) % 12) + 1
            diff = abs(jupiter_house - mars_house)
            if diff in [0, 4, 8, 6]:
                cancellations.append("Jupiter aspects/conjuncts Mars")

    return is_manglik, cancellations

def calculate_bhakoot_score(boy_rashi: str, girl_rashi: str) -> float:
    """Score Bhakoot: 0 if 6-8, 9-5, or 12-2, else 7."""
    try:
        boy_idx = SIGNS.index(boy_rashi)
        girl_idx = SIGNS.index(girl_rashi)
    except ValueError:
        return 7.0

    d_bg = (girl_idx - boy_idx) % 12 + 1
    d_gb = (boy_idx - girl_idx) % 12 + 1
    
    pair = sorted([d_bg, d_gb])
    if pair == [2, 12] or pair == [5, 9] or pair == [6, 8]:
        return 0.0
    return 7.0

# ── POST ENDPOINT ──────────────────────────────────────────────────────────

@router.post("/kundali-matching")
async def kundali_matching(data: KundaliMatchingRequest):
    try:
        # 1. Compute Chart for Boy
        boy_req = ChartRequest(
            name=data.boy.name,
            dob=data.boy.dob,
            tob=data.boy.tob,
            pob=data.boy.pob,
            lat=data.boy.lat,
            lon=data.boy.lon,
            timezone=data.boy.timezone
        )
        boy_chart_res = await generate_chart(boy_req)
        if not boy_chart_res or not boy_chart_res.get("success"):
            raise HTTPException(status_code=400, detail="Failed to calculate birth chart for the boy.")
        boy_chart_data = boy_chart_res["data"]

        # 2. Compute Chart for Girl
        girl_req = ChartRequest(
            name=data.girl.name,
            dob=data.girl.dob,
            tob=data.girl.tob,
            pob=data.girl.pob,
            lat=data.girl.lat,
            lon=data.girl.lon,
            timezone=data.girl.timezone
        )
        girl_chart_res = await generate_chart(girl_req)
        if not girl_chart_res or not girl_chart_res.get("success"):
            raise HTTPException(status_code=400, detail="Failed to calculate birth chart for the girl.")
        girl_chart_data = girl_chart_res["data"]

        # 3. Extract Moon Parameters
        boy_moon = boy_chart_data.get("planets", {}).get("Moon", {}).get("d1", {})
        girl_moon = girl_chart_data.get("planets", {}).get("Moon", {}).get("d1", {})

        boy_nak = boy_moon.get("nakshatra")
        boy_rashi = boy_moon.get("sign")
        boy_moon_deg = boy_moon.get("degree", 0.0)

        girl_nak = girl_moon.get("nakshatra")
        girl_rashi = girl_moon.get("sign")
        girl_moon_deg = girl_moon.get("degree", 0.0)

        if not boy_nak or not boy_rashi or not girl_nak or not girl_rashi:
            raise HTTPException(status_code=400, detail="Missing Moon sign or Nakshatra parameters for calculations.")

        # 4. Compute Ashtakoota 36-Point Guna Milan
        
        # Varna (max 1) - Based on Moon Rashi (Sign) Varna
        RASHI_VARNA = {
            "Cancer": "Brahmin", "Scorpio": "Brahmin", "Pisces": "Brahmin",
            "Aries": "Kshatriya", "Leo": "Kshatriya", "Sagittarius": "Kshatriya",
            "Taurus": "Vaishya", "Virgo": "Vaishya", "Capricorn": "Vaishya",
            "Gemini": "Shudra", "Libra": "Shudra", "Aquarius": "Shudra"
        }
        boy_varna = RASHI_VARNA.get(boy_rashi, "Shudra")
        girl_varna = RASHI_VARNA.get(girl_rashi, "Shudra")
        boy_varna_val = VARNA_HIERARCHY.get(boy_varna, 1)
        girl_varna_val = VARNA_HIERARCHY.get(girl_varna, 1)
        varna_obtained = 1.0 if boy_varna_val >= girl_varna_val else 0.0

        # Vasya (max 2)
        boy_vasya = get_vasya_group(boy_rashi, boy_moon_deg)
        girl_vasya = get_vasya_group(girl_rashi, girl_moon_deg)
        vasya_obtained = VASYA_MATRIX.get(girl_vasya, {}).get(boy_vasya, 0.0)

        # Tara (max 3)
        try:
            boy_nak_idx = NAKSHATRAS.index(boy_nak)
            girl_nak_idx = NAKSHATRAS.index(girl_nak)
        except ValueError:
            raise HTTPException(status_code=400, detail="Unknown Nakshatra name in chart data.")

        cnt_boy_to_girl = (girl_nak_idx - boy_nak_idx) % 27 + 1
        cnt_girl_to_boy = (boy_nak_idx - girl_nak_idx) % 27 + 1
        rem_bg = cnt_boy_to_girl % 9
        rem_gb = cnt_girl_to_boy % 9

        auspicious = {2, 4, 6, 8, 0}
        boy_to_girl_ok = rem_bg in auspicious
        girl_to_boy_ok = rem_gb in auspicious

        if boy_to_girl_ok and girl_to_boy_ok:
            tara_obtained = 3.0
        elif boy_to_girl_ok or girl_to_boy_ok:
            tara_obtained = 1.5
        else:
            tara_obtained = 0.0

        tara_names = {1: "Janma", 2: "Sampat", 3: "Vipat", 4: "Kshema", 5: "Pratyari", 6: "Sadhaka", 7: "Vadha", 8: "Mitra", 0: "Ati-Mitra"}
        boy_tara_name = tara_names.get(rem_bg, "Janma")
        girl_tara_name = tara_names.get(rem_gb, "Janma")

        # Yoni (max 4)
        boy_yoni = NAKSHATRA_YONI.get(boy_nak, "Horse")
        girl_yoni = NAKSHATRA_YONI.get(girl_nak, "Horse")
        boy_yoni_idx = YONI_ANIMALS.index(boy_yoni) if boy_yoni in YONI_ANIMALS else 0
        yoni_list = YONI_MATRIX.get(girl_yoni, YONI_MATRIX["Horse"])
        yoni_obtained = float(yoni_list[boy_yoni_idx])

        # Graha Maitri (max 5)
        boy_lord = SIGN_LORDS.get(boy_rashi, "Mercury")
        girl_lord = SIGN_LORDS.get(girl_rashi, "Mercury")
        if boy_lord == girl_lord:
            maitri_obtained = 5.0
        else:
            rel1 = PLANET_RELATIONS.get(boy_lord, {}).get(girl_lord, "Neutral")
            rel2 = PLANET_RELATIONS.get(girl_lord, {}).get(boy_lord, "Neutral")
            if rel1 == "Friend" and rel2 == "Friend":
                maitri_obtained = 5.0
            elif (rel1 == "Friend" and rel2 == "Neutral") or (rel1 == "Neutral" and rel2 == "Friend"):
                maitri_obtained = 4.0
            elif rel1 == "Neutral" and rel2 == "Neutral":
                maitri_obtained = 3.0
            elif (rel1 == "Friend" and rel2 == "Enemy") or (rel1 == "Enemy" and rel2 == "Friend"):
                maitri_obtained = 1.0
            elif (rel1 == "Neutral" and rel2 == "Enemy") or (rel1 == "Enemy" and rel2 == "Neutral"):
                maitri_obtained = 0.5
            else:
                maitri_obtained = 0.0

        # Gana (max 6)
        boy_gana = NAKSHATRA_GANA.get(boy_nak, "Manushya")
        girl_gana = NAKSHATRA_GANA.get(girl_nak, "Manushya")
        gana_obtained = GANA_MATRIX.get(girl_gana, {}).get(boy_gana, 0.0)

        # Bhakoot (max 7)
        bhakoot_obtained = calculate_bhakoot_score(boy_rashi, girl_rashi)

        # Nadi (max 8)
        boy_nadi = NAKSHATRA_NADI.get(boy_nak, "Aadi")
        girl_nadi = NAKSHATRA_NADI.get(girl_nak, "Aadi")
        nadi_obtained = 8.0 if boy_nadi != girl_nadi else 0.0

        # Total points out of 36
        total_score = (
            varna_obtained + vasya_obtained + tara_obtained + yoni_obtained +
            maitri_obtained + gana_obtained + bhakoot_obtained + nadi_obtained
        )

        breakdown = [
            {
                "name": "Varna",
                "boy_value": boy_varna,
                "girl_value": girl_varna,
                "max_points": 1.0,
                "obtained_points": varna_obtained,
                "area": "Spiritual compatibility & work style"
            },
            {
                "name": "Vasya",
                "boy_value": boy_vasya,
                "girl_value": girl_vasya,
                "max_points": 2.0,
                "obtained_points": vasya_obtained,
                "area": "Mutual attraction & control dynamics"
            },
            {
                "name": "Tara",
                "boy_value": f"{boy_tara_name} (Remainder: {rem_bg})",
                "girl_value": f"{girl_tara_name} (Remainder: {rem_gb})",
                "max_points": 3.0,
                "obtained_points": tara_obtained,
                "area": "Health, destiny & longevity"
            },
            {
                "name": "Yoni",
                "boy_value": boy_yoni,
                "girl_value": girl_yoni,
                "max_points": 4.0,
                "obtained_points": yoni_obtained,
                "area": "Physical/Sexual compatibility & temperament"
            },
            {
                "name": "Maitri",
                "boy_value": f"{boy_lord} (Rashi: {boy_rashi})",
                "girl_value": f"{girl_lord} (Rashi: {girl_rashi})",
                "max_points": 5.0,
                "obtained_points": maitri_obtained,
                "area": "Intellectual compatibility & friendship"
            },
            {
                "name": "Gana",
                "boy_value": boy_gana,
                "girl_value": girl_gana,
                "max_points": 6.0,
                "obtained_points": gana_obtained,
                "area": "Temperament & behavior"
            },
            {
                "name": "Bhakoot",
                "boy_value": boy_rashi,
                "girl_value": girl_rashi,
                "max_points": 7.0,
                "obtained_points": bhakoot_obtained,
                "area": "Emotional connection & family prosperity"
            },
            {
                "name": "Nadi",
                "boy_value": boy_nadi,
                "girl_value": girl_nadi,
                "max_points": 8.0,
                "obtained_points": nadi_obtained,
                "area": "Genetic compatibility, health & progeny"
            }
        ]

        # 5. Compute Mangal Dosha for both
        is_boy_manglik, boy_cancellations = check_mangal_dosha(boy_chart_data.get("planets", {}), boy_chart_data.get("ascendant", {}))
        is_girl_manglik, girl_cancellations = check_mangal_dosha(girl_chart_data.get("planets", {}), girl_chart_data.get("ascendant", {}))

        is_mangal_boy_cancelled = len(boy_cancellations) > 0 if is_boy_manglik else False
        is_mangal_girl_cancelled = len(girl_cancellations) > 0 if is_girl_manglik else False

        mangal_dosha_cancelled = False
        if is_boy_manglik or is_girl_manglik:
            if is_boy_manglik and is_girl_manglik:
                mangal_dosha_cancelled = True
            elif is_boy_manglik and not is_girl_manglik and is_mangal_boy_cancelled:
                mangal_dosha_cancelled = True
            elif is_girl_manglik and not is_boy_manglik and is_mangal_girl_cancelled:
                mangal_dosha_cancelled = True

        # 6. Compute Jaimini Karakas for both
        boy_karakas = compute_jaimini_karakas(boy_chart_data.get("planets", {}))
        girl_karakas = compute_jaimini_karakas(girl_chart_data.get("planets", {}))

        # 7. Compute Upapada Lagna for both
        boy_upapada = compute_upapada_lagna_logic(boy_chart_data.get("planets", {}), boy_chart_data.get("ascendant", {}))
        girl_upapada = compute_upapada_lagna_logic(girl_chart_data.get("planets", {}), girl_chart_data.get("ascendant", {}))

        return {
            "success": True,
            "total_score": round(total_score, 1),
            "ashtakoota": breakdown,
            "mangal_dosha_boy": is_boy_manglik,
            "mangal_dosha_girl": is_girl_manglik,
            "mangal_dosha_cancelled": mangal_dosha_cancelled,
            "boy_mangal_details": {
                "is_manglik": is_boy_manglik,
                "cancellations": boy_cancellations
            },
            "girl_mangal_details": {
                "is_manglik": is_girl_manglik,
                "cancellations": girl_cancellations
            },
            "boy_jaimini_karakas": boy_karakas,
            "girl_jaimini_karakas": girl_karakas,
            "boy_upapada_lagna": boy_upapada,
            "girl_upapada_lagna": girl_upapada,
            "boy_chart": boy_chart_data,
            "girl_chart": girl_chart_data
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
