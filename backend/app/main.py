# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables at the very beginning
load_dotenv()

from .api import auth, chat

# ===== FASTAPI APPLICATION =====
app = FastAPI(
    title="Physical AI Book API",
    description="Backend for authentication, user management, and AI RAG chatbot",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://full-project-kappa.vercel.app",
    "https://speckit-plus-hackathon.vercel.app",
    "https://*.railway.app",  # Allow all Railway deployments
    "*"  # Allow all origins for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== STARTUP EVENT =====
@app.on_event("startup")
async def startup_event():
    from .database.db import init_db
    try:
        init_db()
        print("[SUCCESS] Database initialized successfully!")
    except Exception as e:
        print(f"[WARNING] Database initialization warning: {e}")
        print("   (This is okay if the database already exists)")

# ===== ROUTES =====
@app.get("/")
def read_root():
    return {
        "message": "Physical AI Book API is running!",
        "status": "online",
        "features": [
            "Authentication (/api/auth)",
            "RAG Chatbot (/api/query)",
            "Content Personalization (/api/personalize)",
            "Translation (/api/translate)"
        ],
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Physical AI Book API"}

# ===== INCLUDE API ROUTERS =====
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api", tags=["Chat & RAG"])

if __name__ == "__main__":
    import uvicorn
    import os
    # Use PORT environment variable (required for Railway) or fallback to 8000
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
