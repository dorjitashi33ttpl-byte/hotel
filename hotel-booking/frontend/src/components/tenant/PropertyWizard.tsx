import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, MapPin, Bed, CreditCard, ShieldCheck } from 'lucide-react';

const steps = [
  { id: 1, name: 'Sanctuary Details', icon: <Building /> },
  { id: 2, name: 'Geographical Essence', icon: <MapPin /> },
  { id: 3, name: 'Inventory Mode', icon: <Bed /> },
  { id: 4, name: 'Offerings & Payouts', icon: <CreditCard /> },
];

export const PropertyWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 min-h-screen">
      <div className="mb-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold block mb-4 text-center">Onboarding</span>
        <h1 className="text-6xl font-serif text-center mb-16 tracking-tighter">Register Your Sanctuary</h1>

        <div className="flex justify-between items-center relative">
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100 -z-10" />
           {steps.map(s => (
             <div key={s.id} className="flex flex-col items-center gap-4 bg-stone-50 px-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${currentStep >= s.id ? 'bg-stone-900 text-white shadow-xl' : 'bg-white border border-stone-100 text-stone-300'}`}>
                   {s.icon}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${currentStep >= s.id ? 'text-stone-900' : 'text-stone-300'}`}>{s.name}</span>
             </div>
           ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-16 shadow-2xl border border-stone-50"
        >
          {currentStep === 1 && (
            <div className="space-y-12">
               <h2 className="text-3xl font-serif">Basic Identities</h2>
               <div className="grid grid-cols-1 gap-12">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-stone-400">Property Official Name</label>
                    <input className="wix-input w-full" placeholder="e.g. Amankora Punakha" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-stone-400">Mission Statement / Description</label>
                    <textarea className="wix-input w-full h-32" placeholder="Describe the soul of your hotel..." />
                  </div>
               </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-12 space-y-8">
               <div className="w-20 h-20 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <ShieldCheck className="w-10 h-10" />
               </div>
               <h2 className="text-4xl font-serif">Submission Ready</h2>
               <p className="text-stone-500 font-light text-lg">Our stewards will review your sanctuary's documents within 24 hours.</p>
            </div>
          )}

          <div className="mt-16 flex justify-between pt-12 border-t border-stone-50">
             <button
               onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
               className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
             >
               Back
             </button>
             <button
               onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
               className="btn-wix-luxury"
             >
               {currentStep === 4 ? 'Submit for Approval' : 'Proceed to Next Step'}
             </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
