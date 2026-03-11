from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.hotel import Review, Booking
from fastapi import HTTPException, status

class ReputationService:
    @staticmethod
    async def submit_verified_review(db: Session, booking_id: str, rating: int, comment: str):
        booking = await db.get(Booking, booking_id)
        if not booking or booking.status != "COMPLETED":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Reviews can only be submitted for completed stays."
            )

        review = Review(
            id=str(uuid.uuid4()),
            hotel_id=booking.hotel_id,
            booking_id=booking_id,
            user_id=booking.user_id,
            rating=rating,
            comment=comment,
            is_verified=True
        )
        db.add(review)
        await db.commit()
        return review

    @staticmethod
    async def get_hotel_score(db: Session, hotel_id: str):
        avg_rating = db.query(func.avg(Review.rating)).filter(Review.hotel_id == hotel_id).scalar()
        return round(avg_rating or 0.0, 1)

reputation_service = ReputationService()
