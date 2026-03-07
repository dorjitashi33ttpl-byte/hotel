from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from typing import List
from datetime import date, datetime
from app.api import deps
from app.models.hotel import Hotel, RoomType, Room, RatePlan, SeasonalRate, Policy
from app.models.shift import ShiftTemplate, ShiftAssignment, ShiftAuditLog
from app.services.storage import storage_service
from app.services.commission import commission_service

router = APIRouter()

@router.post("/hotels")
def create_hotel(name: str, address: str, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["hotel_owner_admin"]))):
    hotel = Hotel(name=name, address=address, tenant_id=current_user.tenant_id)
    db.add(hotel)
    db.commit()
    return hotel

# Rate Plans & Seasonality
@router.post("/hotels/{hotel_id}/rate-plans")
def create_rate_plan(hotel_id: int, name: str, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_active_user)):
    rp = RatePlan(hotel_id=hotel_id, name=name)
    db.add(rp)
    db.commit()
    return rp

@router.post("/rate-plans/{plan_id}/seasonal-rates")
def add_seasonal_rate(plan_id: int, start_date: date, end_date: date, multiplier: float, db: Session = Depends(deps.get_db)):
    sr = SeasonalRate(rate_plan_id=plan_id, start_date=start_date, end_date=end_date, multiplier=multiplier)
    db.add(sr)
    db.commit()
    return sr

# Policies
@router.post("/hotels/{hotel_id}/policies")
def add_policy(hotel_id: int, type: str, content: str, db: Session = Depends(deps.get_db)):
    p = Policy(hotel_id=hotel_id, type=type, content=content)
    db.add(p)
    db.commit()
    return p

# Shift Management
@router.post("/shifts/assignments")
def assign_shift(hotel_id: int, user_id: int, template_id: int, assignment_date: date, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_active_user)):
    assignment = ShiftAssignment(hotel_id=hotel_id, user_id=user_id, template_id=template_id, date=datetime.combine(assignment_date, datetime.min.time()))
    db.add(assignment)

    # Audit log
    audit = ShiftAuditLog(hotel_id=hotel_id, action="CREATE", changed_by=current_user.id, timestamp=datetime.utcnow())
    db.add(audit)

    db.commit()
    return assignment

@router.get("/payouts/balance")
def get_payout_balance(db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_active_user)):
    from sqlalchemy import func
    from app.models.payment import CommissionLedger
    balance = db.query(func.sum(CommissionLedger.net_amount)).filter(CommissionLedger.tenant_id == current_user.tenant_id, CommissionLedger.status == "pending").scalar() or 0.0
    return {"balance": balance, "currency": "BTN"}
