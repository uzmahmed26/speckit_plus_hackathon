# 🚂 Railway.app Deployment Guide

Complete step-by-step guide to deploy your full-stack AI Book project on Railway.app

## 📋 Project Overview

**Frontend:** Docusaurus Website (Static Site)
**Backend:** FastAPI Server with:
- RAG-based Chatbot API
- Urdu Translation API
- Authentication System (Login/Sign-Up)

---

## 🚀 Deployment Steps

### Step 1: Prerequisites

1. **GitHub Account** - Your project is already on GitHub ✅
2. **Railway Account** - Sign up at https://railway.app using your GitHub account
3. **API Keys Ready** - Keep your environment variables ready (see below)

### Step 2: Deploy Backend to Railway

#### 2.1 Login to Railway
1. Go to https://railway.app
2. Click **"Login"** and sign in with GitHub
3. Authorize Railway to access your GitHub repositories

#### 2.2 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `uzmahmed26/speckit_plus_hackathon`
4. Railway will detect your project and start deployment

#### 2.3 Configure Environment Variables
1. In your Railway project dashboard, click on the deployed service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add the following:

**Required Variables:**

```bash
# AI Provider API Keys (at least one required)
GEMINI_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
GROQ_API_KEY=your-groq-api-key-here

# Qdrant Vector Database (for RAG)
QDRANT_URL=your-qdrant-cluster-url
QDRANT_API_KEY=your-qdrant-api-key
QDRANT_COLLECTION_NAME=cloud

# Database (PostgreSQL)
NEON_DB_URL=your-neon-database-url

# Authentication & Security
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7

# Model Configuration
MODEL_NAME=gemini-2.0-flash-exp
```

**Optional Variables:**
```bash
ANTHROPIC_API_KEY=your-anthropic-api-key
DASHSCOPE_API_KEY=your-dashscope-api-key
OPENROUTER_API_KEY=your-openrouter-api-key
```

**⚠️ IMPORTANT:**
- Copy values from your local `.env` file
- DO NOT include `PORT` variable - Railway automatically sets it
- DO NOT include `BACKEND_API_URL` - We'll set this after deployment

#### 2.4 Deploy Settings
1. Go to **"Settings"** tab
2. Under **"Build"**, ensure:
   - Builder: `NIXPACKS` (auto-detected)
   - Root Directory: `/` (default)
3. Under **"Deploy"**, verify:
   - Start Command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
   - (This is auto-configured from `railway.json`)

#### 2.5 Generate Domain
1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. Railway will give you a URL like: `https://your-app-name.up.railway.app`
4. **Copy this URL** - you'll need it for frontend configuration

#### 2.6 Verify Deployment
1. Wait for deployment to complete (check "Deployments" tab)
2. Visit your Railway URL: `https://your-app-name.up.railway.app`
3. You should see:
   ```json
   {
     "message": "Physical AI Book API is running!",
     "status": "online",
     "features": [...]
   }
   ```
4. Test health endpoint: `https://your-app-name.up.railway.app/health`

---

### Step 3: Update Frontend Configuration

#### 3.1 Update Docusaurus Config
1. Open `docusaurus.config.ts` locally
2. Find the `customFields` section
3. Update `backendApiUrl`:
   ```typescript
   customFields: {
     geminiApiKey: process.env.GEMINI_API_KEY,
     backendApiUrl: process.env.BACKEND_API_URL || 'https://your-app-name.up.railway.app',
   },
   ```

#### 3.2 Update Vercel Environment Variable
1. Go to https://vercel.com/dashboard
2. Select your project: `speckit-plus-hackathon`
3. Go to **"Settings"** → **"Environment Variables"**
4. Add or update:
   - **Name:** `BACKEND_API_URL`
   - **Value:** `https://your-app-name.up.railway.app`
   - **Environments:** Production, Preview, Development
5. Click **"Save"**

#### 3.3 Redeploy Vercel
1. Go to **"Deployments"** tab in Vercel
2. Click **"..."** on the latest deployment → **"Redeploy"**
3. Or push a new commit to trigger auto-deployment:
   ```bash
   git add .
   git commit -m "chore: Update backend URL to Railway"
   git push origin main
   ```

---

### Step 4: Update Backend CORS (Already Done ✅)

The backend CORS has been pre-configured to allow:
- Vercel deployments
- Railway deployments
- Local development

No action needed!

---

### Step 5: Test Full Integration

#### 5.1 Test Backend APIs
Visit these endpoints on Railway:

1. **Health Check:**
   `https://your-app-name.up.railway.app/health`

2. **API Docs:**
   `https://your-app-name.up.railway.app/docs`

3. **Test Chatbot:**
   ```bash
   curl -X POST "https://your-app-name.up.railway.app/api/query" \
     -H "Content-Type: application/json" \
     -d '{"query": "What is Physical AI?"}'
   ```

