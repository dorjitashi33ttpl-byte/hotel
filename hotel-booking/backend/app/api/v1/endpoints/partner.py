from fastapi import APIRouter, Depends, HTTPException, Security
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_partner_app
from app.schemas.inventory import AvailabilityResponse
from app.services.inventory import inventory_service
from datetime import date

router = APIRouter()

@router.get("/availability", response_model=List[AvailabilityResponse])
async def search_availability(
    hotel_id: int,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
    partner = Depends(get_partner_app)
):
    # Enforce partner quotas and permissions
    rooms = await inventory_service.get_available_rooms(db, hotel_id, start_date, end_date)
    return rooms

@router.post("/holds")
async def create_partner_hold(
    hotel_id: int,
    room_type_id: int,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
    partner = Depends(get_partner_app)
):
    # Logic to create a temporary hold for partner applications
    return {"hold_id": "PARTNER-12345", "expires_at": "2026-06-01T12:00:00Z"}

@router.post("/token")
async def get_partner_token(client_id: str, client_secret: str):
    """
    OAuth2 Client Credentials Flow for Partners.
    """
    # Stub: Verify client_id/secret and return JWT
    return {
        "access_token": "partner_access_token_stub",
        "token_type": "bearer",
        "expires_in": 3600
    }

@router.get("/usage")
async def get_quota_usage(partner = Depends(get_partner_app)):
    """
    Returns current API usage and daily limits for the partner.
    """
    return {
        "daily_limit": 1000,
        "current_usage": 142,
        "reset_at": "2026-06-02T00:00:00Z"
    }
