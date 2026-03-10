from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.booking import Booking
from app.services.booking import booking_service
from app.services.checkin import checkin_service
from datetime import date

router = APIRouter()

@router.post("/holds")
async def create_hold(
    room_type_id: int,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    hold = await booking_service.create_hold(db, room_type_id, start_date, end_date, current_user.id)
    if not hold: raise HTTPException(409, "Inventory unavailable for these dates")
    return hold

@router.post("/{booking_id}/checkin")
async def guest_checkin(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking: raise HTTPException(404, "Booking not found")

    key_url = await checkin_service.generate_digital_key(booking)
    return {"status": "checked_in", "digital_key_url": key_url}
