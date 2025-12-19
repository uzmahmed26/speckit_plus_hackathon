# 🆓 100% FREE Deployment Guide

Complete guide to deploy your AI Book project **completely free** using Render.com

---

## 🎯 Why Render.com?

✅ **Completely FREE** for hobby projects
✅ **Free PostgreSQL Database** included (no need for Neon)
✅ **No credit card required** to start
✅ **750 hours/month** free tier (enough for 24/7 uptime)
✅ **Auto-deploy** from GitHub
✅ **Free SSL certificate**
✅ **Easy setup** - One-click deploy

**Note:** Free tier apps sleep after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

---

## 📋 What You'll Deploy (100% Free)

1. **Backend (Render Web Service)** - FastAPI server with RAG chatbot
2. **Database (Render PostgreSQL)** - Free PostgreSQL database
3. **Frontend (Vercel)** - Already deployed ✅

**Total Cost: $0/month** 💰

---

## 🚀 Step-by-Step Deployment

### Step 1: Sign Up on Render.com (FREE)

1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended) or email
4. **No credit card required!** ✅

---

### Step 2: Deploy from GitHub (One Click!)

#### Method 1: Using render.yaml (Recommended - Automatic Setup)

1. **Go to Render Dashboard:** https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub account (if not already connected)
4. Select repository: **`uzmahmed26/speckit_plus_hackathon`**
5. Click **"Apply"**
6. Render will automatically:
   - Create backend web service
   - Create PostgreSQL database
   - Link them together
   - Start deployment

**That's it! Render reads `render.yaml` and sets everything up automatically!** 🎉

#### Method 2: Manual Setup (Alternative)

If Blueprint doesn't work, follow these steps:

**2.1 Create PostgreSQL Database:**
1. Click **"New +"** → **"PostgreSQL"**
2. Fill in:
   - **Name:** `physical-ai-db`
   - **Database:** `physicalai`
   - **User:** (auto-generated)
   - **Region:** Oregon (or closest to you)
   - **Plan:** **Free** ✅
3. Click **"Create Database"**
4. Wait for database to be ready (2-3 minutes)
5. **Copy "Internal Database URL"** - you'll need this

**2.2 Create Web Service:**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub: `uzmahmed26/speckit_plus_hackathon`
3. Fill in:
   - **Name:** `physical-ai-backend`
   - **Region:** Oregon (same as database)
   - **Branch:** `main`
   - **Runtime:** Python
   - **Build Command:** `pip install -r backend/requirements.txt`
   - **Start Command:** `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** **Free** ✅
4. Click **"Create Web Service"**

---

### Step 3: Add Environment Variables

**In your web service dashboard:**

1. Go to **"Environment"** tab on the left
2. Click **"Add Environment Variable"**
3. Add these variables one by one:

```bash
# AI Provider (at least one required - all have FREE tiers!)
GEMINI_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
GROQ_API_KEY=your-groq-api-key-here

# Qdrant Vector Database (FREE tier: 1GB)
QDRANT_URL=your-qdrant-cluster-url
QDRANT_API_KEY=your-qdrant-api-key
QDRANT_COLLECTION_NAME=cloud

# Model Configuration
MODEL_NAME=gemini-2.0-flash-exp

# Authentication
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
```

4. **Database URL** (if using Blueprint method, skip this - auto-added):
   - Click **"Add from Database"**
   - Select: `physical-ai-db`
   - Choose: `DATABASE_URL`
   - This automatically links your database!

5. Click **"Save Changes"**
6. Render will automatically redeploy with new variables

---

### Step 4: Get FREE API Keys

#### 1. Gemini API Key (FREE - Recommended)
- **URL:** https://aistudio.google.com/app/apikey
- **Free Tier:** ✅ Generous (60 requests/minute)
- **Steps:**
  1. Sign in with Google
  2. Click "Get API Key"
  3. Create new key
  4. Copy and add to Render

#### 2. Groq API Key (FREE - Fast)
- **URL:** https://console.groq.com/keys
- **Free Tier:** ✅ Yes (30 requests/minute)
- **Steps:**
  1. Sign up at Groq
  2. Go to API Keys
  3. Create new key
  4. Copy and add to Render

#### 3. OpenAI API Key (PAID but needed for RAG)
- **URL:** https://platform.openai.com/api-keys
- **Free Tier:** ❌ Requires $5 minimum credit
- **Note:** Only needed for RAG embeddings
- **Alternative:** Use chatbot without RAG (will work with Gemini/Groq only)

#### 4. Qdrant Cloud (FREE - 1GB)
- **URL:** https://cloud.qdrant.io
- **Free Tier:** ✅ 1GB storage
- **Steps:**
  1. Sign up at Qdrant Cloud
  2. Create new cluster (free tier)
  3. Copy cluster URL (e.g., `https://xxx.gcp.cloud.qdrant.io`)
  4. Copy API key from settings
  5. Create collection named `cloud`
  6. Run ingest script: `python backend/ingest.py`

---

### Step 5: Get Your Backend URL

1. After deployment completes (5-10 minutes), go to your web service dashboard
2. At the top, you'll see your URL: `https://your-app-name.onrender.com`
3. **Copy this URL** - you'll need it for frontend

**Test it:**
- Visit: `https://your-app-name.onrender.com/health`
- You should see: `{"status": "healthy"}`
- API Docs: `https://your-app-name.onrender.com/docs`

---

### Step 6: Update Frontend (Vercel)

1. Go to https://vercel.com/dashboard
2. Select your project: `speckit-plus-hackathon`
3. Go to **"Settings"** → **"Environment Variables"**
4. Add or update:
   - **Name:** `BACKEND_API_URL`
   - **Value:** `https://your-app-name.onrender.com`
   - **Environments:** Check all (Production, Preview, Development)
