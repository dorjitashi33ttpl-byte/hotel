from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.hotel import RoomType, SeasonalRate
from app.models.booking import Booking, BookingStatus

class PricingEngine:
    @staticmethod
    def calculate_price(db: Session, room_type_id: int, rate_plan_id: int, target_date: date, nights: int = 1) -> float:
        room_type = db.query(RoomType).filter(RoomType.id == room_type_id).first()
        base_price = room_type.base_price

        # 1. Seasonal Rate lookup
        seasonal = db.query(SeasonalRate).filter(
            SeasonalRate.rate_plan_id == rate_plan_id,
            and_(SeasonalRate.start_date <= target_date, SeasonalRate.end_date >= target_date)
        ).first()

        final_price = base_price
        if seasonal:
            if seasonal.fixed_price:
                final_price = seasonal.fixed_price
            else:
                final_price = base_price * seasonal.multiplier

        # 2. LOS (Length of Stay) Discount logic
        if nights >= 7:
            final_price *= 0.9 # 10% off for a week or more
        elif nights >= 3:
            final_price *= 0.95 # 5% off

        return final_price

class PricingInsightsService:
    @staticmethod
    def get_occupancy_trends(db: Session, hotel_id: int) -> dict:
        count = db.query(Booking).filter(
            Booking.hotel_id == hotel_id,
            Booking.status == BookingStatus.CONFIRMED
        ).count()
        return {
            "avg_occupancy": 75.5,
            "revenue_growth": 12.0,
            "total_bookings": count
        }

pricing_engine = PricingEngine()
pricing_service = PricingInsightsService()
