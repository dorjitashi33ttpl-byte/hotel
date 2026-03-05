from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.tenant import Country, Tenant
from app.models.payment import PaymentProviderConfig

router = APIRouter()

@router.post("/countries")
def create_country(
    name: str,
    iso_code: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin"]))
):
    country = Country(name=name, iso_code=iso_code)
    db.add(country)
    db.commit()
    db.refresh(country)
    return country

@router.get("/countries", response_model=List[dict])
def list_countries(db: Session = Depends(deps.get_db)):
    return db.query(Country).all()

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

@router.get("/tenants/pending", response_model=List[dict])
def list_pending_tenants(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin", "support_agent"]))
):
    return db.query(Tenant).filter(Tenant.is_active == False).all()

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
