from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import stripe
import razorpay
import hmac
import hashlib
import json
from jinja2 import Template
from app.core.config import settings

class PaymentAdapter(ABC):
    @abstractmethod
    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def verify_payment(self, payload: Any, signature: str) -> bool:
        pass

    @abstractmethod
    async def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        pass

class LocalBankAdapter(PaymentAdapter):
    def __init__(self, config: Dict[str, Any]):
        self.config = config # includes templates, signature_key, status_mapping

    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        template = Template(self.config.get("redirect_url_template", ""))
        context = {
            "booking_id": booking_id,
            "amount": amount,
            "currency": currency,
            "callback_url": f"{settings.API_V1_STR}/payments/callback/bank"
        }
        return {"redirect_url": template.render(context)}

    async def verify_payment(self, payload: Any, signature: str) -> bool:
        # 1. Verify Signature based on configured signature method
        method = self.config.get("signature_method", "hmac-sha256")
        key = self.config.get("signature_key", "")

        if method == "hmac-sha256":
            expected = hmac.new(key.encode(), json.dumps(payload, sort_keys=True).encode(), hashlib.sha256).hexdigest()
            if not hmac.compare_digest(expected, signature):
                return False

        # 2. Map Provider Status to Internal Status
        mapping = self.config.get("status_mapping", {}) # e.g. {"00": "success", "01": "failed"}
        provider_status = str(payload.get("status_code"))
        internal_status = mapping.get(provider_status, "unknown")

        return internal_status == "success"

    async def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        return {"status": "manual_review", "message": "Bank transfers require manual refund process."}

class PaymentService:
    def get_adapter(self, provider: str, config: Dict[str, Any]) -> PaymentAdapter:
        if provider == "stripe":
            # StripeAdapter implementation...
            return None
        elif provider == "local_bank":
            return LocalBankAdapter(config)
        raise ValueError(f"Provider {provider} not supported.")

payment_service = PaymentService()
