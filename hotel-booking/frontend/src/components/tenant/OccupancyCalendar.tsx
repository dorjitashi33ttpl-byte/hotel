import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const OccupancyCalendar = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const rooms = [
    { no: '101', type: 'Deluxe', bookings: [{ start: 2, end: 5, guest: 'T. Dorji' }, { start: 12, end: 18, guest: 'K. Wangmo' }] },
    { no: '102', type: 'Deluxe', bookings: [{ start: 1, end: 10, guest: 'A. Smith' }] },
    { no: '103', type: 'Heritage', bookings: [{ start: 20, end: 25, guest: 'P. Namgay' }] },
    { no: '104', type: 'Heritage', bookings: [] },
  ];

  return (
    <div className="bg-white border border-stone-100 shadow-sm rounded-2xl overflow-hidden">
       <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/30">
          <div>
            <h3 className="text-xl font-serif text-stone-900">Occupancy Horizon</h3>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-black mt-1">June 2026</p>
          </div>
          <div className="flex gap-4">
             <button className="p-2 border border-stone-200 hover:bg-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
             <button className="p-2 border border-stone-200 hover:bg-white transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
       </div>

       <div className="overflow-x-auto">
          <table className="w-full border-collapse">
             <thead>
                <tr>
                   <th className="p-4 border-r border-b border-stone-100 bg-white sticky left-0 z-10 w-32 text-[9px] font-black uppercase text-stone-300">Room</th>
                   {days.map(d => (
                     <th key={d} className="p-4 border-b border-r border-stone-50 min-w-[40px] text-[10px] font-bold text-stone-400">{d}</th>
                   ))}
                </tr>
             </thead>
             <tbody>
                {rooms.map(room => (
                  <tr key={room.no}>
                     <td className="p-4 border-r border-b border-stone-100 bg-white sticky left-0 z-10">
                        <p className="text-sm font-bold text-stone-900">#{room.no}</p>
                        <p className="text-[8px] text-stone-400 uppercase tracking-tighter">{room.type}</p>
                     </td>
                     {days.map(d => {
                       const booking = room.bookings.find(b => d >= b.start && d <= b.end);
                       const isStart = booking?.start === d;
                       return (
                         <td key={d} className="p-0 border-b border-r border-stone-50 h-16 relative">
                            {booking && (
                              <div className={`absolute inset-y-2 inset-x-0 ${isStart ? 'left-2 rounded-l-md border-l-4 border-gold' : ''} ${booking.end === d ? 'right-2 rounded-r-md' : ''} bg-stone-900 flex items-center px-2 z-0 shadow-lg overflow-hidden`}>
                                 {isStart && <span className="text-[8px] text-white font-black uppercase tracking-tighter whitespace-nowrap">{booking.guest}</span>}
                              </div>
                            )}
                         </td>
                       );
                     })}
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};
