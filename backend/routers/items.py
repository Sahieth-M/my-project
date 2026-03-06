from fastapi import APIRouter, HTTPException
from typing import List
from schemas import ItemResponse, ItemCreate
from db import get_supabase_client

router = APIRouter(prefix="/api/items", tags=["Items"])


@router.get("", response_model=List[ItemResponse])
async def get_items():
    try:
        supabase = get_supabase_client()
        response = supabase.table("items").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("", response_model=ItemResponse)
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


@router.get("/{item_id}", response_model=ItemResponse)
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


@router.delete("/{item_id}")
async def delete_item(item_id: str):
    try:
        supabase = get_supabase_client()
        supabase.table("items").delete().eq("id", item_id).execute()
        return {"message": "Item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
