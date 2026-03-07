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
    def get_adapter(self, provider: str, config: Dict[str, Any]) -> PaymentAdapter:
        if provider == "local_bank": return LocalBankAdapter(config)
        raise ValueError(f"Unknown provider {provider}")

payment_service = PaymentService()
