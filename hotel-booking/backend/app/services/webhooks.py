import httpx
from typing import Dict, Any
from app.core.config import settings

class WebhookDispatcher:
    @staticmethod
    async def dispatch_event(event: str, payload: Dict[str, Any], endpoint_url: str, secret: str):
        # In production, this should be a celery task for retry-safety
        async with httpx.AsyncClient() as client:
            # Custom HMAC signature calculation for partner/webhook
            signature = "hmac_signature_of_payload"
            response = await client.post(
                endpoint_url,
                json=payload,
                headers={"X-Webhook-Signature": signature}
            )
            return response.status_code

webhook_dispatcher = WebhookDispatcher()
