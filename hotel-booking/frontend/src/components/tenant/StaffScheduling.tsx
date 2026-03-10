import React from 'react';
import { Clock, User } from 'lucide-react';

export const StaffScheduling: React.FC = () => {
  const shifts = ["Morning (06:00 - 14:00)", "Evening (14:00 - 22:00)", "Night (22:00 - 06:00)"];
  const staff = ["Tashi Dorji", "Sonam Peldon", "Karma Wangmo"];

  return (
    <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-3xl space-y-12">
      <h3 className="text-2xl font-serif">Staff Rotations</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {shifts.map(shift => (
           <div key={shift} className="space-y-6">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gold">
                 <Clock className="w-3 h-3" /> {shift.split(' ')[0]}
              </div>
              <div className="p-6 bg-stone-50 border border-stone-100 rounded-2xl min-h-[120px] space-y-4">
                 <div className="flex items-center gap-3 p-3 bg-white border border-stone-50 rounded-xl shadow-sm group hover:border-gold transition-colors cursor-grab active:cursor-grabbing">
                    <User className="w-4 h-4 text-stone-300 group-hover:text-gold transition-colors" />
                    <span className="text-[11px] font-bold text-stone-900">{staff[Math.floor(Math.random() * staff.length)]}</span>
                 </div>
                 <div className="border-2 border-dashed border-stone-200 rounded-xl py-3 text-center">
                    <span className="text-[8px] font-black text-stone-300 uppercase tracking-widest">+ Assign Staff</span>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
