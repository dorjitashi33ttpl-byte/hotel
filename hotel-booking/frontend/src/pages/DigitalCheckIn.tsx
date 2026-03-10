import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, FileText, CheckCircle } from 'lucide-react';

export const DigitalCheckIn = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-xl mx-auto py-32 px-6">
      <div className="mb-16 text-center">
         <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold block mb-4">Arrival Ritual</span>
         <h1 className="text-5xl font-serif tracking-tighter">Digital Check-in</h1>
      </div>

      <div className="space-y-12">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 bg-white p-12 shadow-2xl rounded-3xl border border-stone-50">
             <h2 className="text-2xl font-serif">Identify Yourself</h2>
             <div className="aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-stone-400 group hover:border-gold transition-colors cursor-pointer">
                <Camera className="w-10 h-10 group-hover:text-gold transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest">Scan Travel Document</span>
             </div>
             <button onClick={() => setStep(2)} className="btn-luxury w-full">Verify & Proceed</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-10">
             <div className="w-24 h-24 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-12 h-12" />
             </div>
             <div>
                <h2 className="text-3xl font-serif mb-4">Sanctuary Key Manifested</h2>
                <p className="text-stone-500 font-light">Your digital key is active. Our staff will assist with your luggage upon arrival at the Paro courtyard.</p>
             </div>
             <div className="p-8 bg-stone-100 font-mono text-[10px] uppercase tracking-widest text-stone-400 border border-stone-200">
                Key ID: AMAN-PR-2026-X991
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
