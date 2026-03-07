import os
import json
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta
from api.gemini_utils import call_gemini_new, call_gemini_stream, GEMINI_KEYS
from google.genai import types
from google import genai as new_genai

router = APIRouter()

def get_db():
    try:
        return firestore.client()
    except Exception:
        return None

class AskRequest(BaseModel):
    user_id: str
    question: str
    chart_data: dict
    chat_history: list = []

SYSTEM_PROMPT = """
You are AstroWord — India's most precise Vedic astrology AI engine.

You have been given a complete birth chart including D1, D9, house lords, aspects, conjunctions, nakshatra placements, planetary strength indicators (exalted/debilitated/retrograde/combust), detected yogas, and full Vimshottari dasha timeline including current Mahadasha and Antardasha.

RULES YOU MUST FOLLOW FOR EVERY ANSWER:

1. IDENTIFY THE RELEVANT HOUSE first. Career = 10th, Marriage = 7th, Finance = 2nd/11th, Health = 1st/6th, Education = 4th/5th, Travel = 9th/12th, Siblings = 3rd, Mother = 4th, Father = 9th

2. CHECK THE HOUSE LORD — where is it placed? Is it in a friendly, exalted, debilitated, or enemy sign? Is it retrograde or combust? A debilitated or combust house lord severely weakens the house matters.

3. CHECK ASPECTS on the relevant house — which planets aspect it and are they benefic (Jupiter, Venus, Moon, Mercury) or malefic (Saturn, Mars, Rahu, Ketu, Sun)?

4. CHECK CONJUNCTIONS in the relevant house — planets sitting together create powerful combinations.

5. CHECK YOGAS — are there any yogas that directly support or damage the house in question?

6. CROSS-REFERENCE D9 — for marriage/relationships always check D9 7th house and its lord. For career check D10 if available. For spiritual matters check D9 ascendant lord.

7. CHECK CURRENT DASHA — the Mahadasha and Antardasha lords reveal WHEN things happen. If the question is about timing, always connect the answer to the current and upcoming dasha periods. A good yoga that is not activated by dasha will not manifest yet.

8. IDENTIFY THE YOGAKARAKA — for this ascendant, which planet is the yogakaraka (lord of both a kendra and trikona)? If that planet is strong, it elevates the entire chart.

9. GIVE SPECIFIC TIMING — never say "sometime in the future." Give a specific dasha window like "between March 2026 and October 2027 during Venus-Mercury antardasha."

10. REFERENCE NAKSHATRAS — the nakshatra of the relevant planet adds crucial nuance. Example: Moon in Magha suggests royal lineage and authority while Moon in Ardra suggests turbulence and transformation.

11. NEVER FABRICATE DASHA DATES — ONLY use the exact Dasha start and end dates provided in the chart data under "Current Dasha" and "All Antardashas". Never invent or estimate dates from memory. If asked about timing always copy the exact dates from the chart data provided to you.

ANSWER STRUCTURE — always format exactly like this:

## [Topic] Analysis

### Primary Indicators
[Check the primary relevant house, its exact lord, and ALL aspects and conjunctions tied to them. Also look at secondary connected houses to get a broader picture of the situation]

### Supporting Factors
[Check yogas, D9 cross-reference, nakshatra nuances, and how other planets influence the main indicators]

### Current Dasha Influence
[Connect Mahadasha + Antardasha to the question]

### Timing Window
[Give specific dates/periods based on the Dasha timeline]

> **Summary:** [2-3 sentence conclusion referencing specific planets, aspects, and houses]

Formatting Rules:
Use **bold** for planet names, house numbers, nakshatras, and yoga names.
Keep paragraphs short. Use bullet points for listing multiple factors.
Never give generic statements. Every sentence must reference the actual chart.
Never say "generally in astrology" — always say "in YOUR chart."

The charts available for analysis are listed above. Only reference charts that are 
included in the provided data. Do not mention D10 if only D1/D9 are provided.
If the user's question requires a chart not in their plan, politely mention that 
this analysis requires an upgrade (e.g., "For past life analysis, the D60 chart 
is needed — available in the Pro plan").

Tone: Precise, confident, analytical, and deeply personal. Like a senior Jyotishi speaking naturally rather than reading from a rigid checklist.

Return ONLY this exact JSON:
{
    "answer": "your full markdown formatted answer here",
    "confidence": "HIGH or MEDIUM or LOW",
    "tags": ["relevant chart elements used"]
}

Confidence guide:
- HIGH: Birth time confirmed, multiple factors align clearly
- MEDIUM: Some conflicting signals or birth time may have slight variance
- LOW: Contradictory indicators or insufficient data
"""

