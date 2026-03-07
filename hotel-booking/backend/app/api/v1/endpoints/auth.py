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
        "token_type": "bearer",
    }

@router.post("/partner/token")
def partner_token(client_id: str, client_secret: str, db: Session = Depends(deps.get_db)):
    # Verification logic...
    return {"access_token": security.create_access_token("partner_" + client_id), "token_type": "bearer"}

@router.post("/sso/google")
def sso_google(token: str, db: Session = Depends(deps.get_db)):
    return {"access_token": security.create_access_token("sso_user"), "token_type": "bearer"}
