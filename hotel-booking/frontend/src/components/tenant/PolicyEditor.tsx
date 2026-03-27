import React, { useState } from 'react';
import { Shield, Clock, Coffee, Wifi, Ban } from 'lucide-react';

export const PolicyEditor = () => {
  const [policies, setPolicies] = useState({
    checkIn: '14:00',
    checkOut: '12:00',
    smoking: false,
    pets: false,
    cancellation: '7-day full refund policy for standard bookings.'
  });

  return (
    <div className="bg-white border border-stone-100 p-12 shadow-sm">
       <div className="mb-12">
          <h3 className="text-2xl font-serif text-stone-900">Property Ethics & Rules</h3>
          <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-2 font-black">Guest Guidelines</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
             <div className="flex items-center gap-6">
                <Clock className="w-5 h-5 text-stone-300" />
                <div className="flex-1 grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-tighter">Check-In</label>
                      <input className="w-full bg-stone-50 border-none p-2 text-sm font-bold" value={policies.checkIn} onChange={e => setPolicies({...policies, checkIn: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-black uppercase text-stone-400 tracking-tighter">Check-Out</label>
                      <input className="w-full bg-stone-50 border-none p-2 text-sm font-bold" value={policies.checkOut} onChange={e => setPolicies({...policies, checkOut: e.target.value})} />
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-between p-6 bg-stone-50 rounded group">
                <div className="flex items-center gap-6">
                   <Shield className="w-5 h-5 text-stone-300" />
                   <span className="text-sm font-medium text-stone-700">Pets Allowed</span>
                </div>
                <button
                  onClick={() => setPolicies({...policies, pets: !policies.pets})}
                  className={`w-12 h-6 rounded-full transition-all ${policies.pets ? 'bg-gold' : 'bg-stone-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all mx-1 ${policies.pets ? 'ml-7' : ''}`} />
                </button>
             </div>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Cancellation Disclaimer</label>
             <textarea
               className="w-full h-40 bg-stone-50 border-none p-6 text-sm italic text-stone-600 leading-relaxed outline-none focus:ring-1 focus:ring-gold"
               value={policies.cancellation}
               onChange={e => setPolicies({...policies, cancellation: e.target.value})}
             />
          </div>
       </div>

       <div className="mt-16 flex justify-end">
          <button className="bg-stone-900 text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500">
             Enforce Policies
          </button>
       </div>
    </div>
  );
};
