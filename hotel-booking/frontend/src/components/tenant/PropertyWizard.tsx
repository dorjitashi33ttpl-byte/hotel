import React, { useState } from 'react';
import { Building2, Map, Shield, CheckCircle } from 'lucide-react';

export const PropertyWizard = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto py-24 px-8">
      <div className="flex justify-between mb-24">
         {[1, 2, 3, 4].map(s => (
           <div key={s} className="flex flex-col items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-700 ${step >= s ? 'bg-stone-900 text-white shadow-xl' : 'bg-stone-100 text-stone-300'}`}>
                 {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">Step 0{s}</span>
           </div>
         ))}
      </div>

      <div className="bg-white p-16 shadow-2xl border border-stone-100 min-h-[500px] flex flex-col">
         {step === 1 && (
           <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl font-serif italic">The Beginning</h2>
              <p className="text-stone-400 text-lg font-light leading-relaxed">Tell us about your sanctuary. Provide the primary name and description that will be showcased to our global guest community.</p>
              <div className="space-y-8">
                 <input className="w-full border-b border-stone-100 py-4 text-2xl font-serif focus:border-gold outline-none" placeholder="Sanctuary Name" />
                 <textarea className="w-full border border-stone-100 p-6 font-light focus:border-gold outline-none" rows={4} placeholder="Describe the experience..." />
              </div>
           </div>
         )}

         {/* ... other steps ... */}

         <div className="mt-auto pt-16 flex justify-between">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:text-stone-900 transition-colors disabled:opacity-0"
            >
               Previous Chapter
            </button>
            <button
              onClick={() => step < 4 ? setStep(step + 1) : null}
              className="bg-stone-900 text-white px-12 py-5 font-serif text-sm uppercase tracking-widest hover:bg-gold transition-all duration-500"
            >
               {step === 4 ? 'Complete Unveiling' : 'Continue Journey'}
            </button>
         </div>
      </div>
    </div>
  );
};
