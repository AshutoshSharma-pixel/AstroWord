import os
import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from api.gemini_utils import call_gemini_stream
from google.genai import types

router = APIRouter()

class GanaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

DEVA_GANA = ["Ashwini", "Mrigashira", "Punarvasu", "Pushya",
             "Hasta", "Swati", "Anuradha", "Shravana", "Revati"]
MANUSHYA_GANA = ["Bharani", "Rohini", "Ardra", "Purva Phalguni",
                 "Uttara Phalguni", "Purva Ashadha", "Uttara Ashadha",
                 "Purva Bhadrapada", "Uttara Bhadrapada"]
RAKSHASA_GANA = ["Krittika", "Ashlesha", "Magha", "Chitra",
                 "Vishakha", "Jyeshtha", "Mula", "Dhanishta", "Shatabhisha"]

@router.post("/gana")
async def calculate_gana(data: GanaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        moon_data = planets.get("Moon", {}).get("d1", {})
        moon_nakshatra = moon_data.get("nakshatra", "")
        moon_pada = moon_data.get("pada", "")
        moon_sign = moon_data.get("sign", "")

        if moon_nakshatra in DEVA_GANA:
            gana = "Deva"
        elif moon_nakshatra in MANUSHYA_GANA:
            gana = "Manushya"
        elif moon_nakshatra in RAKSHASA_GANA:
            gana = "Rakshasa"
        else:
            raise HTTPException(status_code=400, detail="Could not determine Gana")

        # Compatibility summary (static, instant)
        compatibility_map = {
            "Deva": {"best": "Deva Gana", "good": "Manushya Gana", "challenging": "Rakshasa Gana"},
            "Manushya": {"best": "Manushya Gana", "good": "Deva Gana", "challenging": "Rakshasa Gana"},
            "Rakshasa": {"best": "Rakshasa Gana", "good": "Manushya Gana", "challenging": "Deva Gana"},
        }
        compatibility = compatibility_map[gana]

        prompt = f"""
You are a Vedic astrology expert. Write a reading for someone with {gana} Gana.
Moon in {moon_nakshatra} nakshatra pada {moon_pada} in {moon_sign}.
Ascendant: {data.chart_data.get('ascendant', {}).get('sign', 'Unknown')}

Cover these sections using markdown:
## What is {gana} Gana?
## Your Core Nature  
## {gana} Gana in Relationships & Compatibility
## How to Harness Your {gana} Gana Energy

Provide a highly detailed, expansive, and comprehensive reading for each section. Do not restrict the length.
Use **bold** for key terms. Be specific to {moon_nakshatra} nakshatra.
Provide the response in pure Markdown. Do not use JSON.
At the very end of your response, on a new line, provide the keywords like this:
KEYWORDS: word 1, word 2, word 3
"""

        def generate():
            # ── Phase 1: instant structured data ──────────────────────────
            meta = {
                "type": "meta",
                "success": True,
                "gana": gana,
                "moon_nakshatra": moon_nakshatra,
                "moon_pada": moon_pada,
                "moon_sign": moon_sign,
                "compatibility": compatibility,
                "keywords": [gana, moon_nakshatra, "Gana", "Vedic Astrology"]
            }
            yield f"data: {json.dumps(meta)}\n\n"

            # ── Phase 2: stream reading text ──────────────────────────────
            full_text = ""
            for chunk in call_gemini_stream(
                prompt,
                config=types.GenerateContentConfig(
                    temperature=0.4,
                    max_output_tokens=2000,
                    thinking_config=types.ThinkingConfig(thinking_budget=0)
                )
            ):
                text_chunk = chunk.text
                if text_chunk:
                    full_text += text_chunk
                    if "KEYWORDS:" not in full_text:
                        yield f"data: {json.dumps({'type': 'chunk', 'text': text_chunk})}\n\n"
                    elif "KEYWORDS:" in text_chunk:
                        before = text_chunk.split("KEYWORDS:")[0]
                        if before.strip():
                            yield f"data: {json.dumps({'type': 'chunk', 'text': before})}\n\n"

            # ── Phase 3: extract keywords, signal done ────────────────────
            keywords = [gana, moon_nakshatra, "Vedic Astrology"]
            if "KEYWORDS:" in full_text:
                parts = full_text.rsplit("KEYWORDS:", 1)
                kw_raw = parts[1].strip()
                keywords = [k.strip() for k in kw_raw.split(",") if k.strip()][:6]

            yield f"data: {json.dumps({'type': 'done', 'keywords': keywords})}\n\n"

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
