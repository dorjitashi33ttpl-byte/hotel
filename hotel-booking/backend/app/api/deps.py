import hmac
import hashlib
from typing import Generator, Optional, List
from fastapi import Depends, HTTPException, status, Query, Request
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError, BaseModel
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core import security
from app.models.user import User
from app.models.partner import PartnerApp, PartnerQuota
from app.db.session import SessionLocal
from app.services.features import feature_flag_service
from app.core.exceptions import FeatureNotEnabledException
from datetime import date

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login/access-token",
    auto_error=False
)

class PaginationParams(BaseModel):
    skip: int = 0
    limit: int = 100

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

async def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> User:
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = security.decode_token(token)
        user_id = payload.get("sub")
        if user_id is None: raise HTTPException(403, "Invalid token")
    except (JWTError, ValidationError):
        raise HTTPException(403, "Invalid token")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user: raise HTTPException(404, "User not found")
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_active: raise HTTPException(400, "Inactive user")
    return current_user

def get_current_active_superuser(current_user: User = Depends(get_current_active_user)) -> User:
    if current_user.role != "platform_admin":
        raise HTTPException(403, "Not enough privileges")
    return current_user

async def get_current_tenant_user(current_user: User = Depends(get_current_active_user)) -> User:
    if not current_user.tenant_id:
        raise HTTPException(403, "Not associated with a tenant")
    return current_user

def requires_feature(feature_name: str):
    async def _requires_feature(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_active_user)
    ):
        if not current_user.tenant_id: return
        if not feature_flag_service.is_enabled(db, str(current_user.tenant_id), feature_name):
            raise FeatureNotEnabledException(feature_name)
    return _requires_feature

async def verify_partner_hmac(
    request: Request,
    db: Session = Depends(get_db)
) -> PartnerApp:
    partner_id = request.headers.get("X-Partner-ID")
    signature = request.headers.get("X-Partner-Signature")
    timestamp = request.headers.get("X-Partner-Timestamp")
    if not all([partner_id, signature, timestamp]):
        raise HTTPException(401, "HMAC credentials missing")
    partner = db.query(PartnerApp).filter(PartnerApp.id == partner_id, PartnerApp.is_active == True).first()
    if not partner:
        raise HTTPException(401, "Invalid partner")
    secret = partner.webhook_secret or "fallback"
    body = await request.body()
    message = f"{timestamp}.{request.method}.{request.url.path}.{body.decode()}"
    expected = hmac.new(secret.encode(), message.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        raise HTTPException(401, "Invalid signature")
    return partner
