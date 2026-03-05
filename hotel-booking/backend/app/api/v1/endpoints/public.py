from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from app.api import deps
from app.services.inventory import inventory_service
from app.services.geo import geo_service
from app.services.tax import tax_service
from app.services.currency import currency_service
from app.services.commission import commission_service
from app.services.fraud import fraud_check_service
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking, BookingStatus
from app.models.review import Review
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
    # Search implementation using PostGIS would go here
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
    # 1. Fraud Check
    if not fraud_check_service.check_booking(current_user.id, request.client.host, "online"):
        raise HTTPException(status_code=403, detail="Suspicious booking activity detected.")

    # 2. Check availability with transactional lock
    is_available = await inventory_service.check_and_reserve(
        db, hotel_id, room_type_id, check_in, check_out, 0
    )
    if not is_available:
        raise HTTPException(status_code=400, detail="Room not available.")

    # 3. Calculate Pricing
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

@router.post("/bookings/confirm")
async def confirm_booking(
    booking_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    booking = db.query(Booking).filter(Booking.id == booking_id, Booking.user_id == current_user.id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = BookingStatus.CONFIRMED
    commission_service.record_payout(db, booking.tenant_id, booking.id, booking.total_amount, booking.commission_amount)
    send_booking_confirmation_email.delay(booking.id)

    db.commit()
    return {"status": "confirmed"}
