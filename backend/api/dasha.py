import os
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types


def _add_years(dt: datetime, years: float) -> datetime:
    """Add a fractional number of years accurately using dt.replace for whole years."""
    full_years = int(years)
    remaining_days = (years - full_years) * 365.25
    try:
        result = dt.replace(year=dt.year + full_years)
    except ValueError:  # Feb 29 edge case
        result = dt.replace(year=dt.year + full_years, day=28)
    return result + timedelta(days=remaining_days)


def _parse_date(s: str) -> datetime:
    """Parse common date string formats without dateutil."""
    for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y", "%Y/%m/%d", "%d %b %Y", "%B %d, %Y"):
        try:
            return datetime.strptime(s, fmt)
        except ValueError:
            continue
    # Last resort: take the first 10 chars and try ISO format
    try:
        return datetime.strptime(str(s)[:10], "%Y-%m-%d")
    except ValueError:
        return datetime(2000, 1, 1)

router = APIRouter()


class DashaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict


DASHA_SEQUENCE = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"]
DASHA_YEARS = {
    "Ketu": 7, "Venus": 20, "Sun": 6, "Moon": 10, "Mars": 7,
    "Rahu": 18, "Jupiter": 16, "Saturn": 19, "Mercury": 17
}

# 27 nakshatras mapped to lords (repeating 9-planet sequence x3)
NAKSHATRA_LORDS = [
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",   # 1–9
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",   # 10–18
    "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"    # 19–27
]

NAKSHATRA_INDEX = {
    "Ashwini": 1, "Bharani": 2, "Krittika": 3, "Rohini": 4, "Mrigashira": 5,
    "Ardra": 6, "Punarvasu": 7, "Pushya": 8, "Ashlesha": 9, "Magha": 10,
    "Purva Phalguni": 11, "Uttara Phalguni": 12, "Hasta": 13, "Chitra": 14,
    "Swati": 15, "Vishakha": 16, "Anuradha": 17, "Jyeshtha": 18, "Mula": 19,
    "Purva Ashadha": 20, "Uttara Ashadha": 21, "Shravana": 22, "Dhanishtha": 23,
    "Shatabhisha": 24, "Purva Bhadrapada": 25, "Uttara Bhadrapada": 26, "Revati": 27
}


