from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import time

from core.config import get_settings
from core.logging import logger
from models.ai_model_loader import model_loader

from routers import health, items, ml

load_dotenv()

settings = get_settings()

app = FastAPI(
    title="Voice Deepfake Detection API",
    description="AI-powered voice authentication and deepfake detection system",
    version=settings.api_version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins if settings.environment == "production" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    logger.info(f"Request: {request.method} {request.url.path}")

    response = await call_next(request)

    process_time = time.time() - start_time
    logger.info(f"Response: {response.status_code} - Duration: {process_time:.2f}s")

    return response


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception handler: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )


@app.on_event("startup")
async def startup_event():
    logger.info("Starting Voice Deepfake Detection API...")
    logger.info(f"Environment: {settings.environment}")

    try:
        model_loader.load_model(settings.model_path)
        logger.info("AI model loaded successfully")
    except Exception as e:
        logger.error(f"Error loading AI model: {e}")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down Voice Deepfake Detection API...")


app.include_router(health.router)
app.include_router(items.router)
app.include_router(ml.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
