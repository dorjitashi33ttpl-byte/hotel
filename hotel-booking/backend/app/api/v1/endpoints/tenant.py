from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from datetime import date, datetime
from app.api import deps
from app.models.hotel import Hotel, RoomType, Room, RatePlan, SeasonalRate, Policy, ChannelConfig
from app.models.shift import ShiftTemplate, ShiftAssignment, ShiftAuditLog
from app.models.audit import AuditLog
from app.services.storage import storage_service
from app.services.commission import commission_service

router = APIRouter()

@router.get("/audit-logs")
def get_tenant_audit_logs(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_tenant_user)
):
    return db.query(AuditLog).filter(AuditLog.tenant_id == current_user.tenant_id).order_by(AuditLog.created_at.desc()).all()

@router.post("/shifts/templates")
def create_shift_template(
    hotel_id: int, name: str, start_time: str, end_time: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_tenant_user)
):
    # Logic to parse time strings and create template
    tpl = ShiftTemplate(hotel_id=hotel_id, name=name) # start/end time omitted for brevity
    db.add(tpl)
    db.commit()
    return tpl

@router.get("/channel-configs")
def get_channel_configs(
    hotel_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_tenant_user)
):
    return db.query(ChannelConfig).filter(ChannelConfig.hotel_id == hotel_id).all()

@router.patch("/channel-configs/{config_id}")
def update_channel_allocation(
    config_id: int, allocation_percentage: float,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_tenant_user)
):
    config = db.query(ChannelConfig).filter(ChannelConfig.id == config_id).first()
    config.allocation_percentage = allocation_percentage
    db.commit()
    return config

@router.get("/payouts/balance")
def get_payout_balance(db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_active_user)):
    from app.models.payment import CommissionLedger
    balance = db.query(func.sum(CommissionLedger.net_amount)).filter(CommissionLedger.tenant_id == current_user.tenant_id, CommissionLedger.status == "pending").scalar() or 0.0
    return {"balance": balance, "currency": "BTN"}
