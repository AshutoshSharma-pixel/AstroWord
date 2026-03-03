import os
import razorpay
import hmac
import hashlib
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore, auth
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

# Load environment variables
load_dotenv()

router = APIRouter()

# Initialize Razorpay Client
RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET")

if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
else:
    razorpay_client = None

def get_db():
    try:
        return firestore.client()
    except Exception:
        return None

class CreateOrderRequest(BaseModel):
    user_id: str
    plan_type: str # 'starter', 'pro', 'annual', 'cosmos'

class CancelRequest(BaseModel):
    user_id: str

class VerifyPaymentRequest(BaseModel):
    user_id: str
    plan_type: str
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

@router.post("/create-order")
def create_order(request: CreateOrderRequest, db=Depends(get_db)):
    if not razorpay_client or not db:
        raise HTTPException(status_code=500, detail="Razorpay credentials or DB not configured")
        
    # Determine pricing based on plan - Strictly Server Logic
    if request.plan_type == 'starter':
        amount = 6900    # ₹69
    elif request.plan_type == 'pro':
        amount = 19900   # ₹199
    elif request.plan_type == 'annual':
        amount = 99900   # ₹999
    else:
        raise HTTPException(status_code=400, detail="Invalid plan type")
        
    try:
        data = {
            "amount": amount,
            "currency": "INR",
            "receipt": f"rcpt_{os.urandom(4).hex()}",
            "payment_capture": 1
        }
        order = razorpay_client.order.create(data=data)
        
        # Store order metadata in Firestore
        db.collection("orders").document(order["id"]).set({
            "user_id": request.user_id,
            "plan_type": request.plan_type,
            "amount": amount,
            "created_at": firestore.SERVER_TIMESTAMP,
            "status": "created"
        })
        
        return {
            "success": True, 
            "order_id": order["id"],
            "amount": amount,
            "currency": order["currency"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify")
def verify_payment(request: VerifyPaymentRequest, db=Depends(get_db)):
    if not razorpay_client or not db:
        raise HTTPException(status_code=500, detail="Verification dependencies not available")
        
    try:
        # Verify Signature using Razorpay SDK
        try:
            razorpay_client.utility.verify_payment_signature({
                'razorpay_order_id': request.razorpay_order_id,
                'razorpay_payment_id': request.razorpay_payment_id,
                'razorpay_signature': request.razorpay_signature
            })
        except razorpay.errors.SignatureVerificationError:
            raise HTTPException(status_code=400, detail="Invalid payment signature")
            
        # Fetch order from internal DB
        db_order_ref = db.collection("orders").document(request.razorpay_order_id)
        db_order = db_order_ref.get()
        
        if not db_order.exists:
            raise HTTPException(status_code=400, detail="Order not found in database")
            
        order_data = db_order.to_dict()
        if order_data.get("status") == "verified":
            raise HTTPException(status_code=400, detail="Order already verified")
            
        if order_data.get("user_id") != request.user_id:
            raise HTTPException(status_code=400, detail="Order does not belong to user")
            
        # Fetch order and payment from Razorpay
        rzp_order = razorpay_client.order.fetch(request.razorpay_order_id)
        rzp_payment = razorpay_client.payment.fetch(request.razorpay_payment_id)
        
        if rzp_payment.get("status") != "captured":
            raise HTTPException(status_code=400, detail="Payment not captured")
            
        if rzp_order.get("amount") != order_data.get("amount"):
            raise HTTPException(status_code=400, detail="Order amount mismatch")
            
        # Derive Plan From Amount (ignore frontend plan_type request)
        amount_paid = rzp_order.get("amount")
        now = datetime.now(timezone.utc)
        
        if amount_paid == 6900:
            derived_plan = "starter"
            questions_limit = 10
            expiry_time = now + timedelta(days=7)
        elif amount_paid == 19900:
            derived_plan = "pro"
            questions_limit = 20
            expiry_time = now + timedelta(days=30)
        elif amount_paid == 99900:
            derived_plan = "annual"
            questions_limit = 999999
            expiry_time = now + timedelta(days=365)
        else:
            raise HTTPException(status_code=400, detail="Unknown plan amount")

        # Update Firestore Safely using merge=True
        user_ref = db.collection('users').document(request.user_id)
        user_ref.set({
            "plan": derived_plan,
            "questions_limit": questions_limit,
            "questions_today": 0,
            "last_reset_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "plan_expires_at": expiry_time,
            "plan_updated_at": firestore.SERVER_TIMESTAMP,
            "plan_cancelled": False 
        }, merge=True)
        
        # Mark Order As Completed
        db_order_ref.update({
            "status": "verified",
            "verified_at": firestore.SERVER_TIMESTAMP
        })
        
        return {"success": True, "message": "Payment verified and plan updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class CancelPlanRequest(BaseModel):
    user_id: str

@router.post("/api/payment/cancel")
async def cancel_plan(request: CancelPlanRequest):
    """
    Cancel an active subscription.
    """
    try:
        if not request.user_id:
            raise HTTPException(status_code=400, detail="Missing user_id")

        # Update Firestore to set plan_cancelled flag
        user_ref = db.collection('users').document(request.user_id)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")
            
        user_ref.set({
            "plan_cancelled": True,
            "plan_cancelled_at": firestore.SERVER_TIMESTAMP
        }, merge=True)
        
        return {"success": True, "message": "Plan cancelled successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
