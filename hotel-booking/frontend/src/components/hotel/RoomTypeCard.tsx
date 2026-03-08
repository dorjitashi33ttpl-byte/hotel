import React from 'react';

const RoomTypeCard = ({ roomType }) => {
  return (
    <div className="bg-white group cursor-pointer border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-700">
      <div className="relative h-64 overflow-hidden">
        <img
          src={roomType.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          alt={roomType.name}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-luxury-gold">
          {roomType.size || '35m²'}
        </div>
      </div>
      <div className="p-8 text-center">
        <h3 className="text-2xl font-serif text-luxury-charcoal mb-2 group-hover:text-luxury-gold transition-colors">
          {roomType.name}
        </h3>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-6 font-medium">
          {roomType.occupancy || '2 Adults'} • {roomType.view || 'Mountain View'}
        </p>
        <div className="flex flex-col items-center">
          <span className="text-xl font-serif text-luxury-charcoal mb-6">
            ${roomType.base_price} <span className="text-xs font-sans text-gray-400">/ night</span>
          </span>
          <button className="w-full py-4 border border-luxury-charcoal text-luxury-charcoal uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-luxury-charcoal hover:text-white transition-all duration-500">
            Book This Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeCard;
