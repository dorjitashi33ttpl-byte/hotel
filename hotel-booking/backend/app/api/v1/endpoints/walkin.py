from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.booking import Booking, BookingStatus

router = APIRouter()

@router.post("/create")
async def create_walkin_booking(
    hotel_id: int,
    guest_details: dict,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_staff", "hotel_manager"]))
):
    # Walk-in booking logic (skip online payment if needed)
    return {"status": "confirmed", "booking_id": 999}

@router.patch("/late-arrival/{booking_id}")
async def update_late_arrival(
    booking_id: int,
    late_time: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    return {"status": "success", "arrival_time": late_time}
