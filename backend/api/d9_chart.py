from fastapi import APIRouter
from pydantic import BaseModel
from typing import Any, Dict

router = APIRouter()

class D9ChartRequest(BaseModel):
    chart_data: Dict[str, Any]

@router.post("/d9-chart")
async def get_d9_chart(req: D9ChartRequest):
    chart = req.chart_data
    planets = chart.get("planets", {})

    PLANET_ORDER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]

    # Build D9 planet list
    d9_planets = []
    for planet in PLANET_ORDER:
        if planet in planets:
            p = planets[planet]
            d1_info = p.get("d1", {})
            d9_info = p.get("d9", {})
            d1_sign = d1_info.get("sign", "")
            d9_sign = d9_info.get("sign", "")
            is_vargottama = (d1_sign == d9_sign) and d1_sign != ""
            d9_planets.append({
                "planet": planet,
                "d9_sign": d9_sign,
                "d1_sign": d1_sign,
                "is_vargottama": is_vargottama,
                "retrograde": d1_info.get("retrograde", False),
            })

    # D9 ascendant — stored at chart.d9_ascendant or divisional_ascendants
    d9_ascendant_raw = chart.get("d9_ascendant", "")
    if isinstance(d9_ascendant_raw, dict):
        d9_ascendant = d9_ascendant_raw.get("sign", "")
    else:
        d9_ascendant = d9_ascendant_raw

    if not d9_ascendant:
        d9_asc_d9 = chart.get("divisional_ascendants", {}).get("D9", {})
        if isinstance(d9_asc_d9, dict):
            d9_ascendant = d9_asc_d9.get("sign", "")
        else:
            d9_ascendant = d9_asc_d9

    # Atmakaraka — highest degree planet using d1.degree
    atmakaraka = None
    atmakaraka_d9_sign = None
    max_deg = -1
    for planet in ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]:
        if planet in planets:
            deg = planets[planet].get("d1", {}).get("degree", 0)
            # degree is absolute (0-360), get degree within sign
            deg_in_sign = deg % 30
            if deg_in_sign > max_deg:
                max_deg = deg_in_sign
                atmakaraka = planet
                atmakaraka_d9_sign = planets[planet].get("d9", {}).get("sign", "")

    # Vargottama list
    vargottama_planets = [p["planet"] for p in d9_planets if p["is_vargottama"]]

    # 7th house from D9 ascendant
    SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
             "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
    d9_spouse_sign = ""
    if d9_ascendant in SIGNS:
        idx = SIGNS.index(d9_ascendant)
        d9_spouse_sign = SIGNS[(idx + 6) % 12]

    return {
        "d9_planets": d9_planets,
        "d9_ascendant": d9_ascendant,
        "atmakaraka": atmakaraka,
        "karakamsha_sign": atmakaraka_d9_sign,
        "vargottama_planets": vargottama_planets,
        "d9_spouse_sign": d9_spouse_sign,
    }
