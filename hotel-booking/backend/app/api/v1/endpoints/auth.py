from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.user import User

router = APIRouter()

@router.post("/login/access-token")
def login_access_token(db: Session = Depends(deps.get_db)):
    # Mock JWT generation
    return {"access_token": "mock_token", "token_type": "bearer"}

@router.post("/sso/google")
def sso_google(token: str, db: Session = Depends(deps.get_db)):
    # Verify Google token and create/get user
    return {"access_token": "mock_google_token", "token_type": "bearer"}

@router.post("/sso/apple")
def sso_apple(token: str, db: Session = Depends(deps.get_db)):
    # Verify Apple token and create/get user
    return {"access_token": "mock_apple_token", "token_type": "bearer"}
