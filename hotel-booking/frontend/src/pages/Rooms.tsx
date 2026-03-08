import React from 'react';
import RoomTypeCard from '../components/hotel/RoomTypeCard';

const Rooms = () => {
  const roomTypes = [
    { id: '1', name: 'Deluxe Suite', base_price: 350, size: '45m²', occupancy: '2 Adults', view: 'Mountain View' },
    { id: '2', name: 'The Cloud Residence', base_price: 850, size: '90m²', occupancy: '4 Adults', view: 'Panoramic View' },
    { id: '3', name: 'Zen Garden Studio', base_price: 280, size: '35m²', occupancy: '2 Adults', view: 'Garden View' },
    { id: '4', name: 'Monarch Suite', base_price: 1500, size: '120m²', occupancy: '4 Adults', view: 'City View' },
  ];

  return (
    <div className="bg-luxury-stone min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-charcoal mb-8 tracking-tighter">Rooms & Suites</h1>
          <p className="text-gray-500 font-light text-lg leading-relaxed italic">
            "Designed for serenity and crafted for comfort. Explore our collection of sanctuaries in Thimphu."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {roomTypes.map(rt => (
            <RoomTypeCard key={rt.id} roomType={rt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
