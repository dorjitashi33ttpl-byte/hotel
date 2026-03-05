from datetime import datetime
from sqlalchemy.orm import Session
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus

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
            hold.status = BookingStatus.FAILED # Or release to DRAFT
            # Logic to release inventory if Mode B

        db.commit()
        return len(expired_holds)
    finally:
        db.close()

@celery_app.task
def send_booking_confirmation_email(booking_id: int):
    # Logic to send email via SMTP or SES
    return f"Email sent for booking {booking_id}"

@celery_app.task
def retry_webhook_delivery(webhook_id: int):
    # Logic to retry failed partner webhooks
    return True
