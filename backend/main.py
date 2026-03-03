import os
import json
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials

load_dotenv()

if not firebase_admin._apps:
    service_account_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT_JSON")
    firebase_ready = False

    # Path 1: Environment Variable JSON
    if service_account_json:
        try:
            # Strip quotes and parse
            raw_json = service_account_json.strip().strip("'\"")
            service_account_info = json.loads(raw_json)
            
            # Clean private key newlines
            if "private_key" in service_account_info:
                key = service_account_info["private_key"]
                service_account_info["private_key"] = key.replace("\\\\n", "\n").replace("\\n", "\n").strip()
                
            print(f"Initializing Firebase with Project ID: {service_account_info.get('project_id')}")
            cred = credentials.Certificate(service_account_info)
            firebase_admin.initialize_app(cred)
            print("✅ Firebase initialized from FIREBASE_SERVICE_ACCOUNT_JSON")
            firebase_ready = True
        except Exception as e:
            print(f"❌ FIREBASE_SERVICE_ACCOUNT_JSON failed: {str(e)}")

    # Path 2: Local serviceAccountKey.json
    if not firebase_ready and os.path.exists("serviceAccountKey.json"):
        try:
            cred = credentials.Certificate("serviceAccountKey.json")
            firebase_admin.initialize_app(cred)
            print("✅ Firebase initialized from serviceAccountKey.json")
            firebase_ready = True
        except Exception as e:
            print(f"❌ serviceAccountKey.json fallback failed: {str(e)}")

    # Path 3: Application Default Credentials (ADC)
    if not firebase_ready:
        try:
            firebase_admin.initialize_app()
            print("✅ Firebase initialized from Application Default Credentials")
            firebase_ready = True
        except Exception as e:
            print(f"⚠️ No Firebase credentials found. Proceeding without Firebase Admin. Error: {str(e)}")

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from api import chart, ask, payment, karaka, gana, user, marriage
from api.email import router as email_router

app = FastAPI(title="AstroWord API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://astroword.in",
        "https://www.astroword.in",
        "https://astroword.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chart.router, prefix="/api")
app.include_router(ask.router, prefix="/api")
app.include_router(payment.router, prefix="/api/payment", tags=["payment"])
app.include_router(karaka.router, prefix="/api")
app.include_router(gana.router, prefix="/api")
app.include_router(user.router, prefix="/api")
app.include_router(marriage.router, prefix="/api")
app.include_router(email_router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body},
    )

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "AstroWord API is running"}

@app.get("/api/fix-user")
async def fix_kingashutosh():
    try:
        from api.payment import get_db
        db = get_db()
        users_ref = db.collection('users')
        query = users_ref.where('email', '==', "kingashutosh12345@gmail.com").stream()
        
        user_doc_ref = None
        for doc in query:
            user_doc_ref = doc.reference
            break
            
        if not user_doc_ref:
            return {"success": False, "error": "User document not found in Firestore"}
            
        user_doc_ref.set({
            "plan": "starter",
            "questions_limit": 10,
            "questions_today": 0
        }, merge=True)
        return {"success": True, "message": "User fixed via email query"}
    except Exception as e:
        import traceback
        return {"success": False, "error": str(e), "trace": traceback.format_exc()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
