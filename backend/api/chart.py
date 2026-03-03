from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import swisseph as swe
from geopy.geocoders import Nominatim
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from timezonefinder import TimezoneFinder

router = APIRouter()
tf = TimezoneFinder()
geolocator = Nominatim(user_agent="astroword_ai")

class ChartRequest(BaseModel):
    name: str | None = None
    dob: str # YYYY-MM-DD
    tob: str # HH:MM (24-hour)c
    pob: str # City, Country
    lat: float | None = None
    lon: float | None = None

# Map swisseph planet constants to names
PLANET_MAP = {
    swe.SUN: "Sun",
    swe.MOON: "Moon",
    swe.MARS: "Mars",
    swe.MERCURY: "Mercury",
    swe.JUPITER: "Jupiter",
    swe.VENUS: "Venus",
    swe.SATURN: "Saturn",
    swe.MEAN_NODE: "Rahu", # We use Mean Node for Rahu
}

ZODIAC_SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

SIGN_LORDS = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
    "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
    "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
    "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
}

EXALTATION = {
    "Sun": "Aries", "Moon": "Taurus", "Mars": "Capricorn",
    "Mercury": "Virgo", "Jupiter": "Cancer", "Venus": "Pisces",
    "Saturn": "Libra", "Rahu": "Gemini", "Ketu": "Sagittarius"
}

DEBILITATION = {
    "Sun": "Libra", "Moon": "Scorpio", "Mars": "Cancer",
    "Mercury": "Pisces", "Jupiter": "Capricorn", "Venus": "Virgo",
    "Saturn": "Aries", "Rahu": "Sagittarius", "Ketu": "Gemini"
}

FRIENDLY_SIGNS = {
    "Sun": ["Aries", "Leo", "Sagittarius", "Scorpio", "Pisces"],
    "Moon": ["Taurus", "Cancer", "Pisces", "Libra"],
    "Mars": ["Aries", "Scorpio", "Capricorn", "Cancer", "Leo"],
    "Mercury": ["Gemini", "Virgo", "Taurus", "Libra"],
    "Jupiter": ["Sagittarius", "Pisces", "Cancer", "Aries", "Scorpio"],
    "Venus": ["Taurus", "Libra", "Pisces", "Capricorn", "Aquarius"],
    "Saturn": ["Capricorn", "Aquarius", "Libra", "Gemini", "Virgo"],
    "Rahu": ["Gemini", "Virgo", "Aquarius"],
    "Ketu": ["Sagittarius", "Pisces", "Scorpio"]
}

DASHA_SEQUENCE = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"]
DASHA_YEARS =    [7, 20, 6, 10, 7, 18, 16, 19, 17]

NAK_LORDS = [
    "Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury",
    "Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury",
    "Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"
]

def calculate_vimshottari_dasha(moon_degree: float, birth_date: datetime):
    nak_span = 360 / 27
    nak_index = int(moon_degree / nak_span)
    fraction_completed = (moon_degree % nak_span) / nak_span
    
    start_lord = NAK_LORDS[nak_index]
    start_index = DASHA_SEQUENCE.index(start_lord)
    years_remaining = DASHA_YEARS[start_index] * (1 - fraction_completed)
    
    dashas = []
    current_date = birth_date
    idx = start_index
    
    end_date = current_date + timedelta(days=years_remaining * 365.25)
    dashas.append({
        "lord": DASHA_SEQUENCE[idx],
        "start": current_date.strftime("%Y-%m-%d"),
        "end": end_date.strftime("%Y-%m-%d"),
        "years": round(years_remaining, 2)
    })
    current_date = end_date
    idx = (idx + 1) % 9
    
    for _ in range(8):
        years = DASHA_YEARS[idx]
        end_date = current_date + timedelta(days=years * 365.25)
        dashas.append({
            "lord": DASHA_SEQUENCE[idx],
            "start": current_date.strftime("%Y-%m-%d"),
            "end": end_date.strftime("%Y-%m-%d"),
            "years": years
        })
        current_date = end_date
        idx = (idx + 1) % 9
    
    today = datetime.now()
    current_maha = None
    for d in dashas:
        if d["start"] <= today.strftime("%Y-%m-%d") <= d["end"]:
            current_maha = d
            break
    
    return dashas, current_maha

