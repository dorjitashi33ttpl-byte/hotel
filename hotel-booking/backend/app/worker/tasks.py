from datetime import datetime
from sqlalchemy.orm import Session
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus
from app.models.shift import ShiftAssignment
from app.models.user import User
from app.models.audit import AuditLog

@celery_app.task
def cleanup_expired_holds():
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        expired_holds = db.query(Booking).filter(
            Booking.status == BookingStatus.HOLD,
            Booking.hold_expires_at < now
        ).all()
        for hold in expired_holds:
            hold.status = BookingStatus.FAILED
        db.commit()
        return len(expired_holds)
    finally:
        db.close()

@celery_app.task
def notify_shift_change(shift_id: int):
    db = SessionLocal()
    try:
        # Find bookings affected by this shift change
        # Send update emails to customers and new staff
        return f"Notified shift change for shift {shift_id}"
    finally:
        db.close()

@celery_app.task
def send_booking_confirmation_email(booking_id: int):
    # Logic to render booking_confirmation.html and send via SMTP
    return f"Confirmation sent for booking {booking_id}"
