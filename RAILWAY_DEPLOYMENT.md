# 🚂 Railway.app Deployment Guide (Complete Setup)

Step-by-step guide to deploy your full-stack AI Book project on Railway.app

---

## 📋 Project Overview

**Frontend:** Docusaurus Website (Deployed on Vercel) ✅
**Backend:** FastAPI Server with:
- RAG-based Chatbot API
- Urdu Translation API
- Authentication System (Login/Sign-Up)

---

## 🚀 Quick Deployment Steps

### Step 1: Sign Up on Railway.app

1. Go to: **https://railway.app**
2. Click **"Login"**
3. Sign in with **GitHub** account
4. Authorize Railway to access your repositories

---

### Step 2: Deploy Backend from GitHub

#### 2.1 Create New Project
1. Railway Dashboard → Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose repository: **`uzmahmed26/speckit_plus_hackathon`**
4. Railway will automatically detect your project configuration from `railway.json`
5. Click **"Deploy"**

#### 2.2 Wait for Initial Deployment
- Railway will start building your app
- Check **"Deployments"** tab for progress
- Wait 3-5 minutes for first deployment

---

### Step 3: Add Environment Variables

**In Railway Dashboard:**

1. Click on your deployed service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add these variables **one by one**:

```bash
# ================================
# AI PROVIDER API KEYS (Required)
# ================================
# You need AT LEAST ONE for chatbot to work

# Option 1: Google Gemini (FREE - Recommended)
GEMINI_API_KEY=your-gemini-api-key-here

# Option 2: OpenAI (Required for RAG embeddings)
OPENAI_API_KEY=your-openai-api-key-here

# Option 3: Groq (FREE - Fast inference)
GROQ_API_KEY=your-groq-api-key-here

# ================================
# QDRANT VECTOR DATABASE (RAG)
# ================================
QDRANT_URL=your-qdrant-cluster-url
QDRANT_API_KEY=your-qdrant-api-key
QDRANT_COLLECTION_NAME=cloud

# ================================
# DATABASE (Neon PostgreSQL)
# ================================
NEON_DB_URL=your-neon-database-connection-string

# ================================
# AUTHENTICATION & SECURITY
# ================================
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7

# ================================
# MODEL CONFIGURATION
# ================================
MODEL_NAME=gemini-2.0-flash-exp
```

**⚠️ IMPORTANT NOTES:**
- ❌ **DO NOT** add `PORT` variable - Railway automatically sets it
- ❌ **DO NOT** add `BACKEND_API_URL` - Only needed in Vercel frontend
- ✅ Use your **actual API keys** from the services above
- ✅ Neon database URL already exists (from .env file)

5. Click **"Add"** for each variable
6. After adding all variables, Railway will **automatically redeploy**

---

### Step 4: Generate Public Domain

1. In your Railway service dashboard
2. Go to **"Settings"** tab
3. Scroll to **"Networking"** section
4. Click **"Generate Domain"**
5. Railway will create a URL like: `https://your-app-name.up.railway.app`
6. **Copy this URL** - you'll need it for frontend!

---

### Step 5: Verify Backend Deployment

**Test these endpoints:**

1. **Health Check:**
   ```
   https://your-app-name.up.railway.app/health
   ```
   Should return: `{"status": "healthy"}`

2. **API Documentation:**
   ```
   https://your-app-name.up.railway.app/docs
   ```
   Should show FastAPI interactive docs

3. **Root Endpoint:**
   ```
   https://your-app-name.up.railway.app/
   ```
   Should show API info

**If you see errors, check "Logs" tab in Railway dashboard**

---

### Step 6: Update Frontend (Vercel)

#### 6.1 Update Environment Variable in Vercel

1. Go to: **https://vercel.com/dashboard**
2. Select project: **`speckit-plus-hackathon`**
3. Go to **"Settings"** → **"Environment Variables"**
4. Add or Update:
   - **Name:** `BACKEND_API_URL`
   - **Value:** `https://your-app-name.up.railway.app` (from Step 4)
   - **Environments:** Check all (Production, Preview, Development)
