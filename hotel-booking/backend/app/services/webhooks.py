import httpx
import hmac
import hashlib
import json
from typing import Dict, Any

class WebhookDispatcher:
    @staticmethod
    async def dispatch_event(event: str, payload: Dict[str, Any], endpoint_url: str, secret: str):
        # Calculate HMAC signature of the payload using partner secret
        payload_bytes = json.dumps(payload).encode()
        signature = hmac.new(secret.encode(), payload_bytes, hashlib.sha256).hexdigest()

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    endpoint_url,
                    content=payload_bytes,
                    headers={
                        "X-Webhook-Signature": signature,
                        "X-Webhook-Event": event,
                        "Content-Type": "application/json"
                    },
                    timeout=5.0
                )
                return response.status_code
            except Exception:
                # Task would retry if this fails in production
                return 500

webhook_dispatcher = WebhookDispatcher()
