import os
import json
import re
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from firebase_admin import firestore, storage
from api.gemini_utils import call_gemini_new
from google.genai import types
from weasyprint import HTML

router = APIRouter()

# ── Shared astrology constants (Duplicated from marriage.py) ──────────────────
SIGN_LORDS = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
    "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
    "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
    "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
}
ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]
NAKSHATRA_SYLLABLES = {
    "Ashwini": ["Chu", "Che", "Cho", "La"],
    "Bharani": ["Li", "Lu", "Le", "Lo"],
    "Krittika": ["A", "I", "U", "E"],
    "Rohini": ["O", "Va", "Vi", "Vu"],
    "Mrigashira": ["Ve", "Vo", "Ka", "Ki"],
    "Ardra": ["Ku", "Gha", "Ing", "Jha"],
    "Punarvasu": ["Ke", "Ko", "Ha", "Hi"],
    "Pushya": ["Hu", "He", "Ho", "Da"],
    "Ashlesha": ["Di", "Du", "De", "Do"],
    "Magha": ["Ma", "Mi", "Mu", "Me"],
    "Purva Phalguni": ["Mo", "Ta", "Ti", "Tu"],
    "Uttara Phalguni": ["Te", "To", "Pa", "Pi"],
    "Hasta": ["Pu", "Sha", "Na", "Tha"],
    "Chitra": ["Pe", "Po", "Ra", "Ri"],
    "Swati": ["Ru", "Re", "Ro", "Ta"],
    "Vishakha": ["Ti", "Tu", "Te", "To"],
    "Anuradha": ["Na", "Ni", "Nu", "Ne"],
    "Jyeshtha": ["No", "Ya", "Yi", "Yu"],
    "Mula": ["Ye", "Yo", "Ba", "Bi"],
    "Purva Ashadha": ["Bu", "Dha", "Bha", "Dha"],
    "Uttara Ashadha": ["Be", "Bo", "Ja", "Ji"],
    "Shravana": ["Ju", "Je", "Jo", "Sha"],
    "Dhanishta": ["Ga", "Gi", "Gu", "Ge"],
    "Shatabhisha": ["Go", "Sa", "Si", "Su"],
    "Purva Bhadrapada": ["Se", "So", "Da", "Di"],
    "Uttara Bhadrapada": ["Du", "Tha", "Jha", "Da"],
    "Revati": ["De", "Do", "Cha", "Chi"]
}

# ── Shared helpers (Duplicated from marriage.py) ──────────────────────────────
def resolve_seventh_lord(asc_sign: str) -> tuple[str, str]:
    if asc_sign in ZODIAC_SIGNS:
        asc_idx = ZODIAC_SIGNS.index(asc_sign)
        seventh_sign = ZODIAC_SIGNS[(asc_idx + 6) % 12]
        return seventh_sign, SIGN_LORDS.get(seventh_sign, "Venus")
    return "Unknown", "Venus"

def resolve_planet_house(planet_name: str, asc_sign: str, planets: dict) -> int | None:
    p_sign = planets.get(planet_name, {}).get("d1", {}).get("sign", "")
    if p_sign in ZODIAC_SIGNS and asc_sign in ZODIAC_SIGNS:
        asc_idx = ZODIAC_SIGNS.index(asc_sign)
        p_idx = ZODIAC_SIGNS.index(p_sign)
        return ((p_idx - asc_idx) % 12) + 1
    return None

def fmt_house(n: int | None) -> str:
    if n is None:
        return "unknown"
    suffixes = {1: "st", 2: "nd", 3: "rd"}
    return f"{n}{suffixes.get(n if n <= 3 else 0, 'th')}"

# ── Request Model ─────────────────────────────────────────────────────────────
class GenerateReportRequest(BaseModel):
    chart_data: dict
    payment_id: str
    user_id: str
    razorpay_order_id: str = ""
    razorpay_signature: str = ""

def get_db():
    try:
        return firestore.client()
    except Exception:
        return None

