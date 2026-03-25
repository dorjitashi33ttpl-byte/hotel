import hmac
import hashlib
import json
import base64
from typing import Any, Optional
from cryptography.fernet import Fernet
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"

def create_access_token(subject: Any, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def encrypt_data(data: str, key: str) -> str:
    """
    Encrypts sensitive data using Fernet (AES-128 in CBC mode with HMAC-SHA256).
    """
    # Key must be 32 bytes and base64 encoded for Fernet
    # Derive a stable 32-byte key from settings.SECRET_KEY
    derived_key = hashlib.sha256(key.encode()).digest()
    f = Fernet(base64.urlsafe_b64encode(derived_key))
    return f.encrypt(data.encode()).decode()

def decrypt_data(token: str, key: str) -> str:
    """
    Decrypts sensitive data using Fernet.
    """
    derived_key = hashlib.sha256(key.encode()).digest()
    f = Fernet(base64.urlsafe_b64encode(derived_key))
    return f.decrypt(token.encode()).decode()

class WebhookSecurity:
    @staticmethod
    def verify_signature(payload: Any, signature: str, secret: str) -> bool:
        if not secret:
            return False

        # Ensure payload is a string or bytes for HMAC
        if not isinstance(payload, (str, bytes)):
            payload = json.dumps(payload, sort_keys=True)

        computed_sig = hmac.new(
            secret.encode(),
            payload.encode() if isinstance(payload, str) else payload,
            hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(computed_sig, signature)

webhook_security = WebhookSecurity()
