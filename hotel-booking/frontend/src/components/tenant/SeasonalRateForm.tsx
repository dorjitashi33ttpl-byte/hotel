import React, { useState } from 'react';
import { Calendar, Tag, Plus, Trash2 } from 'lucide-react';

export const SeasonalRateForm = () => {
  const [rates, setRates] = useState([
    { id: 1, name: 'Winter Sanctuary', start: '2026-11-01', end: '2027-02-28', factor: 1.25 },
    { id: 2, name: 'Festival Season', start: '2026-10-01', end: '2026-10-15', factor: 1.50 },
  ]);

  return (
    <div className="bg-white border border-stone-100 p-12 shadow-sm">
       <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-2xl font-serif text-stone-900">Dynamic Rate Strategy</h3>
            <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-2 font-black">Seasonal Yield Overrides</p>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gold hover:text-stone-900 transition-colors">
             <Plus className="w-4 h-4" /> Add Period
          </button>
       </div>

       <div className="space-y-4">
          {rates.map(rate => (
            <div key={rate.id} className="grid grid-cols-12 items-center gap-8 p-6 bg-stone-50 border border-stone-100 group">
               <div className="col-span-3">
                  <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Campaign Name</p>
                  <input className="bg-transparent border-none p-0 text-sm font-bold text-stone-900 focus:ring-0" defaultValue={rate.name} />
               </div>
               <div className="col-span-3 flex items-center gap-4">
                  <Calendar className="w-4 h-4 text-stone-300" />
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Duration</p>
                    <p className="text-xs text-stone-600">{rate.start} — {rate.end}</p>
                  </div>
               </div>
               <div className="col-span-3">
                  <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Price Multiplier</p>
                  <div className="flex items-center gap-2">
                     <Tag className="w-4 h-4 text-gold" />
                     <span className="text-sm font-serif">{rate.factor}x</span>
                  </div>
               </div>
               <div className="col-span-3 text-right">
                  <button className="text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
       </div>

       <div className="mt-12 p-8 bg-gold/5 border border-gold/10 rounded">
          <p className="text-[11px] text-gold-700 leading-relaxed italic">
            Rates are automatically adjusted based on these rules. If multiple rules overlap, the system
            prioritizes the one with the higher multiplier to ensure maximum yield.
          </p>
       </div>
    </div>
  );
};