5. Click **"Save"**

6. **Redeploy Vercel:**
   - Go to **"Deployments"** tab
   - Click **"..."** on latest → **"Redeploy"**
   - Wait for deployment (2-3 minutes)

---

### Step 7: Test Everything!

#### Test Backend:
```bash
# Health check
curl https://your-app-name.onrender.com/health

# Test chatbot (if Gemini key is set)
curl -X POST "https://your-app-name.onrender.com/api/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is Physical AI?"}'
```

#### Test Frontend:
1. Visit: https://speckit-plus-hackathon.vercel.app
2. Open any chapter
3. Click chatbot icon (bottom-right)
4. Ask a question
5. Test Sign Up / Login

**⚠️ Note:** First request may take 30-60 seconds (free tier sleep)

---

## 💡 Free Tier Limitations

### Render.com Free Tier:
- ✅ 750 hours/month web service (more than enough!)
- ⚠️ Sleeps after 15 minutes of inactivity
- ⚠️ First request takes 30-60 seconds to wake up
- ✅ 90 days free PostgreSQL (then auto-expires, re-create for free)
- ✅ No credit card needed

### Workarounds for Sleep:
1. **Use a ping service** (free): https://uptimerobot.com or https://cron-job.org
2. Set up ping every 10 minutes to keep app awake
3. Or accept 30-60s delay on first request (fine for hobby projects)

---

## 🆓 Complete FREE Stack:

| Service | Provider | Free Tier | Purpose |
|---------|----------|-----------|---------|
| **Backend** | Render.com | 750 hrs/month | FastAPI server |
| **Database** | Render PostgreSQL | 90 days | User data |
| **Vector DB** | Qdrant Cloud | 1GB forever | RAG knowledge base |
| **Frontend** | Vercel | Unlimited | Docusaurus site |
| **AI (Gemini)** | Google | 60 req/min | Chatbot LLM |
| **AI (Groq)** | Groq | 30 req/min | Chatbot fallback |

**Total: $0/month!** 🎉

---

## 📊 Monitoring (FREE)

### View Render Logs:
1. Render Dashboard → Your Service
2. Click **"Logs"** tab
3. Real-time logs for debugging

### View Metrics:
1. Click **"Metrics"** tab
2. See CPU, Memory, Requests

### View Database:
1. Render Dashboard → Your Database
2. Click **"Connect"** to see connection details
3. Use any PostgreSQL client to connect

---

## 🐛 Troubleshooting

### Issue: "502 Bad Gateway"
**Cause:** App crashed or not started
**Solution:**
- Check Render logs (Logs tab)
- Verify environment variables are set
- Check build/start commands are correct

### Issue: "No AI providers configured"
**Cause:** No API keys set
**Solution:**
- Add at least one: GEMINI_API_KEY or GROQ_API_KEY
- Both are FREE - get them from links above
- Redeploy after adding variables

### Issue: "Database connection failed"
**Cause:** DATABASE_URL not set or incorrect
**Solution:**
- If using Blueprint: Auto-added, check database is running
- If manual: Add DATABASE_URL from database "Connect" section
- Format: `postgresql://user:pass@host/dbname`

### Issue: "App is sleeping (first request slow)"
**Cause:** Free tier sleeps after 15 min
**Solution:**
- Normal behavior on free tier
- Use ping service to keep awake (see above)
- Or upgrade to paid plan ($7/month) for always-on

### Issue: "CORS error in frontend"
**Cause:** Frontend can't connect to backend
**Solution:**
- Verify BACKEND_API_URL is set in Vercel
- Check backend CORS allows Vercel domain
- Already configured in your code! ✅

---

## 🔄 Auto-Deployment

**Good news:** Both Render and Vercel auto-deploy!

- **Push to GitHub main branch** → Both redeploy automatically
- No manual trigger needed
- See deployment status in dashboards

---

## 📈 Upgrade Options (Optional)

If you need more performance later:

| Plan | Cost | Benefits |
|------|------|----------|
| **Render Starter** | $7/month | Always-on, no sleep |
| **Render Standard** | $25/month | More CPU/RAM |

But for hobby/demo projects, **FREE tier is perfect!** ✅

---

## ✅ Deployment Checklist

- [ ] Render.com account created (free, no credit card)
- [ ] PostgreSQL database created on Render (free)
- [ ] Web service created on Render (free)
- [ ] Environment variables added (Gemini, Groq, Qdrant, etc.)
- [ ] Backend deployed successfully
- [ ] Backend URL copied
- [ ] BACKEND_API_URL updated in Vercel
- [ ] Frontend redeployed on Vercel
- [ ] `/health` endpoint working
- [ ] Chatbot responding
- [ ] Authentication working

---

## 🎉 Success!

Your full-stack AI Book is now **100% FREE** and deployed:

- **Frontend (Vercel):** https://speckit-plus-hackathon.vercel.app
- **Backend (Render):** https://your-app-name.onrender.com
- **Database (Render):** Included in backend
- **API Docs:** https://your-app-name.onrender.com/docs

**Total Monthly Cost: $0** 💰

---

## 🆘 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Vercel Docs:** https://vercel.com/docs

---

## 💡 Pro Tips:

1. **Keep apps awake:** Use https://uptimerobot.com (free) to ping every 10 min
2. **Monitor usage:** Check Render dashboard to stay within free tier
3. **Database backups:** Download backups regularly (manual on free tier)
4. **API rate limits:** Monitor Gemini/Groq usage to avoid hitting limits
5. **Logs:** Check logs regularly for errors

---

**Happy FREE Deployment!** 🚀🆓

No credit card. No hidden costs. Just pure free hosting! ✨
