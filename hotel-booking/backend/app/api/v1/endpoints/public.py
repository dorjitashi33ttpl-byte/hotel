from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
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
    request: Request,
    lat: float,
    lng: float,
    db: Session = Depends(deps.get_db)
):
    # Detect Country/City from Mapbox reverse geocode
    geo_context = await geo_service.reverse_geocode(lat, lng)

    country_iso = geo_context.get("country_iso")
    city = geo_context.get("city")

    if not country_iso:
        raise HTTPException(status_code=400, detail="Could not determine location context.")

    return recommendation_service.get_recommendations(db, lat, lng, country_iso, city)

@router.get("/hotels/search")
async def search_hotels(
    db: Session = Depends(deps.get_db),
    pagination: deps.PaginationParams = Depends(deps.get_pagination_params),
    lat: float = Query(...),
    lng: float = Query(...),
    radius_km: float = Query(10),
):
    # Manual search remains global within radius
    point = func.ST_SetSRID(func.ST_MakePoint(lng, lat), 4326)
    hotels = db.query(Hotel, func.ST_Distance(func.cast(Hotel.location, func.Geography), func.cast(point, func.Geography)).label("dist")).filter(
        func.ST_DWithin(func.cast(Hotel.location, func.Geography), func.cast(point, func.Geography), radius_km * 1000)
    ).order_by("dist").offset(pagination.skip).limit(pagination.limit).all()
    return [{"id": h.id, "name": h.name, "dist_km": round(d/1000, 2)} for h, d in hotels]
