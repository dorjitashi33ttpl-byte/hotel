import csv
import io
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.hotel import Hotel, RoomType, Room
from app.models.booking import Booking
from app.services.storage import storage_service
from app.services.commission import commission_service

router = APIRouter()

@router.get("/reports/bookings/export-csv")
def export_tenant_bookings_csv(
    hotel_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # Enforce tenant ownership of hotel
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id, Hotel.tenant_id == current_user.tenant_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")

    bookings = db.query(Booking).filter(Booking.hotel_id == hotel_id).all()
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["id", "user_id", "status", "check_in", "check_out", "total_amount"])
    writer.writeheader()
    for b in bookings:
        writer.writerow({
            "id": b.id,
            "user_id": b.user_id,
            "status": b.status,
            "check_in": b.check_in,
            "check_out": b.check_out,
            "total_amount": b.total_amount
        })
    output.seek(0)
    return StreamingResponse(
        output, media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=bookings_hotel_{hotel_id}.csv"}
    )

@router.post("/hotels")
def create_hotel(name: str, address: str, db: Session = Depends(deps.get_db), current_user = Depends(deps.RoleChecker(["hotel_owner_admin"]))):
    hotel = Hotel(name=name, address=address, tenant_id=current_user.tenant_id)
    db.add(hotel)
    db.commit()
    return hotel
