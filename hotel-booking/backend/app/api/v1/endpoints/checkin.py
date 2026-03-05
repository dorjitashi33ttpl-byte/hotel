from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.booking import Booking, BookingStatus

router = APIRouter()

@router.post("/pre-arrival-form/{booking_id}")
async def submit_pre_arrival_form(
    booking_id: int,
    form_data: dict,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    return {"status": "success", "message": "Pre-arrival details submitted."}

@router.get("/digital-checkin/{booking_id}")
async def digital_checkin(
    booking_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    return {"status": "checked_in", "booking_id": booking_id}
