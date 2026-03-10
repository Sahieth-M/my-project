# VoiceShield Quick Start Guide

Get up and running with VoiceShield in minutes.

## 🚀 Quick Start (5 minutes)

### Option 1: Docker (Recommended)

```bash
# 1. Clone or download the repository
git clone https://github.com/YOUR_USERNAME/voiceshield.git
cd voiceshield

# 2. Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env

# 3. Edit .env files with your Supabase credentials
nano .env                    # Frontend
nano backend/.env            # Backend

# 4. Start with Docker Compose
docker-compose up --build

# 5. Access the application
# Frontend: http://localhost
# Backend API: http://localhost/api
# API Docs: http://localhost/api/docs
```

### Option 2: Local Development

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with Supabase credentials
python main.py
```

**Frontend (new terminal):**
```bash
npm install
cp .env.example .env
# Edit .env with API URL and Supabase credentials
npm run dev
```

---

## ⚙️ Environment Setup

### Supabase Setup (Free Account)

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Go to Settings → API
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **Anon public key** → `SUPABASE_KEY` / `VITE_SUPABASE_ANON_KEY`
   - **Service role key** → `SUPABASE_SERVICE_ROLE_KEY`

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Backend `backend/.env`

```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ENVIRONMENT=development
```

---

## 📝 Common Commands

### Development

```bash
# Start frontend dev server
npm run dev

# Start backend dev server
cd backend && python main.py

# Build frontend
npm run build

# Type check frontend
npm run typecheck

# Lint frontend
npm run lint
```

### Docker

```bash
# Start all containers
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up --build
```

### Git

```bash
# View commit history
git log --oneline

# Create new branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "Description"

# Push to GitHub
git push origin feature/my-feature
```

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Find what's using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# For frontend, use different port
npm run dev -- --port 3000
```

### Backend Won't Start

```bash
# Check Python version
python --version  # Should be 3.11+

# Reinstall dependencies
pip install -r requirements.txt

# Check environment variables
cat backend/.env
```

### Frontend Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules
npm ci

# Check Node version
node --version  # Should be 18+
```

### Database Connection Error

```bash
# Verify credentials
cat backend/.env

# Test connection
python -c "from supabase import create_client; c = create_client('URL', 'KEY')"
```

---

## 📚 Full Documentation

- **README.md** - Project overview
- **DEPLOYMENT_GUIDE.md** - Deployment instructions
- **GITHUB_SETUP.md** - GitHub setup
- **REPOSITORY_SUMMARY.md** - Repository details
- **backend/README.md** - Backend API docs
- **backend/MODEL_INFERENCE.md** - Model details

---

## 🎯 Next Steps

1. ✅ Set up Supabase account
2. ✅ Configure environment files
3. ✅ Start development server
4. ✅ Record or upload audio
5. ✅ Get voice analysis results
6. ✅ Deploy to production

---

## 💡 API Endpoints

```bash
# Health check
curl http://localhost:8000/api/health

# Predict voice
curl -X POST http://localhost:8000/api/predict \
  -F "file=@audio.wav"

# Get history
curl http://localhost:8000/api/predictions/history

# Get stats
curl http://localhost:8000/api/predictions/stats
```

---

## 🔐 Security Checklist

- [ ] Use strong Supabase password
- [ ] Keep .env files out of Git (they're in .gitignore)
- [ ] Use HTTPS in production
- [ ] Configure CORS origins
- [ ] Enable database backups
- [ ] Monitor logs for errors

---

## 📦 What's Included

✅ React frontend with animations
✅ FastAPI backend with ML model
✅ PyTorch voice deepfake detection
✅ Microphone recording support
✅ Audio file upload
✅ Supabase database
✅ Docker containerization
✅ Comprehensive documentation

---

## 🚀 Deployment

### Docker (Production-Ready)
```bash
docker-compose up -d
```

### AWS EC2, Heroku, DigitalOcean
See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Commit with clear messages
5. Push and create Pull Request

---

## 📞 Support

- Check documentation
- Review GitHub issues
- Create detailed bug reports
- Submit improvement suggestions

---

## ⭐ Key Features

- Real-time voice analysis
- AI deepfake detection
- Prediction history
- Modern responsive UI
- REST API with documentation
- Database integration
- Docker support

---

**Ready to use!** Start with Docker or local development above.

Last Updated: March 2024
