from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Literal


class Settings(BaseSettings):
    supabase_url: str
    supabase_key: str
    supabase_service_role_key: str

    environment: Literal["development", "production"] = "development"
    api_version: str = "1.0.0"

    max_upload_size_mb: int = 10
    allowed_audio_formats: list[str] = ["wav", "mp3", "m4a", "ogg", "flac"]

    rate_limit_per_minute: int = 10

    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    model_path: str = "models/voice_detector.pth"

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings():
    return Settings()
