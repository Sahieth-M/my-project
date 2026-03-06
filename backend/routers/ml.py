from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from core.security import validate_audio_file, sanitize_filename
from core.config import get_settings
from core.logging import logger
from services.inference_service import InferenceService
from services.supabase_service import SupabaseService
from utils.audio_processing import save_uploaded_file, get_audio_duration
from schemas import PredictionResponse, PredictionHistoryResponse, PredictionStatsResponse
from typing import List
import os

router = APIRouter(prefix="/api", tags=["Machine Learning"])


async def cleanup_temp_file(file_path: str):
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            logger.info(f"Cleaned up temporary file: {file_path}")
    except Exception as e:
        logger.error(f"Error cleaning up temp file: {e}")


@router.post("/predict", response_model=PredictionResponse)
async def predict_voice(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    settings = get_settings()
    temp_file_path = None

    try:
        validate_audio_file(file, max_size_mb=settings.max_upload_size_mb)

        file_content = await file.read()
        file_size = len(file_content)

        safe_filename = sanitize_filename(file.filename)

        temp_file_path = save_uploaded_file(file_content, safe_filename)

        duration = get_audio_duration(temp_file_path)

        prediction, confidence = InferenceService.predict(temp_file_path)

        features = InferenceService.analyze_audio_features(temp_file_path)

        await SupabaseService.save_prediction(
            audio_filename=safe_filename,
            prediction=prediction,
            confidence=confidence,
            audio_duration=duration,
            file_size=file_size,
            metadata=features
        )

        background_tasks.add_task(cleanup_temp_file, temp_file_path)

        return PredictionResponse(
            prediction=prediction,
            confidence=round(confidence, 2),
            audio_duration=round(duration, 2),
            file_size=file_size,
            filename=safe_filename
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail="Error processing audio file")


@router.get("/predictions/history", response_model=List[PredictionHistoryResponse])
async def get_prediction_history(limit: int = 10):
    try:
        if limit > 100:
            limit = 100

        predictions = await SupabaseService.get_recent_predictions(limit=limit)
        return predictions

    except Exception as e:
        logger.error(f"Error fetching prediction history: {e}")
        raise HTTPException(status_code=500, detail="Error fetching prediction history")


@router.get("/predictions/stats", response_model=PredictionStatsResponse)
async def get_prediction_stats():
    try:
        stats = await SupabaseService.get_prediction_stats()
        return stats

    except Exception as e:
        logger.error(f"Error fetching prediction stats: {e}")
        raise HTTPException(status_code=500, detail="Error fetching prediction stats")
