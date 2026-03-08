import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await api.get('/public/users/me/bookings');
      setBookings(data);
    };
    fetchHistory();
  }, []);

  const handleRebook = (booking) => {
    // Navigate to hotel detail with pre-selected dates/room type
    navigate(`/hotels/${booking.hotel_id}?room_type=${booking.room_type_id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Booking History</h1>
      <div className="space-y-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{booking.hotel_name}</h3>
              <p className="text-sm text-gray-500">{booking.check_in} to {booking.check_out}</p>
              <p className="font-semibold text-blue-600">${booking.total_price}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleRebook(booking)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Book Again
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                View Receipt
              </button>
            </div>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-center py-12 text-gray-500">No bookings found yet.</p>}
      </div>
    </div>
  );
};

export default BookingHistory;
