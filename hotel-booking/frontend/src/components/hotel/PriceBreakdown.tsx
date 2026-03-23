import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';

export const PriceBreakdown = ({ bookingData, reputation }: any) => {
  return (
    <div className="bg-stone-50 p-10 space-y-10">
      <div className="flex justify-between items-center border-b border-stone-200 pb-8">
         <div>
            <h4 className="text-xl font-serif">Verified Sanctuary</h4>
            <div className="flex items-center gap-2 mt-2">
               <div className="flex text-gold">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
               </div>
               <span className="text-[10px] font-black uppercase text-stone-400">{reputation || '4.8'} Reputation</span>
            </div>
         </div>
         <div className="bg-white p-3 rounded-full shadow-sm">
            <ShieldCheck className="w-6 h-6 text-green-600" />
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex justify-between text-sm">
            <span className="text-stone-400 font-light">Subtotal (4 Nights)</span>
            <span className="font-medium">Nu. 56,000.00</span>
         </div>
         <div className="flex justify-between text-sm">
            <span className="text-stone-400 font-light">Bhutan Sales Tax (10%)</span>
            <span className="font-medium">Nu. 5,600.00</span>
         </div>
         <div className="flex justify-between text-sm">
            <span className="text-stone-400 font-light">Sustainable Development Fee</span>
            <span className="font-medium text-gold">INCLUDED</span>
         </div>
         <div className="pt-6 border-t border-stone-200 flex justify-between items-end">
            <span className="text-xs font-bold uppercase tracking-widest">Total Stay</span>
            <span className="text-2xl font-serif">Nu. 61,600.00</span>
         </div>
      </div>
    </div>
  );
};
