from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import stripe
import razorpay
import hmac
import hashlib
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

class StripeAdapter(PaymentAdapter):
    def __init__(self, api_key: str):
        stripe.api_key = api_key

    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency=currency,
            metadata={"booking_id": str(booking_id)}
        )
        return {"id": intent.id, "client_secret": intent.client_secret}

    async def verify_payment(self, payload: Any, signature: str) -> bool:
        return True

    async def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        refund = stripe.Refund.create(
            payment_intent=payment_id,
            amount=int(amount * 100) if amount else None
        )
        return {"id": refund.id, "status": refund.status}

class PayPalAdapter(PaymentAdapter):
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        # Mock PayPal client initialization

    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        return {"id": "mock_paypal_order_id", "approval_url": "https://paypal.com/checkout"}

    async def verify_payment(self, payload: Any, signature: str) -> bool:
        return True

    async def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        return {"status": "refunded"}

class LocalBankAdapter(PaymentAdapter):
    def __init__(self, config: Dict[str, Any]):
        self.config = config

    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        template = Template(self.config["redirect_url_template"])
        context = {
            "booking_id": booking_id,
            "amount": amount,
            "currency": currency,
            "success_url": f"{settings.API_V1_STR}/payments/callback/success",
            "cancel_url": f"{settings.API_V1_STR}/payments/callback/cancel"
        }
        redirect_url = template.render(context)
        return {"redirect_url": redirect_url}

    async def verify_payment(self, payload: Any, signature: str) -> bool:
        return True

    async def refund_payment(self, payment_id: str, amount: Optional[float] = None) -> Dict[str, Any]:
        return {"status": "manual_refund_required"}

class PaymentService:
    def get_adapter(self, provider: str, config: Dict[str, Any]) -> PaymentAdapter:
        if provider == "stripe":
            return StripeAdapter(config["api_key"])
        elif provider == "paypal":
            return PayPalAdapter(config["client_id"], config["client_secret"])
        elif provider == "local_bank":
            return LocalBankAdapter(config)
        raise ValueError(f"Unsupported provider: {provider}")

payment_service = PaymentService()
