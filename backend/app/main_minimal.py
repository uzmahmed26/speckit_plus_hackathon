# Minimal working version for Railway deployment
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="Physical AI Book API (Minimal)",
    description="Minimal backend for testing Railway deployment",
    version="1.0.0-minimal"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Physical AI Book API is running (Minimal Version)!",
        "status": "online",
        "version": "minimal",
        "environment_check": {
            "GEMINI_API_KEY": "✅" if os.getenv("GEMINI_API_KEY") else "❌",
            "OPENAI_API_KEY": "✅" if os.getenv("OPENAI_API_KEY") else "❌",
            "NEON_DB_URL": "✅" if os.getenv("NEON_DB_URL") else "❌",
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Physical AI Book API (Minimal)"}

@app.get("/test")
def test_env():
    """Test environment variables"""
    return {
        "PORT": os.getenv("PORT", "Not set"),
        "GEMINI_API_KEY_SET": bool(os.getenv("GEMINI_API_KEY")),
        "OPENAI_API_KEY_SET": bool(os.getenv("OPENAI_API_KEY")),
        "NEON_DB_URL_SET": bool(os.getenv("NEON_DB_URL")),
    }
