# VoiceShield - AI Voice Deepfake Detection System

A full-stack application for detecting AI-generated and manipulated voice samples using machine learning.

## Features

- **Real-time Voice Analysis**: Upload audio files or record directly from your microphone
- **AI-Powered Detection**: Machine learning models detect deepfakes and voice manipulation
- **Prediction History**: Track and review all analysis results
- **Interactive UI**: Modern, responsive interface with real-time feedback
- **REST API**: Complete backend API for voice analysis

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Framer Motion for animations
- Web Audio API for microphone recording

### Backend
- FastAPI (Python)
- PyTorch for ML inference
- Librosa for audio processing
- Supabase for data persistence

### Infrastructure
- Docker & Docker Compose
- Nginx for production deployment
- Supabase PostgreSQL database

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Docker and Docker Compose (for containerized deployment)
- Supabase account

### Local Development

#### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Update .env with your Supabase credentials
python main.py
```

API available at `http://localhost:8000`

#### Frontend Setup

```bash
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

App available at `http://localhost:5173`

### Docker Deployment

```bash
docker-compose up --build
```

Access at `http://localhost`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/predict` - Analyze audio file
- `GET /api/predictions/history` - Get recent predictions
- `GET /api/predictions/stats` - Get prediction statistics

## Usage

1. Click "Start Voice Analysis"
2. Choose to record or upload audio
3. Analyze the audio sample
4. View results with confidence score

## License

Educational and research purposes.
