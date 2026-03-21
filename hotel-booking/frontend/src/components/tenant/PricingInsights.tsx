import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

export const PricingInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-6">
         <div className="flex items-center gap-3 text-[10px] font-black uppercase text-stone-400">
            <TrendingUp className="w-4 h-4 text-gold" />
            ADR
         </div>
         <p className="text-4xl font-serif">Nu. 14,500</p>
         <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">+12% vs last month</p>
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-3 text-[10px] font-black uppercase text-stone-400">
            <Users className="w-4 h-4 text-gold" />
            Occupancy
         </div>
         <p className="text-4xl font-serif">84.2%</p>
         <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-stone-900 h-full w-[84%]" />
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-3 text-[10px] font-black uppercase text-stone-400">
            <DollarSign className="w-4 h-4 text-gold" />
            RevPAR
         </div>
         <p className="text-4xl font-serif">Nu. 12,209</p>
         <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest italic">Forecasted: Nu. 13k</p>
      </div>
    </div>
  );
};
