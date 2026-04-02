from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from app.api import deps
from app.schemas.booking import Booking, BookingCreate
from app.schemas.hotel import Hotel
from app.services.booking import booking_service
from app.services.hotel import hotel_service
from app.models.partner import PartnerApp

router = APIRouter()

@router.get("/hotels", response_model=List[Hotel])
def search_hotels(
    db: Session = Depends(deps.get_db),
    partner: PartnerApp = Depends(deps.verify_partner_hmac),
    q: str = Query(None),
    city: str = Query(None)
) -> Any:
    """Search hotels via partner API."""
    return hotel_service.search_public(db, q=q, city=city)

@router.post("/bookings/hold", response_model=Booking)
def create_booking_hold(
    *,
    db: Session = Depends(deps.get_db),
    partner: PartnerApp = Depends(deps.verify_partner_hmac),
    booking_in: BookingCreate
) -> Any:
    """Create a booking hold via partner API."""
    return booking_service.create_hold(db, obj_in=booking_in, partner_id=partner.id)

@router.post("/bookings/{booking_id}/confirm", response_model=Booking)
def confirm_booking(
    *,
    db: Session = Depends(deps.get_db),
    partner: PartnerApp = Depends(deps.verify_partner_hmac),
    booking_id: int
) -> Any:
    """Confirm a booking via partner API."""
    booking = booking_service.get(db, id=booking_id)
    if not booking or booking.partner_id != partner.id:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking_service.confirm(db, db_obj=booking)
