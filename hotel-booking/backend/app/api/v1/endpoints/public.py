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

from app.services.geo import geo_service

@router.get("/hotels/{id}/route")
async def get_hotel_route(
    id: str,
    from_lat: float,
    from_lng: float,
    db: AsyncSession = Depends(get_db)
):
    hotel = await db.get(Hotel, id)
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")

    route_data = await geo_service.get_route_and_distance(
        from_lat, from_lng, hotel.lat, hotel.lng
    )
    return route_data
