<div align="center">
  <img src="frontend/public/astroword-logo.svg" alt="AstroWord" height="60" />
  <h3>India's First Precision Vedic AI</h3>
  <p>Ask anything about your life. Your birth chart has the answers.</p>

  <p>
    <a href="https://astroword.in">
      <img src="https://img.shields.io/badge/Live%20Site-astroword.in-c9a84c?style=flat-square&logo=vercel" alt="Live site" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Gemini-2.0%20Flash-4285F4?style=flat-square&logo=google" alt="Gemini AI" />
    <img src="https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?style=flat-square&logo=firebase" alt="Firebase" />
  </p>

  <img src="https://i.imgur.com/placeholder.png" alt="AstroWord Screenshot" width="800" />
</div>

---

## ✨ What is AstroWord?

AstroWord is a **precision Vedic astrology AI** that generates your D1 (birth chart), D9 (Navamsa), D10 (Dashamsha) and more — then lets you have a natural conversation with an AI trained on Jyotish principles.

Unlike generic horoscope apps that give the same reading to everyone born in the same month, AstroWord uses your **exact birth time, date, and location** to compute precise planetary positions and then uses **Google Gemini** to answer your questions based on your specific chart.

### Core Features

| Feature | Description |
|---------|-------------|
| 🪐 **Vedic Chart Generation** | Full D1, D9, D10 divisional charts with precise degree calculations |
| 🤖 **AI Chat** | Ask any question about career, relationships, health, timing — get chart-specific answers |
| 💑 **Darakaraka Calculator** | Find your spouse significator planet with Jaimini Chara Karaka system |
| ☀️ **Atmakaraka Calculator** | Discover your soul planet and life purpose |
| 💼 **Amatyakaraka Calculator** | Your career significator and professional destiny |
| 🔱 **Gana Calculator** | Deva / Manushya / Rakshasa gana from Moon nakshatra |
| 💝 **Love or Arranged Marriage** | Planetary indicators for marriage type |
| 🔤 **Spouse Initial Predictor** | First letter of your future spouse's name |
| 💍 **Marriage Year Predictor** | Most likely marriage windows from Dasha timing |
| 📖 **Astrology Blog** | 6 in-depth articles on Vedic concepts |

---

## 🏗️ Architecture

```
AstroWord/
├── frontend/          # Next.js 15 app (App Router)
│   └── src/
│       ├── app/       # Pages: /, /darakaraka, /atmakaraka, /blog, etc.
│       ├── components/  # Sidebar, ChatInterface, WelcomeScreen, etc.
│       └── utils/     # Firebase config, API URL, cleanReading util
│
└── backend/           # FastAPI Python server
    ├── main.py        # App entry point + CORS
    ├── core/          # Chart calculation engine (Swiss Ephemeris)
    └── api/           # Route handlers: ask, chart, karaka calculators, payment
```

**Tech Stack:**

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion |
| Backend | FastAPI, Python 3.12, Uvicorn |
| AI | Google Gemini 2.0 Flash |
| Charts | Swiss Ephemeris (`pyswisseph`) |
| Auth | Firebase Authentication (Google + Email) |
| Database | Firebase Firestore (chat history, user limits) |
| Payments | Razorpay (INR subscriptions) |
| Deployment | Vercel (frontend) + any Python host (backend) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.12+
- A Firebase project (Auth + Firestore enabled)
- A Google Gemini API key
- A Razorpay account (for payments, optional for local dev)

### 1. Clone the Repository

```bash
git clone https://github.com/AshutoshSharma-pixel/AstroWord.git
cd AstroWord
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_CLIENT_ID=your_client_id
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> **Note:** You need a Firebase service account JSON for the backend. Download it from Firebase Console → Project Settings → Service Accounts → Generate New Private Key.

Start the backend:

```bash
uvicorn main:app --reload
# Server runs on http://localhost:8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend:

