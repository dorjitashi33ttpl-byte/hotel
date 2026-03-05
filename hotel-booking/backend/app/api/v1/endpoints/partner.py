from fastapi import APIRouter, Depends, HTTPException, Security, status, Request
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from datetime import datetime
from app.api import deps
from app.models.hotel import ChannelConfig

router = APIRouter()

@router.get("/search")
async def partner_search_availability(
    request: Request,
    hotel_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db)
):
    # Redis-based Rate Limiting (Conceptual)
    # rate_limit_key = f"rate_limit:{request.client.host}"
    # if await redis.get(rate_limit_key) > limit: raise HTTPException(...)

    config = db.query(ChannelConfig).filter(
        ChannelConfig.hotel_id == hotel_id,
        ChannelConfig.channel_name == "partner_ota"
    ).first()

    if config and not config.is_active:
        raise HTTPException(status_code=403, detail="Channel disabled.")

    return {"available": True, "price": 150.0}

@router.post("/hold")
async def partner_hold_booking(
    hotel_id: int,
    room_type_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db)
):
    return {"booking_id": 101, "status": "hold"}
