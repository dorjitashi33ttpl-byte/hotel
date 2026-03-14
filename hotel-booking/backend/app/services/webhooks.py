from sqlalchemy.orm import Session
from app.models.partner import PartnerApp, WebhookLog
from app.worker.tasks import dispatch_webhook
import uuid

class WebhookOrchestrator:
    @staticmethod
    async def trigger_event(db: Session, hotel_id: str, event_type: str, payload: dict):
        """
        Triggers a webhook event for all subscribed partners of a hotel.
        """
        partners = db.query(PartnerApp).filter(
            PartnerApp.hotel_id == hotel_id,
            PartnerApp.is_active == True
        ).all()

        for partner in partners:
            if partner.webhook_url:
                dispatch_webhook.delay(
                    url=partner.webhook_url,
                    secret=partner.webhook_secret,
                    payload={
                        "event": event_type,
                        "hotel_id": hotel_id,
                        "data": payload,
                        "timestamp": str(uuid.uuid4()) # Trace ID
                    }
                )

webhook_orchestrator = WebhookOrchestrator()
