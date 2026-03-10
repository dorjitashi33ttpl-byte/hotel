import React from 'react';
import { History, Plus, AlertCircle } from 'lucide-react';

export const TaxRuleEditor: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="bg-stone-50 p-12 border border-stone-100 flex justify-between items-center">
         <div className="space-y-2">
            <h3 className="text-2xl font-serif">Active Fiscal Landscape</h3>
            <p className="text-stone-400 text-sm">Reviewing current taxes for Bhutan — Thimphu region.</p>
         </div>
         <button className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-colors">
            <Plus className="w-3 h-3" /> New Rule
         </button>
      </div>

      <div className="space-y-6">
         <div className="flex items-center gap-4 text-stone-400 mb-8">
            <History className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Version History</span>
         </div>

         {[
           { date: 'June 2026', rule: 'SDF Increase', status: 'Active', creator: 'Platform Admin' },
           { date: 'January 2025', rule: 'Tourism Levy Update', status: 'Archived', creator: 'System' }
         ].map((v, i) => (
           <div key={i} className={`p-8 border ${i === 0 ? 'border-gold bg-white shadow-xl' : 'border-stone-100 opacity-60'} flex justify-between items-center transition-all`}>
              <div className="flex items-center gap-12">
                 <span className="font-serif text-xl">{v.date}</span>
                 <div className="space-y-1">
                    <p className="text-sm font-bold text-stone-900">{v.rule}</p>
                    <p className="text-[9px] text-stone-400 uppercase tracking-widest">Enacted by {v.creator}</p>
                 </div>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border ${i === 0 ? 'border-gold text-gold' : 'border-stone-200 text-stone-400'}`}>
                 {v.status}
              </span>
           </div>
         ))}
      </div>

      <div className="p-12 bg-amber-50 border border-amber-100 flex gap-6 items-start">
         <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
         <div className="space-y-4">
            <h4 className="text-lg font-serif text-amber-900">Fiscal Consistency Warning</h4>
            <p className="text-amber-700 text-sm leading-relaxed max-w-2xl">
               Modifying tax rules will affect all pending booking holds immediately. We recommend scheduling major changes during low-occupancy windows to ensure financial transparency.
            </p>
         </div>
      </div>
    </div>
  );
};
