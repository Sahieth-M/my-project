# VoiceShield Backend API

FastAPI backend for AI voice deepfake detection, integrated with Supabase and PyTorch ML models.

## Setup

### Prerequisites
- Python 3.11+
- pip
- FFmpeg (for audio processing)

### Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your configuration:
```bash
cp .env.example .env
```

5. Update `.env` with your credentials:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ENVIRONMENT=development
MAX_UPLOAD_SIZE_MB=10
RATE_LIMIT_PER_MINUTE=10
```

## Running the Server

Start the development server:
```bash
python main.py
```

The server will run on `http://localhost:8000`

### API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── core/
│   ├── config.py          # Configuration management
│   ├── logging.py         # Logging setup
│   └── security.py        # Security utilities
├── models/
│   └── ai_model_loader.py # ML model loading
├── routers/
│   ├── health.py          # Health check endpoints
│   ├── items.py           # Item CRUD endpoints
│   └── ml.py              # ML prediction endpoints
├── services/
│   ├── inference_service.py    # ML inference logic
│   └── supabase_service.py     # Database operations
├── utils/
│   └── audio_processing.py     # Audio processing utilities
├── main.py                # FastAPI application
├── schemas.py             # Pydantic models
├── db.py                  # Database client
└── requirements.txt       # Python dependencies
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status and version

### Voice Analysis
- `POST /api/predict` - Analyze audio file for deepfakes
  - Accepts: audio/wav, audio/mp3, audio/m4a, audio/ogg, audio/flac
  - Max size: 10MB
  - Returns: prediction result with confidence score

### Prediction History
- `GET /api/predictions/history?limit=10` - Get recent predictions
- `GET /api/predictions/stats` - Get prediction statistics

### Items (Legacy)
- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `GET /api/items/{item_id}` - Get item by ID
- `DELETE /api/items/{item_id}` - Delete an item

## Features

- **ML Model Loading**: PyTorch models loaded once at startup
- **Audio Processing**: Librosa-based feature extraction (MFCC, Mel Spectrogram)
- **Security**: File validation, sanitization, size limits
- **Logging**: Structured request/response logging
- **Error Handling**: Global exception handler
- **Background Tasks**: Automatic cleanup of temporary files
- **CORS Protection**: Configurable origins
- **Database Integration**: Supabase for prediction history

## Environment Variables

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `ENVIRONMENT` - development or production
- `MAX_UPLOAD_SIZE_MB` - Maximum audio file size (default: 10)
- `RATE_LIMIT_PER_MINUTE` - API rate limit (default: 10)
- `MODEL_PATH` - Path to ML model file (default: models/voice_detector.pth)
