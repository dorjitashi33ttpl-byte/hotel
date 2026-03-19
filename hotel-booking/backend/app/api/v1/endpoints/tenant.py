from datetime import date, timedelta
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.hotel import Room, Booking, Hotel

router = APIRouter()

@router.get("/{id}/room-rack")
async def get_room_rack(id: str, start_date: date, db: AsyncSession = Depends(get_db)):
    """
    Returns a grid of rooms and their bookings for a 30-day window.
    Essential for 'Fixed Room Number' (Mode B) inventory management.
    """
    end_date = start_date + timedelta(days=30)

    # Fetch rooms
    stmt_rooms = select(Room).where(Room.hotel_id == id)
    result_rooms = await db.execute(stmt_rooms)
    rooms_list = result_rooms.scalars().all()

    # Fetch bookings
    stmt_bookings = select(Booking).where(
        Booking.hotel_id == id,
        Booking.check_in < end_date,
        Booking.check_out > start_date,
        Booking.status != "CANCELLED"
    )
    result_bookings = await db.execute(stmt_bookings)
    bookings_list = result_bookings.scalars().all()

    # Map bookings to rooms
    rack_data = []
    for room in rooms_list:
        room_bookings = [
            {
                "id": b.id,
                "check_in": b.check_in,
                "check_out": b.check_out,
                "guest_name": b.guest_name if hasattr(b, 'guest_name') else "Guest",
                "status": b.status
            }
            for b in bookings_list if b.room_id == room.id
        ]
        rack_data.append({
            "room_id": room.id,
            "room_number": room.room_number,
            "bookings": room_bookings
        })

    return rack_data

from app.services.analytics import analytics_service

@router.get("/metrics/summary")
async def get_performance_summary(
    hotel_id: str,
    days: int = 30,
    db: Session = Depends(get_db)
):
    """
    Returns ADR, RevPAR, and occupancy for the tenant.
    """
    return analytics_service.get_hotel_metrics(db, hotel_id, days)
