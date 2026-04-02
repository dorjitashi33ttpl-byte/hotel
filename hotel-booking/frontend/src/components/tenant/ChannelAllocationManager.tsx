import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { api } from '../../services/api';
import { Globe, ShieldCheck, Zap, Save } from 'lucide-react';

export const ChannelAllocationManager = ({ hotelId }: { hotelId: string }) => {
  const [allocations, setAllocations] = useState([
    { channel: 'DIRECT', pct: 60, active: true },
    { channel: 'PARTNER_API', pct: 30, active: true },
    { channel: 'WALK_IN', pct: 10, active: true },
  ]);

  return (
    <div className="bg-white border border-stone-100 p-12 shadow-sm rounded-2xl">
       <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl font-serif text-stone-900">Inventory Distribution</h2>
            <p className="text-stone-400 text-xs uppercase tracking-widest mt-3 font-black">Multi-Channel Allocation Rules</p>
          </div>
          <button className="bg-stone-900 text-white px-8 py-3 text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-gold transition-all">
             <Save className="w-4 h-4" /> Persist Strategy
          </button>
       </div>

       <div className="space-y-12">
          {allocations.map((alloc, idx) => (
            <div key={alloc.channel} className="flex items-center gap-12 group">
               <div className="w-48 flex items-center gap-4">
                  {alloc.channel === 'DIRECT' ? <ShieldCheck className="text-gold w-5 h-5" /> :
                   alloc.channel === 'PARTNER_API' ? <Globe className="text-stone-300 w-5 h-5" /> :
                   <Zap className="text-stone-300 w-5 h-5" />}
                  <span className="text-sm font-bold text-stone-900 tracking-tight">{alloc.channel.replace('_', ' ')}</span>
               </div>

               <div className="flex-1 flex items-center gap-8">
                  <div className="flex-1 h-2 bg-stone-50 rounded-full overflow-hidden relative">
                     <div
                        className={`absolute inset-y-0 left-0 bg-gold transition-all duration-1000 ${idx === 0 ? 'opacity-100' : 'opacity-40'}`}
                        style={{ width: `${alloc.pct}%` }}
                     />
                  </div>
                  <div className="w-24 flex items-center gap-2">
                     <input
                        type="number"
                        className="w-12 bg-transparent border-b border-stone-200 text-center font-serif text-lg"
                        value={alloc.pct}
                        onChange={(e) => {
                            const newAlloc = [...allocations];
                            newAlloc[idx].pct = parseInt(e.target.value) || 0;
                            setAllocations(newAlloc);
                        }}
                     />
                     <span className="text-stone-400 text-sm">%</span>
                  </div>
               </div>

               <div className="w-32 text-right">
                  <button className={`text-[10px] font-black uppercase tracking-widest ${alloc.active ? 'text-green-500' : 'text-stone-300'}`}>
                     {alloc.active ? 'Active' : 'Paused'}
                  </button>
               </div>
            </div>
          ))}
       </div>

       <div className="mt-20 p-8 bg-stone-900 text-white rounded-xl">
          <div className="flex justify-between items-center">
             <p className="text-xs uppercase tracking-widest font-black text-stone-400">Total Distribution</p>
             <p className={`text-2xl font-serif ${allocations.reduce((a, b) => a + b.pct, 0) === 100 ? 'text-gold' : 'text-red-400'}`}>
                {allocations.reduce((a, b) => a + b.pct, 0)}%
             </p>
          </div>
       </div>
    </div>
  );
};
