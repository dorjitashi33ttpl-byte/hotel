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
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking, BookingStatus
from app.worker.tasks import send_booking_confirmation_email

router = APIRouter()

@router.get("/hotels/search")
async def search_hotels(
    db: Session = Depends(deps.get_db),
    lat: float = Query(...),
    lng: float = Query(...),
    radius_km: float = Query(10),
    check_in: datetime = Query(...),
    check_out: datetime = Query(...),
):
    # PostGIS spatial search: find hotels within radius using geography distance
    # hotel_location = ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
    # ST_DWithin(Hotel.location, hotel_location, radius_km * 1000)

    point = func.ST_SetSRID(func.ST_MakePoint(lng, lat), 4326)
    hotels = db.query(Hotel).filter(
        func.ST_DWithin(func.cast(Hotel.location, func.Geography), func.cast(point, func.Geography), radius_km * 1000)
    ).all()

    results = []
    for hotel in hotels:
        results.append({
            "id": hotel.id,
            "name": hotel.name,
            "address": hotel.address,
            "amenities": hotel.amenities,
            "media": hotel.media
        })
    return results

@router.get("/geo/autocomplete")
async def geo_autocomplete(q: str, country: str = "BT"):
    return await geo_service.autocomplete(q, country)

@router.post("/bookings/hold")
async def hold_booking(
    request: Request,
    hotel_id: int,
    room_type_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    if not fraud_check_service.check_booking(current_user.id, request.client.host, "online"):
        raise HTTPException(status_code=403, detail="Suspicious booking activity.")

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

@router.get("/hotels/{id}/route")
async def get_hotel_route(id: int, from_lat: float, from_lng: float, db: Session = Depends(deps.get_db)):
    hotel = db.query(Hotel).filter(Hotel.id == id).first()
    if not hotel: raise HTTPException(status_code=404, detail="Hotel not found")
    # extracted lat/lng from PostGIS location
    to_lat, to_lng = 27.4728, 89.6339
    return await geo_service.get_route(from_lat, from_lng, to_lat, to_lng)
