from app.worker.celery_app import celery_app
import httpx
import hmac
import hashlib
import json

@celery_app.task(bind=True, max_retries=5)
def dispatch_webhook(self, url: str, secret: str, payload: dict):
    """
    Dispatches a signed webhook to an external partner or system.
    """
    body = json.dumps(payload)
    signature = hmac.new(
        secret.encode(),
        body.encode(),
        hashlib.sha256
    ).hexdigest()

    headers = {
        "Content-Type": "application/json",
        "X-Hotel-Signature": signature
    }

    try:
        with httpx.Client() as client:
            response = client.post(url, content=body, headers=headers, timeout=10.0)
            response.raise_for_status()
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)
