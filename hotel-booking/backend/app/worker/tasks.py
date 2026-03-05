from datetime import datetime
from sqlalchemy.orm import Session
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus
from app.models.shift import ShiftAssignment, ShiftTemplate
from app.models.user import User

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
    # Logic to identify affected bookings in the shift window
    # And notify focal person + current shift staff
    return f"Shift notification sent for shift {shift_id}"

@celery_app.task
def send_booking_confirmation_email(booking_id: int):
    db = SessionLocal()
    try:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        # Find focal person and staff currently on shift for check-in window
        focal_person = db.query(User).filter(User.tenant_id == booking.tenant_id, User.is_focal_person == True).first()

        # Shift lookup for booking.check_in window
        # ... logic ...

        return f"Confirmation sent for booking {booking_id}"
    finally:
        db.close()
