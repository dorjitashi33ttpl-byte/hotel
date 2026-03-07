from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, timedelta
from app.api import deps
from app.services.inventory import inventory_service
from app.services.geo import geo_service
from app.services.tax import tax_service
from app.services.commission import commission_service
from app.services.fraud import fraud_check_service
from app.services.recommendations import recommendation_service
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking, BookingStatus

router = APIRouter()

@router.get("/recommendations")
async def get_smart_recommendations(
    lat: float,
    lng: float,
    country_iso: str,
    city: Optional[str] = None,
    db: Session = Depends(deps.get_db)
):
    # Strictly filtered by user location context (x city in y country)
    return recommendation_service.get_recommendations(db, lat, lng, country_iso, city)

@router.get("/hotels/search")
async def search_hotels(
    db: Session = Depends(deps.get_db),
    pagination: deps.PaginationParams = Depends(deps.get_pagination_params),
    lat: float = Query(...),
    lng: float = Query(...),
    radius_km: float = Query(10),
    check_in: datetime = Query(...),
    check_out: datetime = Query(...),
):
    # Manual search displays all hotels within the radius, regardless of user city/country context
    point = func.ST_SetSRID(func.ST_MakePoint(lng, lat), 4326)
    hotels = db.query(Hotel).filter(
        func.ST_DWithin(func.cast(Hotel.location, func.Geography), func.cast(point, func.Geography), radius_km * 1000)
    ).offset(pagination.skip).limit(pagination.limit).all()
    return hotels
