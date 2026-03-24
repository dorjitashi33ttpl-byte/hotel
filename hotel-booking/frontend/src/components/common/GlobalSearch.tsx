import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

export const GlobalSearch = () => {
  return (
    <div className="bg-white/80 backdrop-blur-3xl border border-stone-100 shadow-2xl p-4 rounded-3xl flex flex-col lg:flex-row gap-4 max-w-5xl mx-auto -mt-16 relative z-50">
       <div className="flex-1 flex items-center gap-4 px-6 border-r border-stone-50">
          <MapPin className="w-5 h-5 text-gold" />
          <div className="flex-1">
             <p className="text-[9px] font-black uppercase text-stone-400">Destination</p>
             <input className="w-full bg-transparent outline-none text-sm font-serif italic" placeholder="Where in Bhutan?" />
          </div>
       </div>
       <div className="flex-1 flex items-center gap-4 px-6 border-r border-stone-50">
          <Calendar className="w-5 h-5 text-gold" />
          <div className="flex-1">
             <p className="text-[9px] font-black uppercase text-stone-400">Stay Window</p>
             <input className="w-full bg-transparent outline-none text-sm font-serif italic" placeholder="Check-in — Check-out" />
          </div>
       </div>
       <button className="bg-stone-900 text-white px-12 py-5 font-serif text-sm uppercase tracking-widest hover:bg-gold transition-all duration-500 rounded-2xl">
          Seek Sanctuary
       </button>
    </div>
  );
};
