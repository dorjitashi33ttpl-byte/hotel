from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.payment import CommissionLedger, Payout
from datetime import datetime
import uuid

class SettlementService:
    @staticmethod
    async def generate_hotel_payout(db: Session, hotel_id: str):
        """
        Aggregates all PENDING_PAYOUT ledger entries for a hotel and creates a Payout record.
        """
        # 1. Sum up all pending amounts
        pending_total = db.query(func.sum(CommissionLedger.net_amount)).filter(
            CommissionLedger.hotel_id == hotel_id,
            CommissionLedger.status == "PENDING_PAYOUT"
        ).scalar() or 0.0

        if pending_total <= 0:
            return None

        # 2. Create Payout record
        payout = Payout(
            id=str(uuid.uuid4()),
            hotel_id=hotel_id,
            amount=pending_total,
            status="PENDING"
        )
        db.add(payout)
        await db.flush()

        # 3. Mark ledger entries as linked to this payout
        db.query(CommissionLedger).filter(
            CommissionLedger.hotel_id == hotel_id,
            CommissionLedger.status == "PENDING_PAYOUT"
        ).update({"payout_id": payout.id, "status": "PAID"})

        await db.commit()
        return payout

settlement_service = SettlementService()
