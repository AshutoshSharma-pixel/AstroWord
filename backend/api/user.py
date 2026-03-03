from fastapi import APIRouter, HTTPException, Header
from firebase_admin import auth, firestore
import firebase_admin

router = APIRouter()

@router.get("/plan")
async def get_user_plan(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    token = authorization.replace("Bearer ", "")
    
    try:
        decoded = auth.verify_id_token(token)
        uid = decoded["uid"]
        
        from firebase_admin import firestore
        db = firestore.client()
        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return {
                "success": True,
                "plan": "free",
                "questions_today": 0,
                "questions_limit": 5,
                "plan_expires_at": None,
                "plan_updated_at": None,
                "plan_cancelled": False
            }
        
        data = user_doc.to_dict()
        
        # Check if plan has expired — if so downgrade to free
        from datetime import datetime, timezone
        expires_at = data.get("plan_expires_at")
        current_plan = data.get("plan", "free")
        
        if expires_at and current_plan != "free":
            if hasattr(expires_at, 'timestamp'):
                expiry_dt = expires_at
            else:
                expiry_dt = datetime.fromisoformat(str(expires_at))
            
            if datetime.now(timezone.utc) > expiry_dt.replace(tzinfo=timezone.utc) if expiry_dt.tzinfo is None else expiry_dt:
                # Plan expired — reset to free
                user_ref.update({
                    "plan": "free",
                    "questions_limit": 5
                })
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
        raise HTTPException(status_code=401, detail=str(e))
