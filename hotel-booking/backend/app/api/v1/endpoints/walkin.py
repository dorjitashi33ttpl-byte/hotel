from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.models.booking import Booking
from app.services.inventory import inventory_service
from app.services.notifications import notification_service
from app.services.websocket import manager
import uuid
from datetime import date

router = APIRouter()

@router.post("/create")
async def create_walkin_booking(
    hotel_id: str,
    room_type_id: str,
    guest_name: str,
    check_in: date,
    check_out: date,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_staff", "hotel_manager"]))
):
    """
    Creates a walk-in booking by staff. Bypasses online payment.
    """
    # 1. Verify availability
    available = await inventory_service.get_available_quantity(db, room_type_id, check_in, check_out)
    if available <= 0:
        raise HTTPException(status_code=400, detail="No rooms available for these dates.")

    # 2. Create Booking
    booking = Booking(
        id=str(uuid.uuid4()),
        hotel_id=hotel_id,
        room_type_id=room_type_id,
        guest_name=guest_name,
        check_in=check_in,
        check_out=check_out,
        status="CONFIRMED",
        total_price=0.0 # Handled via terminal/cash
    )
    db.add(booking)
    db.commit()

    # 3. Broadcast update to dashboards
    await manager.broadcast_to_tenant(hotel_id, {
        "type": "NEW_BOOKING",
        "payload": {"booking_id": booking.id, "source": "WALKIN"}
    })

    return {"status": "success", "booking_id": booking.id}

@router.patch("/late-arrival/{booking_id}")
async def notify_late_arrival(
    booking_id: str,
    arrival_time: str,
    note: str,
    db: Session = Depends(deps.get_db)
):
    """
    Guest notifies hotel of late arrival.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # Update booking metadata or send instant notification
    await manager.broadcast_to_tenant(booking.hotel_id, {
        "type": "LATE_ARRIVAL",
        "payload": {
            "booking_id": booking_id,
            "guest_name": booking.guest_name,
            "new_arrival_time": arrival_time,
            "note": note
        }
    })

    return {"status": "success"}
