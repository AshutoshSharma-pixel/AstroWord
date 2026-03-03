import os
import json
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials

load_dotenv()

if not firebase_admin._apps:
    service_account_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT_JSON")
    if service_account_json:
        try:
            # Strip any potential wrapping quotes added by ENV managers
            service_account_json = service_account_json.strip().strip("'\"")
            
            # Detect and handle potential double-escaping or literal newlines
            service_account_info = json.loads(service_account_json)
            
            # Ensure the private key is properly formatted with actual newlines
            if "private_key" in service_account_info:
                key = service_account_info["private_key"]
                # Replace literal \n with actual newlines if present
                key = key.replace("\\n", "\n")
                # Remove any stray spaces surrounding the PEM headers/footers
                key = key.strip()
                service_account_info["private_key"] = key
                
            cred = credentials.Certificate(service_account_info)
            firebase_admin.initialize_app(cred)
            print("Firebase initialized successfully from environment JSON")
        except Exception as e:
            print(f"Error initializing Firebase from JSON: {str(e)}")
            # Fallback to local file
            if os.path.exists("serviceAccountKey.json"):
                cred = credentials.Certificate("serviceAccountKey.json")
                firebase_admin.initialize_app(cred)
                print("Firebase initialized successfully from serviceAccountKey.json")
            else:
                print("Critical: Neither FIREBASE_SERVICE_ACCOUNT_JSON nor serviceAccountKey.json found/valid")
    else:
        if os.path.exists("serviceAccountKey.json"):
            cred = credentials.Certificate("serviceAccountKey.json")
            firebase_admin.initialize_app(cred)
            print("Firebase initialized successfully from serviceAccountKey.json")
        else:
            print("Warning: No Firebase credentials found (ENV or Local)")

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