def get_relevant_charts(question: str, user_plan: str) -> list:
    """
    Returns which divisional charts are relevant for this question.
    Weights charts by relevance to the question topic.
    """
    question_lower = question.lower()
    
    # Always include D1 and D9
    relevant = ["D1", "D9"]
    
    if user_plan == "free":
        return relevant
    
    # Starter plan adds D10
    if user_plan in ["starter", "pro", "annual"]:
        career_keywords = ["career", "job", "profession", "work", "business", 
                          "success", "promotion", "salary", "company", "office",
                          "placement", "interview", "professional"]
        if any(kw in question_lower for kw in career_keywords):
            relevant.append("D10")
    
    if user_plan not in ["pro", "annual"]:
        return relevant
    
    # Pro/Annual plan — add charts based on question topic
    
    # Children/creativity questions → D7
    children_keywords = ["child", "children", "baby", "pregnancy", "son", 
                        "daughter", "creative", "creation", "progeny"]
    if any(kw in question_lower for kw in children_keywords):
        relevant.append("D7")
    
    # Property/home questions → D4
    property_keywords = ["house", "property", "home", "land", "real estate",
                        "flat", "apartment", "building", "vehicle", "car"]
    if any(kw in question_lower for kw in property_keywords):
        relevant.append("D4")
    
    # Spiritual questions → D20
    spiritual_keywords = ["spiritual", "meditation", "religion", "god", "temple",
                         "moksha", "liberation", "spiritual path", "dharma", "yoga"]
    if any(kw in question_lower for kw in spiritual_keywords):
        relevant.append("D20")
    
    # Education questions → D24
    education_keywords = ["education", "study", "college", "university", "exam",
                         "degree", "course", "learning", "knowledge", "school"]
    if any(kw in question_lower for kw in education_keywords):
        relevant.append("D24")
    
    # Health/challenges → D30
    health_keywords = ["health", "disease", "illness", "sick", "medical",
                      "hospital", "surgery", "challenge", "problem", "obstacle"]
    if any(kw in question_lower for kw in health_keywords):
        relevant.append("D30")
    
    # Past life / deep karma → D60
    pastlife_keywords = ["past life", "previous life", "karma", "soul", "rebirth",
                        "reincarnation", "past", "previous birth", "destiny",
                        "why am i", "purpose of life", "why do i suffer"]
    if any(kw in question_lower for kw in pastlife_keywords):
        relevant.append("D60")
    
    return relevant

def build_chart_context(chart_data: dict, relevant_charts: list) -> str:
    """Build the chart description using only relevant divisional charts."""
    
    full_description = chart_data.get("description_text", "")
    
    # D1 and D9 are always in the description
    # For additional charts, append their sections
    additional_context = ""
    
    chart_sections = {
        "D10": "D10 Chart (Dashamsha - Career)",
        "D7": "D7 Chart (Saptamsha - Children)",
        "D4": "D4 Chart (Chaturthamsha - Property)",
        "D20": "D20 Chart (Vimshamsha - Spirituality)",
        "D24": "D24 Chart (Chaturvimshamsha - Education)",
        "D30": "D30 Chart (Trimshamsha - Challenges)",
        "D60": "D60 Chart (Shashtiamsha - Past Life)"
    }
    
    for chart in relevant_charts:
        if chart in ["D1", "D9"]:
            continue
        section_key = chart_sections.get(chart, "")
        if section_key and section_key in full_description:
            # Extract just this chart's section from the full description
            start = full_description.find(section_key)
            # Find next chart section or end
            next_section = len(full_description)
            for other_chart in chart_sections.values():
                if other_chart != section_key:
                    pos = full_description.find(other_chart, start + 1)
                    if pos != -1 and pos < next_section:
                        next_section = pos
            additional_context += full_description[start:next_section] + "\n"
    
    cut_point = full_description.find("D10")
    if cut_point != -1:
        base_desc = full_description[:cut_point]
    else:
        # If D10 isn't found, find Vimshottari to use as cut point
        v_point = full_description.find("Vimshottari Dasha Timeline:")
        base_desc = full_description[:v_point] if v_point != -1 else full_description

    # Always bring back the timeline and today's date
    end_point = full_description.find("Vimshottari Dasha Timeline:")
    end_desc = full_description[end_point:] if end_point != -1 else ""

    return base_desc + additional_context + end_desc

