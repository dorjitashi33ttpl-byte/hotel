from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
import hmac, hashlib, json
from jinja2 import Template
from app.core.config import settings

class PaymentAdapter(ABC):
    @abstractmethod
    async def create_intent(self, amount: float, currency: str, booking_id: int) -> Dict[str, Any]: pass
    @abstractmethod
    async def verify(self, payload: Any, sig: str) -> bool: pass
    @abstractmethod
    async def refund(self, pay_id: str, amount: Optional[float] = None) -> Dict[str, Any]: pass

class StripeAdapter(PaymentAdapter):
    async def create_intent(self, amount, currency, booking_id): return {"id": "st_123", "client_secret": "sk_test_..."}
    async def verify(self, payload, sig): return True
    async def refund(self, pay_id, amount=None): return {"status": "succeeded"}

class RazorpayAdapter(PaymentAdapter):
    async def create_intent(self, amount, currency, booking_id): return {"order_id": "order_xyz", "amount": amount}
    async def verify(self, payload, sig): return True
    async def refund(self, pay_id, amount=None): return {"status": "succeeded"}

class LocalBankAdapter(PaymentAdapter):
    def __init__(self, config: Dict[str, Any]): self.config = config
    async def create_intent(self, amount: float, currency: str, booking_id: int):
        tpl = Template(self.config.get("redirect_tpl", ""))
        return {"url": tpl.render(bid=booking_id, amt=amount, cur=currency)}
    async def verify(self, payload: Any, sig: str):
        key = self.config.get("sig_key", "")
        calc = hmac.new(key.encode(), json.dumps(payload, sort_keys=True).encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(calc, sig)
    async def refund(self, pay_id: str, amount: float = None): return {"status": "manual"}

class PaymentService:
    def get_adapter(self, provider: str, config: Dict[str, Any] = None) -> PaymentAdapter:
        if provider == "stripe": return StripeAdapter()
        if provider == "razorpay": return RazorpayAdapter()
        if provider == "local_bank": return LocalBankAdapter(config or {})
        raise ValueError(f"Unknown provider {provider}")

payment_service = PaymentService()
