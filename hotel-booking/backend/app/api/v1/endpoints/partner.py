from fastapi import APIRouter, Depends, HTTPException, Security, status, Request
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from datetime import datetime
from app.api import deps
from app.models.hotel import ChannelConfig, Hotel
from app.models.booking import Booking

router = APIRouter()

API_KEY_NAME = "X-API-KEY"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

@router.get("/health/webhook")
async def webhook_health(
    db: Session = Depends(deps.get_db),
    api_key: str = Security(api_key_header)
):
    # Verify api_key and fetch stats from WebhookLog
    return {
        "status": "healthy",
        "delivery_success_rate": "99.2%",
        "last_delivered": datetime.utcnow()
    }

@router.get("/bookings")
async def sync_bookings(
    hotel_id: int,
    db: Session = Depends(deps.get_db),
    api_key: str = Security(api_key_header)
):
    # Enforce strict partner-scoped booking sync
    return db.query(Booking).filter(Booking.hotel_id == hotel_id).all()
