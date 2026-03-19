import React, { useState } from 'react';

export const DigitalCheckIn = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto py-24 px-8">
       <h1 className="text-4xl font-serif mb-16">Digital Guest Arrival</h1>

       <div className="space-y-16">
          <div className={`flex gap-8 ${step < 1 ? 'opacity-30' : ''}`}>
             <div className="w-10 h-10 bg-stone-900 text-white flex items-center justify-center font-bold text-xs">01</div>
             <div>
                <h3 className="text-lg font-serif mb-2">Pre-arrival Documentation</h3>
                <p className="text-stone-400 text-sm mb-6">Upload your government ID and confirm arrival time.</p>
                {step === 1 && (
                   <button
                     onClick={() => setStep(2)}
                     className="bg-stone-900 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest"
                   >
                     Complete Form
                   </button>
                )}
             </div>
          </div>

          <div className={`flex gap-8 ${step < 2 ? 'opacity-30' : ''}`}>
             <div className="w-10 h-10 bg-stone-900 text-white flex items-center justify-center font-bold text-xs">02</div>
             <div>
                <h3 className="text-lg font-serif mb-2">Digital Key Issuance</h3>
                <p className="text-stone-400 text-sm mb-6">Receive your QR key for contactless room access.</p>
                {step === 2 && (
                   <div className="bg-stone-50 p-8 text-center border border-dashed border-stone-200">
                      <div className="w-48 h-48 bg-white mx-auto mb-6 flex items-center justify-center shadow-sm">
                         <span className="text-[10px] font-bold text-stone-300">QR CODE STUB</span>
                      </div>
                      <p className="text-[10px] font-black uppercase text-stone-400">Valid for Room 104</p>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};
