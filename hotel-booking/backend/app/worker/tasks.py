from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus
from app.models.review import Review
from app.models.hotel import Hotel
from app.models.shift import ShiftAssignment, ShiftTemplate
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
            avg_rating = db.query(func.avg(Review.rating)).filter(Review.hotel_id == hotel.id, Review.is_verified == True).scalar()
            hotel.reputation_score = avg_rating or 0.0
        db.commit()
    finally:
        db.close()

@celery_app.task
def send_booking_confirmation_email(booking_id: int):
    db = SessionLocal()
    try:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        if not booking: return

        # 1. Find Focal Person
        focal = db.query(User).filter(User.tenant_id == booking.tenant_id, User.is_focal_person == True).first()

        # 2. Find Staff working during check-in window
        # Query ShiftAssignment for the booking date and check if check-in time falls within template bounds
        check_in_date = booking.check_in.date()
        on_shift_staff = db.query(User).join(ShiftAssignment).filter(
            ShiftAssignment.hotel_id == booking.hotel_id,
            ShiftAssignment.date == check_in_date
        ).all()

        staff_contacts = ", ".join([f"{u.full_name} ({u.phone_number or 'N/A'})" for u in on_shift_staff])

        print(f"Email context: Staff {staff_contacts}, Focal: {focal.full_name if focal else 'N/A'}")
        # Logic to send actual email via SMTP/Jinja

    finally:
        db.close()
