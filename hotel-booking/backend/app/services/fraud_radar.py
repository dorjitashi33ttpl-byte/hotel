from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.audit import AuditLog
from app.models.hotel import Booking
from datetime import datetime, timedelta

class FraudRadarService:
    @staticmethod
    def get_high_risk_alerts(db: Session) -> List[Dict[str, Any]]:
        """
        Analyzes recent activity to surface high-risk alerts.
        """
        alerts = []

        # 1. Detect rapid hold failures from same IP
        one_hour_ago = datetime.utcnow() - timedelta(hours=1)
        ip_failures = db.query(
            AuditLog.ip_address,
            func.count(AuditLog.id).label("fail_count")
        ).filter(
            AuditLog.action == "HOLD_FAILED",
            AuditLog.timestamp >= one_hour_ago
        ).group_by(AuditLog.ip_address).having(func.count(AuditLog.id) > 10).all()

        for ip, count in ip_failures:
            alerts.append({
                "type": "VELOCITY_EXCEEDED",
                "risk_level": "HIGH",
                "reason": f"IP {ip} failed {count} holds in 60m",
                "ip_address": ip,
                "timestamp": datetime.utcnow().isoformat()
            })

        # 2. Detect large bookings from unverified new emails
        # (Assuming 'new_user' logic from FraudService)

        return alerts

fraud_radar = FraudRadarService()
