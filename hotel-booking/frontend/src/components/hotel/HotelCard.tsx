import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { api } from '../../services/api';

const HotelCard = ({ hotel, isSavedInitially = false }) => {
  const [isSaved, setIsSaved] = useState(isSavedInitially);

  const toggleSave = async (e) => {
    e.stopPropagation();
    try {
      await api.post(`/public/hotels/${hotel.id}/save?user_id=current_user`);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Failed to save hotel", error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      <button
        onClick={toggleSave}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
      >
        <Heart size={20} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-400"} />
      </button>
      <img src={hotel.media?.[0] || 'https://via.placeholder.com/400x250'} alt={hotel.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{hotel.name}</h3>
        <p className="text-gray-600 text-sm">{hotel.city}, {hotel.country}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold">${hotel.base_price}/night</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