def calculate_antardasha(mahadasha_lord: str, maha_start: str, maha_end: str) -> list:
    maha_start_dt = datetime.strptime(maha_start, "%Y-%m-%d")
    maha_end_dt = datetime.strptime(maha_end, "%Y-%m-%d")
    
    maha_index = DASHA_SEQUENCE.index(mahadasha_lord)
    antardashas = []
    current_date = maha_start_dt
    
    for i in range(9):
        antar_index = (maha_index + i) % 9
        antar_lord = DASHA_SEQUENCE[antar_index]
        
        # Antardasha duration = (maha_years * antar_years / 120) years
        maha_years = DASHA_YEARS[maha_index]
        antar_years = DASHA_YEARS[antar_index]
        antar_duration_days = (maha_years * antar_years / 120) * 365.25
        
        end_date = current_date + timedelta(days=antar_duration_days)
        antardashas.append({
            "lord": antar_lord,
            "start": current_date.strftime("%Y-%m-%d"),
            "end": end_date.strftime("%Y-%m-%d")
        })
        current_date = end_date
    
    return antardashas

def get_aspects(planet_name: str, house_number: int) -> list:
    aspects = [((house_number - 1 + 6) % 12) + 1]  # All planets aspect 7th
    
    if planet_name == "Mars":
        aspects.append(((house_number - 1 + 3) % 12) + 1)
        aspects.append(((house_number - 1 + 7) % 12) + 1)
    elif planet_name == "Jupiter":
        aspects.append(((house_number - 1 + 4) % 12) + 1)
        aspects.append(((house_number - 1 + 8) % 12) + 1)
    elif planet_name == "Saturn":
        aspects.append(((house_number - 1 + 2) % 12) + 1)
        aspects.append(((house_number - 1 + 9) % 12) + 1)
    elif planet_name in ["Rahu", "Ketu"]:
        aspects.append(((house_number - 1 + 4) % 12) + 1)
        aspects.append(((house_number - 1 + 8) % 12) + 1)
    
    return sorted(set(aspects))

def get_zodiac_sign(degree: float) -> str:
    sign_index = int(degree / 30)
    return ZODIAC_SIGNS[sign_index]

def calculate_navamsa_degree(d1_degree: float) -> float:
    """Calculates D9 (Navamsa) degree from D1 degree."""
    return (d1_degree * 9) % 360

def calculate_d10_degree(d1_degree: float) -> float:
    """Calculate D10 (Dashamsha) degree from D1 degree."""
    sign_index = int(d1_degree / 30)
    degree_in_sign = d1_degree % 30
    part = int(degree_in_sign / 3)  # 0-9
    
    if sign_index % 2 == 0:  # Odd signs
        d10_sign_index = (sign_index + part) % 12
    else:  # Even signs
        d10_sign_index = (sign_index + 8 + part) % 12
    
    degree_within_part = degree_in_sign % 3
    d10_degree = d10_sign_index * 30 + (degree_within_part / 3) * 30
    return d10_degree % 360

def calculate_d60_degree(d1_degree: float) -> float:
    """
    D60 Shashtiamsha calculation.
    Each sign divided into 60 parts of 0.5 degrees each.
    """
    sign_index = int(d1_degree / 30)
    degree_in_sign = d1_degree % 30
    part = int(degree_in_sign / 0.5)  # 0-59
    
    if sign_index % 2 == 0:  # Odd signs
        d60_sign_index = part % 12
    else:  # Even signs
        d60_sign_index = (part + 6) % 12
    
    degree_within_part = degree_in_sign % 0.5
    d60_degree = d60_sign_index * 30 + (degree_within_part / 0.5) * 30
    return d60_degree % 360

def calculate_divisional(d1_degree: float, division: int) -> float:
    """Generic divisional chart calculator."""
    return (d1_degree * division) % 360

