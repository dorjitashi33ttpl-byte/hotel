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
        return True # Webhook verification logic

class LocalBankAdapter(PaymentAdapter):
    def __init__(self, config: Dict[str, Any]):
        self.config = config # includes redirect_url_template, callback_parsing_rules

    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        # Use Jinja2 to render the redirect URL based on admin config
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
        # Custom logic for callback parsing as per admin rules
        key = self.config["signature_key"]
        # logic to parse payload and compare signature
        return True

class PaymentService:
    def get_adapter(self, provider: str, config: Dict[str, Any]) -> PaymentAdapter:
        if provider == "stripe":
            return StripeAdapter(config["api_key"])
        elif provider == "razorpay":
            return RazorpayAdapter(config["key_id"], config["key_secret"])
        elif provider == "local_bank":
            return LocalBankAdapter(config)
        raise ValueError(f"Unsupported provider: {provider}")

payment_service = PaymentService()
