import React from 'react';

export const InventoryConfig = ({ roomTypes }: any) => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-stone-50 border border-stone-100 rounded-xl">
         <h4 className="text-[10px] font-black uppercase text-stone-400 mb-4">Channel Allocation Rules</h4>
         <div className="space-y-4">
            {[
              { channel: 'Direct Sanctuary', alloc: '60%' },
              { channel: 'Partner Ecosystem', alloc: '30%' },
              { channel: 'Global OTAs', alloc: '10%' }
            ].map(row => (
              <div key={row.channel} className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0">
                 <span className="text-sm text-stone-900">{row.channel}</span>
                 <span className="text-xs font-serif text-gold">{row.alloc}</span>
              </div>
            ))}
         </div>
         <button className="mt-8 w-full text-[9px] font-black uppercase text-stone-900 border border-stone-200 py-3 hover:bg-white transition-all">Adjust Mix</button>
      </div>
    </div>
  );
};
