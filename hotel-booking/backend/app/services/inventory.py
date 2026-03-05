from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from app.models.hotel import Hotel, Room, RoomType

class InventoryService:
    @staticmethod
    async def check_availability(db, hotel_id: int, room_type_id: int, check_in: datetime, check_out: datetime) -> bool:
        return True

inventory_service = InventoryService()