@router.post("/ask")
async def ask_astrologer(data: AskRequest):
    db = get_db()
    try:
        user_ref = None
        plan = "free"
        if db and data.user_id and data.user_id != "demo-user":
            try:
                user_ref = db.collection("users").document(data.user_id)
                user_doc = user_ref.get()
                
                if user_doc.exists:
                    user_data = user_doc.to_dict()
                    today_str = datetime.now().strftime("%Y-%m-%d")
                    last_reset = user_data.get("last_reset_date", "")
                    
                    if last_reset != today_str:
                        user_ref.update({
                            "questions_today": 0,
                            "last_reset_date": today_str
                        })
                        questions_today = 0
                    else:
                        questions_today = user_data.get("questions_today", 0)
                    
                    plan = user_data.get("plan", "FREE").lower()
                    questions_limit = user_data.get("questions_limit", 5)
                    
                    if questions_today >= questions_limit:
                        # Calculate time until midnight reset
                        now = datetime.now()
                        midnight = datetime.combine(now.date() + timedelta(days=1), datetime.min.time())
                        hours_remaining = int((midnight - now).total_seconds() // 3600)
                        minutes_remaining = int(((midnight - now).total_seconds() % 3600) // 60)
                        
                        if hours_remaining > 0:
                            reset_time = f"{hours_remaining} hours and {minutes_remaining} minutes"
                        else:
                            reset_time = f"{minutes_remaining} minutes"
                        
                        return {
                            "success": False,
                            "limit_reached": True,
                            "data": {
                                "answer": f"LIMIT_REACHED:{reset_time}",
                                "confidence": "LOW",
                                "tags": []
                            }
                        }
                else:
                    today_str = datetime.now().strftime("%Y-%m-%d")
                    user_ref.set({
                        "questions_today": 0,
                        "questions_limit": 5,
                        "plan": "FREE",
                        "last_reset_date": today_str
                    })
            except Exception:
                pass  # Non-fatal — limit tracking unavailable

        if not os.environ.get("GEMINI_API_KEY"):
            raise HTTPException(status_code=500, detail="GEMINI_API_KEY environment variable is missing.")

        # Get pre-calculated string, fallback to JSON dump if not generated
        plan = plan.lower()
        relevant_charts = get_relevant_charts(data.question, plan)
        chart_description = build_chart_context(data.chart_data, relevant_charts)
        charts_used = ", ".join(relevant_charts)
        
        history_text = "None"
        if hasattr(data, 'chat_history') and data.chat_history:
            formatted_history = []
            for msg in data.chat_history:
                role = "User" if msg.get("role") == "user" else "AstroWord"
                formatted_history.append(f"{role}: {msg.get('content')}")
            history_text = "\n\n".join(formatted_history[-10:])

        fallback_instruction = ""
        if data.chart_data.get("isFallback"):
            fallback_instruction = "\nIMPORTANT: The detailed chart data is missing for this legacy session. Rely entirely on the RECENT CONVERSATION HISTORY to extrapolate context and answer the user. Do not refuse to answer or complain about missing chart data."

        prompt = f"""
{fallback_instruction}
{SYSTEM_PROMPT}

Charts analyzed for this question: {charts_used}
(Selected based on question topic and user plan: {plan.upper()})

CHART DATA:
{chart_description}

RECENT CONVERSATION HISTORY:
{history_text}

USER QUESTION: {data.question}
"""

        response = call_gemini_new(
            prompt=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                response_mime_type="application/json"
            )
        )
        
        response_text = response.text
        
        clean_text = response_text.strip()
        if clean_text.startswith("```json"):
            clean_text = clean_text[7:]
        if clean_text.startswith("```"):
            clean_text = clean_text[3:]
        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]
        clean_text = clean_text.strip()
        
        try:
            parsed_response = json.loads(clean_text)
            
            # Increment question count for all users (limits handle caps)
            if user_ref:
                try:
                    user_ref.update({"questions_today": firestore.Increment(1)})
                except Exception:
                    pass  # Non-fatal
                    
            return {
                "success": True,
                "data": parsed_response
            }
        except Exception:
            return {
                 "success": True,
                 "data": {
                     "answer": response_text,
                     "confidence": "MEDIUM", 
                     "tags": ["Parse Error"]
                 }
            }

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "detail": f"Backend Exception: {str(e)}",
            "data": {
                "answer": f"Backend error: {str(e)}",
                "confidence": "LOW",
                "tags": ["System Error"]
            }
        }


