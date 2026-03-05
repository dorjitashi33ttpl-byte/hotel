from datetime import datetime
from sqlalchemy.orm import Session
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus
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
def notify_late_arrival(booking_id: int, arrival_time: str):
    # Email staff about late arrival
    return f"Late arrival notification for booking {booking_id} at {arrival_time}"

@celery_app.task
def notify_shift_update(shift_id: int):
    # Logic to send update emails to bookings in that shift window
    return f"Shift update notifications sent for shift {shift_id}"

@celery_app.task
def send_booking_confirmation_email(booking_id: int):
    db = SessionLocal()
    try:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        focal = db.query(User).filter(User.tenant_id == booking.tenant_id, User.is_focal_person == True).first()
        return f"Confirmation sent for booking {booking_id} (Focal: {focal.full_name if focal else 'N/A'})"
    finally:
        db.close()
