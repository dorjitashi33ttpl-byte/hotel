from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.review import Review
from app.models.hotel import Hotel

class ReputationService:
    @staticmethod
    async def recalculate_hotel_reputation(db: Session, hotel_id: int):
        # Calculate average rating from verified reviews
        avg_rating = db.query(func.avg(Review.rating)).filter(
            Review.hotel_id == hotel_id,
            Review.is_verified == True
        ).scalar()

        # Update hotel reputation score
        hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
        if hotel and avg_rating is not None:
            hotel.reputation_score = float(avg_rating)
            db.commit()

reputation_service = ReputationService()
