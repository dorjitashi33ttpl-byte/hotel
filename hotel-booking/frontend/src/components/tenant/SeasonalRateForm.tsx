import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const SeasonalRateForm = () => {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
         <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900">Yield Configuration</h4>
         <button className="text-[10px] font-black uppercase text-gold hover:underline flex items-center gap-2">
            <Plus className="w-3 h-3" /> Add Seasonal Rate
         </button>
      </div>

      <div className="space-y-4">
         {[
           { name: 'Festival Season (Tshechu)', range: 'Sep 10 - Oct 15', rate: 'Nu. 24,000' },
           { name: 'Winter Retreat', range: 'Dec 01 - Feb 28', rate: 'Nu. 12,000' }
         ].map(rate => (
           <div key={rate.name} className="flex justify-between items-center p-6 bg-white border border-stone-100 group hover:border-stone-200 transition-all">
              <div>
                 <p className="text-sm font-serif">{rate.name}</p>
                 <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">{rate.range}</p>
              </div>
              <div className="flex items-center gap-8">
                 <p className="text-lg font-serif text-gold">{rate.rate}</p>
                 <button className="text-stone-200 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