DIVISIONAL_CHARTS = {
    "D4": {"division": 4, "name": "Chaturthamsha", "topic": "Property"},
    "D7": {"division": 7, "name": "Saptamsha", "topic": "Children"},
    "D10": {"division": 10, "name": "Dashamsha", "topic": "Career"},
    "D16": {"division": 16, "name": "Shodashamsha", "topic": "Vehicles"},
    "D20": {"division": 20, "name": "Vimshamsha", "topic": "Spirituality"},
    "D24": {"division": 24, "name": "Chaturvimshamsha", "topic": "Education"},
    "D27": {"division": 27, "name": "Bhamsha", "topic": "Strength"},
    "D30": {"division": 30, "name": "Trimshamsha", "topic": "Challenges"},
    "D60": {"division": 60, "name": "Shashtiamsha", "topic": "Past Life"}
}

def detect_yogas(d1_houses: dict, chart_data: dict, asc_sign: str) -> list:
    yogas = []
    
    def get_planet_house(planet_name):
        for h_num, h_data in d1_houses.items():
            if planet_name in h_data["planets"]:
                return h_num
        return None
    
    # Gajakesari Yoga - Jupiter in kendra from Moon
    moon_house = get_planet_house("Moon")
    jupiter_house = get_planet_house("Jupiter")
    if moon_house and jupiter_house:
        diff = ((jupiter_house - moon_house) % 12) + 1
        if diff in [1, 4, 7, 10]:
            yogas.append("Gajakesari Yoga: Jupiter in kendra from Moon — wisdom, fame, and prosperity")
    
    # Budhaditya Yoga - Sun and Mercury in same house
    sun_house = get_planet_house("Sun")
    mercury_house = get_planet_house("Mercury")
    if sun_house and mercury_house and sun_house == mercury_house:
        yogas.append("Budhaditya Yoga: Sun conjunct Mercury — sharp intellect and communication ability")
    
    # Chandra Mangala Yoga - Moon and Mars conjunct
    mars_house = get_planet_house("Mars")
    if moon_house and mars_house and moon_house == mars_house:
        yogas.append("Chandra Mangala Yoga: Moon conjunct Mars — wealth through bold actions")
    
    # Raj Yoga - lord of kendra conjunct lord of trikona
    kendra_lords = []
    trikona_lords = []
    for h in [1, 4, 7, 10]:
        kendra_lords.append(SIGN_LORDS[d1_houses[h]["sign"]])
    for h in [1, 5, 9]:
        trikona_lords.append(SIGN_LORDS[d1_houses[h]["sign"]])
    
    for kl in kendra_lords:
        for tl in trikona_lords:
            if kl == tl:
                continue
            kl_house = get_planet_house(kl)
            tl_house = get_planet_house(tl)
            if kl_house and tl_house and kl_house == tl_house:
                yogas.append(f"Raj Yoga: {kl} (kendra lord) conjunct {tl} (trikona lord) — power, status, and authority")
    
    # Viparita Raja Yoga - lord of 6, 8, or 12 in 6th, 8th, or 12th house
    dusthana_houses = [6, 8, 12]
    for h in dusthana_houses:
        lord = SIGN_LORDS[d1_houses[h]["sign"]]
        lord_house = get_planet_house(lord)
        if lord_house in dusthana_houses and lord_house != h:
            yogas.append(f"Viparita Raja Yoga: {lord} (lord of {h}th) in {lord_house}th house — unexpected rise after obstacles")
    
    # Dhana Yoga - lords of 2nd and 11th conjunct or in each other's houses
    lord_2 = SIGN_LORDS[d1_houses[2]["sign"]]
    lord_11 = SIGN_LORDS[d1_houses[11]["sign"]]
    house_2 = get_planet_house(lord_2)
    house_11 = get_planet_house(lord_11)
    if house_2 and house_11 and house_2 == house_11:
        yogas.append(f"Dhana Yoga: Lords of 2nd and 11th conjunct — strong wealth accumulation potential")
    
    # Hamsa Yoga - Jupiter in own sign or exalted in kendra
    jupiter_sign = chart_data["planets"]["Jupiter"]["d1"]["sign"]
    if jupiter_house in [1, 4, 7, 10] and jupiter_sign in ["Sagittarius", "Pisces", "Cancer"]:
        yogas.append("Hamsa Yoga: Jupiter in kendra in own/exalted sign — wisdom, nobility, and spiritual elevation")
    
    # Malavya Yoga - Venus in own sign or exalted in kendra
    venus_house = get_planet_house("Venus")
    venus_sign = chart_data["planets"]["Venus"]["d1"]["sign"]
    if venus_house and venus_house in [1, 4, 7, 10] and venus_sign in ["Taurus", "Libra", "Pisces"]:
        yogas.append("Malavya Yoga: Venus in kendra in own/exalted sign — beauty, luxury, and relationship harmony")
    
    # Ruchaka Yoga - Mars in own sign or exalted in kendra
    mars_sign = chart_data["planets"]["Mars"]["d1"]["sign"]
    if mars_house and mars_house in [1, 4, 7, 10] and mars_sign in ["Aries", "Scorpio", "Capricorn"]:
        yogas.append("Ruchaka Yoga: Mars in kendra in own/exalted sign — courage, leadership, and physical strength")
    
    return yogas

