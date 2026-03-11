from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.hotel import Hotel, RoomType
from app.models.marketing import SavedHotel
import uuid

router = APIRouter()

@router.get("/hotels")
async def search_hotels(db: AsyncSession = Depends(get_db)):
    return await db.scalars(select(Hotel))

@router.post("/hotels/{id}/save")
async def save_hotel(id: str, user_id: str, db: AsyncSession = Depends(get_db)):
    existing = await db.scalar(select(SavedHotel).where(SavedHotel.user_id == user_id, SavedHotel.hotel_id == id))
    if existing:
        return {"message": "Already saved"}

    saved = SavedHotel(id=str(uuid.uuid4()), user_id=user_id, hotel_id=id)
    db.add(saved)
    await db.commit()
    return {"message": "Hotel saved"}

@router.get("/users/me/saved-hotels")
async def get_saved_hotels(user_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(Hotel).join(SavedHotel, SavedHotel.hotel_id == Hotel.id).where(SavedHotel.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalars().all()

from app.services.notifications import verify_menu_signature
from fastapi.responses import FileResponse

@router.get("/hotels/{id}/menu/download")
async def download_menu(
    id: str,
    path: str,
    expires: int,
    signature: str
):
    """
    Downloads a property menu PDF if the signed URL is valid.
    """
    if not verify_menu_signature(path, expires, signature):
        raise HTTPException(status_code=403, detail="Invalid or expired signature")

    # In production, path would be resolved to an S3 bucket or local secure path
    # For now, we return a mock response or check file existence
    return {"message": f"Successfully verified access to {path} for hotel {id}"}
