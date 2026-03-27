from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.api.deps import get_db, get_current_tenant_user
from app.models.hotel import Booking, Room, Hotel
from app.services.booking import booking_service
from app.services.housekeeping import housekeeping_service
from app.services.staff import staff_service
from app.services.invoicing import invoicing_service
from datetime import date

router = APIRouter()

@router.get("/room-rack")
async def get_room_rack(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    rooms = db.query(Room).filter(Room.hotel_id == current_user.tenant_id).all()
    return rooms

@router.post("/walk-in")
async def create_walk_in_booking(
    room_id: str,
    guest_name: str,
    check_in: date,
    check_out: date,
    payment_method: str = "cash",
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    booking = booking_service.create_direct_booking(
        db,
        hotel_id=current_user.tenant_id,
        room_id=room_id,
        guest_name=guest_name,
        check_in=check_in,
        check_out=check_out,
        payment_method=payment_method,
        channel="WALK_IN"
    )
    if not booking:
        raise HTTPException(status_code=409, detail="Room not available")

    hotel = db.query(Hotel).filter(Hotel.id == current_user.tenant_id).first()
    invoice = invoicing_service.generate_booking_invoice(db, booking, hotel)

    return {"booking": booking, "invoice": invoice}

@router.post("/rooms/{room_id}/ready")
async def mark_room_ready(
    room_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    success = housekeeping_service.set_room_ready(db, room_id)
    if not success:
        raise HTTPException(status_code=404, detail="Room not found")
    return {"status": "ready"}

@router.post("/shifts/generate")
async def generate_shifts(
    start_date: date,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    return await staff_service.generate_weekly_shifts(db, current_user.tenant_id, start_date)
