import React from 'react';
import { Grid, User, LogIn } from 'lucide-react';

export const RoomRack: React.FC = () => {
  const grid = Array.from({ length: 5 }, (_, i) => 100 + i + 1);

  return (
    <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-3xl space-y-12">
      <div className="flex justify-between items-center">
         <h3 className="text-2xl font-serif">The Room Rack</h3>
         <div className="flex gap-4">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-green-500"><div className="w-2 h-2 bg-green-500 rounded-full" /> Ready</span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-red-500"><div className="w-2 h-2 bg-red-500 rounded-full" /> Occupied</span>
         </div>
      </div>

      <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
         {grid.map(room => {
           const isOccupied = Math.random() > 0.6;
           return (
             <div key={room} className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border ${isOccupied ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-400 border-stone-100 hover:border-gold'}`}>
                <span className="text-sm font-serif">{room}</span>
                {isOccupied ? <User className="w-3 h-3" /> : <LogIn className="w-3 h-3 opacity-20" />}
             </div>
           );
         })}
      </div>
    </div>
  );
};
