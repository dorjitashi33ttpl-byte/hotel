from sqlalchemy.orm import Session
from app.models.tenant import Country

def seed_bhutan(db: Session):
    bhutan = db.query(Country).filter(Country.iso_code == "BT").first()
    if not bhutan:
        bhutan = Country(
            name="Bhutan",
            iso_code="BT",
            currency="BTN",
            timezone="Asia/Thimphu",
            phone_format="+975-XXXXXXX",
            is_active=True,
            settings={
                "support_contact": "+975-2-333333",
                "default_language": "dz",
                "map_key_enabled": True
            }
        )
        db.add(bhutan)
        db.commit()
        db.refresh(bhutan)
        print("Bhutan seeded.")

if __name__ == "__main__":
    from app.db.session import SessionLocal
    db = SessionLocal()
    seed_bhutan(db)
    db.close()
