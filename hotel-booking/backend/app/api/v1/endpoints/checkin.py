from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.utils.qrcode import generate_booking_qr
from app.services.features import feature_flag_service
from app.models.booking import Booking, BookingStatus

router = APIRouter()

@router.get("/digital-key/{booking_id}")
async def get_digital_key(
    booking_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    booking = db.query(Booking).filter(Booking.id == booking_id, Booking.user_id == current_user.id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if not feature_flag_service.is_enabled(db, booking.tenant_id, "digital_checkin"):
        raise HTTPException(status_code=403, detail="Digital check-in is not enabled for this property.")

    qr_base64 = generate_booking_qr(booking_id)
    return {"status": "active", "qr_code": qr_base64}

@router.post("/pre-arrival-form/{booking_id}")
async def submit_pre_arrival_form(
    booking_id: int,
    form_data: dict,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    booking = db.query(Booking).filter(Booking.id == booking_id, Booking.user_id == current_user.id).first()
    if not feature_flag_service.is_enabled(db, booking.tenant_id, "pre_arrival_forms"):
        raise HTTPException(status_code=403, detail="Pre-arrival forms are not enabled.")

    return {"status": "success"}

@router.post("/confirm/{booking_id}")
async def confirm_checkin(
    booking_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_staff", "hotel_manager"]))
):
    booking = db.query(Booking).filter(Booking.id == booking_id, Booking.hotel_id == current_user.id).first() # Simplified
    booking.status = BookingStatus.CHECKED_IN
    db.commit()
    return {"status": "checked_in"}

@router.post("/self-checkout/{booking_id}")
async def guest_self_checkout(
    booking_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    """
    Allows a guest to initiate checkout from the mobile app.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id, Booking.user_id == current_user.id).first()
    if not booking or booking.status != "CHECKED_IN":
        raise HTTPException(status_code=400, detail="Invalid booking state for checkout")

    booking.status = "COMPLETED"
    db.commit()
    return {"status": "completed", "message": "Thank you for staying with us!"}
