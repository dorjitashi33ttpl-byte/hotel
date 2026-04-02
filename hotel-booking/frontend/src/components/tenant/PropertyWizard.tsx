import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Settings, Camera, Check } from 'lucide-react';

export const PropertyWizard = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, label: 'Identity', icon: Home },
    { id: 2, label: 'Location', icon: MapPin },
    { id: 3, label: 'Media', icon: Camera },
    { id: 4, label: 'Protocols', icon: Settings },
  ];

  return (
    <div className="max-w-5xl mx-auto p-12">
       <div className="flex justify-between mb-20 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-stone-100 -translate-y-1/2 z-0" />
          {steps.map(s => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-4 bg-white px-4">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                 step >= s.id ? 'bg-stone-900 text-gold shadow-xl' : 'bg-stone-50 text-stone-300'
               }`}>
                  {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
               </div>
               <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s.id ? 'text-stone-900' : 'text-stone-300'}`}>{s.label}</span>
            </div>
          ))}
       </div>

       <div className="bg-white border border-stone-100 p-16 shadow-2xl rounded-2xl min-h-[500px]">
          <AnimatePresence mode="wait">
             {step === 1 && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="1" className="space-y-12">
                  <h2 className="text-4xl font-serif text-stone-900">Define Your Sanctuary</h2>
                  <div className="space-y-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Property Name</label>
                        <input className="wix-input w-full text-2xl font-serif" placeholder="e.g. Amankora Thimphu" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Brand Narrative</label>
                        <textarea className="wix-input w-full h-32 pt-4" placeholder="Describe the soul of your property..." />
                     </div>
                  </div>
               </motion.div>
             )}

             {step === 2 && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="2" className="space-y-12">
                  <h2 className="text-4xl font-serif text-stone-900">Geographic Context</h2>
                  <div className="aspect-video bg-stone-100 rounded-xl flex flex-col items-center justify-center gap-6 border-2 border-dashed border-stone-200 group hover:border-gold transition-all cursor-crosshair">
                     <MapPin className="w-10 h-10 text-stone-300 group-hover:text-gold transition-colors" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Click to Place Pin on Mapbox GL</p>
                  </div>
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Dzongkhag</label>
                        <select className="wix-input w-full"><option>Thimphu</option><option>Paro</option></select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Coordinates</label>
                        <input className="wix-input w-full font-mono text-xs" readOnly value="27.4712, 89.6339" />
                     </div>
                  </div>
               </motion.div>
             )}
          </AnimatePresence>

          <div className="mt-20 pt-12 border-t border-stone-50 flex justify-between">
             <button
               onClick={() => setStep(s => Math.max(1, s - 1))}
               className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
             >
                Previous Step
             </button>
             <button
               onClick={() => step < 4 ? setStep(s => s + 1) : null}
               className="bg-stone-900 text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all duration-700 rounded-lg"
             >
                {step === 4 ? 'Launch Sanctuary' : 'Next Sequence'}
             </button>
          </div>
       </div>
    </div>
  );
};
