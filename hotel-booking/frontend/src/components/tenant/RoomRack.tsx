import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { StatusBadge } from '../admin/framework/StatusBadge';
import { BookingDetailModal } from './BookingDetailModal';

export const RoomRack = () => {
  const { data: rooms, isLoading } = useQuery('room-rack', () => api.get('/staff/room-rack').then(r => r.data));
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  if (isLoading) return <div className="p-20 text-center animate-pulse text-stone-300 uppercase tracking-widest text-xs">Synchronizing Room Rack...</div>;

  return (
    <div className="p-12">
      <div className="mb-12">
        <h2 className="text-4xl font-serif text-stone-900">Operations Command</h2>
        <p className="text-stone-400 text-xs uppercase tracking-[0.3em] mt-3 font-black">Live Inventory & Housekeeping</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms?.map((room: any) => (
          <div key={room.id} className="bg-white border border-stone-100 p-10 shadow-sm hover:shadow-xl transition-all duration-700 group">
             <div className="flex justify-between items-start mb-10">
                <span className="text-3xl font-serif text-stone-900 group-hover:text-gold transition-colors">#{room.room_number}</span>
                <StatusBadge status={room.housekeeping_status} />
             </div>

             <div className="space-y-2 mb-10">
                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{room.room_type_name || 'Standard Unit'}</p>
                <p className="text-sm font-medium text-stone-600">{room.current_guest || 'Vacant'}</p>
             </div>

             <div className="pt-8 border-t border-stone-50 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {room.current_booking_id && (
                  <button
                    onClick={() => setSelectedBooking({ id: room.current_booking_id, status: 'CHECKED_IN' })}
                    className="text-[9px] font-black uppercase text-gold hover:text-stone-900 transition-colors"
                  >
                    Guest Info
                  </button>
                )}
                <button className="text-[9px] font-black uppercase text-stone-300 hover:text-stone-900 transition-colors">Actions</button>
             </div>
          </div>
        ))}
      </div>

      <BookingDetailModal
        isOpen={!!selectedBooking}
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};
