import React from 'react';
import { CreditCard, ArrowUpRight } from 'lucide-react';

export const PayoutManagement = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4 mb-2">
         <div className="w-10 h-10 bg-stone-50 flex items-center justify-center rounded-full">
            <CreditCard className="w-5 h-5 text-stone-400" />
         </div>
         <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900">Payouts & Revenue</h4>
      </div>

      <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
         <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Pending Balance</p>
         <p className="text-3xl font-serif text-stone-900 mb-6">Nu. 450,230.00</p>
         <div className="flex gap-4">
            <button className="bg-stone-900 text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all">Request Early Payout</button>
         </div>
      </div>

      <div className="space-y-4">
         <p className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Recent Settlements</p>
         {[1, 2].map(i => (
           <div key={i} className="flex justify-between items-center py-4 border-b border-stone-100 group cursor-pointer">
              <div>
                 <p className="text-sm font-medium text-stone-900">Payout #SET-00{i}</p>
                 <p className="text-[10px] text-stone-400 uppercase font-bold">Processed June {i * 2}, 2026</p>
              </div>
              <div className="text-right">
                 <p className="text-sm font-serif">Nu. 120,000</p>
                 <div className="flex items-center gap-1 justify-end text-[9px] font-black text-green-600 uppercase">
                    Success <ArrowUpRight className="w-3 h-3" />
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
