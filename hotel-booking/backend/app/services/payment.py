from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import stripe
import razorpay
import hmac
import hashlib
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
        return True

class RazorpayAdapter(PaymentAdapter):
    def __init__(self, key_id: str, key_secret: str):
        self.client = razorpay.Client(auth=(key_id, key_secret))
        self.key_secret = key_secret

    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        order = self.client.order.create({
            "amount": int(amount * 100),
            "currency": currency,
            "receipt": f"receipt_{booking_id}"
        })
        return {"id": order["id"]}

    async def verify_payment(self, payload: Any, signature: str) -> bool:
        return self.client.utility.verify_payment_signature({
            'razorpay_order_id': payload['order_id'],
            'razorpay_payment_id': payload['payment_id'],
            'razorpay_signature': signature
        })

class LocalBankAdapter(PaymentAdapter):
    def __init__(self, config: Dict[str, Any]):
        self.config = config

    async def create_payment_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]:
        redirect_url = self.config["redirect_url"]
        return {"redirect_url": f"{redirect_url}?booking_id={booking_id}&amount={amount}"}

    async def verify_payment(self, payload: Any, signature: str) -> bool:
        key = self.config["signature_key"]
        expected_sig = hmac.new(key.encode(), str(payload).encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected_sig, signature)

class PaymentService:
    def __init__(self):
        self._adapters = {}

    def get_adapter(self, provider: str, config: Dict[str, Any]) -> PaymentAdapter:
        if provider == "stripe":
            return StripeAdapter(config["api_key"])
        elif provider == "razorpay":
            return RazorpayAdapter(config["key_id"], config["key_secret"])
        elif provider == "local_bank":
            return LocalBankAdapter(config)
        raise ValueError(f"Unsupported payment provider: {provider}")

payment_service = PaymentService()
