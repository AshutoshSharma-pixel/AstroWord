import os
import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.gemini_utils import call_gemini_new
from google.genai import types

router = APIRouter()

class KarakaRequest(BaseModel):
    chart_data: dict
    karaka_type: str  # "darakaraka", "atmakaraka", or "amatyakaraka"

KARAKA_PROMPTS = {
    "darakaraka": """
You are an expert Vedic astrologer specialising in Jaimini astrology.

Chart Context:
{chart_context}

Write a concise Darakaraka reading covering these sections. Be specific to the chart, not generic. Total response should be 400-500 words maximum.

## Spouse Nature & Personality
2 short paragraphs. Cover core personality traits and emotional nature together. Include nakshatra influence.

## How They Will Treat You
1 paragraph. Practical and specific.

## Physical Appearance
4 bullet points maximum. Only the most distinctive features based on the planet and sign.

## Career & Status
5 bullet points maximum. Likely professions only, no explanations.

## Relationship Dynamics
3 strengths and 3 challenges. One line each.

## Marriage Timing
2-3 paragraphs. Cover Mahadasha/Antardasha timing specific to their current dasha period. This is the most important section. Be precise.

Provide the response in pure Markdown. Do not use JSON.
End with:
KEYWORDS: [5-7 keywords]
""",
    "atmakaraka": """
You are an expert Vedic astrologer specialising in Jaimini astrology.

Chart Context:
{chart_context}

Write a concise Atmakaraka reading that is specific to the chart, not generic. Total response should be 300-400 words maximum.

## Soul's Core Desire
1 short paragraph. Cover what the soul wants most and the central life theme. Include nakshatra influence.

## Karmic Lessons
3 bullet points maximum. Keep them specific and practical.

## Life Path & Purpose
1 short paragraph on destiny and what the person is here to embody or achieve.

## Spiritual Path
3 bullet points maximum. Only the most suitable practices or attitudes.

## Strengths & Challenges
3 strengths and 3 challenges. One line each.

Provide the response in pure Markdown. Do not use JSON.
End with:
KEYWORDS: [5-7 keywords]
""",
    "amatyakaraka": """
You are an expert Vedic astrologer specialising in Jaimini astrology.

Chart Context:
{chart_context}

Write a concise Amatyakaraka reading that is specific to the chart, not generic. Total response should be 300-400 words maximum.

## Ideal Career Fields
5 bullet points maximum. Specific professions or sectors only.

## Professional Strengths
3 bullet points maximum. Focus on practical workplace strengths.

## Path to Success
1 short paragraph. Explain how progress comes and mention dasha-linked growth periods.

## Business vs Job
1 short paragraph. Give a clear preference and ideal work environment.

## Financial Potential
3 bullet points maximum. Focus on earning style and wealth pattern.

Provide the response in pure Markdown. Do not use JSON.
End with:
KEYWORDS: [5-7 keywords]
"""
}

@router.post("/karaka")
async def calculate_karaka(data: KarakaRequest):
    try:
        planets = data.chart_data.get("planets", {})
        
        # Exclude Rahu and Ketu — they don't participate in Chara Karaka
        eligible = {
            k: v for k, v in planets.items()
            if k not in ["Rahu", "Ketu"]
        }
        
        if len(eligible) < 7:
            raise HTTPException(
                status_code=400,
                detail="Insufficient planet data for Karaka calculation"
            )
        
        # Sort by degree WITHIN sign (0-30°) — this is the Jaimini method
        sorted_planets = sorted(
            eligible.items(),
            key=lambda x: round(x[1]["d1"]["degree"] % 30, 4),
            reverse=True  # Highest first
        )
        
        # Assign karakas
        atmakaraka_data = sorted_planets[0]      # Highest degree
        amatyakaraka_data = sorted_planets[1]    # Second highest
        darakaraka_data = sorted_planets[-1]     # Lowest degree
        
        # Select the requested karaka
        karaka_map = {
            "atmakaraka": atmakaraka_data,
            "amatyakaraka": amatyakaraka_data,
            "darakaraka": darakaraka_data
        }
        
        if data.karaka_type not in karaka_map:
            raise HTTPException(status_code=400, detail="Invalid karaka type")
        
        selected = karaka_map[data.karaka_type]
        planet_name = selected[0]
        planet_info = selected[1]["d1"]
        
        karaka_result = {
            "planet": planet_name,
            "degree": round(planet_info["degree"] % 30, 2),
            "full_degree": round(planet_info["degree"], 2),
            "sign": planet_info["sign"],
            "nakshatra": planet_info["nakshatra"],
            "pada": planet_info["pada"],
            "retrograde": planet_info.get("retrograde", False),
            "combust": planet_info.get("combust", False)
        }
        
        # Build prompt for AI reading
        chart_context = f"""
Karaka Type: {data.karaka_type.upper()}
Planet: {planet_name}
Degree within sign: {karaka_result['degree']}°
Full sidereal degree: {karaka_result['full_degree']}°
Sign: {planet_info['sign']}
Nakshatra: {planet_info['nakshatra']} pada {planet_info['pada']}
Retrograde: {karaka_result['retrograde']}
Combust: {karaka_result['combust']}

Full Chart Ascendant: {data.chart_data.get('ascendant', {}).get('sign', 'Unknown')}
Current Mahadasha: {data.chart_data.get('current_mahadasha', {}).get('lord', 'Unknown') if data.chart_data.get('current_mahadasha') else 'Unknown'}
"""
        
        prompt = KARAKA_PROMPTS[data.karaka_type].format(chart_context=chart_context.strip())
    
        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=4096,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        full_text = response.text or ""

        # Extract keywords
        keywords = [planet_name, planet_info["sign"], planet_info["nakshatra"]]
        if "KEYWORDS:" in full_text:
            parts = full_text.rsplit("KEYWORDS:", 1)
            full_text = parts[0].rstrip()
            kw_raw = parts[1].strip()
            keywords = [k.strip() for k in kw_raw.split(",") if k.strip()]

        return {
            "success": True,
            "karaka_type": data.karaka_type,
            "planet": karaka_result["planet"],
            "degree": karaka_result["degree"],
            "full_degree": karaka_result["full_degree"],
            "sign": karaka_result["sign"],
            "nakshatra": karaka_result["nakshatra"],
            "pada": karaka_result["pada"],
            "retrograde": karaka_result["retrograde"],
            "combust": karaka_result["combust"],
            "all_karakas": {
                "atmakaraka": {
                    "planet": sorted_planets[0][0],
                    "degree": round(sorted_planets[0][1]["d1"]["degree"] % 30, 2)
                },
                "amatyakaraka": {
                    "planet": sorted_planets[1][0],
                    "degree": round(sorted_planets[1][1]["d1"]["degree"] % 30, 2)
                },
                "darakaraka": {
                    "planet": sorted_planets[-1][0],
                    "degree": round(sorted_planets[-1][1]["d1"]["degree"] % 30, 2)
                }
            },
            "reading": full_text,
            "keywords": keywords
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
