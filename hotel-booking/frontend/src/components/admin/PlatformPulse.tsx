import React from 'react';

export const PlatformPulse = () => {
  return (
    <div className="bg-stone-900 p-12 text-white min-h-[400px] flex flex-col justify-between rounded-3xl overflow-hidden relative">
      <div>
         <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-2 block">Live Ecosystem Pulse</span>
         <h2 className="text-3xl font-serif">Global Revenue Stream</h2>
      </div>

      <div className="flex items-end gap-2 h-48">
         {[40, 70, 45, 90, 65, 80, 50, 100, 85, 95, 60, 75].map((h, i) => (
           <div key={i} className="flex-1 bg-stone-800 relative group cursor-pointer" style={{ height: `${h}%` }}>
              <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-stone-900 text-[8px] font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 Nu. {h * 10}k
              </div>
           </div>
         ))}
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-stone-800">
         <div className="flex gap-8">
            <div>
               <p className="text-[9px] font-black uppercase text-stone-500">24h Volume</p>
               <p className="text-xl font-serif">Nu. 1.2M</p>
            </div>
            <div>
               <p className="text-[9px] font-black uppercase text-stone-500">Active Holds</p>
               <p className="text-xl font-serif">142</p>
            </div>
         </div>
         <button className="text-[9px] font-black uppercase tracking-widest text-gold border border-gold/30 px-6 py-2 hover:bg-gold hover:text-stone-900 transition-all">Full Analytics</button>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
    </div>
  );
};
