import csv
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.tenant import Country, Tenant
from app.models.payment import PaymentProviderConfig

router = APIRouter()

@router.post("/countries/import-csv")
async def import_countries_csv(
    file: UploadFile = File(...),
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin"]))
):
    content = await file.read()
    decoded = content.decode('utf-8').splitlines()
    reader = csv.DictReader(decoded)

    count = 0
    for row in reader:
        country = Country(
            name=row['name'],
            iso_code=row['iso_code'],
            currency=row['currency'],
            timezone=row['timezone'],
            is_active=True
        )
        db.add(country)
        count += 1

    db.commit()
    return {"status": "success", "imported_count": count}

@router.patch("/tenants/{tenant_id}/approve")
def approve_tenant(
    tenant_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin", "support_agent"]))
):
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    tenant.is_active = True
    db.commit()
    return {"status": "approved", "tenant_id": tenant_id}

@router.post("/payments/config")
def configure_payment_provider(
    country_id: int,
    provider_type: str,
    config_data: dict,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin"]))
):
    config = PaymentProviderConfig(
        country_id=country_id,
        provider_type=provider_type,
        config_data=config_data,
        is_enabled=True
    )
    db.add(config)
    db.commit()
    return config
