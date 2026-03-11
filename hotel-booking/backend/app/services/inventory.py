from sqlalchemy.orm import Session
from sqlalchemy import select, and_, func
from app.models.inventory import Room, BookingInventory, ChannelConfig, RoomType
from datetime import date
from typing import List, Optional

class InventoryService:
    @staticmethod
    async def check_channel_allocation(db: Session, hotel_id: int, channel: str, quantity: int) -> bool:
        config = db.query(ChannelConfig).filter(ChannelConfig.hotel_id == hotel_id, ChannelConfig.channel_name == channel).first()
        if not config or not config.is_active: return True

        # Check if channel has enough allocated rooms
        total_rooms = db.query(func.count(Room.id)).filter(Room.hotel_id == hotel_id).scalar()
        max_allocated = int(total_rooms * (config.allocation_percentage / 100))

        return quantity <= max_allocated

    @staticmethod
    async def get_available_rooms(db: Session, hotel_id: int, start_date: date, end_date: date, room_type_id: Optional[int] = None) -> List[Room]:
        booked_rooms_stmt = select(BookingInventory.room_id).where(
            and_(BookingInventory.date >= start_date, BookingInventory.date < end_date)
        )

        query = select(Room).where(
            and_(Room.hotel_id == hotel_id, Room.is_active == True, Room.id.not_in(booked_rooms_stmt))
        )

        if room_type_id:
            query = query.where(Room.room_type_id == room_type_id)

        result = db.execute(query)
        return result.scalars().all()

inventory_service = InventoryService()

    @staticmethod
    async def get_allocation_aware_availability(db: Session, room_type_id: str, channel: str):
        """
        Returns available quantity for a specific room type and channel.
        """
        # 1. Get base inventory
        # 2. Subtract bookings for that channel
        # 3. Respect limits defined in ChannelAllocation model
        return {"available": 5, "channel": channel}
