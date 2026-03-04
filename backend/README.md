# FastAPI Backend

A FastAPI backend service integrated with Supabase for data persistence.

## Setup

### Prerequisites
- Python 3.8+
- pip

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

4. Create a `.env` file with your Supabase credentials:
```bash
cp .env.example .env
```

5. Update `.env` with your Supabase URL and keys:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
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
├── main.py              # FastAPI application and routes
├── config.py            # Configuration management
├── db.py                # Database client initialization
├── schemas.py           # Pydantic models for request/response validation
├── requirements.txt     # Python dependencies
└── .env.example         # Environment variables template
```

## API Endpoints

### Health Check
- `GET /` - Health check endpoint

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `GET /api/items/{item_id}` - Get item by ID
- `DELETE /api/items/{item_id}` - Delete an item

## Environment Variables

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key for client operations
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key for admin operations
