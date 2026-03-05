import csv
import io
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.tenant import Country, Tenant
from app.models.payment import PaymentProviderConfig, Payout

router = APIRouter()

@router.get("/reports/payouts/export-csv")
def export_payouts_csv(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin"]))
):
    payouts = db.query(Payout).all()
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["id", "tenant_id", "amount", "currency", "status", "payout_date"])
    writer.writeheader()
    for p in payouts:
        writer.writerow({
            "id": p.id,
            "tenant_id": p.tenant_id,
            "amount": p.amount,
            "currency": p.currency,
            "status": p.status,
            "payout_date": p.payout_date
        })
    output.seek(0)
    return StreamingResponse(output, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=payouts.csv"})

@router.post("/countries/import-csv")
async def import_countries_csv(
    file: UploadFile = File(...),
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin"]))
):
    content = await file.read()
    decoded = content.decode('utf-8').splitlines()
    reader = csv.DictReader(decoded)
    for row in reader:
        db.add(Country(name=row['name'], iso_code=row['iso_code'], currency=row['currency'], is_active=True))
    db.commit()
    return {"status": "success"}

@router.patch("/tenants/{tenant_id}/approve")
def approve_tenant(
    tenant_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["platform_admin", "support_agent"]))
):
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant: raise HTTPException(status_code=404, detail="Tenant not found")
    tenant.is_active = True
    db.commit()
    return {"status": "approved"}
