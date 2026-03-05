from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.api import deps
from app.services.inventory import inventory_service
from app.services.geo import geo_service
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking, BookingStatus

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
    is_available = await inventory_service.check_and_reserve(
        db, hotel_id, room_type_id, check_in, check_out, 0 # placeholder booking_id
    )
    if not is_available:
        raise HTTPException(status_code=400, detail="Room not available for selected dates")

    booking = Booking(
        tenant_id=1,
        hotel_id=hotel_id,
        user_id=current_user.id,
        room_type_id=room_type_id,
        check_in=check_in,
        check_out=check_out,
        status=BookingStatus.HOLD,
        hold_expires_at=datetime.utcnow()
    )
    db.add(booking)
    db.commit()
    return booking
