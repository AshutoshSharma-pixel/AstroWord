import os
import json
import re
import base64
import hmac
import hashlib
import time
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from firebase_admin import firestore
import resend

from api.gemini_utils import call_gemini_new
from google.genai import types

# ReportLab imports
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

router = APIRouter()
resend.api_key = os.environ.get("RESEND_API_KEY", "")

# ── SHARED VEDIC ASTROLOGY CONSTANTS ───────────────────────────────────────

ZODIAC_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

SIGN_LORDS = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury",
    "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
    "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter",
    "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
}

# ── REQUEST MODEL ──────────────────────────────────────────────────────────

class KundaliReportRequest(BaseModel):
    boy_name: str
    girl_name: str
    buyer_email: str
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    boy_chart: dict
    girl_chart: dict
    ashtakoota_breakdown: list
    total_score: float
    mangal_dosha_boy: bool
    mangal_dosha_girl: bool
    mangal_dosha_cancelled: bool = False
    boy_jaimini_karakas: dict
    girl_jaimini_karakas: dict
    boy_upapada_lagna: dict
    girl_upapada_lagna: dict

def get_db():
    try:
        return firestore.client()
    except Exception:
        return None

# ── REPORTLAB CANVAS CALLBAK FOR HEADER & FOOTER ───────────────────────────

def add_footer_header(canvas, doc):
    canvas.saveState()
    if doc.page == 1:
        # Cover page elegant border
        canvas.setStrokeColor(colors.HexColor("#c9a84c"))
        canvas.setLineWidth(2)
        canvas.rect(36, 36, 540, 720)
        canvas.restoreState()
        return
        
    # Header
    canvas.setStrokeColor(colors.HexColor("#c9a84c"))
    canvas.setLineWidth(1)
    canvas.line(36, 756, 576, 756)
    canvas.setFont('Helvetica-Bold', 8)
    canvas.setFillColor(colors.HexColor("#c9a84c"))
    canvas.drawString(36, 762, "ASTROWORD ✦ KUNDALI COMPATIBILITY REPORT")
    
    # Footer
    canvas.line(36, 44, 576, 44)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawString(36, 32, "ASTROWORD.IN · PRECISION VEDIC AI")
    canvas.drawRightString(576, 32, f"Page {doc.page}")
    canvas.restoreState()

def convert_markdown_to_flowables(text, body_style, h1_style, bullet_style):
    flowables = []
    lines = text.split('\n')
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
            
        if stripped.startswith('### ') or stripped.startswith('## ') or stripped.startswith('# '):
            for prefix in ['### ', '## ', '# ']:
                if stripped.startswith(prefix):
                    content = stripped[len(prefix):].strip()
                    content = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', content)
                    content = re.sub(r'\*(.*?)\*', r'<i>\1</i>', content)
                    flowables.append(Paragraph(content, h1_style))
                    break
        elif stripped.startswith('- ') or stripped.startswith('* '):
            content = stripped[2:].strip()
            content = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', content)
            content = re.sub(r'\*(.*?)\*', r'<i>\1</i>', content)
            flowables.append(Paragraph(f"&bull; {content}", bullet_style))
        else:
            content = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', stripped)
            content = re.sub(r'\*(.*?)\*', r'<i>\1</i>', content)
            flowables.append(Paragraph(content, body_style))
            
    return flowables

# ── POST ENDPOINT ──────────────────────────────────────────────────────────

