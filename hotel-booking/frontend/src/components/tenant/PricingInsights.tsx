import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

export const PricingInsights: React.FC = () => {
  return (
    <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-3xl space-y-12">
      <div className="flex justify-between items-center">
         <h3 className="text-2xl font-serif">Revenue Intelligence</h3>
         <button className="text-stone-400 hover:text-stone-900 transition-colors"><Info className="w-5 h-5" /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: "RevPAR", value: "BTN 8,440", change: "+12.4%", trend: "up" },
           { label: "Occupancy", value: "84%", change: "+5.2%", trend: "up" },
           { label: "ADR", value: "BTN 10,200", change: "-1.2%", trend: "down" }
         ].map(stat => (
           <div key={stat.label} className="p-8 bg-stone-50 border border-stone-100 rounded-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 block mb-6">{stat.label}</span>
              <div className="flex items-baseline gap-4">
                 <span className="text-3xl font-serif tracking-tighter">{stat.value}</span>
                 <span className={`flex items-center gap-1 text-[9px] font-black ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                 </span>
              </div>
           </div>
         ))}
      </div>

      <div className="h-48 bg-stone-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-100 text-stone-300 font-serif text-xl italic">
         Demand Forecasting Visualization (WIP)
      </div>
    </div>
  );
};
