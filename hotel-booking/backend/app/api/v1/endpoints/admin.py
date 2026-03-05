import csv
import io
import secrets
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from app.api import deps
from app.models.tenant import Country, Tenant
from app.models.payment import PaymentProviderConfig, Payout, CommissionLedger
from app.models.partner import PartnerApp
from app.services.payment_config import payment_config_service

router = APIRouter()

@router.post("/payments/config")
def configure_payment_provider(
    country_id: int,
    provider_type: str,
    raw_credentials: str,
    config_data: dict,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin"]))
):
    # Harden credential storage
    encrypted = payment_config_service.encrypt_credentials(raw_credentials)

    config = db.query(PaymentProviderConfig).filter(
        PaymentProviderConfig.country_id == country_id,
        PaymentProviderConfig.provider_type == provider_type
    ).first()

    if config:
        config.credentials_encrypted = encrypted
        config.config_data = config_data
    else:
        config = PaymentProviderConfig(
            country_id=country_id,
            provider_type=provider_type,
            credentials_encrypted=encrypted,
            config_data=config_data,
            is_enabled=True
        )
        db.add(config)

    db.commit()
    return {"status": "success", "provider": provider_type}

@router.get("/reports/commission-summary")
def get_commission_summary(db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin"]))):
    summary = db.query(func.sum(CommissionLedger.commission_amount).label("total_commission"), func.count(CommissionLedger.id).label("booking_count")).first()
    return {"total_commission": summary.total_commission or 0.0, "booking_count": summary.booking_count or 0, "currency": "BTN"}

@router.get("/reports/payouts/export-csv")
def export_payouts_csv(db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin"]))):
    payouts = db.query(Payout).all()
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["id", "tenant_id", "amount", "currency", "status", "payout_date"])
    writer.writeheader()
    for p in payouts:
        writer.writerow({"id": p.id, "tenant_id": p.tenant_id, "amount": p.amount, "currency": p.currency, "status": p.status, "payout_date": p.payout_date})
    output.seek(0)
    return StreamingResponse(output, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=payouts.csv"})

@router.post("/partners")
def create_partner(name: str, webhook_url: str, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin"]))):
    api_key, webhook_secret = secrets.token_urlsafe(32), secrets.token_urlsafe(32)
    partner = PartnerApp(name=name, api_key=api_key, webhook_url=webhook_url, webhook_secret=webhook_secret)
    db.add(partner)
    db.commit()
    return {"api_key": api_key, "webhook_secret": webhook_secret}

@router.post("/countries/import-csv")
async def import_countries_csv(file: UploadFile = File(...), db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin"]))):
    content = await file.read()
    decoded = content.decode('utf-8').splitlines()
    reader = csv.DictReader(decoded)
    for row in reader:
        db.add(Country(name=row['name'], iso_code=row['iso_code'], currency=row['currency'], is_active=True))
    db.commit()
    return {"status": "success"}

@router.patch("/tenants/{tenant_id}/approve")
def approve_tenant(tenant_id: int, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["platform_admin", "support_agent"]))):
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant: raise HTTPException(status_code=404, detail="Tenant not found")
    tenant.is_active = True
    db.commit()
    return {"status": "approved"}