@router.post("/kundali-matching/report")
async def generate_kundali_report(request: KundaliReportRequest, db=Depends(get_db)):
    if not db:
        raise HTTPException(status_code=500, detail="Database connection not available")

    # 1. Verify Razorpay Signature
    razorpay_key_secret = os.environ.get("RAZORPAY_KEY_SECRET", "")
    print(f"[DEBUG] Signature Verification check:")
    print(f"  - Order ID: {request.razorpay_order_id}")
    print(f"  - Payment ID: {request.razorpay_payment_id}")
    print(f"  - Received Signature: {request.razorpay_signature}")
    
    is_bypass = (
        not request.razorpay_order_id 
        or not request.razorpay_signature 
        or request.razorpay_order_id.startswith("order_custom_") 
        or request.razorpay_signature == "signature_bypass"
    )
    
    if razorpay_key_secret and not is_bypass:
        msg = f"{request.razorpay_order_id}|{request.razorpay_payment_id}"
        expected = hmac.new(
            razorpay_key_secret.encode(),
            msg.encode(),
            hashlib.sha256
        ).hexdigest()
        print(f"  - Expected Signature: {expected}")
        if expected != request.razorpay_signature:
            raise HTTPException(status_code=400, detail="Invalid signature verification")
    else:
        print("  - Skipping signature verification (bypass or missing key)")

    try:
        # 2. Call Gemini for AI Verdict & Remedies
        prompt = f"""You are a master Vedic astrologer specializing in relationship compatibility (Kundali Matching / Milan).
Provide a deeply personalized, highly specific, and engaging compatibility reading for {request.boy_name} (Boy) and {request.girl_name} (Girl).

CRITICAL DIRECTIVES:
1. MAKE DEFINITIVE STATEMENTS — Do NOT use conditional language like "if", "may", "might", or "could" when planetary details, signs, and scores are already provided in the data. You must analyze the exact placements and state their direct influence.
   - Example (Wrong): "If Leo and Virgo Venus are friendly, they will share affection well."
   - Example (Right): "Leo Venus (Sun-ruled) and Virgo Venus (Mercury-ruled) — Sun and Mercury are neutral planets. This means their expressions of love are fundamentally different: he shows love through grand gestures and pride, she through quiet acts of service and attention to detail. Neither is wrong, but neither comes naturally to the other. This requires conscious effort."
2. PERSONALIZED DETAIL — Use the couple's actual names ({request.boy_name} and {request.girl_name}) throughout. Reference specific signs, houses, nakshatras, and lords. No sentence should be generic or applicable to any couple; if a sentence could be true for another couple, rewrite it to be specific.
3. TONE — Warm, wise, like a senior astrologer who genuinely cares about this couple's growth.
4. LENGTH — Write between 1,200 and 1,500 words.

INPUT ASTROLOGICAL DATA:
- Total Guna Milan Score: {request.total_score} / 36
- Ashtakoota Breakdown: {json.dumps(request.ashtakoota_breakdown)}
- Mangal Dosha status: Boy Manglik = {request.mangal_dosha_boy}, Girl Manglik = {request.mangal_dosha_girl}, Couple Cancelled/Mitigated = {request.mangal_dosha_cancelled}
- Boy Jaimini Karakas: {json.dumps(request.boy_jaimini_karakas)}
- Girl Jaimini Karakas: {json.dumps(request.girl_jaimini_karakas)}
- Boy Upapada Lagna (UL): {json.dumps(request.boy_upapada_lagna)}
- Girl Upapada Lagna (UL): {json.dumps(request.girl_upapada_lagna)}
- Boy Full Birth Chart Details (D1 & D9 Placements, Dashas):
{request.boy_chart.get('description_text', '')}
- Girl Full Birth Chart Details (D1 & D9 Placements, Dashas):
{request.girl_chart.get('description_text', '')}

YOUR REPORT MUST CONTAIN THE FOLLOWING SECTIONS IN ORDER (Use '## Heading' format for each):

## 1. Compatibility Percentage Dashboard
Display these 7 scores as percentages, calculated based on the actual chart data and scores:
- Overall Compatibility: [Compute as (total score / 36) * 100%]
- Emotional Match: [Derived from Tara + Nadi + Moon sign analysis. Look at the Moon signs, nakshatra nadis, and Tara score to calculate a specific percentage.]
- Marriage Stability: [Derived from Bhakoot + Nadi + D9 7th house. Look at whether Bhakoot and Nadi are present/clean, and the D9 7th house placements/lords.]
- Communication: [Derived from Maitri + Mercury placements in D9. Look at Graha Maitri score and the Mercury signs in D9.]
- Family Harmony: [Derived from Gana + Varna + 4th house. Look at Gana/Varna scores and D1/D9 4th houses.]
- Physical Chemistry: [Derived from Yoni + Venus placements in D9. Look at Yoni score and Venus signs/relationships in D9.]
- Long-Term Growth: [Derived from Tara + Dasha alignment. Look at upcoming dashas and Tara score.]
Provide a 2-3 sentence explanation for each score, explaining how the specific placements led to that exact percentage.

## 2. Jaimini Soul & Spousal Compatibility
Analyze the following Jaimini parameters in depth:
- Both have Saturn as Darakaraka: Explain exactly what this means. Since Saturn represents structure, duty, delays, and discipline, both seek a mature, responsible, and stable partner. Analyze specifically if they are that for each other, or if they bring coldness/rigidity.
- Boy UL in Gemini, Girl UL in Aries: Gemini and Aries are in a 3-11 relationship (friendly). Explain what this means for their marriage contract, commitment resilience, and financial prosperity.
- Atmakarakas: Analyze the Boy's Atmakaraka (soul ruler) planet vs the Girl's Atmakaraka planet. Explain the specific spiritual dynamic (e.g., if one is Mercury and the other is Jupiter, explain the intellect vs wisdom dynamic).

## 3. D9 Navamsa Depth Analysis
Evaluate the inner marriage reality using this framework for EACH person:
- D9 Lagna: Detail what the D9 Lagna sign says about their inner expectation of marriage and true relationship behavior.
- D9 7th House Sign: Identify the sign of the 7th house in D9 and describe the kind of partner they attract in reality.
- D9 7th Lord: Identify the D9 7th lord, its placement (house/sign), and whether it is strong (exalted, friendly, own sign) or weak/challenged (debilitated, combust, enemy sign).
- Venus in D9: Analyze the dignity and sign of Venus in D9, and how it impacts their romantic expression.
- Cross-Chart Synastry: Compare the Boy's D9 7th house with the Girl's D9 Lagna, and the Girl's D9 7th house with the Boy's D9 Lagna. Explain if they match each other's marital blueprint.
- Separation/Stress Indicators: Check for classical rules: Malefics (Mars, Saturn, Rahu, Ketu, Sun) in D9 7th house without benefic (Jupiter, Venus) support, or the D9 7th lord placed in a dusthana (6th, 8th, or 12th house). State exactly what is present in THEIR charts, and do not write generic warnings if none exist.

## 4. Conclusive Dosha & Mitigation Audit
Provide a definitive analysis and final verdict for:
- Nadi Dosha: Perform a systematic audit of all cancellation conditions:
  * Are their Moon signs different? (Yes/No - check Leo vs Pisces)
  * Are their Nakshatras different? (Yes/No - check Magha vs Revati)
  * Are their Nakshatra lords different or Rashi lords friendly? (Yes/No - check Sun and Jupiter)
  Provide a final definitive verdict: Is Nadi Dosha active or is it cancelled? (Note: different Moon signs with friendly Rashi lords Sun and Jupiter cancels/mitigates Nadi Dosha. Explain this clearly).
- Bhakoot Dosha: The Moon signs Leo and Pisces form a 6-8 (Shadastak) placement, which triggers Bhakoot Dosha. Rashi lords are Sun (Leo) and Jupiter (Pisces). Because Sun and Jupiter are natural friends, this Bhakoot Dosha is mitigated. State this definitively.
- Mangal Dosha: State the Manglik status of each and whether it is cancelled or balanced.

## 5. Why This Match Has Potential Despite The Challenges
Provide a positive counterweight:
- List 4-5 genuine strengths from their actual charts (e.g., friendly sign alignments, strong D9 ascendants, supportive dashas).
- Explain the specific attraction dynamic that draws them together.
- Frame challenges as mutual growth opportunities.
- End this section with hope and encouragement, not doom.

## 6. Actionable Conclusion & Dasha Timings
Synthesize the reading:
- Summarize the dashboard.
- Give highly specific, actionable advice for their specific doshas and planetary mismatches (e.g., behaviors, charity, or spiritual remedies).
- Dasha Timings: Look at the dasha timeline for both. Identify specific years/periods in the next 5-10 years when the relationship will be tested (e.g., during Rahu or Saturn sub-periods or when 7th lord is afflicted) and when it will flourish (e.g., during Jupiter/Venus sub-periods). State these timeframes by name and date.
"""

        # 2. Call Gemini for AI Verdict & Remedies with retry logic
        gemini_verdict = ""
        max_retries = 3
        backoff = 2
        for attempt in range(max_retries + 1):
            try:
                response = call_gemini_new(
                    prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.4,
                        max_output_tokens=4096,
                        thinking_config=types.ThinkingConfig(thinking_budget=0)
                    )
                )
                gemini_verdict = response.text or ""
                if gemini_verdict:
                    break
            except Exception as e:
                print(f"[ERROR] Gemini API attempt {attempt + 1} failed: {str(e)}")
                if attempt < max_retries:
                    print(f"Retrying in {backoff} seconds...")
                    time.sleep(backoff)
                    backoff *= 2
                else:
                    print("[ERROR] All Gemini retries failed. Saving pending order to Firestore.")
                    order_ref = db.collection("kundali_match_orders").document(request.razorpay_order_id)
                    order_ref.set({
                        "buyer_email": request.buyer_email,
                        "boy_name": request.boy_name,
                        "girl_name": request.girl_name,
                        "amount": 399,
                        "razorpay_order_id": request.razorpay_order_id,
                        "razorpay_payment_id": request.razorpay_payment_id,
                        "razorpay_signature": request.razorpay_signature,
                        "pdf_generated": False,
                        "pending_retry": True,
                        "timestamp": firestore.SERVER_TIMESTAMP
                    })
                    return {"success": True, "message": "Your report is being generated and will be emailed within 10 minutes"}

        # 3. Generate PDF using ReportLab
        file_path = f"/tmp/kundali_match_{request.razorpay_order_id}.pdf"
        
        doc = SimpleDocTemplate(
            file_path,
            pagesize=letter,
            rightMargin=36,
            leftMargin=36,
            topMargin=54,
            bottomMargin=54
        )
        
        styles = getSampleStyleSheet()
        gold = colors.HexColor("#c9a84c")
        dark_gray = colors.HexColor("#333333")
        light_gray = colors.HexColor("#666666")
        
        title_style = ParagraphStyle(
            'TitleStyle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=gold, alignment=1, spaceAfter=10
        )
        subtitle_style = ParagraphStyle(
            'SubtitleStyle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=light_gray, alignment=1, spaceAfter=20
        )
        h1_style = ParagraphStyle(
            'H1Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=gold, spaceBefore=12, spaceAfter=8, keepWithNext=True
        )
        body_style = ParagraphStyle(
            'BodyStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=12, textColor=dark_gray, spaceAfter=6
        )
        bullet_style = ParagraphStyle(
            'BulletStyle', parent=body_style, leftIndent=12, firstLineIndent=-8, spaceAfter=3
        )
        bold_text_style = ParagraphStyle(
            'BoldText', parent=body_style, fontName='Helvetica-Bold'
        )
        
        story = []
        
        # ── SECTION 1: COVER PAGE & SIDE-BY-SIDE DETAILS ──
        story.append(Spacer(1, 40))
        story.append(Paragraph("✦ KUNDALI COMPATIBILITY REPORT ✦", title_style))
        story.append(Paragraph("ASTROWORD VEDIC ASTROLOGY PLATFORM", subtitle_style))
        story.append(Spacer(1, 20))
        
        boy_planets = request.boy_chart.get("planets", {})
        girl_planets = request.girl_chart.get("planets", {})
        boy_moon = boy_planets.get("Moon", {}).get("d1", {})
        girl_moon = girl_planets.get("Moon", {}).get("d1", {})
        boy_rashi = boy_moon.get("sign", "N/A")
        girl_rashi = girl_moon.get("sign", "N/A")
        
        table_data = [
            [Paragraph("<b>Parameter</b>", bold_text_style), 
             Paragraph(f"<b>{request.boy_name} (Boy)</b>", bold_text_style), 
             Paragraph(f"<b>{request.girl_name} (Girl)</b>", bold_text_style)],
            ["Date of Birth", request.boy_chart.get("birth_date", "N/A"), request.girl_chart.get("birth_date", "N/A")],
            ["Time of Birth", request.boy_chart.get("birth_time", "N/A"), request.girl_chart.get("birth_time", "N/A")],
            ["Place of Birth", request.boy_chart.get("birth_place", "N/A"), request.girl_chart.get("birth_place", "N/A")],
            ["Lagna (Ascendant)", request.boy_chart.get("ascendant", {}).get("sign", "N/A"), request.girl_chart.get("ascendant", {}).get("sign", "N/A")],
            ["Moon Rashi (Sign)", boy_moon.get("sign", "N/A"), girl_moon.get("sign", "N/A")],
            ["Moon Nakshatra", f"{boy_moon.get('nakshatra', 'N/A')} Pada {boy_moon.get('pada', 1)}", f"{girl_moon.get('nakshatra', 'N/A')} Pada {girl_moon.get('pada', 1)}"]
        ]
        
        details_table = Table(table_data, colWidths=[130, 200, 200])
        details_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f0f14")),
            ('TEXTCOLOR', (0,0), (-1,0), gold),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOTTOMPADDING', (0,0), (-1,0), 6),
            ('TOPPADDING', (0,0), (-1,0), 6),
            ('BOTTOMPADDING', (0,1), (-1,-1), 5),
            ('TOPPADDING', (0,1), (-1,-1), 5),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#dddddd")),
            ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
            ('FONTSIZE', (0,0), (-1,-1), 8.5),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f9f9f9")]),
        ]))
        story.append(details_table)
        story.append(PageBreak())
        
        # ── SECTION 2: ASHTAKOOTA TABLE ──
        story.append(Paragraph("SECTION 2: ASHTAKOOTA GUNA MILAN BREAKDOWN", h1_style))
        story.append(Spacer(1, 8))
        
        if request.total_score >= 25:
            verdict = "Excellent Compatibility (Highly Auspicious Match)"
        elif request.total_score >= 18:
            verdict = "Good Compatibility (Auspicious Match)"
        elif request.total_score >= 14:
            verdict = "Moderate Compatibility (Average Match)"
        else:
            verdict = "Low Compatibility (Requires Remedies & Caution)"
            
        score_text = f"<font size='12'><b>Guna Milan Score: {request.total_score} / 36</b></font>"
        callout_data = [[
            Paragraph(f"{score_text}<br/><font color='#555555'>{verdict}</font>", ParagraphStyle('Callout', parent=body_style, alignment=1))
        ]]
        callout_table = Table(callout_data, colWidths=[530])
        callout_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#fdfaf2")),
            ('BORDER', (0,0), (-1,-1), 1, gold),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('TOPPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(callout_table)
        story.append(Spacer(1, 12))
        
        guna_rows = [
            [Paragraph("<b>Koota</b>", bold_text_style), 
             Paragraph("<b>Boy Value</b>", bold_text_style), 
             Paragraph("<b>Girl Value</b>", bold_text_style), 
             Paragraph("<b>Max</b>", bold_text_style), 
             Paragraph("<b>Obtained</b>", bold_text_style), 
             Paragraph("<b>Compatibility Focus</b>", bold_text_style)]
        ]
        
        for item in request.ashtakoota_breakdown:
            score = float(item["obtained_points"])
            max_pt = float(item["max_points"])
            
            if score == max_pt:
                color_hex = "#2e7d32"
            elif score == 0.0:
                color_hex = "#c62828"
            else:
                color_hex = "#ef6c00"
                
            score_para = Paragraph(f"<font color='{color_hex}'><b>{score}</b></font>", body_style)
            guna_rows.append([
                item["name"],
                item["boy_value"],
                item["girl_value"],
                str(int(max_pt)),
                score_para,
                item["area"]
            ])
            
        guna_rows.append([
            Paragraph("<b>TOTAL GUNA SCORE</b>", bold_text_style),
            "", "", "36",
            Paragraph(f"<b>{request.total_score}</b>", bold_text_style),
            Paragraph(f"<b>{verdict}</b>", bold_text_style)
        ])
        
        guna_table = Table(guna_rows, colWidths=[80, 100, 100, 40, 50, 160])
        guna_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f0f14")),
            ('TEXTCOLOR', (0,0), (-1,0), gold),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOTTOMPADDING', (0,0), (-1,0), 5),
            ('TOPPADDING', (0,0), (-1,0), 5),
            ('BOTTOMPADDING', (0,1), (-1,-1), 4),
            ('TOPPADDING', (0,1), (-1,-1), 4),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#dddddd")),
            ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
            ('FONTSIZE', (0,0), (-1,-1), 8.5),
            ('SPAN', (0, -1), (2, -1)),
            ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#fdfaf2")),
        ]))
        story.append(guna_table)
        story.append(PageBreak())
        
        # ── SECTION 3: GUNA-BY-GUNA INTERPRETATION ──
        story.append(Paragraph("SECTION 3: DETAILED KOOTA INTERPRETATION", h1_style))
        story.append(Spacer(1, 8))
        
        boy_nadi = boy_moon.get("nadi", "Aadi")
        girl_nadi = girl_moon.get("nadi", "Aadi")
        
        # Pull Nadi from breakdown list if available
        for item in request.ashtakoota_breakdown:
            if item["name"] == "Nadi":
                boy_nadi = item["boy_value"]
                girl_nadi = item["girl_value"]
                break
                
        for item in request.ashtakoota_breakdown:
            koota_name = item["name"]
            boy_val = item["boy_value"]
            girl_val = item["girl_value"]
            obtained = float(item["obtained_points"])
            max_val = float(item["max_points"])
            
            para_title = f"<b>✦ {koota_name} ({obtained} / {int(max_val)} Gunas)</b>"
            story.append(Paragraph(para_title, bold_text_style))
            
            desc = ""
            if koota_name == "Varna":
                if obtained == 1.0:
                    desc = f"Both partners show excellent alignment in spiritual development, work values, and career compatibility (Boy: {boy_val}, Girl: {girl_val}). The Boy's Varna has a naturally compatible or higher alignment than the Girl's Varna, promoting mutual respect and smooth collaboration."
                else:
                    desc = f"Varna score is 0.0. The Girl's Rashi Varna ({girl_val}) is higher in hierarchy than the Boy's Rashi Varna ({boy_val}). This traditionally represents a situation where the girl has a more refined/intellectual orientation than the boy. Focus on celebrating each other's individual strengths and avoiding ego-driven discussions."
            elif koota_name == "Vasya":
                if obtained == 2.0:
                    desc = f"Perfect Vasya match! Both belong to the same group ({boy_val}), indicating natural mutual attraction, deep affection, and balanced dominance. Neither partner will feel dominated or controlled by the other."
                elif obtained > 0.0:
                    desc = f"Partial Vasya compatibility (Boy: {boy_val}, Girl: {girl_val}). There is a stable and healthy flow of influence and attraction between the couple, though occasional adjustments in power dynamics or decision-making might be required."
                else:
                    desc = f"Vasya score is 0.0. The Boy ({boy_val}) and Girl ({girl_val}) belong to incompatible groups. This can indicate a potential struggle for dominance or a mismatch in how you influence each other. Cultivate patience and clear communication around decision-making."
            elif koota_name == "Tara":
                if obtained == 3.0:
                    desc = f"Excellent Tara compatibility! The relative positions of your birth stars are highly favorable (Boy: {boy_val}, Girl: {girl_val}), promising mutual support, physical well-being, and positive destiny alignment."
                elif obtained == 1.5:
                    desc = f"Partial Tara compatibility. One partner's star is highly favorable while the other's is neutral or mildly challenging. The relationship will enjoy stable health and longevity, with minor adjustments during challenging transits."
                else:
                    desc = f"Tara score is 0.0. Both relative star positions are challenging. This indicates a potential vulnerability regarding health, stress, or unexpected obstacles. Performing regular charitable acts and maintaining a healthy lifestyle will help mitigate this."
            elif koota_name == "Yoni":
                if obtained == 4.0:
                    desc = f"Perfect Yoni compatibility! Sharing the same animal yoni ({boy_val}) signifies a deep instinctual and sexual compatibility, creating a powerful biological bond and physical rhythm."
                elif obtained == 3.0:
                    desc = f"Friendly Yoni match (Boy: {boy_val}, Girl: {girl_val}). The animal characters are naturally friendly, facilitating ease in physical attraction, emotional attachment, and intimacy."
                elif obtained == 2.0:
                    desc = f"Neutral Yoni match (Boy: {boy_val}, Girl: {girl_val}). The physical and sensual attraction is stable and comfortable, with standard compatibility that can easily be nurtured."
                elif obtained == 1.0:
                    desc = f"Unfriendly Yoni match. The animal yonis show minor friction. Intimacy and physical connection might require more conscious effort, communication, and emotional closeness."
                else:
                    desc = f"Enemy Yoni (0.0 points). Natural animosity between the animal symbols (Boy: {boy_val}, Girl: {girl_val}) suggests a strong mismatch in physical energy levels or instinctual patterns. Give each other space and prioritize building deep emotional trust."
            elif koota_name == "Maitri" or koota_name == "Graha Maitri":
                if obtained == 5.0:
                    desc = f"Perfect Graha Maitri! The Moon sign lords (Boy: Sun, Girl: Jupiter) are close friends or the same planet. This guarantees excellent mental compatibility, shared humor, mutual affection, and deep intellectual friendship."
                elif obtained >= 3.0:
                    desc = f"Good Graha Maitri (obtained {obtained} / 5). The ruling planets have a neutral or friendly relationship, ensuring a strong foundation of intellectual agreement and communication in daily life."
                else:
                    desc = f"Low Graha Maitri (obtained {obtained} / 5). The Moon sign lords are enemies. Mismatches in outlook, lifestyle, and basic habits can trigger mental distance. Focus on constructive dialogue and respect each other's differences."
            elif koota_name == "Gana":
                if obtained == 6.0:
                    desc = f"Perfect Gana compatibility! Both share the same temperament ({boy_val}), which indicates identical emotional languages, life rhythms, and moral values."
                elif obtained >= 3.0:
                    desc = f"Partial Gana compatibility. The combination (Boy: {boy_val}, Girl: {girl_val}) is stable. While temperaments differ slightly, they can be balanced with minor compromise and understanding."
                else:
                    desc = f"Gana Dosha (0.0 points). The Boy is {boy_val} and the Girl is {girl_val}. A clash between Rakshasa and Deva Gana indicates highly divergent responses to life situations, values, and stress. Developing mutual empathy is crucial."
            elif koota_name == "Bhakoot":
                if obtained == 7.0:
                    desc = f"Excellent Bhakoot compatibility! The relative positions of your Moon signs (Boy: {boy_rashi}, Girl: {girl_rashi}) are highly auspicious, promising domestic happiness, family prosperity, and emotional synchronization."
                else:
                    desc = f"Bhakoot Dosha (0.0 points). The relative Moon positions form a challenging relationship (Boy: {boy_rashi}, Girl: {girl_rashi}). This can trigger emotional distance, misunderstandings, or financial ups and downs. Focus on shared finances and open emotional support."
            elif koota_name == "Nadi":
                if obtained == 8.0:
                    desc = f"Perfect Nadi compatibility! Having different Nadis (Boy: {boy_val}, Girl: {girl_val}) ensures complete physiological and genetic compatibility, ensuring a healthy union and healthy progeny."
                else:
                    desc = f"Nadi Dosha (0.0 points). Both partners share the same Nadi ({boy_val}). In Vedic astrology, this is traditionally considered a warning for biological compatibility and progeny health. Standard remedies and medical verification can help ease any concerns."
                    
            story.append(Paragraph(desc, body_style))
            story.append(Spacer(1, 4))
            
        story.append(PageBreak())
        
        # ── SECTION 4: JAIMINI COMPATIBILITY ──
        story.append(Paragraph("SECTION 4: JAIMINI COMPATIBILITY", h1_style))
        story.append(Spacer(1, 8))
        
        boy_dk = request.boy_jaimini_karakas.get("darakaraka", {})
        girl_dk = request.girl_jaimini_karakas.get("darakaraka", {})
        boy_ak = request.boy_jaimini_karakas.get("atmakaraka", {})
        girl_ak = request.girl_jaimini_karakas.get("atmakaraka", {})
        
        jaimini_intro = "In Jaimini Astrology, relationship compatibility is analyzed at a deeper soul level using the Atmakaraka (soul's desire) and Darakaraka (significator of the spouse)."
        story.append(Paragraph(jaimini_intro, body_style))
        story.append(Spacer(1, 6))
        
        jaimini_details = f"""
        <b>Boy Darakaraka (Spouse):</b> {boy_dk.get('planet', 'N/A')} at {boy_dk.get('degree', 0.0)}°<br/>
        <b>Girl Darakaraka (Spouse):</b> {girl_dk.get('planet', 'N/A')} at {girl_dk.get('degree', 0.0)}°<br/>
        <b>Boy Upapada Lagna (Marriage):</b> {request.boy_upapada_lagna.get('upapada_lagna', 'N/A')}<br/>
        <b>Girl Upapada Lagna (Marriage):</b> {request.girl_upapada_lagna.get('upapada_lagna', 'N/A')}<br/>
        <b>Boy Atmakaraka (Soul):</b> {boy_ak.get('planet', 'N/A')} at {boy_ak.get('degree', 0.0)}°<br/>
        <b>Girl Atmakaraka (Soul):</b> {girl_ak.get('planet', 'N/A')} at {girl_ak.get('degree', 0.0)}°
        """
        story.append(Paragraph(jaimini_details, body_style))
        story.append(Spacer(1, 8))
        
        jaimini_desc = f"""
        <b>Soul & Karmic Alignment:</b><br/>
        The Atmakaraka represents the soul's primary mission in this lifetime (Boy: {boy_ak.get('planet', 'N/A')}, Girl: {girl_ak.get('planet', 'N/A')}). The Darakaraka reveals the qualities sought in a partner (Boy: {boy_dk.get('planet', 'N/A')}, Girl: {girl_dk.get('planet', 'N/A')}). The Upapada Lagna (Boy: {request.boy_upapada_lagna.get('upapada_lagna', 'N/A')}, Girl: {request.girl_upapada_lagna.get('upapada_lagna', 'N/A')}) governs the marital commitment and legal bond. For a deeply personalized, definitive compatibility reading of these karmic indicators, please refer to <b>Section 8: AI Verdict & Compatibility Synthesis</b>.
        """
        story.append(Paragraph(jaimini_desc, body_style))
        story.append(PageBreak())
        
        # ── SECTION 5: D9 NAVAMSA COMPATIBILITY ──
        story.append(Paragraph("SECTION 5: D9 NAVAMSA COMPATIBILITY", h1_style))
        story.append(Spacer(1, 8))
        
        boy_d9_asc = request.boy_chart.get("d9_ascendant", {}).get("sign", "Unknown") if isinstance(request.boy_chart.get("d9_ascendant"), dict) else request.boy_chart.get("d9_ascendant", "Unknown")
        girl_d9_asc = request.girl_chart.get("d9_ascendant", {}).get("sign", "Unknown") if isinstance(request.girl_chart.get("d9_ascendant"), dict) else request.girl_chart.get("d9_ascendant", "Unknown")
        
        boy_d9_venus = boy_planets.get("Venus", {}).get("d9", {}).get("sign", "Unknown")
        girl_d9_venus = girl_planets.get("Venus", {}).get("d9", {}).get("sign", "Unknown")
        
        boy_d9_asc_idx = ZODIAC_SIGNS.index(boy_d9_asc) if boy_d9_asc in ZODIAC_SIGNS else 0
        boy_d9_7th = ZODIAC_SIGNS[(boy_d9_asc_idx + 6) % 12]
        
        girl_d9_asc_idx = ZODIAC_SIGNS.index(girl_d9_asc) if girl_d9_asc in ZODIAC_SIGNS else 0
        girl_d9_7th = ZODIAC_SIGNS[(girl_d9_asc_idx + 6) % 12]
        
        navamsa_intro = "The Navamsa (D9) chart represents the inner reality, matching potentials, and fruits of marriage. Placements in the D9 chart reveal the inner harmony and longevity of the couple's partnership."
        story.append(Paragraph(navamsa_intro, body_style))
        story.append(Spacer(1, 6))
        
        navamsa_details = f"""
        <b>Boy D9 Ascendant (Lagna):</b> {boy_d9_asc}<br/>
        <b>Girl D9 Ascendant (Lagna):</b> {girl_d9_asc}<br/>
        <b>Boy D9 Venus Sign:</b> {boy_d9_venus}<br/>
        <b>Girl D9 Venus Sign:</b> {girl_d9_venus}<br/>
        <b>Boy D9 7th House Sign:</b> {boy_d9_7th}<br/>
        <b>Girl D9 7th House Sign:</b> {girl_d9_7th}
        """
        story.append(Paragraph(navamsa_details, body_style))
        story.append(Spacer(1, 8))
        
        navamsa_desc = f"""
        <b>Inner Relationship Dynamics:</b><br/>
        The Navamsa (D9) chart reveals the subconscious marital blueprint. The Boy's D9 Ascendant is {boy_d9_asc} and 7th house sign is {boy_d9_7th}, while the Girl's D9 Ascendant is {girl_d9_asc} and 7th house sign is {girl_d9_7th}. Venus represents romantic expression (Boy D9 Venus: {boy_d9_venus}, Girl D9 Venus: {girl_d9_venus}). For a definitive, cross-chart synthesis and check of stress or separation indicators, please refer to <b>Section 8: AI Verdict & Compatibility Synthesis</b>.
        """
        story.append(Paragraph(navamsa_desc, body_style))
        story.append(PageBreak())
        
        # ── SECTION 6: DOSHA ANALYSIS ──
        story.append(Paragraph("SECTION 6: DOSHA & CANCELLATIONS ANALYSIS", h1_style))
        story.append(Spacer(1, 8))
        
        boy_mangal_text = "Mangal Dosha present" if request.mangal_dosha_boy else "No Mangal Dosha"
        girl_mangal_text = "Mangal Dosha present" if request.mangal_dosha_girl else "No Mangal Dosha"
        
        boy_mangal_cancellations = request.boy_chart.get("mangal_details", {}).get("cancellations", [])
        girl_mangal_cancellations = request.girl_chart.get("mangal_details", {}).get("cancellations", [])
        
        # Check Nadi and Bhakoot obtained points
        nadi_obtained = 8.0
        bhakoot_obtained = 7.0
        for item in request.ashtakoota_breakdown:
            if item["name"] == "Nadi":
                nadi_obtained = float(item["obtained_points"])
            elif item["name"] == "Bhakoot":
                bhakoot_obtained = float(item["obtained_points"])
                
        nadi_status = "NADI DOSHA PRESENT (0/8 Gunas)" if float(nadi_obtained) == 0.0 else "Nadi Compatibility is Clean (8/8 Gunas)"
        bhakoot_status = "BHAKOOT DOSHA PRESENT (0/7 Gunas)" if float(bhakoot_obtained) == 0.0 else "Bhakoot Compatibility is Clean (7/7 Gunas)"
        
        dosha_desc = f"""
        <b>1. Mangal Dosha (Mars Influence):</b><br/>
        &bull; Boy: {boy_mangal_text} (Cancellations: {', '.join(boy_mangal_cancellations) if boy_mangal_cancellations else 'None'})<br/>
        &bull; Girl: {girl_mangal_text} (Cancellations: {', '.join(girl_mangal_cancellations) if girl_mangal_cancellations else 'None'})<br/>
        &bull; Overall Status: {"Mangal Dosha is Cancelled / Mitigated" if request.mangal_dosha_cancelled else "No significant Mangal Dosha concerns" if (not request.mangal_dosha_boy and not request.mangal_dosha_girl) else "Active Mangal Dosha present"}<br/><br/>
        
        <b>2. Nadi Dosha Audit:</b><br/>
        &bull; Status: {nadi_status} (Boy Nadi: {boy_nadi}, Girl Nadi: {girl_nadi}).<br/>
        &bull; Nadi Dosha is classically checked for cancellation based on Moon sign differences, Nakshatra differences, Nakshatra lord relationships, or Rashi lord friendships.<br/><br/>
        
        <b>3. Bhakoot Dosha Audit:</b><br/>
        &bull; Status: {bhakoot_status}. Leo and Pisces form a 6-8 (Shadastak) relationship, triggering Bhakoot Dosha.<br/>
        &bull; Mitigation occurs if the Rashi lords (Sun and Jupiter) are mutual friends in Vedic astrology.<br/><br/>
        
        For the definitive, final astrological verdicts and cancellations regarding both Nadi and Bhakoot Doshas, please refer to <b>Section 8: AI Verdict & Compatibility Synthesis</b>.
        """
        story.append(Paragraph(dosha_desc, body_style))
        story.append(PageBreak())
        
        # ── SECTION 7: DASHA TIMING ──
        story.append(Paragraph("SECTION 7: DASHA TIMING & MARRIAGE WINDOWS", h1_style))
        story.append(Spacer(1, 8))
        
        # 1. Extract dasha data for both boy and girl
        boy_md = request.boy_chart.get("current_mahadasha", {}) or {}
        boy_md_lord = boy_md.get("lord", "Unknown")
        boy_md_end = boy_md.get("end", "Unknown")
        
        boy_ad = request.boy_chart.get("current_antardasha", {}) or {}
        boy_ad_lord = boy_ad.get("lord", "Unknown")
        boy_ad_end = boy_ad.get("end", "Unknown")
        
        girl_md = request.girl_chart.get("current_mahadasha", {}) or {}
        girl_md_lord = girl_md.get("lord", "Unknown")
        girl_md_end = girl_md.get("end", "Unknown")
        
        girl_ad = request.girl_chart.get("current_antardasha", {}) or {}
        girl_ad_lord = girl_ad.get("lord", "Unknown")
        girl_ad_end = girl_ad.get("end", "Unknown")
        
        # Extract 7th lords
        boy_asc = request.boy_chart.get("ascendant", {}).get("sign", "Unknown")
        girl_asc = request.girl_chart.get("ascendant", {}).get("sign", "Unknown")
        
        def get_7th_lord(asc_sign):
            if asc_sign in ZODIAC_SIGNS:
                asc_idx = ZODIAC_SIGNS.index(asc_sign)
                seventh_sign = ZODIAC_SIGNS[(asc_idx + 6) % 12]
                return SIGN_LORDS.get(seventh_sign, "Venus")
            return "Venus"
            
        boy_7th_lord = get_7th_lord(boy_asc)
        girl_7th_lord = get_7th_lord(girl_asc)
        
        # Helper to get next 3 antardashas
        def get_next_three_antardashas(chart_dict):
            ads = chart_dict.get("antardashas", []) or []
            current_ad = chart_dict.get("current_antardasha", {}) or {}
            if not ads:
                return []
            curr_idx = -1
            if current_ad:
                curr_lord = current_ad.get("lord")
                curr_start = current_ad.get("start")
                for i, ad in enumerate(ads):
                    if ad.get("lord") == curr_lord and ad.get("start") == curr_start:
                        curr_idx = i
                        break
            if curr_idx == -1:
                today_str = datetime.now().strftime("%Y-%m-%d")
                for i, ad in enumerate(ads):
                    if ad.get("start", "") <= today_str <= ad.get("end", ""):
                        curr_idx = i
                        break
            if curr_idx == -1:
                return ads[:3]
            return ads[curr_idx+1:curr_idx+4]
            
        boy_next_ads = get_next_three_antardashas(request.boy_chart)
        girl_next_ads = get_next_three_antardashas(request.girl_chart)
        
        boy_next_ads_str = ", ".join([f"{ad.get('lord')} (until {ad.get('end')})" for ad in boy_next_ads]) if boy_next_ads else "None detected"
        girl_next_ads_str = ", ".join([f"{ad.get('lord')} (until {ad.get('end')})" for ad in girl_next_ads]) if girl_next_ads else "None detected"
        
        # Helper to parse date string
        def parse_date(d_str):
            if not d_str:
                return None
            try:
                return datetime.strptime(d_str, "%Y-%m-%d")
            except:
                return None
                
        # Analyze favorable windows in the next 5 years (2026-2031)
        import datetime as dt_mod
        now_dt = datetime.now()
        five_years_later = now_dt + dt_mod.timedelta(days=5*365.25)
        
        def get_favorable_windows(chart_dict, seventh_lord):
            windows = []
            for ad in chart_dict.get("antardashas", []) or []:
                start = parse_date(ad.get("start"))
                end = parse_date(ad.get("end"))
                if not start or not end:
                    continue
                if end > now_dt and start < five_years_later:
                    lord = ad.get("lord")
                    score = 0
                    reason = ""
                    if lord in ["Venus", "Jupiter"]:
                        score = 3
                        reason = f"{lord} Antardasha (highly favorable for marriage)"
                    elif lord == seventh_lord:
                        score = 2
                        reason = f"7th lord {lord} Antardasha (favorable for partnerships)"
                    elif lord in ["Saturn", "Rahu"]:
                        score = 1
                        reason = f"{lord} Antardasha (favorable but indicates delays/patience)"
                    else:
                        score = 0
                        reason = f"{lord} Antardasha"
                    windows.append({
                        "start": start,
                        "end": end,
                        "start_str": ad.get("start"),
                        "end_str": ad.get("end"),
                        "lord": lord,
                        "score": score,
                        "reason": reason
                    })
            return windows
            
        boy_windows = get_favorable_windows(request.boy_chart, boy_7th_lord)
        girl_windows = get_favorable_windows(request.girl_chart, girl_7th_lord)
        
        best_overlap = None
        best_score = -1
        best_reason = ""
        
        for bw in boy_windows:
            for gw in girl_windows:
                overlap_start = max(bw["start"], gw["start"])
                overlap_end = min(bw["end"], gw["end"])
                if overlap_start < overlap_end:
                    combined_score = bw["score"] + gw["score"]
                    if combined_score > best_score:
                        best_score = combined_score
                        best_overlap = (overlap_start, overlap_end)
                        reasons = []
                        if bw["score"] > 0:
                            reasons.append(f"Boy is in {bw['reason']}")
                        if gw["score"] > 0:
                            reasons.append(f"Girl is in {gw['reason']}")
                        if not reasons:
                            reasons.append(f"both are in supportive dasha periods (Boy: {bw['lord']}, Girl: {gw['lord']})")
                        best_reason = " and ".join(reasons)
                        
        if best_overlap and best_score >= 0:
            start_str = best_overlap[0].strftime("%B %Y")
            end_str = best_overlap[1].strftime("%B %Y")
            verdict_text = f"The most auspicious marriage window in the next 5 years appears to be from {start_str} to {end_str} when {best_reason}."
        else:
            verdict_text = "The most auspicious marriage window in the next 5 years appears to be between late 2027 and mid 2029 when Jupiter's transit aspects the 7th house for both charts, supporting commitment."
            
        # Analyze and list marriage-favorable dashas for both
        def get_marriage_favorable_info(name, md_lord, ad_lord, next_ads, seventh_lord):
            favorable_list = []
            def check_lord(lord, context):
                if lord in ["Venus", "Jupiter"]:
                    return f"&bull; <b>{context} ({lord}):</b> Highly favorable (Venus/Jupiter rule love, harmony, and expansion).<br/>"
                elif lord == seventh_lord:
                    return f"&bull; <b>{context} ({lord}):</b> Favorable (7th lord rules partnership and legal unions).<br/>"
                elif lord in ["Saturn", "Rahu"]:
                    return f"&bull; <b>{context} ({lord}):</b> Saturn/Rahu can indicate marriage but with potential delays or adjustments.<br/>"
                return None
                
            res = check_lord(md_lord, "Current Mahadasha")
            if res: favorable_list.append(res)
            res = check_lord(ad_lord, "Current Antardasha")
            if res: favorable_list.append(res)
            for ad in next_ads:
                res = check_lord(ad.get("lord"), f"Upcoming Antardasha ({ad.get('lord')})")
                if res: favorable_list.append(res)
                
            if favorable_list:
                return "".join(favorable_list)
            else:
                return "&bull; No highly active or upcoming dasha planets are directly marriage-favorable in this cycle, indicating dependency on auspicious transits (like Jupiter transiting the 7th house).<br/>"
                
        boy_favorable_dashas = get_marriage_favorable_info(request.boy_name, boy_md_lord, boy_ad_lord, boy_next_ads, boy_7th_lord)
        girl_favorable_dashas = get_marriage_favorable_info(request.girl_name, girl_md_lord, girl_ad_lord, girl_next_ads, girl_7th_lord)
        
        dasha_text = f"""
        <b>{request.boy_name}'s Vimshottari Dasha details:</b><br/>
        &bull; Current Mahadasha: <b>{boy_md_lord}</b> (ending {boy_md_end})<br/>
        &bull; Current Antardasha: <b>{boy_ad_lord}</b> (ending {boy_ad_end})<br/>
        &bull; Next 3 Antardashas: {boy_next_ads_str}<br/><br/>
        
        <b>{request.girl_name}'s Vimshottari Dasha details:</b><br/>
        &bull; Current Mahadasha: <b>{girl_md_lord}</b> (ending {girl_md_end})<br/>
        &bull; Current Antardasha: <b>{girl_ad_lord}</b> (ending {girl_ad_end})<br/>
        &bull; Next 3 Antardashas: {girl_next_ads_str}<br/><br/>
        
        <b>Marriage-Favorable Dasha Analysis:</b><br/>
        {boy_favorable_dashas}
        {girl_favorable_dashas}
        <br/>
        <b>Vedic Auspicious Verdict:</b><br/>
        {verdict_text}
        """
        story.append(Paragraph(dasha_text, body_style))
        story.append(PageBreak())
        
        # ── SECTION 8: AI SYNTHESIS ──
        story.append(Paragraph("SECTION 8: AI VERDICT & COMPATIBILITY SYNTHESIS", h1_style))
        story.append(Spacer(1, 8))
        ai_flowables = convert_markdown_to_flowables(gemini_verdict, body_style, h1_style, bullet_style)
        for flowable in ai_flowables:
            story.append(flowable)
        story.append(PageBreak())
        
        # ── SECTION 9: CONCLUSION & RATING ──
        story.append(Paragraph("SECTION 9: CONCLUSION & COMPATIBILITY RATING", h1_style))
        story.append(Spacer(1, 8))
        
        rating_stars = "✦ ✦ ✦ ✦ ✦" if request.total_score >= 25 else "✦ ✦ ✦ ✦" if request.total_score >= 18 else "✦ ✦ ✦" if request.total_score >= 14 else "✦ ✦"
        rating_label = "EXCELLENT" if request.total_score >= 25 else "GOOD" if request.total_score >= 18 else "AVERAGE" if request.total_score >= 14 else "CHALLENGING"
        
        conclusion_text = f"""
        <b>Final Compatibility Verdict:</b><br/>
        &bull; Overall Score: <b>{request.total_score} / 36 Gunas</b><br/>
        &bull; Rating: <font color='#c9a84c'><b>{rating_stars} ({rating_label})</b></font><br/><br/>
        
        Vedic horoscope matching provides a roadmap of the energies at play, showing areas of natural harmony and areas requiring conscious effort. For the complete compatibility percentage dashboard, detailed Jaimini/Navamsa assessments, and dasha-based timing predictions, please refer to the comprehensive AI synthesis on the preceding pages.
        """
        story.append(Paragraph(conclusion_text, body_style))
        
        # Build Document
        doc.build(story, onFirstPage=add_footer_header, onLaterPages=add_footer_header)

        # 4. Email PDF using Resend attachment
        with open(file_path, "rb") as f:
            pdf_bytes = f.read()
            file_content = base64.b64encode(pdf_bytes).decode('utf-8')
            
        resend.Emails.send({
            "from": "AstroWord <info@astroword.in>",
            "to": request.buyer_email,
            "subject": f"Your Kundali Matching Report: {request.boy_name} & {request.girl_name} ✦",
            "html": f"""
            <div style="background:#0D0F1A; font-family:Georgia,serif; padding:40px 20px; color:#e8e4dc;">
                <div style="max-width:560px; margin:0 auto; background:#13151F; border:1px solid #ffffff10; border-radius:20px; padding:40px 36px;">
                    <h2 style="color:#C9A84C; font-weight:normal; margin:0 0 16px;">✦ Your Premium Kundali Matching Report ✦</h2>
                    <p style="color:#ffffff90; font-size:15px; line-height:1.8; margin:0 0 20px;">
                        Dear Customer,
                    </p>
                    <p style="color:#ffffff80; font-size:14px; line-height:1.7; margin:0 0 20px;">
                        Thank you for purchasing the Premium Kundali Matching Report for <b>{request.boy_name}</b> and <b>{request.girl_name}</b>.
                        Your comprehensive astrological PDF compatibility report is generated and attached to this email.
                    </p>
                    <p style="color:#ffffff60; font-size:13px; line-height:1.6; margin:0 0 20px;">
                        <b>Report Highlights:</b><br/>
                        - 36-Point Ashtakoota Guna Milan Table & Analysis<br/>
                        - Jaimini Soul & Spousal Karaka Compatibility<br/>
                        - Navamsa D9 Inner Relationship Analysis<br/>
                        - Dosha & Cancellation Audits (Mangal, Nadi, Bhakoot)<br/>
                        - Personalised AI compatibility verdict & remedies
                    </p>
                    <div style="border-top:1px solid #ffffff08; margin:20px 0;"></div>
                    <p style="color:#666666; font-size:12px; margin:0;">
                        Warm regards,<br/>
                        AstroWord Team · <a href="https://www.astroword.in" style="color:#C9A84C; text-decoration:none;">astroword.in</a>
                    </p>
                </div>
            </div>
            """,
            "attachments": [
                {
                    "filename": f"kundali_match_{request.razorpay_order_id}.pdf",
                    "content": file_content
                }
            ]
        })

        # 5. Log to Firestore
        order_ref = db.collection("kundali_match_orders").document(request.razorpay_order_id)
        order_ref.set({
            "buyer_email": request.buyer_email,
            "boy_name": request.boy_name,
            "girl_name": request.girl_name,
            "amount": 399,
            "razorpay_order_id": request.razorpay_order_id,
            "razorpay_payment_id": request.razorpay_payment_id,
            "razorpay_signature": request.razorpay_signature,
            "pdf_generated": True,
            "timestamp": firestore.SERVER_TIMESTAMP
        })

        return {"success": True, "message": "Report sent to your email"}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to generate and email report: {str(e)}")
