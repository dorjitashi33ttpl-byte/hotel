import hmac
import hashlib
import json
import uuid
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from jinja2 import Template
from app.core.config import settings

class PaymentAdapter(ABC):
    @abstractmethod
    def create_intent(self, amount: float, currency: str, booking_id: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def verify_callback(self, payload: Dict[str, Any], signature: str) -> bool:
        pass

    @abstractmethod
    def refund(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        pass

class StripeAdapter(PaymentAdapter):
    def create_intent(self, amount, currency, booking_id):
        return {
            "gateway": "stripe",
            "intent_id": f"pi_{uuid.uuid4().hex[:12]}",
            "client_secret": f"pi_{uuid.uuid4().hex}_secret_{uuid.uuid4().hex[:8]}",
            "amount": amount,
            "currency": currency
        }

    def verify_callback(self, payload, signature):
        # In production, use stripe.Webhook.construct_event
        return True

    def refund(self, payment_id, amount=None):
        return {"status": "succeeded", "gateway": "stripe", "refund_id": f"re_{uuid.uuid4().hex[:12]}"}

class RazorpayAdapter(PaymentAdapter):
    def create_intent(self, amount, currency, booking_id):
        return {
            "gateway": "razorpay",
            "order_id": f"order_{uuid.uuid4().hex[:12]}",
            "amount": int(amount * 100),
            "currency": currency
        }

    def verify_callback(self, payload, signature):
        # In production, use razorpay_client.utility.verify_payment_signature
        return True

    def refund(self, payment_id, amount=None):
        return {"status": "succeeded", "gateway": "razorpay", "refund_id": f"rfnd_{uuid.uuid4().hex[:12]}"}

class LocalBankAdapter(PaymentAdapter):
    def __init__(self, config: Dict[str, Any]):
        self.config = config

    def create_intent(self, amount: float, currency: str, booking_id: str) -> Dict[str, Any]:
        """
        Uses Jinja2 template to generate a redirect URL for local bank gateways.
        """
        tpl_str = self.config.get("redirect_url_template", "https://bank.bt/pay?bid={{bid}}&amt={{amt}}")
        template = Template(tpl_str)

        # Add success/cancel URLs to the context
        redirect_url = template.render(
            bid=booking_id,
            amt=amount,
            cur=currency,
            callback_url=f"{settings.API_V1_STR}/payments/callback/local_bank"
        )

        return {
            "gateway": "local_bank",
            "redirect_url": redirect_url,
            "method": self.config.get("http_method", "GET"),
            "headers": self.config.get("headers", {})
        }

    def verify_callback(self, payload: Dict[str, Any], signature: str) -> bool:
        """
        Verifies callback integrity using HMAC-SHA256.
        """
        secret_key = self.config.get("signature_key", settings.SECRET_KEY)

        # Sort keys to ensure consistent signature generation
        sorted_payload = json.dumps(payload, sort_keys=True)

        expected_sig = hmac.new(
            secret_key.encode(),
            sorted_payload.encode(),
            hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(expected_sig, signature)

    def refund(self, payment_id, amount=None):
        """
        Local banks often require manual refund processing or custom API.
        """
        return {"status": "pending_manual_review", "gateway": "local_bank"}

class PaymentService:
    def get_adapter(self, provider: str, config: Optional[Dict[str, Any]] = None) -> PaymentAdapter:
        if provider == "stripe":
            return StripeAdapter()
        elif provider == "razorpay":
            return RazorpayAdapter()
        elif provider == "local_bank":
            return LocalBankAdapter(config or {})
        else:
            raise ValueError(f"Unsupported payment provider: {provider}")

payment_service = PaymentService()
