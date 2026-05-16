from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import swisseph as swe
import json
from datetime import datetime, date, timedelta
from api.gemini_utils import call_gemini_stream
from google.genai import types

router = APIRouter()

PLANET_MAP = {
    swe.SUN: "Sun",
    swe.MOON: "Moon",
    swe.MARS: "Mars",
    swe.MERCURY: "Mercury",
    swe.JUPITER: "Jupiter",
    swe.VENUS: "Venus",
    swe.SATURN: "Saturn",
    swe.MEAN_NODE: "Rahu",
}

ZODIAC_SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]

class TransitRequest(BaseModel):
    chart_data: dict | None = None
    timezone_offset: float = 5.5 # Default to IST

@router.post("/daily-transit")
async def calculate_transit(data: TransitRequest):
    try:
        # 1. Get current time
        now = datetime.utcnow()
        # Apply offset to get local time for the user (optional, but good for "Daily")
        # For simplicity, we use UTC for planetary positions which is standard
        
        # 2. Calculate current planetary positions
        swe.set_ephe_path(None) # Use default or set if needed
        swe.set_sid_mode(swe.SIDM_LAHIRI)
        
        # julian day for now
        jd = swe.julday(now.year, now.month, now.day, now.hour + now.minute/60.0 + now.second/3600.0)
        
        transits = {}
        for p_id, p_name in PLANET_MAP.items():
            res = swe.calc_ut(jd, p_id, swe.FLG_SIDEREAL)[0]
            degree = res[0]
            sign_idx = int(degree / 30)
            sign_name = ZODIAC_SIGNS[sign_idx]
            
            # Ketu is Rahu + 180
            transits[p_name] = {
                "degree": round(degree % 30, 2),
                "full_degree": round(degree, 2),
                "sign": sign_name,
                "is_retrograde": res[3] < 0
            }
            
            if p_name == "Rahu":
                ketu_deg = (degree + 180) % 360
                transits["Ketu"] = {
                    "degree": round(ketu_deg % 30, 2),
                    "full_degree": round(ketu_deg, 2),
                    "sign": ZODIAC_SIGNS[int(ketu_deg / 30)],
                    "is_retrograde": res[3] < 0
                }

        # 3. Build Prompt
        birth_info = ""
        if data.chart_data:
            birth_planets = data.chart_data.get("planets", {})
            birth_info = "Native's Birth Planets:\n"
            for p, info in birth_planets.items():
                if "d1" in info:
                    birth_info += f"- {p}: {info['d1']['sign']} ({round(info['d1']['degree'] % 30, 2)}°)\n"
            
            asc = data.chart_data.get("ascendant", {}).get("sign", "Unknown")
            birth_info += f"Ascendant: {asc}\n"

        current_date_str = now.strftime("%Y-%m-%d")
        
        prompt = f"""You are a master Vedic astrologer providing a deeply personalised daily reading.
Today is {current_date_str}.

TODAY'S PLANETARY TRANSITS (actual positions right now):
{json.dumps(transits, indent=2)}

{birth_info}

Current Mahadasha: {data.chart_data.get('current_mahadasha', {}).get('lord', 'Unknown')} 
(ends: {data.chart_data.get('current_mahadasha', {}).get('end', 'Unknown')})
Current Antardasha: {data.chart_data.get('current_antardasha', {}).get('lord', 'Unknown') if data.chart_data.get('current_antardasha') else 'Unknown'}

Write a deeply personalised daily horoscope for this person. Reference their 
specific ascendant, natal planets, and current Dasha throughout. 
This is NOT a generic horoscope — every sentence must relate to their chart.

Use these sections with ## headers:

## Today's Energy for You
2-3 sentences specific to their ascendant and the Moon's nakshatra today.
Name their ascendant explicitly. Name the Moon nakshatra.

## Key Planetary Influences Today
The 3 most significant transits for THIS person's chart specifically.
For each: state which house it falls in from their ascendant, 
what natal planet it aspects or conjuncts, and what that means for them today.

## Love & Relationships
How today's Venus and Moon transits affect their 7th house specifically.

## Career & Finance  
How today's Sun, Mercury, Mars transits affect their 10th and 2nd houses.

## Your Dasha + Today's Transits
How their current {data.chart_data.get('current_mahadasha', {}).get('lord', 'Unknown')} Mahadasha 
interacts with today's transits. Is today amplified or dampened by their Dasha?

## Today's Guidance
3 specific action points for today based on their chart — not generic advice.

## Today's Remedy
One specific Vedic remedy suited to the Moon's nakshatra today and their chart.

Write minimum 500 words. Be warm, specific, and insightful.
Reference actual planet names, house numbers, nakshatra names throughout.

At the very end write:
KEYWORDS: keyword1, keyword2, keyword3, keyword4, keyword5
"""

        def generate():
            # Meta chunk
            meta_data = {
                "type": "meta",
                "success": True,
                "date": current_date_str,
                "transits": transits
            }
            yield f"data: {json.dumps(meta_data)}\n\n"
            
            full_text = ""
            for chunk in call_gemini_stream(
                prompt,
                config=types.GenerateContentConfig(
                    temperature=0.5,
                    max_output_tokens=3000,
                    thinking_config=types.ThinkingConfig(thinking_budget=0)
                )
            ):
                text_chunk = chunk.text
                if text_chunk:
                    full_text += text_chunk
                    yield f"data: {json.dumps({'type': 'chunk', 'text': text_chunk})}\n\n"
            
            keywords = ["Astrology", "Transit", "Daily Horoscope"]
            if "KEYWORDS:" in full_text:
                parts = full_text.rsplit("KEYWORDS:", 1)
                kw_raw = parts[1].strip()
                keywords = [k.strip() for k in kw_raw.split(",") if k.strip()]
                
            yield f"data: {json.dumps({'type': 'done', 'keywords': keywords})}\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
