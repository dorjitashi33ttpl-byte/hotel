import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import HotelCard from '../components/hotel/HotelCard';

const Wishlist = () => {
  const [savedHotels, setSavedHotels] = useState([]);

  useEffect(() => {
    // Assuming user_id is handled by auth store
    const fetchSaved = async () => {
      const data = await api.get('/public/users/me/saved-hotels?user_id=current_user');
      setSavedHotels(data);
    };
    fetchSaved();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Saved Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savedHotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} isSavedInitially={true} />
        ))}
        {savedHotels.length === 0 && <p>You haven't saved any hotels yet.</p>}
      </div>
    </div>
  );
};

export default Wishlist;