```bash
npm run dev
# App runs on http://localhost:3000
```

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
npx vercel --prod
```

Set all `NEXT_PUBLIC_*` environment variables in the Vercel dashboard.

### Backend → Any Python Host

The backend can be deployed to:
- **Railway** — `railway up`
- **Render** — Connect repo, set build command: `pip install -r requirements.txt`, start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **AWS EC2 / DigitalOcean** — Standard ASGI deployment with nginx + gunicorn

> Update `NEXT_PUBLIC_API_URL` in Vercel to point to your deployed backend URL.

---

## 📡 API Reference

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chart` | Generate Vedic birth chart from birth details |
| `POST` | `/api/ask` | Ask an AI question with chart context |
| `POST` | `/api/darakaraka` | Darakaraka calculator |
| `POST` | `/api/atmakaraka` | Atmakaraka calculator |
| `POST` | `/api/amatyakaraka` | Amatyakaraka calculator |
| `POST` | `/api/gana` | Gana (nakshatra nature) calculator |
| `POST` | `/api/marriage-type` | Love vs arranged marriage predictor |
| `POST` | `/api/spouse-initial` | Spouse first initial predictor |
| `POST` | `/api/marriage-year` | Marriage year predictor from Dasha timing |
| `POST` | `/api/payment/create-order` | Create Razorpay order |
| `POST` | `/api/payment/verify` | Verify payment and activate plan |

### Example Request

```bash
curl -X POST http://localhost:8000/api/chart \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arjun",
    "dob": "1995-06-15",
    "tob": "14:30",
    "pob": "New Delhi, India",
    "lat": 28.6139,
    "lon": 77.2090
  }'
```

---

## 💰 Subscription Plans

| Plan | Price | Questions/Day | Divisional Charts |
|------|-------|--------------|-------------------|
| Free | ₹0 | 5 | D1, D9 |
| Weekly | ₹69 | 20 | D1, D9, D10 |
| Monthly | ₹149 | 50 | D1, D9, D10 + more |
| Cosmos (Lifetime) | ₹999 | Unlimited | All charts |

---

## 🔒 Security

- All API endpoints require Firebase ID token authentication (`Authorization: Bearer <token>`)
- `.env` files are excluded from version control (see `.gitignore`)
- Per-user daily question limits enforced server-side in Firestore
- CORS configured for production domain only

---

## 🗂️ Key Files

```
frontend/src/
├── app/
│   ├── page.tsx              # Main chat interface
│   ├── layout.tsx            # Root layout with SEO meta + FAQ schema
│   ├── blog/                 # Blog index + 6 full articles
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── darakaraka/page.tsx   # Darakaraka calculator
│   ├── atmakaraka/page.tsx   # Atmakaraka calculator
│   ├── amatyakaraka/page.tsx # Amatyakaraka calculator
│   ├── gana/page.tsx         # Gana calculator
│   ├── marriage-type/page.tsx
│   ├── marriage-year/page.tsx
│   └── spouse-initial/page.tsx
├── components/
│   ├── ChatInterface.tsx     # Main AI chat component
│   ├── Sidebar.tsx           # Navigation + chat history
│   ├── WelcomeScreen.tsx     # Birth details form
│   ├── AuthProvider.tsx      # Firebase auth context
│   ├── UpgradeModal.tsx      # Razorpay payment modal
│   └── ProfileModal.tsx      # User profile
└── utils/
    ├── api.ts                # API_URL constant
    ├── cleanReading.ts       # Sanitize AI responses
    └── firebase/config.ts    # Firebase initialization

backend/
├── main.py                   # FastAPI app + CORS
├── requirements.txt
├── core/
│   └── chart_calc.py         # Swiss Ephemeris chart engine
└── api/
    ├── ask.py                # AI question handler
    ├── chart.py              # Chart generation
    ├── darakaraka.py
    ├── atmakaraka.py
    ├── amatyakaraka.py
    ├── gana.py
    ├── marriage_type.py
    ├── marriage_year.py
    ├── spouse_initial.py
    └── payment.py            # Razorpay integration
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Built with ✨ and Jyotish principles</p>
  <p>
    <a href="https://astroword.in">astroword.in</a> •
    <a href="https://astroword.in/blog">Blog</a>
  </p>
</div>
