# VoiceShield Deployment Guide

Complete guide for deploying the VoiceShield AI Voice Deepfake Detection System.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Docker Deployment](#docker-deployment)
3. [Production Deployment](#production-deployment)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Git
- Supabase account (free tier available)

### Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials:
# SUPABASE_URL=your_url
# SUPABASE_KEY=your_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 5. Start the backend server
python main.py
```

Backend API will be available at: `http://localhost:8000`

**API Documentation:**
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

```bash
# 1. From project root, install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with:
# VITE_API_URL=http://localhost:8000
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# 3. Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## Docker Deployment

### Prerequisites

- Docker (v20+)
- Docker Compose (v2+)

### Quick Start

```bash
# 1. Clone repository and navigate to project root
cd voiceshield

# 2. Create environment files
cp .env.example .env
cp backend/.env.example backend/.env

# 3. Edit environment files with your Supabase credentials
nano .env
nano backend/.env

# 4. Build and start containers
docker-compose up --build

# 5. Access the application
# Frontend: http://localhost
# Backend API: http://localhost/api
# API Docs: http://localhost/api/docs
```

### Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up --build

# Remove all volumes and containers
docker-compose down -v
```

### Docker File Structure

```
Dockerfile              # Frontend container (Node → Nginx)
backend/Dockerfile     # Backend container (Python → FastAPI)
nginx.conf            # Nginx reverse proxy configuration
docker-compose.yml    # Orchestration configuration
```

---

## Production Deployment

### On AWS EC2

#### 1. Instance Setup

```bash
# 1. Launch Ubuntu 22.04 LTS instance (t3.medium or larger)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Update system
sudo apt update && sudo apt upgrade -y

# 4. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# 5. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Deploy Application

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/voiceshield.git
cd voiceshield

# 2. Create environment files
cp .env.example .env
cp backend/.env.example backend/.env

# 3. Edit with production values
nano .env
nano backend/.env

# 4. Build and deploy
docker-compose up -d

# 5. Verify
docker-compose ps
curl http://localhost/api/health
```

#### 3. SSL/TLS Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Update nginx.conf with certificate paths
sudo systemctl restart docker-compose
```

#### 4. Update Nginx Configuration

Add to `nginx.conf`:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://frontend:80;
    }

    location /api {
        proxy_pass http://backend:8000;
    }
}
```

### On Heroku

```bash
# 1. Install Heroku CLI
curl https://cli.heroku.com/install.sh | sh

# 2. Login
heroku login

# 3. Create app
heroku create your-app-name

# 4. Set environment variables
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_KEY=your_key

# 5. Deploy
git push heroku main
```

### On DigitalOcean App Platform

1. Connect GitHub repository
2. Select Dockerfile
3. Configure environment variables
4. Deploy

---

## Database Setup

### Supabase Configuration

#### 1. Create Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project name and password
4. Select region closest to you
5. Click "Create new project"

#### 2. Get Credentials

In Supabase dashboard:
- URL: Settings → API → Project URL
- Anon Key: Settings → API → Anon public key
- Service Role Key: Settings → API → Service role key

#### 3. Apply Database Migrations

```bash
# The migrations are automatically applied when backend starts
# Or manually run the migration file:
# supabase/migrations/20260306045727_create_predictions_table.sql
```

#### 4. Configure RLS Policies

The database already has RLS enabled with public access policies for demo purposes.

For production, update `supabase/migrations/` with user-specific policies.

---

## Environment Configuration

### Frontend `.env`

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Backend `.env`

```env
# Supabase Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Application Settings
ENVIRONMENT=production
MAX_UPLOAD_SIZE_MB=10
RATE_LIMIT_PER_MINUTE=10

# Model Configuration
MODEL_PATH=models/voice_detector_model.pth
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbGc...` |
| `SUPABASE_KEY` | Same as anon key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | `eyJhbGc...` |
| `ENVIRONMENT` | dev or production | `production` |

---

## Troubleshooting

### Backend Issues

#### Port 8000 Already in Use

```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>
```

#### Model Loading Error

```bash
# Verify model file exists
ls -la backend/models/voice_detector_model.pth

# Check logs
docker-compose logs backend
```

#### Database Connection Error

```bash
# Verify Supabase credentials
cat backend/.env

# Test connection
python -c "from supabase import create_client; create_client('URL', 'KEY')"
```

### Frontend Issues

#### Port 5173 Already in Use

```bash
# Use different port
npm run dev -- --port 3000
```

#### API Connection Failed

1. Check backend is running: `curl http://localhost:8000/api/health`
2. Verify `VITE_API_URL` in `.env`
3. Check browser console for CORS errors
4. Verify backend `.env` has correct CORS origins

### Docker Issues

#### Container Won't Start

```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild containers
docker-compose down
docker-compose up --build
```

#### Disk Space Issues

```bash
# Clean up unused images
docker image prune

# Clean up unused volumes
docker volume prune

# Remove everything
docker system prune -a
```

### Audio Processing Issues

#### "Error loading audio file"

- Verify file format: WAV, MP3, M4A, OGG, FLAC
- Check file is not corrupted
- File size ≤ 10MB
- Ensure FFmpeg is installed

#### "Model inference failed"

- Check model file is present: `backend/models/voice_detector_model.pth`
- Verify model is compatible with PyTorch version
- Check system has sufficient memory
- Review backend logs

---

## Monitoring and Maintenance

### Logs

```bash
# View backend logs
docker-compose logs -f backend

# View frontend logs
docker-compose logs -f frontend

# View nginx logs
docker-compose logs -f frontend | grep nginx
```

### Health Checks

```bash
# Backend health
curl http://localhost:8000/api/health

# Frontend health
curl http://localhost

# Database connection
curl http://localhost:8000/api/predictions/stats
```

### Performance Monitoring

```bash
# CPU and Memory usage
docker stats

# Detailed container info
docker inspect voiceshield-backend
```

### Database Maintenance

```bash
# View database size
SELECT pg_size_pretty(pg_database_size('voiceshield'));

# Clear old predictions
DELETE FROM predictions WHERE created_at < NOW() - INTERVAL '30 days';

# Reindex tables
REINDEX TABLE predictions;
```

---

## Security Checklist

- [ ] SSL/TLS certificates installed
- [ ] Environment variables stored securely
- [ ] Database backups configured
- [ ] CORS origins restricted to known domains
- [ ] Rate limiting enabled
- [ ] File upload validation enabled
- [ ] API authentication configured
- [ ] Secrets not committed to Git
- [ ] Regular security updates applied
- [ ] Logs monitored for anomalies

---

## Backup and Recovery

### Database Backup

```bash
# Manual backup
pg_dump -h your-db-host -U postgres voiceshield > backup.sql

# Supabase automatic backups
# Settings → Database → Backups (automatic daily backups)
```

### Restore from Backup

```bash
# Restore database
psql -h your-db-host -U postgres voiceshield < backup.sql
```

### Container Backup

```bash
# Save container as image
docker commit voiceshield-backend voiceshield-backend-backup:latest

# Export image
docker save voiceshield-backend-backup:latest > backup.tar
```

---

## Performance Optimization

### Frontend Optimization

- Enable Gzip compression (automatic in nginx.conf)
- Lazy load components
- Minimize bundle size
- Cache static assets

### Backend Optimization

- Model caching (already implemented)
- Database query optimization
- Connection pooling
- Request logging for monitoring

### Database Optimization

- Indexes on frequently queried columns (already configured)
- Regular ANALYZE and VACUUM
- Remove old records periodically

---

## Scaling

### Horizontal Scaling

1. Deploy multiple backend instances
2. Use load balancer (Nginx, HAProxy, AWS ELB)
3. Use database connection pooling
4. Cache predictions in Redis

### Vertical Scaling

1. Upgrade instance type (CPU, memory)
2. Increase Docker resource limits
3. Optimize model for faster inference
4. Increase database storage

---

## Support and Resources

- **Documentation**: See README.md and backend/README.md
- **API Documentation**: http://localhost:8000/docs
- **GitHub Issues**: Report bugs and feature requests
- **Model Details**: See backend/MODEL_INFERENCE.md

---

**Version**: 1.0.0
**Last Updated**: March 2024
