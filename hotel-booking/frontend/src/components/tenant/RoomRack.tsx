import React from 'react';

const rooms = [
  { id: '101', type: 'Deluxe', status: 'OCCUPIED', guest: 'Tashi Dorji' },
  { id: '102', type: 'Deluxe', status: 'READY', guest: null },
  { id: '201', type: 'Heritage', status: 'DIRTY', guest: null },
  { id: '202', type: 'Heritage', status: 'MAINTENANCE', guest: null },
];

export const RoomRack = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-serif mb-12">Room Operations Rack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms.map(room => (
          <div key={room.id} className="bg-white border border-stone-100 p-8 shadow-sm hover:shadow-md transition-all">
             <div className="flex justify-between items-start mb-6">
                <span className="text-2xl font-serif">#{room.id}</span>
                <span className={`text-[9px] font-black px-2 py-1 tracking-tighter ${
                  room.status === 'READY' ? 'bg-green-100 text-green-700' :
                  room.status === 'OCCUPIED' ? 'bg-stone-900 text-white' :
                  'bg-stone-100 text-stone-500'
                }`}>
                  {room.status}
                </span>
             </div>
             <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">{room.type}</p>
             <p className="text-sm font-medium text-stone-900">{room.guest || 'Vacant'}</p>
             <div className="mt-8 pt-6 border-t border-stone-50 flex gap-4">
                <button className="text-[9px] font-black uppercase text-[var(--luxury-gold)]">Check-In</button>
                <button className="text-[9px] font-black uppercase text-stone-400">Details</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
