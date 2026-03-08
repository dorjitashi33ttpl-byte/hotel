from datetime import date, timedelta
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.hotel import RatePlan, SeasonalRate, RoomType, Booking
from decimal import Decimal

class PricingService:
    @staticmethod
    async def get_base_rate(db: AsyncSession, room_type_id: str, check_in: date) -> Decimal:
        # Get standard rate from RoomType
        room_type = await db.get(RoomType, room_type_id)
        if not room_type:
            return Decimal("0.00")

        # Check for seasonal overrides
        stmt = select(SeasonalRate).where(
            SeasonalRate.room_type_id == room_type_id,
            SeasonalRate.start_date <= check_in,
            SeasonalRate.end_date >= check_in
        )
        result = await db.execute(stmt)
        seasonal = result.scalars().first()

        return seasonal.rate if seasonal else room_type.base_price

    @staticmethod
    async def apply_yield_management(db: AsyncSession, room_type_id: str, check_in: date, base_rate: Decimal) -> Decimal:
        """
        Adjust price based on occupancy (Yield Management).
        If occupancy > 80%, increase price by 20%.
        If occupancy > 90%, increase price by 50%.
        If occupancy < 20% and date is within 3 days, decrease by 15%.
        """
        # Calculate occupancy for the room type on that specific day
        total_rooms_stmt = select(RoomType.total_quantity).where(RoomType.id == room_type_id)
        total_rooms = (await db.execute(total_rooms_stmt)).scalar() or 1

        booked_stmt = select(func.count(Booking.id)).where(
            Booking.room_type_id == room_type_id,
            Booking.status.in_(["CONFIRMED", "CHECKED_IN"]),
            Booking.check_in <= check_in,
            Booking.check_out > check_in
        )
        booked_count = (await db.execute(booked_stmt)).scalar() or 0

        occupancy = (booked_count / total_rooms) * 100

        adjusted_rate = base_rate
        if occupancy > 90:
            adjusted_rate *= Decimal("1.50")
        elif occupancy > 80:
            adjusted_rate *= Decimal("1.20")
        elif occupancy < 20 and (check_in - date.today()).days <= 3:
            adjusted_rate *= Decimal("0.85")

        return adjusted_rate.quantize(Decimal("0.01"))

    @staticmethod
    async def calculate_total(db: AsyncSession, room_type_id: str, check_in: date, check_out: date) -> Decimal:
        total = Decimal("0.00")
        current_date = check_in
        while current_date < check_out:
            base = await PricingService.get_base_rate(db, room_type_id, current_date)
            final_rate = await PricingService.apply_yield_management(db, room_type_id, current_date, base)
            total += final_rate
            current_date += timedelta(days=1)
        return total
