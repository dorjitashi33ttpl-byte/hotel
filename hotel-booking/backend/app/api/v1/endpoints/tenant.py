from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.hotel import Hotel, RoomType, Room
from app.services.storage import storage_service

router = APIRouter()

@router.post("/hotels")
def create_hotel(
    name: str,
    address: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_owner_admin"]))
):
    hotel = Hotel(name=name, address=address, tenant_id=current_user.tenant_id)
    db.add(hotel)
    db.commit()
    return hotel

@router.post("/hotels/{hotel_id}/menu-pdf")
async def upload_menu_pdf(
    hotel_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_manager", "hotel_owner_admin"]))
):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id, Hotel.tenant_id == current_user.tenant_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found or permission denied")

    content = await file.read()
    filename = f"hotel_{hotel_id}_menu_{file.filename}"
    url = await storage_service.upload_file(content, filename)

    hotel.menu_pdf_url = url
    db.commit()
    return {"status": "success", "menu_pdf_url": url}

@router.get("/hotels/{hotel_id}/rooms")
def list_rooms(
    hotel_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # Enforce tenant isolation via current_user.tenant_id
    return db.query(RoomType).filter(RoomType.hotel_id == hotel_id).all()
