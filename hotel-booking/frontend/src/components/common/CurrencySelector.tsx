import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export const CurrencySelector = () => {
  const [currency, setCurrency] = useState('BTN');
  const currencies = ['BTN', 'USD', 'INR', 'THB', 'EUR'];

  return (
    <div className="flex items-center gap-3">
       <Globe className="w-3 h-3 text-stone-400" />
       <select
         value={currency}
         onChange={(e) => setCurrency(e.target.value)}
         className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-stone-900 border-none outline-none cursor-pointer hover:text-gold transition-colors"
       >
         {currencies.map(c => (
           <option key={c} value={c}>{c}</option>
         ))}
       </select>
    </div>
  );
};
