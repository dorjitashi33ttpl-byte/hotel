from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.models.hotel import Hotel, RoomType, Room
from app.services.storage import storage_service
from app.services.commission import commission_service

router = APIRouter()

@router.post("/hotels")
def create_hotel(
    name: str, address: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_owner_admin"]))
):
    hotel = Hotel(name=name, address=address, tenant_id=current_user.tenant_id)
    db.add(hotel)
    db.commit()
    return hotel

@router.post("/rooms/types")
def add_room_type(
    hotel_id: int, name: str, base_price: float,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    if not commission_service.check_plan_limits(db, current_user.tenant_id, "room_type_count"):
        raise HTTPException(status_code=403, detail="Plan limit reached. Upgrade to add more room types.")

    rt = RoomType(hotel_id=hotel_id, name=name, base_price=base_price, total_quantity=1)
    db.add(rt)
    db.commit()
    return rt
