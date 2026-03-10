import hmac
import hashlib
from typing import Any

class WebhookSecurity:
    @staticmethod
    def verify_signature(payload: Any, signature: str, secret: str) -> bool:
        if not secret: return False

        computed_sig = hmac.new(
            secret.encode(),
            payload.encode() if isinstance(payload, str) else str(payload).encode(),
            hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(computed_sig, signature)

webhook_security = WebhookSecurity()