@router.post("/chart")
async def generate_chart(data: ChartRequest):
    try:
        # 1. Geocoding & Timezone
        if data.lat is not None and data.lon is not None:
            lat, lon = data.lat, data.lon
        else:
            location = geolocator.geocode(data.pob)
            if not location:
                raise HTTPException(status_code=400, detail="Could not find location coordinates")
            lat, lon = location.latitude, location.longitude
            
        tz_str = tf.timezone_at(lng=lon, lat=lat)
        if not tz_str:
            raise HTTPException(status_code=400, detail="Could not determine timezone")

        # 2. DateTime processing to UTC
        dt_str = f"{data.dob} {data.tob}"
        dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M")
        dt_aware = dt.replace(tzinfo=ZoneInfo(tz_str))
        dt_utc = dt_aware.astimezone(ZoneInfo("UTC"))
        
        # 3. Calculate Julian Day (Swiss Ephemeris core)
        year, month, day = dt_utc.year, dt_utc.month, dt_utc.day
        hour = dt_utc.hour + dt_utc.minute/60.0 + dt_utc.second/3600.0
        jd = swe.julday(year, month, day, hour)

        # Configure Swiss Ephemeris (Ayanamsa for Vedic calculations - Lahiri)
        swe.set_sid_mode(swe.SIDM_LAHIRI)
        
        # Calculate Ascendant
        houses, ascmc = swe.houses_ex(jd, lat, lon, b'W') # Whole Sign
        asc_deg_trop = ascmc[0]
        ayanamsa = swe.get_ayanamsa(jd)
        asc_deg_sidereal = (asc_deg_trop - ayanamsa) % 360
        
        chart_data = {
            "ascendant": {
                "degree": round(asc_deg_sidereal, 2),
                "sign": get_zodiac_sign(asc_deg_sidereal)
            },
            "divisional_ascendants": {},
            "planets": {}
        }
        
        # Calculate Divisional Ascendants
        for chart_id, chart_info in DIVISIONAL_CHARTS.items():
            if chart_id == "D10":
                div_deg = calculate_d10_degree(asc_deg_sidereal)
            elif chart_id == "D60":
                div_deg = calculate_d60_degree(asc_deg_sidereal)
            else:
                div_deg = calculate_divisional(asc_deg_sidereal, chart_info["division"])
                
            chart_data["divisional_ascendants"][chart_id] = {
                "degree": round(div_deg, 2),
                "sign": get_zodiac_sign(div_deg)
            }

        # Calculate Planets (Sidereal)
        for p_id, p_name in PLANET_MAP.items():
            res, _ = swe.calc_ut(jd, p_id, swe.FLG_SIDEREAL | swe.FLG_SPEED)
            d1_deg = res[0]
            is_retrograde = res[3] < 0 if len(res) > 3 else False
            d9_deg = calculate_navamsa_degree(d1_deg)
            
            p_data = {
                "d1": {
                    "degree": round(d1_deg, 2),
                    "sign": get_zodiac_sign(d1_deg),
                    "retrograde": is_retrograde
                },
                "d9": {
                    "degree": round(d9_deg, 2),
                    "sign": get_zodiac_sign(d9_deg)
                }
            }
            
            for chart_id, chart_info in DIVISIONAL_CHARTS.items():
                if chart_id == "D10":
                    div_deg = calculate_d10_degree(d1_deg)
                elif chart_id == "D60":
                    div_deg = calculate_d60_degree(d1_deg)
                else:
                    div_deg = calculate_divisional(d1_deg, chart_info["division"])
                    
                p_data[chart_id.lower()] = {
                    "degree": round(div_deg, 2),
                    "sign": get_zodiac_sign(div_deg)
                }
                
            chart_data["planets"][p_name] = p_data
            
        # Add Ketu
        rahu_d1 = chart_data["planets"]["Rahu"]["d1"]["degree"]
        ketu_d1 = (rahu_d1 + 180) % 360
        ketu_d9 = calculate_navamsa_degree(ketu_d1)
        
        ketu_data = {
            "d1": {
                "degree": round(ketu_d1, 2),
                "sign": get_zodiac_sign(ketu_d1)
            },
            "d9": {
                "degree": round(ketu_d9, 2),
                "sign": get_zodiac_sign(ketu_d9)
            }
        }
        
        for chart_id, chart_info in DIVISIONAL_CHARTS.items():
            if chart_id == "D10":
                div_deg = calculate_d10_degree(ketu_d1)
            elif chart_id == "D60":
                div_deg = calculate_d60_degree(ketu_d1)
            else:
                div_deg = calculate_divisional(ketu_d1, chart_info["division"])
                
            ketu_data[chart_id.lower()] = {
                "degree": round(div_deg, 2),
                "sign": get_zodiac_sign(div_deg)
            }
            
        chart_data["planets"]["Ketu"] = ketu_data

        sun_degree = chart_data["planets"]["Sun"]["d1"]["degree"]
        for p_name, p_data in chart_data["planets"].items():
            if p_name == "Sun":
                continue
            diff = abs(p_data["d1"]["degree"] - sun_degree)
            if diff > 180:
                diff = 360 - diff
            p_data["d1"]["combust"] = diff < 6

        # Calculate Nakshatras
        NAKSHATRAS = [
            "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
            "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
            "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
            "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
            "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
        ]

        def get_nakshatra(degree: float):
            nak_span = 360 / 27
            index = int(degree / nak_span)
            rem = degree % nak_span
            pada = int(rem / (nak_span / 4)) + 1
            return NAKSHATRAS[index], pada

        chart_data["ascendant"]["nakshatra"], chart_data["ascendant"]["pada"] = get_nakshatra(chart_data["ascendant"]["degree"])
        for p_name, p_data in chart_data["planets"].items():
            p_data["d1"]["nakshatra"], p_data["d1"]["pada"] = get_nakshatra(p_data["d1"]["degree"])

        # Calculate Houses (Equal House for simplicity based on Ascendant sign)
        d1_houses = {}
        d9_houses = {}
        
        asc_sign_index = ZODIAC_SIGNS.index(chart_data["ascendant"]["sign"])
        for i in range(12):
            sign = ZODIAC_SIGNS[(asc_sign_index + i) % 12]
            d1_houses[i + 1] = {"sign": sign, "planets": []}

        # We need a D9 ascendant degree/sign. D9 asc is calculated from D1 Asc degree.
        d9_asc_degree = calculate_navamsa_degree(chart_data["ascendant"]["degree"])
        d9_asc_sign = get_zodiac_sign(d9_asc_degree)
        
        # We also need to add D9 Ascendant to chart data
        chart_data["d9_ascendant"] = {
            "degree": round(d9_asc_degree, 2),
            "sign": d9_asc_sign
        }

        d9_asc_index = ZODIAC_SIGNS.index(d9_asc_sign)
        for i in range(12):
            sign = ZODIAC_SIGNS[(d9_asc_index + i) % 12]
            d9_houses[i + 1] = {"sign": sign, "planets": []}
            
        # Build divisional houses
        divisional_houses = {}
        for chart_id, chart_info in DIVISIONAL_CHARTS.items():
            div_asc_sign = chart_data["divisional_ascendants"][chart_id]["sign"]
            div_asc_index = ZODIAC_SIGNS.index(div_asc_sign)
            
            houses_dict = {}
            for i in range(12):
                h_sign = ZODIAC_SIGNS[(div_asc_index + i) % 12]
                houses_dict[i + 1] = {"sign": h_sign, "planets": []}
            divisional_houses[chart_id] = houses_dict

        for p_name, p_data in chart_data["planets"].items():
            # D1
            p_sign = p_data["d1"]["sign"]
            # Find which house this sign is in
            for h_num, h_data in d1_houses.items():
                if h_data["sign"] == p_sign:
                    h_data["planets"].append(p_name)
                    break
            # D9
            p_d9_sign = p_data["d9"]["sign"]
            for h_num, h_data in d9_houses.items():
                if h_data["sign"] == p_d9_sign:
                    h_data["planets"].append(p_name)
                    break
            # Other divisionals
            for chart_id in DIVISIONAL_CHARTS.keys():
                p_div_sign = p_data[chart_id.lower()]["sign"]
                for h_num, h_data in divisional_houses[chart_id].items():
                    if h_data["sign"] == p_div_sign:
                        h_data["planets"].append(p_name)
                        break

        yogas = detect_yogas(d1_houses, chart_data, chart_data["ascendant"]["sign"])
        chart_data["yogas"] = yogas

        moon_degree = chart_data["planets"]["Moon"]["d1"]["degree"]
        all_dashas, current_maha = calculate_vimshottari_dasha(moon_degree, dt_aware)
        chart_data["dashas"] = all_dashas
        chart_data["current_mahadasha"] = current_maha

        # Calculate Antardasha
        current_antardasha = None
        if current_maha:
            antardashas = calculate_antardasha(
                current_maha["lord"],
                current_maha["start"],
                current_maha["end"]
            )
            chart_data["antardashas"] = antardashas
            
            today_str = datetime.now().strftime("%Y-%m-%d")
            for ad in antardashas:
                if ad["start"] <= today_str <= ad["end"]:
                    current_antardasha = ad
                    break
            
            chart_data["current_antardasha"] = current_antardasha

        # Generate Text Description
        desc = "D1 Chart (Rasi)\n"
        desc += f"Ascendant: {chart_data['ascendant']['sign']} ({chart_data['ascendant']['nakshatra']} pada {chart_data['ascendant']['pada']})\n"
        desc += f"Moon Sign: {chart_data['planets']['Moon']['d1']['sign']}\n"
        desc += f"Moon Nakshatra: {chart_data['planets']['Moon']['d1']['nakshatra']} pada {chart_data['planets']['Moon']['d1']['pada']}\n\n"
        
        desc += "House Placements (D1):\n"
        for i in range(1, 13):
            pls = d1_houses[i]['planets']
            pl_details = []
            for p in pls:
                nak = chart_data['planets'][p]['d1']['nakshatra']
                pada = chart_data['planets'][p]['d1']['pada']
                pl_details.append(f"{p} ({nak} pada {pada})")
            pl_str = ", ".join(pl_details) if pl_details else "Empty"
            desc += f"{i}th House ({d1_houses[i]['sign']}): {pl_str}\n"
        
        desc += "\nHouse Lords (D1):\n"
        for i in range(1, 13):
            sign = d1_houses[i]["sign"]
            lord = SIGN_LORDS[sign]
            lord_house = None
            for h_num, h_data in d1_houses.items():
                if lord in h_data["planets"]:
                    lord_house = h_num
                    break
            desc += f"House {i} lord: {lord} placed in House {lord_house or 'unknown'}\n"
        
        desc += "\nPlanetary Strength Indicators:\n"
        for p_name, p_data in chart_data["planets"].items():
            indicators = []
            sign = p_data["d1"]["sign"]
            
            if EXALTATION.get(p_name) == sign:
                indicators.append("EXALTED")
            elif DEBILITATION.get(p_name) == sign:
                indicators.append("DEBILITATED")
            elif sign in FRIENDLY_SIGNS.get(p_name, []):
                indicators.append("Friendly sign")
            else:
                indicators.append("Enemy/Neutral sign")
            
            if p_data["d1"].get("retrograde"):
                indicators.append("RETROGRADE")
            
            if p_data["d1"].get("combust"):
                indicators.append("COMBUST")
            
            desc += f"{p_name}: {', '.join(indicators) if indicators else 'No specific strength'}\n"

        desc += "\nYogas Present:\n"
        if yogas:
            for yoga in yogas:
                desc += f"✦ {yoga}\n"
        else:
            desc += "No major yogas detected\n"

        desc += "\nPlanetary Aspects (D1):\n"
        for p_name in chart_data["planets"]:
            p_sign = chart_data["planets"][p_name]["d1"]["sign"]
            for h_num, h_data in d1_houses.items():
                if h_data["sign"] == p_sign:
                    aspected = get_aspects(p_name, h_num)
                    desc += f"{p_name} (House {h_num}) aspects houses: {', '.join(map(str, aspected))}\n"
                    break
        
        desc += "\nConjunctions (D1):\n"
        has_conjunction = False
        for i in range(1, 13):
            if len(d1_houses[i]['planets']) > 1:
                desc += f"House {i} ({d1_houses[i]['sign']}): {', '.join(d1_houses[i]['planets'])}\n"
                has_conjunction = True
        if not has_conjunction:
            desc += "No conjunctions\n"
        
        desc += "\nD9 Chart (Navamsa)\n"
        desc += f"Ascendant: {d9_asc_sign}\n"
        desc += "House Placements (D9):\n"
        for i in range(1, 13):
            pls = d9_houses[i]['planets']
            pl_str = ", ".join(pls) if pls else "Empty"
            desc += f"{i}th House ({d9_houses[i]['sign']}): {pl_str}\n"
        
        desc += "\nPlanetary Aspects (D9):\n"
        for p_name in chart_data["planets"]:
            p_sign = chart_data["planets"][p_name]["d9"]["sign"]
            for h_num, h_data in d9_houses.items():
                if h_data["sign"] == p_sign:
                    aspected = get_aspects(p_name, h_num)
                    desc += f"{p_name} (House {h_num}) aspects houses: {', '.join(map(str, aspected))}\n"
                    break
                    
        # Append all other divisional charts
        for chart_id, chart_info in DIVISIONAL_CHARTS.items():
            desc += f"\n{chart_id} Chart ({chart_info['name']} - {chart_info['topic']})\n"
            desc += f"Ascendant: {chart_data['divisional_ascendants'][chart_id]['sign']}\n"
            desc += f"House Placements ({chart_id}):\n"
            for i in range(1, 13):
                pls = divisional_houses[chart_id][i]['planets']
                pl_str = ", ".join(pls) if pls else "Empty"
                desc += f"{i}th House ({divisional_houses[chart_id][i]['sign']}): {pl_str}\n"
        
        desc += "\nVimshottari Dasha Timeline:\n"
        for d in all_dashas:
            desc += f"{d['lord']} Mahadasha: {d['start']} to {d['end']}\n"
        
        desc += "\nCurrent Dasha:\n"
        if current_maha:
            desc += f"Mahadasha: {current_maha['lord']} ({current_maha['start']} to {current_maha['end']})\n"
        else:
            desc += "Mahadasha: Could not determine\n"
        
        if current_antardasha:
            desc += f"Antardasha: {current_antardasha['lord']} ({current_antardasha['start']} to {current_antardasha['end']})\n"
        
        desc += f"\nToday's Date: {datetime.now().strftime('%Y-%m-%d')}\n"
        
        chart_data["description_text"] = desc

        return {
            "success": True,
            "data": chart_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
