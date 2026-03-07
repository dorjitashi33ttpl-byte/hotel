import csv
import io
import secrets
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.api import deps
from app.models.tenant import Country, Tenant
from app.models.payment import PaymentProviderConfig, Payout, CommissionLedger
from app.models.partner import PartnerApp
from app.services.payment_config import payment_config_service
from app.services.audit import audit_service

router = APIRouter()

@router.patch("/tenants/{tenant_id}/approve")
def approve_tenant(request: Request, tenant_id: int, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin", "support_agent"]))):
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant: raise HTTPException(status_code=404, detail="Tenant not found")
    tenant.is_active = True
    audit_service.log_action(db, None, current_user.id, "APPROVE_TENANT", "tenant", tenant_id, ip_address=request.client.host)
    db.commit()
    return {"status": "approved"}

@router.post("/partners")
def create_partner(name: str, webhook_url: str, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin"]))):
    api_key, webhook_secret = secrets.token_urlsafe(32), secrets.token_urlsafe(32)
    partner = PartnerApp(name=name, api_key=api_key, webhook_url=webhook_url, webhook_secret=webhook_secret, is_active=True)
    db.add(partner)
    db.commit()
    return {"id": partner.id, "api_key": api_key}

@router.delete("/partners/{partner_id}")
def revoke_partner(partner_id: int, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin"]))):
    partner = db.query(PartnerApp).filter(PartnerApp.id == partner_id).first()
    if not partner: raise HTTPException(status_code=404, detail="Partner not found")
    partner.is_active = False
    # logic to invalidate cached tokens in Redis would go here
    db.commit()
    return {"status": "revoked"}

@router.get("/reports/commission-summary")
def get_commission_summary(db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin"]))):
    summary = db.query(func.sum(CommissionLedger.commission_amount).label("total_commission"), func.count(CommissionLedger.id).label("booking_count")).first()
    return {"total_commission": summary.total_commission or 0.0, "booking_count": summary.booking_count or 0, "currency": "BTN"}

@router.get("/reports/revenue-by-region")
def get_revenue_by_region(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin"]))
):
    # Aggregate revenue and commission by dzongkhag/state
    # In a real app: JOIN hotels -> bookings -> ledger GROUP BY hotel.state
    return [
        {"region": "Thimphu", "total_revenue": 450000, "commission": 9000},
        {"region": "Paro", "total_revenue": 280000, "commission": 5600},
    ]
