from fastapi import APIRouter
from pydantic import BaseModel
from typing import Any, Dict

router = APIRouter()

class D9ChartRequest(BaseModel):
    chart_data: Dict[str, Any]

@router.post("/api/d9-chart")
async def get_d9_chart(req: D9ChartRequest):
    chart = req.chart_data
    planets = chart.get("planets", {})
    
    PLANET_ORDER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]
    
    # Build D9 planet list
    d9_planets = []
    for planet in PLANET_ORDER:
        if planet in planets:
            p = planets[planet]
            d9_info = p.get("d9", {})
            d9_sign = d9_info.get("sign", "")
            d1_sign = p.get("sign", "")
            is_vargottama = (d1_sign == d9_sign) and d1_sign != ""
            d9_planets.append({
                "planet": planet,
                "d9_sign": d9_sign,
                "d1_sign": d1_sign,
                "is_vargottama": is_vargottama,
                "retrograde": p.get("retrograde", False),
            })
    
    # D9 ascendant
    d9_ascendant = chart.get("d9_ascendant", "")
    
    # Atmakaraka (highest degree planet) for Karakamsha
    atmakaraka = None
    atmakaraka_d9_sign = None
    max_deg = -1
    for planet in ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]:
        if planet in planets:
            deg = planets[planet].get("degree_in_sign", 0)
            if deg > max_deg:
                max_deg = deg
                atmakaraka = planet
                atmakaraka_d9_sign = planets[planet].get("d9", {}).get("sign", "")
    
    # Vargottama list
    vargottama_planets = [p["planet"] for p in d9_planets if p["is_vargottama"]]
    
    # 7th house from D9 ascendant (spouse house)
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
