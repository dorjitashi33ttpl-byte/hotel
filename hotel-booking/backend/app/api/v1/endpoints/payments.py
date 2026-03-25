from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from app.api.deps import get_db, get_current_user
from app.models.hotel import Booking
from app.services.payment import payment_service
from app.services.gateway_registry import gateway_registry

router = APIRouter()

@router.post("/intent")
async def create_payment_intent(
    booking_id: str,
    provider: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Creates a payment intent using the specified provider.
    """
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == str(current_user.id)
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # Get active provider config from registry
    hotel = booking.hotel_id # or fetch hotel for country_id
    config = await gateway_registry.get_active_providers(db, "country_bt") # Stub: get hotel's country
    provider_config = next((p["settings"] for p in config if p["type"] == provider), {})

    adapter = payment_service.get_adapter(provider, provider_config)
    intent = adapter.create_intent(
        amount=booking.total_price,
        currency="BTN", # Or hotel currency
        booking_id=booking.id
    )

    return intent

@router.post("/callback/{provider}")
async def payment_callback(
    provider: str,
    request: Request,
    x_signature: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """
    Unified callback endpoint for all providers.
    """
    payload = await request.json()

    # Get provider config for verification
    config = await gateway_registry.get_active_providers(db, "country_bt")
    provider_config = next((p["settings"] for p in config if p["type"] == provider), {})

    adapter = payment_service.get_adapter(provider, provider_config)

    if not adapter.verify_callback(payload, x_signature or ""):
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Standardize status: assuming 'status' field in provider payload
    status = payload.get("status") or payload.get("payment_status")
    booking_id = payload.get("bid") or payload.get("booking_id")

    if status in ["succeeded", "paid", "TXN_SUCCESS"]:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        if booking:
            booking.status = "CONFIRMED"
            db.commit()

    return {"status": "ok"}
