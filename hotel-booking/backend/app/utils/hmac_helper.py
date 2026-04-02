import hmac
import hashlib
import json
from typing import Any, Dict

class HMACHelper:
    @staticmethod
    def sign_payload(payload: Dict[str, Any], secret: str) -> str:
        """
        Generates an HMAC-SHA256 signature for a JSON payload.
        """
        message = json.dumps(payload, sort_keys=True).encode()
        return hmac.new(secret.encode(), message, hashlib.sha256).hexdigest()

    @staticmethod
    def verify_payload(payload: Dict[str, Any], signature: str, secret: str) -> bool:
        """
        Verifies an HMAC-SHA256 signature.
        """
        expected = HMACHelper.sign_payload(payload, secret)
        return hmac.compare_digest(expected, signature)

hmac_helper = HMACHelper()