@router.post("/api/marriage-report/generate")
async def generate_marriage_report(request: GenerateReportRequest, db=Depends(get_db)):
    if not db:
        raise HTTPException(status_code=500, detail="Database not initialized")
        
    import hmac
    import hashlib
    
    # 1. Verify Payment with Razorpay signature
    razorpay_key_secret = os.environ.get("RAZORPAY_KEY_SECRET", "")
    
    if request.razorpay_order_id and request.razorpay_signature and razorpay_key_secret:
        msg = f"{request.razorpay_order_id}|{request.payment_id}"
        expected = hmac.new(
            razorpay_key_secret.encode(),
            msg.encode(),
            hashlib.sha256
        ).hexdigest()
        if expected != request.razorpay_signature:
            raise HTTPException(status_code=400, detail="Invalid payment signature")
    
    # Store in Firestore for records
    try:
        report_order_ref = db.collection("report_orders").document(request.payment_id)
        report_order_ref.set({
            "payment_id": request.payment_id,
            "user_id": request.user_id,
            "amount": 199,
            "status": "processing",
            "created_at": firestore.SERVER_TIMESTAMP
        })
    except Exception:
        pass

    try:
        # 2. Run Calculations (Duplicated core logic)
        chart_data = request.chart_data
        planets = chart_data.get("planets", {})
        ascendant = chart_data.get("ascendant", {})
        asc_sign = ascendant.get("sign", "Unknown")
        
        # 2.1 Karakas
        eligible = {k: v for k, v in planets.items() if k not in ["Rahu", "Ketu", "Uranus", "Neptune", "Pluto"]}
        if len(eligible) >= 7:
            sorted_planets = sorted(
                eligible.items(),
                key=lambda x: round(x[1]["d1"]["degree"] % 30, 4),
                reverse=True
            )
            atmakaraka = sorted_planets[0][0]
            amatyakaraka = sorted_planets[1][0]
            darakaraka = sorted_planets[-1][0]
            
            darakaraka_result = f"{darakaraka} in {planets[darakaraka]['d1']['sign']} ({planets[darakaraka]['d1']['nakshatra']})"
            atmakaraka_result = f"{atmakaraka} in {planets[atmakaraka]['d1']['sign']} ({planets[atmakaraka]['d1']['nakshatra']})"
            amatyakaraka_result = f"{amatyakaraka} in {planets[amatyakaraka]['d1']['sign']} ({planets[amatyakaraka]['d1']['nakshatra']})"
        else:
            darakaraka_result = atmakaraka_result = amatyakaraka_result = "Insufficient planet data"

        # 2.2 Gana
        DEVA_GANA = ["Ashwini", "Mrigashira", "Punarvasu", "Pushya", "Hasta", "Swati", "Anuradha", "Shravana", "Revati"]
        MANUSHYA_GANA = ["Bharani", "Rohini", "Ardra", "Purva Phalguni", "Uttara Phalguni", "Purva Ashadha", "Uttara Ashadha", "Purva Bhadrapada", "Uttara Bhadrapada"]
        RAKSHASA_GANA = ["Krittika", "Ashlesha", "Magha", "Chitra", "Vishakha", "Jyeshtha", "Mula", "Dhanishta", "Shatabhisha"]
        
        moon_nak = planets.get("Moon", {}).get("d1", {}).get("nakshatra", "")
        gana = "Unknown"
        if moon_nak in DEVA_GANA: gana = "Deva"
        elif moon_nak in MANUSHYA_GANA: gana = "Manushya"
        elif moon_nak in RAKSHASA_GANA: gana = "Rakshasa"
        gana_result = gana

        # 2.3 Marriage Type Indicators
        seventh_sign, seventh_lord = resolve_seventh_lord(asc_sign)
        seventh_lord_house = resolve_planet_house(seventh_lord, asc_sign, planets)
        marriage_type_result = f"7th house sign: {seventh_sign}, 7th lord: {seventh_lord} placed in {fmt_house(seventh_lord_house)} house."

        # 2.4 Marriage Year Windows
        venus_house = resolve_planet_house("Venus", asc_sign, planets)
        jupiter_house = resolve_planet_house("Jupiter", asc_sign, planets)
        rahu_house = resolve_planet_house("Rahu", asc_sign, planets)
        current_mahadasha = chart_data.get("current_mahadasha", {}).get("lord", "Unknown")
        marriage_year_result = f"7th lord {seventh_lord} in {fmt_house(seventh_lord_house)} house. Venus in {fmt_house(venus_house)} house. Jupiter in {fmt_house(jupiter_house)} house. Rahu in {fmt_house(rahu_house)} house. Current Mahadasha: {current_mahadasha}."

        # 2.5 Spouse Initial
        def get_syllables(planet_name):
            p = planets.get(planet_name, {}).get("d1", {})
            nak = p.get("nakshatra", "")
            pada_raw = p.get("pada", 1)
            pada = int(pada_raw) if isinstance(pada_raw, (int, float)) or (isinstance(pada_raw, str) and pada_raw.isdigit()) else 1
            syls = NAKSHATRA_SYLLABLES.get(nak, [])
            primary = syls[pada - 1] if 1 <= pada <= len(syls) else syls[0] if syls else "A"
            return primary[0].upper() if primary else "A"

        init1 = get_syllables(seventh_lord)
        init2 = get_syllables(darakaraka) if "darakaraka" in locals() else "A"
        init3 = get_syllables("Venus")
        spouse_initial_result = f"Possible initials based on 3 methods: {init1}, {init2}, {init3}."

        # 3. Call Gemini
        prompt = f"""You are an expert Vedic astrologer. Generate a complete, deeply personal Marriage Report based on the following chart analysis. Write in a warm, insightful, and authoritative tone.
Chart Data: {json.dumps(chart_data)}
Darakaraka: {darakaraka_result}
Atmakaraka: {atmakaraka_result}
Amatyakaraka: {amatyakaraka_result}
Gana: {gana_result}
Marriage Type indicators: {marriage_type_result}
Marriage Year windows: {marriage_year_result}
Spouse Name Initial: {spouse_initial_result}

Generate a marriage report with these exact sections. Use the section title exactly as written below on a line by itself to start each section:

YOUR COSMIC MARRIAGE PROFILE
(3-4 sentences overview)

YOUR FUTURE SPOUSE
(detailed description - appearance, personality, profession, nature)

WHEN WILL YOU MARRY
(specific year windows with Dasha explanation)

LOVE OR ARRANGED
(percentage breakdown with explanation)

SPOUSE NAME INITIAL
(predicted syllables with explanation)

YOUR COMPATIBILITY NATURE
(Gana analysis)

2026-2027 FORECAST
(is this their year? specific transit analysis)

REMEDIES & GUIDANCE
(3-4 specific Vedic remedies to attract the right partner)

Be specific, personal, and detailed. Minimum 1200 words total.
"""

        response = call_gemini_new(
            prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                max_output_tokens=8192
            )
        )
        response_text = response.text.strip()

        # 4. Parse Response and Generate HTML
        section_titles = [
            "YOUR COSMIC MARRIAGE PROFILE",
            "YOUR FUTURE SPOUSE",
            "WHEN WILL YOU MARRY",
            "LOVE OR ARRANGED",
            "SPOUSE NAME INITIAL",
            "YOUR COMPATIBILITY NATURE",
            "2026-2027 FORECAST",
            "REMEDIES & GUIDANCE"
        ]
        
        sections_html = ""
        
        # Split by section titles
        pattern = "|".join([f"(?:^|\\n){re.escape(title)}(?:\\n|$)" for title in section_titles])
        splits = re.split(pattern, response_text)
        
        # Find titles in order of appearance
        found_titles = []
        for line in response_text.split('\n'):
            line_clean = line.strip()
            if line_clean in section_titles:
                found_titles.append(line_clean)
                
        # splits[0] is text before first title (usually empty or intro)
        content_idx = 1
        for title in found_titles:
            if content_idx < len(splits):
                content = splits[content_idx].strip()
                content_idx += 1
                
                # Convert markdown-like content to simple HTML
                content_html = content.replace("\n\n", "</p><p>").replace("\n", "<br>")
                content_html = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", content_html)
                
                sections_html += f"""
                <div class="section">
                  <div class="section-title">{title}</div>
                  <div class="section-content"><p>{content_html}</p></div>
                </div>
                """

        # Fallback if parsing failed completely
        if not sections_html:
            formatted_text = response_text.replace("\n\n", "</p><p>").replace("\n", "<br>")
            sections_html = f"""
            <div class="section">
              <div class="section-title">Your Report</div>
              <div class="section-content"><p>{formatted_text}</p></div>
            </div>
            """

        html_template = f"""
        <!DOCTYPE html>
        <html>
        <head>
        <style>
          body {{ background: #0a0a0f; color: #e8e4dc; font-family: Georgia, serif; padding: 40px; }}
          .header {{ text-align: center; border-bottom: 1px solid #c9a84c; padding-bottom: 30px; margin-bottom: 40px; }}
          .title {{ color: #c9a84c; font-size: 36px; margin-bottom: 8px; }}
          .subtitle {{ color: #888; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; }}
          .section {{ margin-bottom: 35px; }}
          .section-title {{ color: #c9a84c; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; border-left: 3px solid #c9a84c; padding-left: 12px; margin-bottom: 15px; }}
          .section-content {{ color: #b4aa96; font-size: 14px; line-height: 1.9; }}
          .footer {{ text-align: center; margin-top: 60px; padding-top: 20px; border-top: 1px solid #333; color: #555; font-size: 11px; letter-spacing: 2px; }}
          .gold {{ color: #c9a84c; }}
        </style>
        </head>
        <body>
          <div class="header">
            <div class="title">✦ Your Marriage Report ✦</div>
            <div class="subtitle">Precision Vedic AI · AstroWord.in</div>
            <div style="color: #666; font-size: 12px; margin-top: 10px;">Generated on {datetime.now().strftime("%Y-%m-%d")}</div>
          </div>
          {sections_html}
          <div class="footer">ASTROWORD.IN · PRECISION VEDIC AI · LANIRI AYANAMSA · SWISS EPHEMERIS</div>
        </body>
        </html>
        """

        # 5. Generate PDF
        pdf_bytes = HTML(string=html_template).write_pdf()

        # 6. Save to Firebase Storage
        bucket = storage.bucket()
        blob = bucket.blob(f"reports/{request.user_id}/{request.payment_id}.pdf")
        blob.upload_from_string(pdf_bytes, content_type="application/pdf")
        
        # Generate signed URL valid for 7 days
        signed_url = blob.generate_signed_url(expiration=timedelta(days=7))

        # 7. Update Firestore
        order_ref.update({
            "report_generated": True,
            "report_url": signed_url,
            "report_generated_at": firestore.SERVER_TIMESTAMP
        })

        return {
            "success": True,
            "download_url": signed_url
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to generate report: {str(e)}")
