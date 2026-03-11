from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from app.models.payment import PaymentProvider, PaymentStatus
from app.core.config import settings

class PaymentAdapter(ABC):
    @abstractmethod
    async def create_payment(self, amount: float, currency: str, booking_id: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def verify_callback(self, payload: Dict[str, Any], headers: Dict[str, Any]) -> bool:
        pass

class StripeAdapter(PaymentAdapter):
    async def create_payment(self, amount: float, currency: str, booking_id: str, metadata: Dict[str, Any]):
        # import stripe
        # stripe.api_key = metadata.get("api_key")
        return {
            "provider": "stripe",
            "session_id": "cs_test_...",
            "payment_url": f"https://checkout.stripe.com/pay/{booking_id}"
        }

    async def verify_callback(self, payload: Dict[str, Any], headers: Dict[str, Any]):
        return True

class RazorpayAdapter(PaymentAdapter):
    async def create_payment(self, amount: float, currency: str, booking_id: str, metadata: Dict[str, Any]):
        return {
            "provider": "razorpay",
            "order_id": "order_...",
            "key_id": metadata.get("key_id")
        }

    async def verify_callback(self, payload: Dict[str, Any], headers: Dict[str, Any]):
        return True

class PaymentOrchestrator:
    def __init__(self):
        self._adapters = {
            "stripe": StripeAdapter(),
            "razorpay": RazorpayAdapter(),
        }

    def get_adapter(self, provider_type: str) -> PaymentAdapter:
        adapter = self._adapters.get(provider_type)
        if not adapter:
            raise ValueError(f"Unsupported payment provider: {provider_type}")
        return adapter

payment_orchestrator = PaymentOrchestrator()

import jinja2
import hmac
import hashlib

class LocalBankAdapter(PaymentAdapter):
    def __init__(self):
        self.jinja_env = jinja2.Environment()

    async def create_payment(self, amount: float, currency: str, booking_id: str, metadata: Dict[str, Any]):
        template_str = metadata.get("body_template", "")
        url_template = metadata.get("url_template", "")
        secret = metadata.get("secret_key", "")

        context = {
            "amount": amount,
            "currency": currency,
            "booking_id": booking_id,
            "callback_url": f"{settings.API_V1_STR}/payments/callback/local-bank"
        }

        # Render dynamic URL and body
        url = self.jinja_env.from_string(url_template).render(context)
        body = self.jinja_env.from_string(template_str).render(context)

        # Generate signature
        signature = hmac.new(
            secret.encode(),
            body.encode(),
            hashlib.sha256
        ).hexdigest()

        return {
            "provider": "local_bank",
            "redirect_url": url,
            "payload": body,
            "signature": signature
        }

    async def verify_callback(self, payload: Dict[str, Any], headers: Dict[str, Any]):
        # Custom logic based on admin-defined callback parsing rules
        return True

# Update Orchestrator
payment_orchestrator._adapters["local_bank"] = LocalBankAdapter()
