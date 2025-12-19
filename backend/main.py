from app.main import app
import os

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable (required for Railway) or fallback to 8000
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)