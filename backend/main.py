from fastapi import FastAPI
from backend.app.api import auth, chat
# from backend.app.api import summarize # Will be added later for summarization

app = FastAPI()

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/query", tags=["query"]) # Corrected from 'query' to 'chat'
# app.include_router(summarize.router, prefix="/api", tags=["summarize"]) # Will be added later

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI backend!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)