from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.inventory import RoomType, Room, BookingInventory, ChannelConfig
from datetime import date

class InventoryService:
    @staticmethod
    async def check_channel_allocation(db: Session, hotel_id: int, channel: str, count: int) -> bool:
        config = db.query(ChannelConfig).filter(ChannelConfig.hotel_id == hotel_id, ChannelConfig.channel_name == channel).first()
        if not config or not config.is_active: return True

        # Simple check: channel can't take more than its allocation % of total rooms
        total_rooms = db.query(func.count(Room.id)).filter(Room.hotel_id == hotel_id).scalar()
        if (count / total_rooms) * 100 > config.allocation_percentage:
            return False
        return True

    @staticmethod
    async def get_available_count(db: Session, room_type_id: int, start_date: date, end_date: date) -> int:
        room_type = db.query(RoomType).filter(RoomType.id == room_type_id).first()
        if not room_type: return 0

        # Subtract confirmed bookings in range
        booked = db.query(func.sum(BookingInventory.quantity)).filter(
            BookingInventory.room_type_id == room_type_id,
            BookingInventory.date >= start_date,
            BookingInventory.date < end_date
        ).scalar() or 0

        return room_type.total_quantity - booked

inventory_service = InventoryService()
