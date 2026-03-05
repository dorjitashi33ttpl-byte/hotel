from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.hotel import RoomType, SeasonalRate
from app.models.booking import Booking, BookingStatus

class PricingEngine:
    @staticmethod
    def calculate_price(db: Session, room_type_id: int, rate_plan_id: int, target_date: date) -> float:
        room_type = db.query(RoomType).filter(RoomType.id == room_type_id).first()
        base_price = room_type.base_price

        seasonal = db.query(SeasonalRate).filter(
            SeasonalRate.rate_plan_id == rate_plan_id,
            and_(SeasonalRate.start_date <= target_date, SeasonalRate.end_date >= target_date)
        ).first()

        if seasonal:
            if seasonal.fixed_price:
                return seasonal.fixed_price
            return base_price * seasonal.multiplier
        return base_price

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