@router.post("/dasha")
async def calculate_dasha(request: DashaRequest):
    try:
        chart = request.chart_data

        # --- Extract Moon data ---
        moon = chart["planets"]["Moon"]["d1"]
        nakshatra_name = moon["nakshatra"]
        pada = moon["pada"]           # 1–4
        moon_degree_in_sign = moon["degree"]  # 0–30

        # Nakshatra index (0-based)
        nak_index = NAKSHATRA_INDEX.get(nakshatra_name, 1) - 1
        starting_lord = NAKSHATRA_LORDS[nak_index]

        # --- Balance of first Dasha at birth ---
        # moon["degree"] from Swiss Ephemeris is the full sidereal ecliptic longitude (0–360°)
        # This is the authoritative value — use it directly.
        nakshatra_span = 360.0 / 27.0  # 13.3333...° per nakshatra

        full_moon_longitude = float(moon["degree"])  # 0–360, already sidereal

        # Degree within this nakshatra (0 to 13.333)
        nak_index_0 = NAKSHATRA_INDEX.get(nakshatra_name, 1) - 1
        nakshatra_start_degree = nak_index_0 * nakshatra_span
        degree_in_nakshatra = full_moon_longitude - nakshatra_start_degree

        # Clamp to valid range (handles floating point edge cases)
        degree_in_nakshatra = max(0.0, min(degree_in_nakshatra, nakshatra_span))

        balance_fraction = (nakshatra_span - degree_in_nakshatra) / nakshatra_span
        starting_years = DASHA_YEARS[starting_lord]
        balance_years = balance_fraction * starting_years

        # --- Parse birth date ---
        birth_date_str = (
            chart.get("birth_date")
            or chart.get("birthDate")
            or chart.get("date_of_birth")
            or chart.get("input", {}).get("date")
            or chart.get("input", {}).get("dob")
        )

        # Fallback for old cached charts: chart.py already computed correct dashas.
        # Use the start date of the first dasha entry as a proxy for birth_date.
        existing_dashas = chart.get("dashas", [])

        if birth_date_str:
            birth_dt = _parse_date(str(birth_date_str))
        elif existing_dashas and existing_dashas[0].get("start"):
            # Dates stored as YYYY-MM-DD by chart.py
            try:
                birth_dt = datetime.strptime(existing_dashas[0]["start"], "%Y-%m-%d")
            except ValueError:
                birth_dt = datetime(2000, 1, 1)
        else:
            birth_dt = datetime(2000, 1, 1)

        print(f"DEBUG dasha: birth_date_str={birth_date_str!r} birth_dt={birth_dt.date()}")


        start_idx = DASHA_SEQUENCE.index(starting_lord)

        # --- Build full Mahadasha timeline ---
        mahadashas = []
        current_date = birth_dt

        # First Mahadasha (partial balance)
        first_end = _add_years(birth_dt, balance_years)
        mahadashas.append({
            "lord": starting_lord,
            "start": birth_dt.strftime("%d %b %Y"),
            "end": first_end.strftime("%d %b %Y"),
            "years": round(balance_years, 2),
            "is_current": False
        })
        current_date = first_end

        # Remaining 8 full Mahadashas
        for i in range(1, 9):
            idx = (start_idx + i) % 9
            lord = DASHA_SEQUENCE[idx]
            yrs = DASHA_YEARS[lord]
            end_date = _add_years(current_date, yrs)
            mahadashas.append({
                "lord": lord,
                "start": current_date.strftime("%d %b %Y"),
                "end": end_date.strftime("%d %b %Y"),
                "years": yrs,
                "is_current": False
            })
            current_date = end_date

        # --- Mark current Mahadasha ---
        today = datetime.now()
        current_maha = None
        for m in mahadashas:
            m_start = datetime.strptime(m["start"], "%d %b %Y")
            m_end = datetime.strptime(m["end"], "%d %b %Y")
            if m_start <= today <= m_end:
                m["is_current"] = True
                current_maha = m
                break

        # Fallback: mark last if none found (edge case near cycle end)
        if not current_maha:
            mahadashas[-1]["is_current"] = True
            current_maha = mahadashas[-1]

        # --- Build Antardashas for current Mahadasha ---
        antardashas = []
        maha_lord = current_maha["lord"]
        maha_start_dt = datetime.strptime(current_maha["start"], "%d %b %Y")
        maha_total_years = current_maha["years"]
        # Use full DASHA_YEARS for the Mahadasha lord (not the partial balance_years for 1st Mahadasha)
        maha_full_years = DASHA_YEARS[maha_lord]
        maha_lord_idx = DASHA_SEQUENCE.index(maha_lord)
        ad_current = maha_start_dt

        for j in range(9):
            ad_idx = (maha_lord_idx + j) % 9
            ad_lord = DASHA_SEQUENCE[ad_idx]
            # Antardasha duration = (maha_years * antar_years) / 120 years
            ad_years = (maha_full_years * DASHA_YEARS[ad_lord]) / 120.0
            ad_end = _add_years(ad_current, ad_years)
            is_current_ad = ad_current <= today <= ad_end
            antardashas.append({
                "lord": ad_lord,
                "start": ad_current.strftime("%d %b %Y"),
                "end": ad_end.strftime("%d %b %Y"),
                "is_current": is_current_ad
            })
            ad_current = ad_end

        current_antardasha = next((a for a in antardashas if a["is_current"]), antardashas[0])

        # --- Build AI prompt ---
        planets = chart.get("planets", {})
        ascendant = chart.get("ascendant", {})
        moon_sign = moon.get("sign", "?")
        asc_sign = ascendant.get("sign", "?")
        antar_lord = current_antardasha["lord"]
        maha_end = current_maha["end"]
        antar_end = current_antardasha["end"]

        maha_planet_info = ""
        if maha_lord in planets and maha_lord not in ["Rahu", "Ketu"]:
            p = planets[maha_lord].get("d1", {})
            maha_planet_info = (
                f"{maha_lord} is in {p.get('sign', '?')} in house {p.get('house', '?')}, "
                f"nakshatra {p.get('nakshatra', '?')}, "
                f"{'retrograde' if p.get('retrograde') else 'direct'}"
            )

        antar_planet_info = ""
        if antar_lord in planets and antar_lord not in ["Rahu", "Ketu"]:
            p = planets[antar_lord].get("d1", {})
            antar_planet_info = (
                f"{antar_lord} is in {p.get('sign', '?')} in house {p.get('house', '?')}, "
                f"nakshatra {p.get('nakshatra', '?')}"
            )

        prompt = f"""You are an expert Vedic astrologer specialising in the Vimshottari Dasha system.

Birth Details from chart:
- Moon sign: {moon_sign}, Nakshatra: {nakshatra_name} Pada {pada}
- Ascendant: {asc_sign}
- Current Mahadasha: {maha_lord} (runs until {maha_end})
- Current Antardasha: {antar_lord} (runs until {antar_end})
- {maha_planet_info}
- {antar_planet_info}

Write a personalised Vimshottari Dasha reading for this person. Cover:

## Current Mahadasha — {maha_lord}
(2–3 paragraphs)
- What this Mahadasha period means based on {maha_lord}'s position in their chart
- Key life themes activated: career, relationships, spirituality, health, finances — whichever {maha_lord} rules
- Overall tone and energy of this period

## Current Antardasha — {antar_lord}
(1–2 paragraphs)
- How {antar_lord} Antardasha modifies and focuses the {maha_lord} Mahadasha energy
- Specific themes and timing active RIGHT NOW until {antar_end}

## Guidance for This Period
(1 paragraph)
- Practical spiritual and life guidance for navigating this Dasha combination
- What to focus on, what to be mindful of

Write in a warm, insightful, personalised tone. Be specific to their chart — not generic. Use Vedic terminology naturally. Aim for 350–450 words.

End with:
KEYWORDS: [5–7 relevant keywords — planet names, themes, nakshatra]"""

        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=8192,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        full_text = response.text or ""

        # --- Parse keywords ---
        keywords = [maha_lord, antar_lord, nakshatra_name, moon_sign]
        if "KEYWORDS:" in full_text:
            parts = full_text.rsplit("KEYWORDS:", 1)
            full_text = parts[0].rstrip()
            kw_raw = parts[1].strip()
            keywords = [k.strip() for k in kw_raw.split(",") if k.strip()]

        # Years remaining in current Mahadasha
        maha_end_dt = datetime.strptime(maha_end, "%d %b %Y")
        years_remaining = round(max(0, (maha_end_dt - today).days / 365.25), 1)

        return {
            "success": True,
            "moon_nakshatra": nakshatra_name,
            "moon_nakshatra_pada": pada,
            "moon_sign": moon_sign,
            "ascendant_sign": asc_sign,
            "current_mahadasha": {
                "lord": maha_lord,
                "end_date": maha_end,
                "years_remaining": years_remaining
            },
            "current_antardasha": {
                "lord": antar_lord,
                "end_date": antar_end
            },
            "mahadashas": mahadashas,
            "antardashas": antardashas,
            "reading": full_text,
            "keywords": keywords
        }

    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing chart data: {str(e)}")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
