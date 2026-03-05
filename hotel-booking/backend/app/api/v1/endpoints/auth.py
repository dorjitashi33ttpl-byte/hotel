from fastapi import APIRouter, Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.api import deps
from app.models.user import User

router = APIRouter()

@router.post("/login/access-token")
def login_access_token(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    # Standard user login with email/password
    return {"access_token": "mock_token", "token_type": "bearer"}

@router.post("/partner/token")
def partner_token(
    client_id: str,
    client_secret: str,
    db: Session = Depends(deps.get_db)
):
    # OAuth2 Client Credentials flow for Partners
    # Verify client_id/secret and return token with partner_app role
    return {"access_token": "mock_partner_token", "token_type": "bearer"}

@router.post("/sso/google")
def sso_google(token: str, db: Session = Depends(deps.get_db)):
    return {"access_token": "mock_google_token", "token_type": "bearer"}

@router.post("/sso/apple")
def sso_apple(token: str, db: Session = Depends(deps.get_db)):
    return {"access_token": "mock_apple_token", "token_type": "bearer"}
