from fastapi import APIRouter, Depends, HTTPException, Security, status, Request
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.api import deps
from app.models.hotel import ChannelConfig
from app.models.booking import Booking

router = APIRouter()

@router.get("/search")
async def partner_search_availability(
    hotel_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db)
):
    return {"available": True, "price": 150.0}

@router.get("/bookings")
async def partner_sync_bookings(
    hotel_id: int,
    last_sync: datetime = None,
    db: Session = Depends(deps.get_db)
):
    # OTA partners can fetch bookings created via their channel
    # This ensures their local state matches the platform
    bookings = db.query(Booking).filter(Booking.hotel_id == hotel_id)
    if last_sync:
        bookings = bookings.filter(Booking.updated_at > last_sync)
    return bookings.all()

@router.post("/hold")
async def partner_hold_booking(
    hotel_id: int,
    room_type_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db)
):
    return {"booking_id": 101, "status": "hold"}
