from pydantic import BaseModel
from typing import Optional
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
