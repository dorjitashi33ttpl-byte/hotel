import React, { useState } from 'react';
import { User, Calendar, CreditCard, Save } from 'lucide-react';

export const WalkInBookingForm = () => {
  return (
    <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-3xl space-y-12">
      <div className="flex justify-between items-center border-b border-stone-50 pb-8">
         <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-2 block">Operations</span>
            <h2 className="text-3xl font-serif">Walk-in Reservation</h2>
         </div>
         <button className="bg-stone-900 text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500 flex items-center gap-3">
            <Save className="w-4 h-4" /> Finalize Booking
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
         <div className="space-y-10">
            <h4 className="text-xs font-black uppercase tracking-widest text-stone-300">Guest Particulars</h4>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-stone-400">Full Name</label>
                  <input className="w-full border-b border-stone-100 py-3 text-lg outline-none focus:border-gold transition-colors font-serif italic" placeholder="Enter guest name..." />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-stone-400">Identification / CID</label>
                  <input className="w-full border-b border-stone-100 py-3 outline-none focus:border-gold transition-colors" placeholder="e.g. 1141000..." />
               </div>
            </div>
         </div>

         <div className="space-y-10">
            <h4 className="text-xs font-black uppercase tracking-widest text-stone-300">Stay Configuration</h4>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-stone-400">Check-In</label>
                  <input type="date" className="w-full border-b border-stone-100 py-3 outline-none focus:border-gold transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-stone-400">Check-Out</label>
                  <input type="date" className="w-full border-b border-stone-100 py-3 outline-none focus:border-gold transition-colors" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[9px] font-bold uppercase text-stone-400">Payment Orchestration</label>
               <select className="w-full border-b border-stone-100 py-3 outline-none focus:border-gold transition-colors bg-white">
                  <option>Pay on Arrival (Cash)</option>
                  <option>Terminal Payment (Card)</option>
                  <option>Generate Online Payment Link</option>
               </select>
            </div>
         </div>
      </div>
    </div>
  );
};
