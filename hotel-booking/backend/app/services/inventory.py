from datetime import date
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func, or_, distinct
from app.models.hotel import Room, RoomType, Booking, RoomMaintenance
from app.models.marketing import AvailabilityWatchlist
from app.services.notifications import NotificationService

class InventoryService:
    @staticmethod
    async def check_availability(db: AsyncSession, room_type_id: str, check_in: date, check_out: date) -> bool:
        room_type = await db.get(RoomType, room_type_id)
        if not room_type:
            return False

        # Count rooms blocked by maintenance during any part of the requested window
        maintenance_stmt = select(func.count(distinct(Room.id))).where(
            Room.room_type_id == room_type_id
        ).where(
            or_(
                Room.is_maintenance == True,
                select(func.count(RoomMaintenance.id)).where(
                    RoomMaintenance.room_id == Room.id,
                    RoomMaintenance.start_date < check_out,
                    RoomMaintenance.end_date > check_in
                ).scalar_subquery() > 0
            )
        )
        maintenance_count = await db.scalar(maintenance_stmt)

        effective_total = room_type.total_quantity - (maintenance_count or 0)

        booked_count = await db.scalar(
            select(func.count(Booking.id)).where(
                Booking.room_type_id == room_type_id,
                Booking.status.in_(["CONFIRMED", "CHECKED_IN"]),
                Booking.check_in < check_out,
                Booking.check_out > check_in
            )
        )
        return booked_count < effective_total

    @staticmethod
    async def process_cancellation(db: AsyncSession, booking_id: str):
        booking = await db.get(Booking, booking_id)
        if not booking:
            return

        booking.status = "CANCELLED"
        await db.commit()

        # Notify watchlist users
        stmt = select(AvailabilityWatchlist).where(
            AvailabilityWatchlist.hotel_id == booking.hotel_id,
            AvailabilityWatchlist.room_type_id == booking.room_type_id,
            AvailabilityWatchlist.start_date <= booking.check_in,
            AvailabilityWatchlist.end_date >= booking.check_out,
            AvailabilityWatchlist.is_active == True,
            AvailabilityWatchlist.notified == False
        )
        result = await db.execute(stmt)
        watchers = result.scalars().all()

        for watcher in watchers:
            await NotificationService.send_email(
                watcher.user_id,
                "Room Available!",
                f"The room you were watching at {booking.hotel_id} is now available."
            )
            watcher.notified = True

        await db.commit()
