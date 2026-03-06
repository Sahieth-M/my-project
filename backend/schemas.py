from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime


class UserBase(BaseModel):
    email: str
    name: str


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True


class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class ItemResponse(ItemBase):
    id: str
    user_id: str
    created_at: datetime

    class Config:
        from_attributes = True


class HealthResponse(BaseModel):
    status: str
    message: str


class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    audio_duration: float
    file_size: int
    filename: str


class PredictionHistoryResponse(BaseModel):
    id: str
    audio_filename: str
    prediction: str
    confidence: float
    audio_duration: float
    file_size: int
    created_at: datetime
    metadata: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True


class PredictionStatsResponse(BaseModel):
    total_predictions: int
    genuine_count: int
    fake_count: int
    average_confidence: float
