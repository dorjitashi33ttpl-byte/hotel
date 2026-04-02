from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.api.deps import get_db, get_current_tenant_user
from app.models.hotel import Hotel, RoomType, ChannelAllocation
from app.services.financials import financial_service
from app.services.features import feature_flag_service

router = APIRouter()

@router.get("/hotels/{hotel_id}/metrics")
async def get_hotel_metrics(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    """
    Returns business intelligence metrics for the hotel.
    """
    if str(current_user.tenant_id) != hotel_id and current_user.role != "platform_admin":
        raise HTTPException(status_code=403, detail="Not authorized for this hotel")

    return financial_service.get_tenant_analytics(db, hotel_id)

@router.get("/hotels/{hotel_id}/channel-allocation")
async def get_channel_allocation(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    return db.query(ChannelAllocation).join(RoomType).filter(RoomType.hotel_id == hotel_id).all()

@router.post("/hotels/{hotel_id}/channel-allocation")
async def update_channel_allocation(
    hotel_id: str,
    data: List[Dict[str, Any]],
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    # Logic to update or create channel allocations
    return {"status": "updated"}

@router.patch("/hotels/{hotel_id}/policies")
async def update_hotel_policies(
    hotel_id: str,
    policies: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel: raise HTTPException(404)
    hotel.policies = policies
    db.commit()
    return hotel

@router.get("/hotels/{hotel_id}/payout-balance")
async def get_payout_balance(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    balance = financial_service.get_payout_balance(db, hotel_id)
    return {"total_net": balance}

@router.get("/hotels/{hotel_id}/commission-ledger")
async def get_commission_ledger(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    return db.query(CommissionLedger).filter(CommissionLedger.hotel_id == hotel_id).order_by(CommissionLedger.created_at.desc()).all()

@router.get("/hotels/{hotel_id}/payout-balance")
async def get_payout_balance(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    balance = financial_service.get_payout_balance(db, hotel_id)
    return {"balance": balance, "currency": "BTN"}

@router.get("/hotels/{hotel_id}/payouts")
async def list_payouts(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    payouts = db.query(Payout).filter(Payout.hotel_id == hotel_id).order_by(Payout.created_at.desc()).all()
    return {"total": len(payouts), "items": payouts}

@router.post("/hotels/{hotel_id}/payouts/request")
async def request_payout(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    balance = financial_service.get_payout_balance(db, hotel_id)
    if balance <= 0:
        raise HTTPException(status_code=400, detail="No balance available for payout")

    # Logic to create Payout record and transition CommissionLedger status
    return {"status": "payout_requested", "amount": balance}

@router.get("/hotels/{hotel_id}/pending-verifications")
async def list_pending_verifications(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    from app.models.forms import PreArrivalForm
    # Return bookings that have pre-arrival forms but are not yet CHECKED_IN
    results = db.query(Booking).join(PreArrivalForm).filter(
        Booking.hotel_id == hotel_id,
        Booking.status == "CONFIRMED",
        PreArrivalForm.is_completed == True
    ).all()
    return results

@router.post("/bookings/{booking_id}/verify-checkin")
async def verify_checkin(
    booking_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking: raise HTTPException(404)

    booking.status = "CHECKED_IN"
    # Logic to trigger automated room key activation
    db.commit()
    return {"status": "verified"}

@router.get("/hotels/{hotel_id}/partner-config")
async def get_partner_config(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    from app.models.partner import PartnerApp
    # Each hotel can have their own partner app entry if we allow direct integrations
    partner = db.query(PartnerApp).filter(PartnerApp.name == f"Partner_{hotel_id}").first()
    return partner

@router.post("/hotels/{hotel_id}/partner-config/rotate-key")
async def rotate_partner_key(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    import secrets
    from app.models.partner import PartnerApp
    partner = db.query(PartnerApp).filter(PartnerApp.name == f"Partner_{hotel_id}").first()
    if partner:
        partner.client_id = f"hotel_client_{hotel_id}_{secrets.token_hex(4)}"
        partner.client_secret_hashed = security.get_password_hash(secrets.token_urlsafe(32))
        db.commit()
    return {"status": "rotated"}
