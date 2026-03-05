from fastapi import APIRouter, Header, Query
from firebase_admin import auth, firestore
from datetime import datetime, timezone

router = APIRouter()

@router.get("/plan")
async def get_user_plan(
    authorization: str = Header(None),
    user_id: str = Query(None)
):
    safe_default = {
        "success": True,
        "plan": "free",
        "questions_today": 0,
        "questions_limit": 5,
        "plan_expires_at": None,
        "plan_updated_at": None,
        "plan_cancelled": False
    }

    try:
        uid = user_id
        
        # If no user_id query param was given, try to extract from header
        if not uid and authorization and authorization.startswith("Bearer "):
            token = authorization.replace("Bearer ", "")
            try:
                decoded = auth.verify_id_token(token)
                uid = decoded.get("uid")
            except Exception:
                pass
                
        if not uid:
            return safe_default

        db = firestore.client()
        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return safe_default
        
        data = user_doc.to_dict()
        
        # Check if plan has expired — if so downgrade to free
        expires_at = data.get("plan_expires_at")
        current_plan = data.get("plan", "free")
        
        if expires_at and current_plan != "free":
            if hasattr(expires_at, 'timestamp'):
                expiry_dt = expires_at
            else:
                expiry_dt = datetime.fromisoformat(str(expires_at))
            
            if datetime.now(timezone.utc) > expiry_dt.replace(tzinfo=timezone.utc) if expiry_dt.tzinfo is None else expiry_dt:
                # Plan expired — reset to free
                try:
                    user_ref.update({
                        "plan": "free",
                        "questions_limit": 5
                    })
                except Exception:
                    pass
                current_plan = "free"
        
        return {
            "success": True,
            "plan": current_plan,
            "questions_today": data.get("questions_today", 0),
            "questions_limit": data.get("questions_limit", 5),
            "plan_expires_at": str(expires_at) if expires_at else None,
            "plan_updated_at": str(data.get("plan_updated_at", "")),
            "plan_cancelled": data.get("plan_cancelled", False)
        }
        
    except Exception as e:
        # Never throw 500/404/etc. Just return safe defaults.
        print(f"Error fetching user plan: {str(e)}")
        return safe_default
