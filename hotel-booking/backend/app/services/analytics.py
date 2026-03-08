from datetime import date, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.hotel import Booking, RoomType
from decimal import Decimal

class AnalyticsService:
    @staticmethod
    async def get_revenue_forecast(db: AsyncSession, hotel_id: str, days: int = 30):
        """
        Predict revenue based on current bookings and historical pickup pace.
        """
        start_date = date.today()
        end_date = start_date + timedelta(days=days)

        # Current booked revenue
        booked_rev_stmt = select(func.sum(Booking.total_price)).where(
            Booking.hotel_id == hotel_id,
            Booking.status.in_(["CONFIRMED", "CHECKED_IN", "COMPLETED"]),
            Booking.check_in >= start_date,
            Booking.check_in <= end_date
        )
        booked_revenue = (await db.execute(booked_rev_stmt)).scalar() or Decimal("0.00")

        # Simple forecasting: Occupancy * ADR (Average Daily Rate)
        # In real life, this would use a more complex ML model or pickup logic
        return {
            "period_days": days,
            "confirmed_revenue": booked_revenue,
            "projected_upside": booked_revenue * Decimal("0.15"), # Placeholder for 15% pickup
            "total_forecast": booked_revenue * Decimal("1.15")
        }
