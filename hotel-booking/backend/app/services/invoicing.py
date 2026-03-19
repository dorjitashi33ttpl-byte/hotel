from typing import Dict, Any
from app.models.hotel import Booking, Hotel
from datetime import datetime

class InvoicingService:
    @staticmethod
    def generate_booking_invoice(booking: Booking, hotel: Hotel) -> Dict[str, Any]:
        """
        Compiles booking data into a structured invoice object.
        In production, this could generate a PDF using ReportLab or WeasyPrint.
        """
        # Mock calculation logic
        tax_rate = 0.1 # 10% BST stub
        subtotal = booking.total_price / (1 + tax_rate)
        tax_amount = booking.total_price - subtotal

        return {
            "invoice_number": f"INV-{booking.id}",
            "issue_date": datetime.now().isoformat(),
            "hotel": {
                "name": hotel.name,
                "address": hotel.city,
                "contact": "reservations@druk.bt"
            },
            "guest": {
                "name": booking.guest_name,
                "id_ref": booking.user_id
            },
            "stay": {
                "check_in": booking.check_in.isoformat(),
                "check_out": booking.check_out.isoformat(),
                "nights": (booking.check_out - booking.check_in).days
            },
            "financials": {
                "subtotal": round(subtotal, 2),
                "tax": round(tax_amount, 2),
                "total": booking.total_price,
                "currency": "BTN"
            }
        }

invoicing_service = InvoicingService()
