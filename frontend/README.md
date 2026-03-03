# AstroWord

An AI-powered Vedic astrology application with a Next.js frontend and FastAPI backend.

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+** (for the backend)
- **Node.js 18+** (for the frontend)

---

## ⚙️ Backend (FastAPI)

The backend is a Python FastAPI server running on **port 8000**.

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Create and activate a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Copy/create a `.env` file in the `backend/` directory with the required keys (Gemini API key, Firebase credentials, Razorpay keys, etc.).

### 5. Start the backend server

```bash
python main.py
```

The backend will be available at **http://localhost:8000**

> Health check: http://localhost:8000/api/health

---

## 🌐 Frontend (Next.js)

The frontend is a Next.js app running on **port 3000**.

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Make sure a `.env.local` file exists in the `frontend/` directory with the required Firebase and API keys.

### 4. Start the development server

```bash
npm run dev
```

The frontend will be available at **http://localhost:3000**

---

## 🔄 Running Both Together

Open **two terminal windows/tabs** and run:

**Terminal 1 — Backend:**
```bash
cd backend
source venv/bin/activate
python main.py
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## 📦 Project Structure

```
Astroword/
├── backend/          # FastAPI Python backend (port 8000)
│   ├── api/          # Route handlers (chart, ask, payment, etc.)
│   ├── main.py       # Entry point
│   ├── requirements.txt
│   └── .env          # Backend environment variables
└── frontend/         # Next.js frontend (port 3000)
    ├── src/
    ├── package.json
    └── .env.local    # Frontend environment variables
```