#### 5.2 Test Frontend
1. Visit your Vercel site: `https://speckit-plus-hackathon.vercel.app`
2. Navigate to any chapter
3. Open the chatbot (bottom-right corner)
4. Ask a question - it should connect to Railway backend
5. Test authentication (Sign Up / Login)

---

## 🔧 Troubleshooting

### Issue: "502 Bad Gateway"
**Solution:**
- Check Railway logs: Dashboard → Your Service → "Logs" tab
- Verify environment variables are set correctly
- Ensure `PORT` is not hardcoded (should use `$PORT`)

### Issue: "CORS Error" in Frontend
**Solution:**
- Verify Vercel domain is added to CORS in `backend/app/main.py`
- Check Railway logs for CORS-related errors
- Ensure `BACKEND_API_URL` is set correctly in Vercel

### Issue: "No AI providers configured"
**Solution:**
- Check Railway environment variables
- Ensure at least one API key is set (GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY)
- Redeploy after adding variables

### Issue: "Database connection failed"
**Solution:**
- Verify `NEON_DB_URL` is set in Railway variables
- Check Neon database is active and accessible
- Test connection string format: `postgresql://user:pass@host:port/dbname`

### Issue: "RAG/Chatbot not working"
**Solution:**
- Ensure `OPENAI_API_KEY` is set (required for embeddings)
- Verify Qdrant variables: `QDRANT_URL`, `QDRANT_API_KEY`, `QDRANT_COLLECTION_NAME`
- Run ingest script if collection is empty: `python backend/ingest.py`

---

## 📊 Monitoring & Logs

### View Backend Logs
1. Railway Dashboard → Your Service → "Logs" tab
2. Monitor real-time logs for errors
3. Check deployment status in "Deployments" tab

### View Frontend Logs
1. Vercel Dashboard → Your Project → "Deployments"
2. Click on deployment → "Function Logs" / "Build Logs"

---

## 🔄 Redeployment

### Redeploy Backend (Railway)
**Option 1 - Auto Deploy:**
- Push to GitHub main branch
- Railway auto-deploys

**Option 2 - Manual:**
- Railway Dashboard → "Deployments" → "New Deployment"

### Redeploy Frontend (Vercel)
**Option 1 - Auto Deploy:**
- Push to GitHub main branch
- Vercel auto-deploys

**Option 2 - Manual:**
- Vercel Dashboard → "Deployments" → "Redeploy"

---

## 📝 Environment Variables Reference

### Required for Backend

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `GEMINI_API_KEY` | Google Gemini API (Free tier) | https://aistudio.google.com/app/apikey |
| `OPENAI_API_KEY` | OpenAI API (for embeddings) | https://platform.openai.com/api-keys |
| `QDRANT_URL` | Qdrant cluster URL | https://cloud.qdrant.io |
| `QDRANT_API_KEY` | Qdrant authentication | https://cloud.qdrant.io |
| `QDRANT_COLLECTION_NAME` | Collection name | `cloud` |
| `NEON_DB_URL` | PostgreSQL database | https://neon.tech |
| `SECRET_KEY` | JWT secret key | Generate: `python -c "import secrets; print(secrets.token_urlsafe(32))"` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_DAYS` | Token expiry | `7` |
| `MODEL_NAME` | Gemini model | `gemini-2.0-flash-exp` |

### Optional for Backend

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `GROQ_API_KEY` | Groq API (Free tier) | https://console.groq.com/keys |
| `ANTHROPIC_API_KEY` | Claude API | https://console.anthropic.com |
| `DASHSCOPE_API_KEY` | Qwen/Alibaba | https://dashscope.console.aliyun.com |
| `OPENROUTER_API_KEY` | OpenRouter | https://openrouter.ai/keys |

### Required for Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `BACKEND_API_URL` | Railway backend URL | `https://your-app.up.railway.app` |
| `GEMINI_API_KEY` | (Optional) For client-side features | Same as backend |

---

## ✅ Deployment Checklist

- [ ] Railway account created
- [ ] GitHub repository connected to Railway
- [ ] All environment variables added to Railway
- [ ] Backend deployed successfully on Railway
- [ ] Railway domain generated
- [ ] `BACKEND_API_URL` updated in Vercel
- [ ] Frontend redeployed on Vercel
- [ ] Backend health endpoint working
- [ ] Frontend loads correctly
- [ ] Chatbot connects to backend
- [ ] Authentication working
- [ ] RAG search working
- [ ] Urdu translation working

---

## 🎉 Success!

Your full-stack AI Book is now live:

- **Frontend (Vercel):** https://speckit-plus-hackathon.vercel.app
- **Backend (Railway):** https://your-app-name.up.railway.app
- **API Docs:** https://your-app-name.up.railway.app/docs

---

## 📞 Support

If you encounter issues:
1. Check Railway logs for backend errors
2. Check Vercel logs for frontend errors
3. Verify all environment variables are set correctly
4. Test backend endpoints directly using `/docs`
5. Check CORS configuration if you see network errors

Good luck with your deployment! 🚀
