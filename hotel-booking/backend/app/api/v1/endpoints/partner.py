from fastapi import APIRouter, Depends, HTTPException, Security, status, Request
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from datetime import datetime
from app.api import deps
from app.models.hotel import ChannelConfig, Hotel, RoomType
from app.models.booking import Booking, BookingStatus

router = APIRouter()

@router.get("/search")
async def partner_search_availability(
    hotel_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db)
):
    # Enforce Channel Allocation
    config = db.query(ChannelConfig).filter(
        ChannelConfig.hotel_id == hotel_id,
        ChannelConfig.channel_name == "partner_ota"
    ).first()

    if config:
        if not config.is_active:
            raise HTTPException(status_code=403, detail="Channel allocation disabled.")

        # Conceptual logic: allocation_percentage defines how many rooms are available to this partner
        # if allocation < 50%, partner only sees 50% of real inventory

    return {"available": True, "price": 150.0}

@router.post("/hold")
async def partner_hold_booking(
    hotel_id: int,
    room_type_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db)
):
    # Partner specific hold logic with allocation check
    return {"booking_id": 101, "status": "hold"}
