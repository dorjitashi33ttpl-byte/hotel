from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus
from app.models.review import Review
from app.models.hotel import Hotel

@celery_app.task
def cleanup_expired_holds():
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        expired = db.query(Booking).filter(Booking.status == BookingStatus.HOLD, Booking.hold_expires_at < now).all()
        for b in expired: b.status = BookingStatus.FAILED
        db.commit()
    finally:
        db.close()

@celery_app.task
def update_reputation_scores():
    db = SessionLocal()
    try:
        hotels = db.query(Hotel).all()
        for hotel in hotels:
            avg_rating = db.query(func.avg(Review.rating)).filter(Review.hotel_id == hotel.id, Review.is_verified == True).scalar()
            hotel.reputation_score = avg_rating or 0.0
        db.commit()
    finally:
        db.close()
