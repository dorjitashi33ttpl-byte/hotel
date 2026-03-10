from sqlalchemy.orm import Session
from sqlalchemy import select, and_, func
from app.models.inventory import Room, BookingInventory, RoomType
from datetime import date
from typing import List, Optional

class InventoryService:
    @staticmethod
    async def get_available_rooms(db: Session, hotel_id: int, start_date: date, end_date: date, room_type_id: Optional[int] = None) -> List[Room]:
        # Subquery to find rooms already booked in the date range
        booked_rooms_stmt = select(BookingInventory.room_id).where(
            and_(
                BookingInventory.date >= start_date,
                BookingInventory.date < end_date
            )
        )

        # Filter rooms that are not in the booked subquery and belong to the hotel
        query = select(Room).where(
            and_(
                Room.hotel_id == hotel_id,
                Room.is_active == True,
                Room.id.not_in(booked_rooms_stmt)
            )
        )

        if room_type_id:
            query = query.where(Room.room_type_id == room_type_id)

        result = db.execute(query)
        return result.scalars().all()

    @staticmethod
    async def reserve_specific_room(db: Session, room_id: int, start_date: date, end_date: date, booking_id: int):
        # Transaction safety: The caller should ensure this is wrapped in a DB transaction
        for d in range((end_date - start_date).days):
            target_date = date.fromordinal(start_date.toordinal() + d)
            inv = BookingInventory(
                room_id=room_id,
                date=target_date,
                booking_id=booking_id,
                quantity=1
            )
            db.add(inv)
        db.commit()

inventory_service = InventoryService()
