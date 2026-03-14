import pytest
from app.worker.tasks import notify_affected_bookings_on_shift_change

def test_shift_change_notification_stub():
    # Verify the task exists and can be called (locally)
    notify_affected_bookings_on_shift_change("hotel-1", "shift-old", "shift-new")
    assert True
