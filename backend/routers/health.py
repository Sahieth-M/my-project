from fastapi import APIRouter
from core.config import get_settings

router = APIRouter(prefix="/api", tags=["Health"])


@router.get("/health")
async def health_check():
    settings = get_settings()
    return {
        "status": "healthy",
        "message": "Voice Deepfake Detection API is running",
        "version": settings.api_version,
        "environment": settings.environment
    }
