import resend
import os
import logging
from fastapi import APIRouter, Header
from firebase_admin import firestore

logger = logging.getLogger(__name__)
resend.api_key = os.environ.get("RESEND_API_KEY", "")

router = APIRouter(prefix="/api/email", tags=["email"])

def get_welcome_html(name: str) -> str:
    return f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0D0F1A;font-family:Georgia,serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">

  <div style="text-align:center;margin-bottom:40px;">
    <h1 style="color:#C9A84C;font-size:26px;margin:0;letter-spacing:3px;">✦ AstroWord</h1>
    <p style="color:#ffffff40;font-size:10px;letter-spacing:4px;margin:6px 0 0;font-family:monospace;">VEDIC AI PLATFORM</p>
  </div>

  <div style="background:#13151F;border:1px solid #ffffff10;border-radius:20px;padding:40px 36px;">
    <h2 style="color:#ffffff;font-size:22px;margin:0 0 16px;font-weight:normal;">
      Welcome, {name} 🔮
    </h2>
    <p style="color:#ffffff80;font-size:15px;line-height:1.8;margin:0 0 28px;">
      Your birth chart is now loaded and ready. Ask anything about your life — career, marriage, purpose, timing — and get answers based on your exact Vedic chart.
    </p>

    <div style="border-top:1px solid #ffffff08;margin:28px 0;"></div>

    <p style="color:#C9A84C;font-size:11px;letter-spacing:2px;font-family:monospace;margin:0 0 16px;">WHAT YOU CAN DO</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;font-size:14px;">💍</td><td style="padding:8px 12px;color:#ffffff90;font-size:14px;">Find the first letter of your future spouse's name</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;">📅</td><td style="padding:8px 12px;color:#ffffff90;font-size:14px;">Predict your most auspicious marriage year</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;">☀️</td><td style="padding:8px 12px;color:#ffffff90;font-size:14px;">Discover your Atmakaraka — your soul's true purpose</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;">💼</td><td style="padding:8px 12px;color:#ffffff90;font-size:14px;">Find the career you were born for</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;">❤️</td><td style="padding:8px 12px;color:#ffffff90;font-size:14px;">Love marriage or arranged marriage prediction</td></tr>
    </table>

    <div style="border-top:1px solid #ffffff08;margin:28px 0;"></div>

    <div style="background:#C9A84C10;border:1px solid #C9A84C20;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      <p style="color:#C9A84C;font-size:13px;margin:0 0 4px;font-weight:bold;">You're on the Free Plan</p>
      <p style="color:#ffffff60;font-size:13px;margin:0;line-height:1.6;">5 questions per day · D1 + D9 charts · All calculators free forever</p>
    </div>

    <div style="text-align:center;">
      <a href="https://astroword.in" style="display:inline-block;background:linear-gradient(135deg,#C9A84C,#F5D07A);color:#0D0F1A;text-decoration:none;padding:14px 36px;border-radius:12px;font-size:15px;font-weight:bold;">
        Ask Your First Question →
      </a>
    </div>
  </div>

  <div style="text-align:center;margin-top:32px;">
    <p style="color:#ffffff20;font-size:12px;font-family:monospace;">
      AstroWord · astroword.in<br>
      info@astroword.in
    </p>
  </div>

</div>
</body>
</html>
"""

def send_welcome_email(to_email: str, display_name: str = "") -> bool:
    try:
        name = display_name.split()[0].capitalize() if display_name else "there"
        
        resend.Emails.send({
            "from": "AstroWord <info@astroword.in>",
            "to": to_email,
            "subject": f"Welcome to AstroWord ✦ Your chart is ready, {name}",
            "html": get_welcome_html(name)
        })
        
        logger.info(f"Welcome email sent to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send welcome email: {str(e)}")
        return False


@router.post("/welcome")
async def trigger_welcome_email(data: dict):
    email = data.get("email", "")
    name = data.get("name", "")
    user_id = data.get("user_id", "")

    if not email or not user_id:
        return {"success": False, "error": "Missing email or user_id"}

    try:
        db = firestore.client()
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()

        if user_doc.exists and user_doc.to_dict().get("welcome_email_sent"):
            return {"success": True, "skipped": True}

        user_ref.set({"welcome_email_sent": True}, merge=True)

        import asyncio
        asyncio.create_task(
            asyncio.to_thread(send_welcome_email, email, name)
        )

        return {"success": True}

    except Exception as e:
        logger.error(f"Welcome email endpoint error: {str(e)}")
        return {"success": False, "error": str(e)}
