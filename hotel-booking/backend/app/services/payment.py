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

class HMACHelper:
    @staticmethod
    def calculate_signature(data: Dict[str, Any], secret: str) -> str:
        data_string = json.dumps(data, sort_keys=True)
        return hmac.new(secret.encode(), data_string.encode(), hashlib.sha256).hexdigest()

class LocalBankAdapter(PaymentAdapter):
    def __init__(self, config: Dict[str, Any]):
        self.config = config

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
        key = self.config.get("signature_key", "")
        expected = HMACHelper.calculate_signature(payload, key)
        return hmac.compare_digest(expected, signature)

    async def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        return {"status": "manual_refund_required"}

class PaymentService:
    def get_adapter(self, provider: str, config: Dict[str, Any]) -> PaymentAdapter:
        if provider == "local_bank":
            return LocalBankAdapter(config)
        # Other adapters (Stripe, Razorpay) would be here
        raise ValueError(f"Provider {provider} not supported.")

payment_service = PaymentService()
