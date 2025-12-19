# 🆓 Quick FREE Deployment (5 Minutes!)

Deploy your AI Book **completely free** - no credit card needed!

---

## ⚡ Quick Start (3 Steps Only!)

### Step 1: Deploy Backend (2 minutes)

1. **Go to:** https://render.com
2. **Sign up FREE** with GitHub (no credit card!)
3. Click **"New +"** → **"Blueprint"**
4. Select repo: `uzmahmed26/speckit_plus_hackathon`
5. Click **"Apply"**

**Done!** Render automatically creates:
- ✅ Backend API server
- ✅ PostgreSQL database
- ✅ Links them together

---

### Step 2: Add API Keys (2 minutes)

In Render dashboard → Your service → **"Environment"** tab:

**Get FREE Gemini Key (30 seconds):**
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Get API Key"
3. Copy key → Add to Render as `GEMINI_API_KEY`

**Get FREE Groq Key (30 seconds):**
1. Visit: https://console.groq.com/keys
2. Sign up → Create key
3. Copy key → Add to Render as `GROQ_API_KEY`

**Get FREE Qdrant (1 minute):**
1. Visit: https://cloud.qdrant.io
2. Create cluster (free tier)
3. Copy URL → Add to Render as `QDRANT_URL`
4. Copy API key → Add to Render as `QDRANT_API_KEY`

Click **"Save Changes"** - Done! ✅

---

### Step 3: Connect Frontend (1 minute)

1. Copy your Render URL: `https://your-app.onrender.com`
2. Go to: https://vercel.com/dashboard
3. Select project → **Settings** → **Environment Variables**
4. Add: `BACKEND_API_URL` = `https://your-app.onrender.com`
5. **Deployments** → **Redeploy**

**Done!** 🎉

---

## 🎯 Test Your Deployment

Visit: https://speckit-plus-hackathon.vercel.app

- ✅ Click chatbot icon
- ✅ Ask a question
- ✅ Test Sign Up / Login

**⚠️ Note:** First request may take 30-60 seconds (free tier wakes up from sleep)

---

## 💰 What's FREE:

| Service | Cost |
|---------|------|
| Backend (Render) | $0 |
| Database (Render) | $0 |
| Vector DB (Qdrant) | $0 |
| Frontend (Vercel) | $0 |
| AI (Gemini) | $0 |
| AI (Groq) | $0 |
| **Total** | **$0/month** |

---

## 🔧 Optional: Keep App Awake

Free tier sleeps after 15 min. To keep awake:

1. Visit: https://uptimerobot.com (free)
2. Create monitor
3. Set URL: `https://your-app.onrender.com/health`
4. Interval: 5 minutes

Now your app stays awake 24/7! ✅

---

## 📚 Need More Details?

See full guide: **FREE_DEPLOYMENT_GUIDE.md**

---

**That's it! Your AI Book is now live for FREE!** 🚀✨
