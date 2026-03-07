import secrets
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api import deps
from app.core import security
from app.models.user import User

router = APIRouter()

@router.post("/login/access-token")
def login_access_token(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return {
        "access_token": security.create_access_token(user.id),
        "refresh_token": security.create_refresh_token(user.id),
        "token_type": "bearer",
    }

@router.post("/refresh")
def refresh_token(
    token: str,
    db: Session = Depends(deps.get_db)
):
    try:
        payload = security.decode_token(token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user_id = payload.get("sub")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found or inactive")

    return {
        "access_token": security.create_access_token(user.id),
        "token_type": "bearer",
    }

@router.post("/sso/google")
def sso_google(token: str, db: Session = Depends(deps.get_db)):
    email = "google_user@example.com"
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            email=email,
            hashed_password=security.get_password_hash(secrets.token_urlsafe(32)),
            full_name="Google User",
            role="customer",
            is_active=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "access_token": security.create_access_token(user.id),
        "refresh_token": security.create_refresh_token(user.id),
        "token_type": "bearer",
    }

@router.post("/sso/apple")
def sso_apple(token: str, db: Session = Depends(deps.get_db)):
    return {"access_token": "mock_apple", "token_type": "bearer"}
