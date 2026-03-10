import React from 'react';

export const AvailabilityCalendar = () => {
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const rooms = ["101 - Deluxe", "102 - Deluxe", "201 - Heritage", "202 - Heritage"];

  return (
    <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-3xl overflow-hidden">
      <div className="flex justify-between items-center mb-10">
         <h3 className="text-2xl font-serif">Sanctuary Occupancy</h3>
         <div className="flex gap-4">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-stone-400"><div className="w-2 h-2 bg-stone-900 rounded-full" /> Occupied</span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-stone-400"><div className="w-2 h-2 bg-stone-100 rounded-full" /> Available</span>
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b border-stone-100 text-left text-[10px] font-black uppercase text-stone-300">Room</th>
              {days.map(d => (
                <th key={d} className="p-4 border-b border-stone-100 text-[10px] font-black uppercase text-stone-300">Jun {d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room} className="hover:bg-stone-50/50 transition-colors">
                <td className="p-4 border-b border-stone-50 text-[11px] font-bold text-stone-900 whitespace-nowrap">{room}</td>
                {days.map(d => {
                  const isOccupied = Math.random() > 0.7;
                  return (
                    <td key={d} className="p-2 border-b border-stone-50">
                       <div className={`h-10 rounded-lg transition-all ${isOccupied ? 'bg-stone-900' : 'bg-stone-50 group-hover:bg-stone-100'}`} />
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
