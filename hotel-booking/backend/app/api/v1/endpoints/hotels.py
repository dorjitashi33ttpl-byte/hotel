from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.api.deps import get_db, get_current_user
from app.models.hotel import Hotel
from app.services.geo import geo_service
from app.services.recommendations import recommendation_service

router = APIRouter()

@router.get("/search")
async def search_hotels(
    lat: float,
    lng: float,
    radius_km: float = 10.0,
    db: Session = Depends(get_db)
):
    # PostGIS spatial search
    return db.query(Hotel).all() # Mocked return

@router.get("/{hotel_id}")
async def get_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel: raise HTTPException(404, "Sanctuary not found")
    return hotel

@router.get("/recommendations")
async def get_recommendations(
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return await recommendation_service.get_personalized_recommendations(db, current_user.id, lat, lng)
