# 🔐 Environment Variables Guide

Complete list of environment variables required for Railway deployment.

---

## 📋 Copy-Paste Template for Railway

Copy all these variables to Railway's **Variables** section:

```bash
# ================================
# AI PROVIDER API KEYS
# ================================
# You need AT LEAST ONE of these API keys for the chatbot to work

# Option 1: Google Gemini (RECOMMENDED - Free Tier Available)
GEMINI_API_KEY=AIzaSyC6EmJzTsHfgsR2PgtSi0ig8KKDdAPfHz8

# Option 2: OpenAI (REQUIRED for RAG embeddings)
OPENAI_API_KEY=your-openai-api-key-here

# Option 3: Groq (Fast inference - Free Tier Available)
GROQ_API_KEY=your-groq-api-key-here

# Option 4: Anthropic Claude (Optional)
# ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Option 5: Qwen via DashScope (Optional)
# DASHSCOPE_API_KEY=your-dashscope-api-key-here

# Option 6: OpenRouter (Optional)
# OPENROUTER_API_KEY=your-openrouter-api-key-here

# Model name for Gemini
MODEL_NAME=gemini-2.0-flash-exp

# ================================
# QDRANT VECTOR DATABASE (RAG)
# ================================
QDRANT_URL=https://your-cluster-url.gcp.cloud.qdrant.io
QDRANT_API_KEY=your-qdrant-api-key
QDRANT_COLLECTION_NAME=cloud

# ================================
# DATABASE CONFIGURATION
# ================================
# PostgreSQL database connection string
NEON_DB_URL=postgresql://user:password@host:port/dbname

# ================================
# AUTHENTICATION & SECURITY
# ================================
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
```

---

## 🔑 How to Get Each API Key

### 1. GEMINI_API_KEY (Recommended - Free)
- **Provider:** Google AI Studio
- **URL:** https://aistudio.google.com/app/apikey
- **Free Tier:** Yes (generous limits)
- **Steps:**
  1. Sign in with Google account
  2. Click "Get API Key"
  3. Copy the key
- **Required:** Yes (at least one AI provider needed)

### 2. OPENAI_API_KEY (Required for RAG)
- **Provider:** OpenAI
- **URL:** https://platform.openai.com/api-keys
- **Free Tier:** No ($5 minimum credit)
- **Steps:**
  1. Sign up at OpenAI
  2. Add billing information
  3. Create new secret key
  4. Copy the key (starts with `sk-`)
- **Required:** Yes (needed for text embeddings in RAG)

### 3. GROQ_API_KEY (Optional - Free)
- **Provider:** Groq
- **URL:** https://console.groq.com/keys
- **Free Tier:** Yes
- **Steps:**
  1. Sign up at Groq
  2. Go to API Keys section
  3. Create new key
  4. Copy the key
- **Required:** No (fallback provider)

### 4. QDRANT_URL & QDRANT_API_KEY (Required for RAG)
- **Provider:** Qdrant Cloud
- **URL:** https://cloud.qdrant.io
- **Free Tier:** Yes (1GB free)
- **Steps:**
  1. Sign up at Qdrant Cloud
  2. Create a new cluster
  3. Copy the cluster URL (e.g., `https://xxx.gcp.cloud.qdrant.io`)
  4. Copy the API key from cluster settings
  5. Create a collection named `cloud` or update `QDRANT_COLLECTION_NAME`
- **Required:** Yes (for RAG chatbot feature)

### 5. NEON_DB_URL (Required for Auth)
- **Provider:** Neon Database
- **URL:** https://neon.tech
- **Free Tier:** Yes (500MB storage, 1 project)
- **Steps:**
  1. Sign up at Neon
  2. Create a new project
  3. Copy the connection string (PostgreSQL format)
  4. Ensure it includes `?sslmode=require`
- **Required:** Yes (for user authentication database)

### 6. SECRET_KEY (Required for JWT)
- **How to Generate:**
  ```bash
  python -c "import secrets; print(secrets.token_urlsafe(32))"
  ```
- **Or use:** Any random 32+ character string
- **Required:** Yes (for JWT token signing)

---

## ⚙️ Railway-Specific Notes

### DO NOT Set These Variables:
- ❌ `PORT` - Railway automatically sets this
- ❌ `BACKEND_API_URL` - Only needed in Vercel, not Railway

### Auto-Detected by Railway:
- ✅ Python version (from `runtime.txt`)
- ✅ Start command (from `railway.json` or `Procfile`)
- ✅ Dependencies (from `requirements.txt`)

---

## 🌐 Frontend Variables (Vercel)

Add these to Vercel's environment variables:

```bash
# Railway Backend URL (after deployment)
BACKEND_API_URL=https://your-app-name.up.railway.app

# Optional: Gemini key for client-side features
GEMINI_API_KEY=your-gemini-api-key-here
```

---

## 🔄 After Adding Variables to Railway

1. ✅ Save all variables in Railway dashboard
2. ✅ Trigger a new deployment (or Railway auto-redeploys)
3. ✅ Wait for deployment to complete
4. ✅ Test the `/health` endpoint
5. ✅ Check logs if there are errors

---

## 📝 Variable Validation

### Test if Variables are Set Correctly:

```bash
# Visit Railway deployment logs and check for:
✅ "SUCCESS: Database initialized successfully!"
✅ "Gemini API configured"
✅ "RAG system ready"

# Or test via API:
curl https://your-app.up.railway.app/health
```

### Common Errors:

| Error | Cause | Solution |
|-------|-------|----------|
| "No AI providers configured" | No API keys set | Add at least one: GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY |
| "Database connection failed" | NEON_DB_URL incorrect | Check connection string format and Neon status |
| "RAG disabled" | Qdrant vars missing | Set QDRANT_URL and QDRANT_API_KEY |
| "401 Unauthorized" | API key invalid | Regenerate API key from provider |
| "502 Bad Gateway" | App crashed on startup | Check Railway logs for Python errors |

---

## 🎯 Minimum Required Variables

To get the app running with basic features:

```bash
# Minimum for chatbot only:
GEMINI_API_KEY=your-key
SECRET_KEY=your-secret
ALGORITHM=HS256

# Add for RAG (semantic search):
OPENAI_API_KEY=your-key
QDRANT_URL=your-url
QDRANT_API_KEY=your-key
QDRANT_COLLECTION_NAME=cloud

# Add for authentication:
NEON_DB_URL=your-connection-string
```

---

## 🔒 Security Best Practices

1. ✅ Never commit `.env` file to Git (already in `.gitignore`)
2. ✅ Use different API keys for production vs development
3. ✅ Rotate SECRET_KEY periodically
4. ✅ Set strong PostgreSQL passwords
5. ✅ Monitor API usage to detect unauthorized access
6. ✅ Use Railway's "Private Networking" if available

---

## 📞 Need Help?

- **Railway Docs:** https://docs.railway.app
- **Qdrant Docs:** https://qdrant.tech/documentation
- **Neon Docs:** https://neon.tech/docs
- **OpenAI Docs:** https://platform.openai.com/docs
- **Gemini Docs:** https://ai.google.dev/docs

---

Good luck with your deployment! 🚀
