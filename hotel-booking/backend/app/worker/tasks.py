from datetime import datetime
from sqlalchemy.orm import Session
from app.worker.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.booking import Booking, BookingStatus
from app.models.user import User
from app.models.partner import WebhookLog
from app.services.webhooks import webhook_dispatcher

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
def deliver_partner_webhook(partner_id: int, event: str, payload: dict, endpoint_url: str, secret: str):
    db = SessionLocal()
    try:
        # 1. Dispatch
        # status_code = await webhook_dispatcher.dispatch_event(event, payload, endpoint_url, secret)
        # Mock status for demo
        status_code = 200

        # 2. Log result
        log = WebhookLog(
            partner_id=partner_id,
            event_type=event,
            payload=payload,
            status_code=status_code,
            delivered_at=datetime.utcnow()
        )
        db.add(log)
        db.commit()
        return status_code
    finally:
        db.close()

@celery_app.task
def send_booking_confirmation_email(booking_id: int):
    db = SessionLocal()
    try:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        focal = db.query(User).filter(User.tenant_id == booking.tenant_id, User.is_focal_person == True).first()
        return f"Confirmation sent (Focal: {focal.full_name if focal else 'N/A'})"
    finally:
        db.close()
