import os
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

router = APIRouter()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-2.5-flash")

class GanaRequest(BaseModel):
    user_id: str | None = None
    chart_data: dict

@router.post("/gana")
async def calculate_gana(data: GanaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        moon_data = planets.get("Moon", {}).get("d1", {})
        moon_nakshatra = moon_data.get("nakshatra", "")
        moon_pada = moon_data.get("pada", "")
        moon_sign = moon_data.get("sign", "")
        
        DEVA_GANA = ["Ashwini", "Mrigashira", "Punarvasu", "Pushya",
                     "Hasta", "Swati", "Anuradha", "Shravana", "Revati"]
        MANUSHYA_GANA = ["Bharani", "Rohini", "Ardra", "Purva Phalguni",
                         "Uttara Phalguni", "Purva Ashadha", "Uttara Ashadha",
                         "Purva Bhadrapada", "Uttara Bhadrapada"]
        RAKSHASA_GANA = ["Krittika", "Ashlesha", "Magha", "Chitra",
                         "Vishakha", "Jyeshtha", "Mula", "Dhanishta", "Shatabhisha"]
        
        if moon_nakshatra in DEVA_GANA:
            gana = "Deva"
        elif moon_nakshatra in MANUSHYA_GANA:
            gana = "Manushya"
        elif moon_nakshatra in RAKSHASA_GANA:
            gana = "Rakshasa"
        else:
            raise HTTPException(status_code=400, detail="Could not determine Gana")
        
        # Generate AI reading
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
        
        response = gemini_model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.4,
                max_output_tokens=8192
            )
        )
        response_text = response.text.strip()
        
        # Clean markdown code blocks
        reading = response_text
        keywords = [gana, moon_nakshatra, "Vedic Astrology"]
        
        if "KEYWORDS:" in response_text:
            parts = response_text.rsplit("KEYWORDS:", 1)
            reading = parts[0].strip()
            kw_raw = parts[1].strip()
            keywords = [k.strip() for k in kw_raw.split(",") if k.strip()]
            
        result = {
            "reading": reading,
            "keywords": keywords,
            "compatibility": {
                "best": "Consult a Jyotishi for detailed compatibility",
                "challenging": "Depends on full chart analysis"
            }
        }
        
        return {
            "success": True,
            "gana": gana,
            "moon_nakshatra": moon_nakshatra,
            "moon_pada": moon_pada,
            "moon_sign": moon_sign,
            "reading": result.get("reading", ""),
            "keywords": result.get("keywords", []),
            "compatibility": result.get("compatibility", {})
        }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
