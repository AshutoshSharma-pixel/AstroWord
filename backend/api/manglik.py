import os
import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new, call_gemini_stream
from google.genai import types

router = APIRouter()

class ManglikRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

# Manglik house positions (D1 chart)
MANGLIK_HOUSES = [1, 4, 7, 8, 12]

# Cancellation rules
CANCELLATION_RULES = {
    "Mars in Aries or Scorpio": lambda sign: sign in ["Aries", "Scorpio"],
    "Mars in Capricorn (exalted)": lambda sign: sign == "Capricorn",
    "Mars in Cancer (debilitated) — reduces severity": lambda sign: sign == "Cancer",
    "Mars conjunct Jupiter": None,  # checked separately
    "Mars conjunct Moon": None,     # checked separately
    "Mars in own sign": lambda sign: sign in ["Aries", "Scorpio"],
}

@router.post("/manglik")
async def calculate_manglik(data: ManglikRequest):
    try:
        planets = data.chart_data.get("planets", {})
        ascendant = data.chart_data.get("ascendant", {})
        
        mars_data = planets.get("Mars", {}).get("d1", {})
        if not mars_data:
            raise HTTPException(status_code=400, detail="Mars data not found in chart")
        
        mars_sign = mars_data.get("sign", "")
        mars_house = mars_data.get("house", None)
        mars_nakshatra = mars_data.get("nakshatra", "")
        mars_pada = mars_data.get("pada", 1)
        mars_degree = round(mars_data.get("degree", 0) % 30, 2)
        mars_retrograde = mars_data.get("retrograde", False)
        
        # Calculate house from ascendant if house not directly available
        SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
                 "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
        
        asc_sign = ascendant.get("sign", "Aries")
        if mars_house is None and asc_sign in SIGNS and mars_sign in SIGNS:
            asc_index = SIGNS.index(asc_sign)
            mars_index = SIGNS.index(mars_sign)
            mars_house = ((mars_index - asc_index) % 12) + 1
        
        # Determine if Manglik
        is_manglik = mars_house in MANGLIK_HOUSES
        
        # Severity
        HIGH_SEVERITY_HOUSES = [7, 8]
        MEDIUM_SEVERITY_HOUSES = [1, 4]
        LOW_SEVERITY_HOUSES = [12]
        
        if not is_manglik:
            severity = "None"
        elif mars_house in HIGH_SEVERITY_HOUSES:
            severity = "High"
        elif mars_house in MEDIUM_SEVERITY_HOUSES:
            severity = "Medium"
        else:
            severity = "Low"
        
        # Check cancellations
        cancellations = []
        
        # Mars in own sign or exalted
        if mars_sign in ["Aries", "Scorpio"]:
            cancellations.append("Mars in own sign — reduces Manglik severity significantly")
        if mars_sign == "Capricorn":
            cancellations.append("Mars exalted in Capricorn — Manglik effects greatly reduced")
        
        # Mars retrograde reduces severity
        if mars_retrograde:
            cancellations.append("Retrograde Mars — Manglik effects are internalized, less external impact")
        
        # Check if Jupiter aspects Mars (simplified: Jupiter in trine or opposition)
        jupiter_data = planets.get("Jupiter", {}).get("d1", {})
        jupiter_sign = jupiter_data.get("sign", "")
        if jupiter_sign and asc_sign in SIGNS and jupiter_sign in SIGNS and mars_sign in SIGNS:
            jupiter_house = ((SIGNS.index(jupiter_sign) - SIGNS.index(asc_sign)) % 12) + 1
            mars_house_check = mars_house or 1
            diff = abs(jupiter_house - mars_house_check)
            if diff in [0, 4, 8, 6]:  # conjunction or trine or opposition
                cancellations.append("Jupiter aspects Mars — Manglik dosha is partially cancelled")
        
        # Both partners Manglik — cancels each other
        # (mentioned in reading as guidance)
        
        # Effective Manglik status after cancellations
        is_effective_manglik = is_manglik and len(cancellations) == 0
        partial_manglik = is_manglik and len(cancellations) > 0
        
        # Build AI prompt
        prompt = f"""
You are a highly knowledgeable Vedic astrology expert specialising in Manglik Dosha.
Write a deeply personalised and comprehensive reading for this person.

CHART DATA:
Mars Sign: {mars_sign}
Mars House: {mars_house} (from ascendant)
Mars Nakshatra: {mars_nakshatra} Pada {mars_pada}
Mars Degree: {mars_degree}°
Mars Retrograde: {mars_retrograde}
Ascendant: {asc_sign}
Is Manglik: {is_manglik}
Severity: {severity}
Cancellation Factors: {', '.join(cancellations) if cancellations else 'None'}
Current Mahadasha: {data.chart_data.get('current_mahadasha', {}).get('lord', 'Unknown')}

Write the following sections using markdown headers:

## What is Manglik Dosha?
Explain Manglik Dosha clearly and concisely for a modern Indian reader.

## Your Manglik Status
State clearly whether the person is Manglik, partially Manglik, or not Manglik.
Explain WHY based on Mars in house {mars_house}. Be specific.

## Severity Analysis
Explain the severity level ({severity}) and what it means practically for marriage.
{"Mention these cancellation factors and their impact: " + ", ".join(cancellations) if cancellations else "Explain the full impact without cancellations."}

## Effect on Marriage
How does this specific placement of Mars affect their marriage?
What should they be aware of? Be honest but reassuring.

## Compatibility & Partner Selection
What kind of partner is ideal? 
Should they marry another Manglik?
What planetary placements in a partner's chart would balance this?

## Remedies & Solutions
Give 4-5 specific, practical Vedic remedies for this person's Mars placement.
Include mantras, gemstones, rituals, and behavioural remedies.
Be specific to Mars in {mars_sign} in house {mars_house}.

## 2026-2027 Mars Forecast
How will Mars transits in 2026-2027 affect this person's marriage prospects?

Provide a highly detailed, expansive reading. Do not restrict length.
Provide the response in pure Markdown. Do not use JSON.
At the very end, on a new line:
KEYWORDS: word1, word2, word3
"""
        
        def generate():
            # Yield meta first
            meta_data = {
                "type": "meta",
                "success": True,
                "is_manglik": is_manglik,
                "is_effective_manglik": is_effective_manglik,
                "partial_manglik": partial_manglik,
                "severity": severity,
                "mars_house": mars_house,
                "mars_sign": mars_sign,
                "mars_nakshatra": mars_nakshatra,
                "mars_pada": mars_pada,
                "mars_degree": mars_degree,
                "mars_retrograde": mars_retrograde,
                "cancellations": cancellations
            }
            yield f"data: {json.dumps(meta_data)}\n\n"
            
            # Default keywords
            keywords = ["Manglik", mars_sign, mars_nakshatra, "Mars"]
            
            # Stream from Gemini
            full_text = ""
            for chunk in call_gemini_stream(
                prompt,
                config=types.GenerateContentConfig(
                    temperature=0.4,
                    max_output_tokens=8192,
                    thinking_config=types.ThinkingConfig(thinking_budget=0)
                )
            ):
                text_chunk = chunk.text
                if text_chunk:
                    full_text += text_chunk
                    yield f"data: {json.dumps({'type': 'chunk', 'text': text_chunk})}\n\n"
            
            # Extract keywords if present in the full accumulated text
            if "KEYWORDS:" in full_text:
                parts = full_text.rsplit("KEYWORDS:", 1)
                kw_raw = parts[1].strip()
                keywords = [k.strip() for k in kw_raw.split(",") if k.strip()]
                
            # Yield done with keywords
            yield f"data: {json.dumps({'type': 'done', 'keywords': keywords[:6]})}\n\n"

        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
        )

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