@router.post("/ask/stream")
async def ask_stream(data: AskRequest):
    """Streaming version of /api/ask using Server-Sent Events."""
    db = get_db()
    user_ref = None
    plan = "free"

    # Auth / limit check — same as /ask
    if db and data.user_id and data.user_id != "demo-user":
        try:
            user_ref = db.collection("users").document(data.user_id)
            user_doc = user_ref.get()
            if user_doc.exists:
                user_data = user_doc.to_dict()
                today_str = datetime.now().strftime("%Y-%m-%d")
                last_reset = user_data.get("last_reset_date", "")
                if last_reset != today_str:
                    user_ref.update({"questions_today": 0, "last_reset_date": today_str})
                    questions_today = 0
                else:
                    questions_today = user_data.get("questions_today", 0)
                plan = user_data.get("plan", "FREE").lower()
                questions_limit = user_data.get("questions_limit", 5)
                if questions_today >= questions_limit:
                    now = datetime.now()
                    midnight = datetime.combine(now.date() + timedelta(days=1), datetime.min.time())
                    hrs = int((midnight - now).total_seconds() // 3600)
                    mins = int(((midnight - now).total_seconds() % 3600) // 60)
                    reset_time = f"{hrs} hours and {mins} minutes" if hrs > 0 else f"{mins} minutes"
                    async def _limit_gen():
                        yield f"data: {json.dumps({'limit_reached': True, 'reset_time': reset_time})}\n\n"
                        yield "data: [DONE]\n\n"
                    return StreamingResponse(_limit_gen(), media_type="text/event-stream")
        except Exception:
            pass

    # Build prompt (plain markdown — no JSON output request)
    relevant_charts = get_relevant_charts(data.question, plan)
    chart_description = build_chart_context(data.chart_data, relevant_charts)
    charts_used = ", ".join(relevant_charts)
    history_text = "None"
    if data.chat_history:
        formatted = []
        for msg in data.chat_history:
            role = "User" if msg.get("role") == "user" else "AstroWord"
            formatted.append(f"{role}: {msg.get('content')}")
        history_text = "\n\n".join(formatted[-10:])
    fallback_instruction = ""
    if data.chart_data.get("isFallback"):
        fallback_instruction = "\nIMPORTANT: Chart data is missing. Rely on conversation history.\n"

    STREAM_RULES = SYSTEM_PROMPT.split("Return ONLY this exact JSON")[0].strip()
    prompt = f"""{fallback_instruction}{STREAM_RULES}

Charts analyzed: {charts_used}

CHART DATA:
{chart_description}

RECENT CONVERSATION HISTORY:
{history_text}

USER QUESTION: {data.question}

Write your full analysis in plain text/markdown following the structure above. 
CRITICAL INSTRUCTION: DO NOT RETURN JSON. DO NOT WRAP YOUR RESPONSE IN A JSON BLOCK. 
DO NOT INCLUDE "answer", "confidence", OR "tags" FIELDS. JUST WRITE THE PLAIN MARKDOWN ANALYSIS DIRECTLY."""

    _user_ref = user_ref  # capture for closure

    def generate(
        _prompt=prompt,
        _user_ref=user_ref,
        _keys=GEMINI_KEYS
    ):
        print("GENERATE_CALLED")
        print(f"DEBUG generate() called, prompt length={len(_prompt)}, keys={len(_keys)}")
        RETRIABLE_ERRORS = ("429", "Resource exhausted", "INVALID_ARGUMENT", "API key not valid", "401", "403")
        last_error = None
        
        for i, key in enumerate(_keys):
            try:
                client = new_genai.Client(api_key=key, http_options={"api_version": "v1beta"})
                response_stream = client.models.generate_content_stream(
                    model="gemini-2.5-flash",
                    contents=_prompt,
                    config=types.GenerateContentConfig(temperature=0.3)
                )
                for chunk in response_stream:
                    try:
                        text_chunk = chunk.text
                        if text_chunk:
                            clean_chunk = json.dumps({'chunk': text_chunk})
                            yield f"data: {clean_chunk}\n\n"
                    except Exception:
                        pass
                
                if _user_ref:
                    try:
                        _user_ref.update({"questions_today": firestore.Increment(1)})
                    except Exception:
                        pass
                yield "data: [DONE]\n\n"
                return
                
            except Exception as e:
                import traceback
                traceback.print_exc()
                print(f"DEBUG KEY {i+1} ERROR: {type(e).__name__}: {str(e)}")
                last_error = e
                error_msg = str(e)
                is_retriable = any(err in error_msg for err in RETRIABLE_ERRORS)
                has_next_key = i < len(_keys) - 1
                if is_retriable and has_next_key:
                    continue
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
                yield "data: [DONE]\n\n"
                return
        
        if last_error:
            yield f"data: {json.dumps({'error': str(last_error)})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )

