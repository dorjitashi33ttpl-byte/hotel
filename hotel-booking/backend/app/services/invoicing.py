from typing import Dict, Any
from app.models.hotel import Booking, Hotel
from datetime import datetime
from app.services.tax import tax_service
from sqlalchemy.orm import Session

class InvoicingService:
    @staticmethod
    def generate_booking_invoice(db: Session, booking: Booking, hotel: Hotel) -> Dict[str, Any]:
        """
        Compiles booking and tax data into a structured invoice object.
        """
        # Calculate localized taxes
        tax_calc = tax_service.calculate_total_with_taxes(
            db,
            base_amount=booking.total_price,
            country_id=hotel.country,
            region_id=None # Add hotel region if available
        )

        return {
            "invoice_number": f"INV-{booking.id.split('-')[0].upper()}",
            "issue_date": datetime.utcnow().isoformat(),
            "hotel": {
                "name": hotel.name,
                "address": hotel.city,
                "contact": "reservations@druk.bt"
            },
            "guest": {
                "name": booking.guest_name or "Valued Guest",
                "id_ref": booking.user_id
            },
            "stay": {
                "check_in": booking.check_in.isoformat(),
                "check_out": booking.check_out.isoformat(),
                "nights": (booking.check_out - booking.check_in).days
            },
            "financials": {
                "subtotal": tax_calc["base_amount"],
                "taxes": tax_calc["taxes"],
                "total_tax": tax_calc["total_tax"],
                "grand_total": tax_calc["total_amount"],
                "currency": "BTN"
            },
            "status": booking.status,
            "payment_method": booking.payment_method or "N/A",
            "receipt_url": f"/public/invoices/{booking.id}/download"
        }

invoicing_service = InvoicingService()
