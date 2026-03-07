from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.payment import CommissionLedger, Payout

class FinancialService:
    @staticmethod
    def get_monthly_statement(db: Session, tenant_id: int, month: int, year: int):
        # Implementation to aggregate all bookings and commissions for the month
        totals = db.query(
            func.sum(CommissionLedger.gross_amount).label("gross"),
            func.sum(CommissionLedger.commission_amount).label("commission"),
            func.sum(CommissionLedger.net_amount).label("net")
        ).filter(
            CommissionLedger.tenant_id == tenant_id
            # Filter by timestamp month/year
        ).first()

        return {
            "period": f"{month}/{year}",
            "gross": totals.gross or 0.0,
            "commission": totals.commission or 0.0,
            "net": totals.net or 0.0
        }

financial_service = FinancialService()
