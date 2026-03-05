from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from app.api import deps
from app.services.inventory import inventory_service
from app.services.geo import geo_service
from app.services.tax import tax_service
from app.services.currency import currency_service
from app.services.commission import commission_service
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking, BookingStatus
from app.models.review import Review

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
    hotels = db.query(Hotel).all()
    results = []
    for hotel in hotels:
        # In production: PostGIS ST_Distance logic here
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
    hotel_id: int,
    room_type_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # 1. Check availability with transactional lock
    is_available = await inventory_service.check_and_reserve(
        db, hotel_id, room_type_id, check_in, check_out, 0 # placeholder
    )
    if not is_available:
        raise HTTPException(status_code=400, detail="Room not available for selected dates")

    # 2. Calculate Pricing, Tax, and Commission
    room_type = db.query(RoomType).filter(RoomType.id == room_type_id).first()
    base_price = room_type.base_price

    # Mock hotel country lookup
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    # country_iso = hotel.tenant.country.iso_code
    country_iso = "BT" # fallback for demo

    tax_info = tax_service.calculate_total_with_tax(base_price, country_iso)
    total_amount = tax_info["total_with_tax"]
    commission_amount = commission_service.calculate_commission(total_amount)

    # 3. Create Hold Booking
    booking = Booking(
        tenant_id=1,
        hotel_id=hotel_id,
        user_id=current_user.id,
        room_type_id=room_type_id,
        check_in=check_in,
        check_out=check_out,
        status=BookingStatus.HOLD,
        total_amount=total_amount,
        commission_amount=commission_amount,
        currency="BTN", # default from country
        hold_expires_at=datetime.utcnow() + timedelta(minutes=15)
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    return {
        "booking_id": booking.id,
        "status": booking.status,
        "total_amount": booking.total_amount,
        "tax_amount": tax_info["tax_amount"],
        "hold_expires_at": booking.hold_expires_at,
        "currency": booking.currency
    }

@router.get("/hotels/{id}/route")
async def get_hotel_route(
    id: int,
    from_lat: float,
    from_lng: float,
    db: Session = Depends(deps.get_db)
):
    hotel = db.query(Hotel).filter(Hotel.id == id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    # In production: extract lat/lng from hotel.location PostGIS field
    to_lat, to_lng = 27.4728, 89.6339 # Thimphu mock
    return await geo_service.get_route(from_lat, from_lng, to_lat, to_lng)
