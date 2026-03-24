import React from 'react';
import { Clock, Shield } from 'lucide-react';

export const HoldActivityFeed = () => {
  const activities = [
    { id: 1, guest: 'Anon (Direct)', room: '101', time: '12:45 remaining', status: 'HOLD' },
    { id: 2, guest: 'Anon (Partner)', room: '204', time: '04:12 remaining', status: 'HOLD' },
  ];

  return (
    <div className="space-y-6">
      {activities.map(act => (
        <div key={act.id} className="flex gap-4 p-5 bg-stone-50 border border-stone-100 group hover:border-gold transition-all duration-500">
           <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-sm">
              <Clock className="w-4 h-4 text-gold group-hover:animate-pulse" />
           </div>
           <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                 <p className="text-xs font-bold text-stone-900">{act.guest}</p>
                 <span className="text-[8px] font-black uppercase text-stone-400 bg-white px-2 py-0.5 border border-stone-100">Room {act.room}</span>
              </div>
              <p className="text-[10px] text-stone-400 font-medium tracking-tighter uppercase">{act.time}</p>
           </div>
        </div>
      ))}
      <button className="w-full py-4 text-[9px] font-black uppercase tracking-widest text-stone-300 hover:text-stone-900 transition-colors">View All Hold History</button>
    </div>
  );
};