5. Click **"Save"**

#### 6.2 Redeploy Frontend

1. Go to **"Deployments"** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for deployment

**OR push a new commit to trigger auto-deployment:**
```bash
git commit --allow-empty -m "chore: Trigger Vercel redeploy"
git push origin main
```

---

### Step 7: Test Full Integration

#### 7.1 Test Backend APIs

**Using curl:**
```bash
# Test chatbot
curl -X POST "https://your-app-name.up.railway.app/api/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is Physical AI?"}'
```

**Using API Docs:**
1. Visit: `https://your-app-name.up.railway.app/docs`
2. Try the `/api/query` endpoint
3. Test authentication endpoints

#### 7.2 Test Frontend Integration

1. Visit: **https://speckit-plus-hackathon.vercel.app**
2. Navigate to any chapter
3. Click chatbot icon (bottom-right corner)
4. Ask a question - should connect to Railway backend ✅
5. Test **Sign Up / Login** functionality ✅

---

## 🔧 Configuration Files (Already Setup ✅)

Your project has these Railway configuration files:

### 1. `railway.json` (Main Config)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn backend.main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. `Procfile` (Start Command)
```
web: uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

### 3. `runtime.txt` (Python Version)
```
python-3.11
```

### 4. Backend PORT Configuration
- `backend/main.py` - Uses `$PORT` environment variable ✅
- `backend/app/main.py` - Uses `$PORT` environment variable ✅

**All configuration is done! No changes needed.** 🎉

---

## 📊 Monitoring & Logs

### View Real-time Logs
1. Railway Dashboard → Your Service
2. Click **"Logs"** tab (or **"View Logs"** button)
3. Monitor deployment and runtime logs
4. Look for errors or warnings

### View Metrics
1. Click **"Metrics"** tab
2. See CPU, Memory, Network usage
3. Monitor request rates

### Check Deployments
1. Click **"Deployments"** tab
2. See deployment history
3. Check build logs for each deployment

---

## 🐛 Troubleshooting

### Issue: "502 Bad Gateway"
**Causes:**
- App crashed during startup
- Port configuration incorrect
- Dependencies failed to install

**Solutions:**
1. Check **Logs** tab for errors
2. Verify environment variables are set correctly
3. Check `railway.json` start command
4. Ensure `requirements.txt` is in `backend/` folder

---

### Issue: "No AI providers configured"
**Cause:** No API keys set

**Solution:**
1. Add at least ONE of these in Variables tab:
   - `GEMINI_API_KEY` (Free)
   - `OPENAI_API_KEY` (Paid, needed for RAG)
   - `GROQ_API_KEY` (Free)
2. After adding, Railway auto-redeploys
3. Check logs to confirm

---

### Issue: "Database connection failed"
**Causes:**
- `NEON_DB_URL` not set
- Neon database is paused/deleted
- Connection string incorrect

**Solutions:**
1. Verify `NEON_DB_URL` in Variables tab
2. Check Neon dashboard: https://console.neon.tech
3. Ensure database is active
4. Verify connection string format:
   ```
   postgresql://user:pass@host/dbname?sslmode=require
   ```

---

### Issue: "CORS Error" in Frontend
**Cause:** Frontend can't connect to backend

**Solutions:**
1. Verify `BACKEND_API_URL` is set in Vercel
2. Check Railway URL is correct (with https://)
3. Backend CORS already allows Vercel domain ✅
4. Clear browser cache and reload

---

### Issue: "RAG/Chatbot not working"
**Causes:**
- `OPENAI_API_KEY` missing (needed for embeddings)
- Qdrant variables incorrect
- Collection doesn't exist

**Solutions:**
1. Add `OPENAI_API_KEY` in Variables tab
2. Verify Qdrant variables:
   - `QDRANT_URL`
   - `QDRANT_API_KEY`
   - `QDRANT_COLLECTION_NAME=cloud`
3. Check Qdrant dashboard: https://cloud.qdrant.io
4. Ensure collection `cloud` exists with data

---

## 🔄 Redeployment & Updates

### Auto-Deployment (Recommended)
1. Push any changes to GitHub main branch
2. Railway automatically detects and redeploys
3. Check **Deployments** tab for progress

### Manual Redeploy
1. Railway Dashboard → Your Service
2. Click **"..."** menu (top right)
3. Select **"Redeploy"**
4. Or click **"New Deployment"** in Deployments tab

### Restart Service
1. Railway Dashboard → Your Service
2. **"..."** menu → **"Restart"**
3. Useful if app is stuck or frozen

---

## 💰 Railway Pricing

### Hobby Plan (Current)
- **$5 free credit/month**
- Pay only for usage beyond free credit
- ~500 hours free runtime
- Auto-sleep after inactivity (optional)

### Costs Breakdown
- **Backend API:** ~$5-10/month (if active 24/7)
- **With auto-sleep:** Can stay within free $5 credit
- **Database:** Use external Neon (free tier)

### Keep Costs Low
1. Enable auto-sleep in Settings (default)
2. Use external database (Neon free tier) ✅
3. Monitor usage in Railway dashboard
4. Set spending limit in account settings

---

## 📝 Environment Variables Reference

### Required Variables

| Variable | Purpose | Where to Get |
|----------|---------|--------------|
| `GEMINI_API_KEY` | AI chatbot (free) | https://aistudio.google.com/app/apikey |
| `OPENAI_API_KEY` | RAG embeddings (paid) | https://platform.openai.com/api-keys |
| `GROQ_API_KEY` | AI fallback (free) | https://console.groq.com/keys |
| `QDRANT_URL` | Vector database | https://cloud.qdrant.io |
| `QDRANT_API_KEY` | Qdrant auth | Qdrant dashboard |
| `QDRANT_COLLECTION_NAME` | Collection name | `cloud` |
| `NEON_DB_URL` | PostgreSQL | https://console.neon.tech |
| `SECRET_KEY` | JWT signing | Random 32+ char string |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_DAYS` | Token expiry | `7` |
| `MODEL_NAME` | Gemini model | `gemini-2.0-flash-exp` |

