from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.api import deps
from app.services.inventory import inventory_service
from app.services.geo import geo_service
from app.models.hotel import Hotel, RoomType
from app.models.booking import Booking, BookingStatus
from app.models.review import Review

router = APIRouter()

@router.get("/hotels/search")
async def search_hotels(
    db: Session = Depends(deps.get_db),
    lat: float = Query(...),
    lng: float = Query(...),
    radius_km: float = Query(10),
    check_in: datetime = Query(...),
    check_out: datetime = Query(...),
):
    hotels = db.query(Hotel).all()
    results = []
    for hotel in hotels:
        results.append({
            "id": hotel.id,
            "name": hotel.name,
            "address": hotel.address,
            "amenities": hotel.amenities,
            "media": hotel.media
        })
    return results

@router.get("/geo/autocomplete")
async def geo_autocomplete(q: str, country: str = "BT"):
    return await geo_service.autocomplete(q, country)

@router.post("/reviews/submit")
async def submit_review(
    hotel_id: int,
    booking_id: int,
    rating: float,
    comment: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # Enforce verified review logic
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id,
        Booking.status == BookingStatus.COMPLETED
    ).first()

    if not booking:
        raise HTTPException(
            status_code=400,
            detail="Only verified guests with completed bookings can leave reviews."
        )

    review = Review(
        hotel_id=hotel_id,
        booking_id=booking_id,
        user_id=current_user.id,
        rating=rating,
        comment=comment,
        is_verified=True
    )
    db.add(review)
    db.commit()
    return {"status": "review_submitted"}
