from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus
from app.models.review import Review
from app.models.hotel import Hotel
from app.models.user import User

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
            avg = db.query(func.avg(Review.rating)).filter(Review.hotel_id == hotel.id, Review.is_verified == True).scalar()
            hotel.reputation_score = avg or 0.0
        db.commit()
    finally:
        db.close()

@celery_app.task
def send_booking_confirmation_email(booking_id: int):
    db = SessionLocal()
    try:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        hotel = db.query(Hotel).filter(Hotel.id == booking.hotel_id).first()
        focal = db.query(User).filter(User.tenant_id == booking.tenant_id, User.is_focal_person == True).first()

        # Email Context includes Focal Person, Menu PDF, and Hotel Address
        context = {
            "booking_id": booking.id,
            "hotel_name": hotel.name,
            "focal_person": focal.full_name if focal else "N/A",
            "menu_url": hotel.menu_pdf_url,
            "address": hotel.address
        }
        print(f"Sending confirmation for booking {booking_id}: {context}")
    finally:
        db.close()
