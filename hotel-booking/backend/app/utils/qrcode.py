import qrcode
import io
import base64

def generate_booking_qr(booking_id: int) -> str:
    # In a real app, this might contain a signed token or check-in URL
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(f"BOOKING:{booking_id}")
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode()