### Variables NOT to Add

| Variable | Reason |
|----------|--------|
| `PORT` | Railway auto-sets this |
| `BACKEND_API_URL` | Frontend only (Vercel) |
| `DATABASE_URL` | Using NEON_DB_URL instead |

---

## ✅ Deployment Checklist

- [ ] Railway account created with GitHub
- [ ] Project deployed from GitHub repo
- [ ] All environment variables added (11 total)
- [ ] Railway domain generated
- [ ] Backend health endpoint working
- [ ] API docs accessible
- [ ] `BACKEND_API_URL` updated in Vercel
- [ ] Frontend redeployed on Vercel
- [ ] Chatbot connecting to Railway backend
- [ ] Authentication working (Sign Up/Login)
- [ ] RAG search working
- [ ] Urdu translation working

---

## 🎉 Success! Your Deployment is Live

**Frontend (Vercel):** https://speckit-plus-hackathon.vercel.app
**Backend (Railway):** https://your-app-name.up.railway.app
**API Docs:** https://your-app-name.up.railway.app/docs

---

## 📞 Support & Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Community:** https://discord.gg/railway
- **Neon Docs:** https://neon.tech/docs
- **Qdrant Docs:** https://qdrant.tech/documentation

---

## 💡 Pro Tips

1. **Monitor Logs:** Check Railway logs regularly for errors
2. **Set Alerts:** Use Railway webhooks for deployment notifications
3. **Database Backups:** Download Neon backups regularly
4. **API Rate Limits:** Monitor Gemini/OpenAI usage
5. **Cost Control:** Set spending limits in Railway settings
6. **Performance:** Upgrade to Pro plan if needed ($20/month)

---

**Happy Deployment!** 🚀

Your AI Book is now live on Railway! 🎊
