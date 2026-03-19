from sqlalchemy.orm import Session
from app.models.partner import WebhookDeliveryLog
import uuid

class TrackingService:
    @staticmethod
    def log_webhook_delivery(
        db: Session,
        partner_id: str,
        event_type: str,
        payload: dict,
        status_code: int,
        response_body: str,
        duration: int
    ):
        log = WebhookDeliveryLog(
            id=str(uuid.uuid4()),
            partner_id=partner_id,
            event_type=event_type,
            payload=payload,
            status_code=status_code,
            response_body=response_body,
            duration_ms=duration
        )
        db.add(log)
        db.commit()

tracking_service = TrackingService()
