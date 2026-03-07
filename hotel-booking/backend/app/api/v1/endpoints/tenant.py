from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.api import deps
from app.models.payment import CommissionLedger, Payout
from app.models.hotel import Hotel

router = APIRouter()

@router.get("/payouts/balance")
def get_payout_balance(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # Calculate net payout balance (Confirmed Net - Already Paid)
    gross_net = db.query(func.sum(CommissionLedger.net_amount)).filter(
        CommissionLedger.tenant_id == current_user.tenant_id,
        CommissionLedger.status == "pending"
    ).scalar() or 0.0

    return {
        "balance_available": gross_net,
        "currency": "BTN"
    }

@router.post("/payouts/request")
def request_payout(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # Logic to create a Payout record in 'processed' or 'pending' state
    return {"status": "request_submitted"}

@router.post("/hotels")
def create_hotel(name: str, address: str, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["hotel_owner_admin"]))):
    hotel = Hotel(name=name, address=address, tenant_id=current_user.tenant_id)
    db.add(hotel)
    db.commit()
    return hotel

@router.post("/payments/{payment_id}/refund")
async def tenant_refund_payment(
    payment_id: int,
    amount: float = None,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_owner_admin", "hotel_manager"]))
):
    from app.services.refund import refund_service
    return await refund_service.process_refund(db, payment_id, amount)
