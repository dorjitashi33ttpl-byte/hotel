import qrcode
from io import BytesIO
from app.models.booking import Booking
from app.services.storage import storage_service

class CheckInService:
    @staticmethod
    async def generate_digital_key(booking: Booking) -> str:
        # Generate a secure check-in token
        token = f"KEY-{booking.id}-{booking.user_id}"

        # Create QR code for the digital key
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(token)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        buf = BytesIO()
        img.save(buf)
        buf.seek(0)

        # Store digital key image
        path = f"keys/booking-{booking.id}.png"
        url = await storage_service.upload_file(buf, path, "image/png")
        return url

checkin_service = CheckInService()
