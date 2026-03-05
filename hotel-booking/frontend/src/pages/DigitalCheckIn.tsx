import React, { useState } from 'react';

export const DigitalCheckIn: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-xl mx-auto p-10 bg-white shadow-2xl rounded-3xl mt-10">
      <h2 className="text-3xl font-black mb-6">Digital Check-in</h2>
      <p className="text-gray-500 mb-10 text-lg">Save time at the front desk by completing your details now.</p>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Guest ID Document</label>
            <div className="mt-2 p-10 border-2 border-dashed border-gray-200 rounded-2xl text-center cursor-pointer hover:bg-gray-50">
               <span className="text-blue-600 font-bold">Upload Passport / CID</span>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Next Step</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
           <textarea className="w-full border p-4 rounded-xl h-32" placeholder="Any special requests or arrival notes?" />
           <div className="flex items-center gap-4">
              <input type="checkbox" className="w-6 h-6" />
              <span className="text-sm font-medium">I agree to the hotel house rules.</span>
           </div>
           <button onClick={() => setStep(3)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Complete Check-in</button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Check-in Complete!</h3>
          <p className="text-gray-500 mb-8">Simply show your digital key or QR code when you arrive at Thimphu Heritage Lodge.</p>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold">View Digital Key</button>
        </div>
      )}
    </div>
  );
};
