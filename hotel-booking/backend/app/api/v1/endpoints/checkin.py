from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.utils.qrcode import generate_booking_qr

router = APIRouter()

@router.get("/digital-key/{booking_id}")
async def get_digital_key(
    booking_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # Logic to verify booking ownership
    qr_base64 = generate_booking_qr(booking_id)
    return {"status": "active", "qr_code": qr_base64}

@router.post("/pre-arrival-form/{booking_id}")
async def submit_pre_arrival_form(booking_id: int, form_data: dict, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_active_user)):
    return {"status": "success"}
