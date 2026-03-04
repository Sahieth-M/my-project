from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
from dotenv import load_dotenv

from db import get_supabase_client
from schemas import HealthResponse, UserResponse, ItemResponse, ItemCreate

load_dotenv()

app = FastAPI(
    title="Backend API",
    description="FastAPI backend with Supabase integration",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_model=HealthResponse)
async def health_check():
    return {
        "status": "healthy",
        "message": "Backend is running"
    }


@app.get("/api/items", response_model=List[ItemResponse])
async def get_items():
    try:
        supabase = get_supabase_client()
        response = supabase.table("items").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/items", response_model=ItemResponse)
async def create_item(item: ItemCreate):
    try:
        supabase = get_supabase_client()
        response = supabase.table("items").insert({
            "title": item.title,
            "description": item.description,
            "user_id": "anonymous"
        }).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: str):
    try:
        supabase = get_supabase_client()
        response = supabase.table("items").select("*").eq("id", item_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Item not found")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/items/{item_id}")
async def delete_item(item_id: str):
    try:
        supabase = get_supabase_client()
        supabase.table("items").delete().eq("id", item_id).execute()
        return {"message": "Item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
