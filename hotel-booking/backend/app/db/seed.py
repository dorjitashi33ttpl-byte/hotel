from sqlalchemy.orm import Session
from app.models.tenant import Country, Tenant
from app.models.payment import PaymentProviderConfig

def seed_data(db: Session):
    # Seed Country
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
                "map_key_enabled": True,
                "features": {
                    "chat": True,
                    "digital_checkin": False,
                    "pre_arrival_forms": True
                }
            }
        )
        db.add(bhutan)
        db.commit()
        db.refresh(bhutan)

    # Seed Payment Providers for Bhutan
    stripe_config = db.query(PaymentProviderConfig).filter(
        PaymentProviderConfig.country_id == bhutan.id,
        PaymentProviderConfig.provider_type == "stripe"
    ).first()
    if not stripe_config:
        db.add(PaymentProviderConfig(
            country_id=bhutan.id,
            provider_type="stripe",
            credentials_encrypted="encrypted_mock_key",
            is_enabled=True,
            config_data={"api_version": "2023-10-16"}
        ))

    bank_config = db.query(PaymentProviderConfig).filter(
        PaymentProviderConfig.country_id == bhutan.id,
        PaymentProviderConfig.provider_type == "local_bank"
    ).first()
    if not bank_config:
        db.add(PaymentProviderConfig(
            country_id=bhutan.id,
            provider_type="local_bank",
            credentials_encrypted="none",
            is_enabled=True,
            config_data={
                "bank_name": "Bank of Bhutan",
                "redirect_url_template": "https://bob.bt/pay?bid={{booking_id}}&amt={{amount}}",
                "signature_key": "secret_key"
            }
        ))

    db.commit()
    print("Seed data completed for Bhutan.")

if __name__ == "__main__":
    from app.db.session import SessionLocal
    db = SessionLocal()
    seed_data(db)
    db.close()
