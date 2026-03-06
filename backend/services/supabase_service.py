from supabase import create_client, Client
from core.config import get_settings
from core.logging import logger
from typing import Optional, List, Dict, Any


class SupabaseService:
    _client: Optional[Client] = None

    @classmethod
    def get_client(cls) -> Client:
        if cls._client is None:
            settings = get_settings()
            cls._client = create_client(settings.supabase_url, settings.supabase_key)
            logger.info("Supabase client initialized")
        return cls._client

    @classmethod
    async def save_prediction(
        cls,
        audio_filename: str,
        prediction: str,
        confidence: float,
        audio_duration: float = 0.0,
        file_size: int = 0,
        user_id: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        try:
            client = cls.get_client()

            data = {
                "audio_filename": audio_filename,
                "prediction": prediction,
                "confidence": confidence,
                "audio_duration": audio_duration,
                "file_size": file_size,
                "user_id": user_id,
                "metadata": metadata or {}
            }

            response = client.table("predictions").insert(data).execute()
            logger.info(f"Prediction saved successfully: {audio_filename}")
            return response.data[0] if response.data else {}

        except Exception as e:
            logger.error(f"Error saving prediction: {e}")
            raise

    @classmethod
    async def get_recent_predictions(cls, limit: int = 10) -> List[Dict[str, Any]]:
        try:
            client = cls.get_client()
            response = client.table("predictions").select("*").order("created_at", desc=True).limit(limit).execute()
            return response.data

        except Exception as e:
            logger.error(f"Error fetching predictions: {e}")
            raise

    @classmethod
    async def get_prediction_stats(cls) -> Dict[str, Any]:
        try:
            client = cls.get_client()

            response = client.table("predictions").select("*").execute()
            predictions = response.data

            total = len(predictions)
            genuine = len([p for p in predictions if p["prediction"] == "Genuine Voice"])
            fake = len([p for p in predictions if p["prediction"] == "Fake Voice"])

            avg_confidence = sum(p["confidence"] for p in predictions) / total if total > 0 else 0

            return {
                "total_predictions": total,
                "genuine_count": genuine,
                "fake_count": fake,
                "average_confidence": round(avg_confidence, 2)
            }

        except Exception as e:
            logger.error(f"Error fetching prediction stats: {e}")
            raise
