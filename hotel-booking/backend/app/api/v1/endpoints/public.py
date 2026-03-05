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
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking, BookingStatus

router = APIRouter()

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
    point = func.ST_SetSRID(func.ST_MakePoint(lng, lat), 4326)

    # PostGIS distance calculation
    # ST_Distance(geography, geography) returns distance in meters
    hotels = db.query(
        Hotel,
        func.ST_Distance(func.cast(Hotel.location, func.Geography), func.cast(point, func.Geography)).label("distance_meters")
    ).options(
        selectinload(Hotel.room_types)
    ).filter(
        func.ST_DWithin(func.cast(Hotel.location, func.Geography), func.cast(point, func.Geography), radius_km * 1000)
    ).order_by("distance_meters").offset(pagination.skip).limit(pagination.limit).all()

    results = []
    for h, distance in hotels:
        results.append({
            "id": h.id,
            "name": h.name,
            "distance_km": round(distance / 1000.0, 2),
            "estimated_duration_min": round((distance / 1000.0) * 1.5, 0), # Mock: 1.5 min per km
            "amenities": h.amenities,
            "media": h.media
        })
    return results

@router.get("/geo/autocomplete")
async def geo_autocomplete(q: str, country: str = "BT"):
    return await geo_service.autocomplete(q, country)

@router.post("/bookings/hold")
async def hold_booking(
    request: Request, hotel_id: int, room_type_id: int, check_in: datetime, check_out: datetime,
    db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_active_user)
):
    if not fraud_check_service.check_booking(current_user.id, request.client.host, "online"):
        raise HTTPException(status_code=403, detail="Suspicious activity.")
    is_available = await inventory_service.check_and_reserve(db, hotel_id, room_type_id, check_in, check_out, 0)
    if not is_available:
        raise HTTPException(status_code=400, detail="Room not available.")

    room_type = db.query(RoomType).filter(RoomType.id == room_type_id).first()
    tax_info = tax_service.calculate_total_with_tax(room_type.base_price, "BT")

    booking = Booking(
        tenant_id=1, hotel_id=hotel_id, user_id=current_user.id, room_type_id=room_type_id,
        check_in=check_in, check_out=check_out, status=BookingStatus.HOLD,
        total_amount=tax_info["total_with_tax"],
        commission_amount=commission_service.calculate_commission(tax_info["total_with_tax"]),
        currency="BTN", hold_expires_at=datetime.utcnow() + timedelta(minutes=15)
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking
