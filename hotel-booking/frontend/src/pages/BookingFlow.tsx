import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoldTimer } from '../components/common/HoldTimer';

interface BookingFlowProps {
  hotelId: number;
  roomTypeId: number;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ hotelId, roomTypeId }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [expiry] = useState(new Date(Date.now() + 15 * 60000).toISOString());

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden mt-12">
      <div className="flex justify-between items-center mb-8 px-12">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= s ? 'bg-blue-600 text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
              {s}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? 'text-blue-600' : 'text-gray-300'}`}>
              {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Done'}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Thimphu Heritage Lodge</h2>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
               <p className="text-gray-500 mb-2">Deluxe Room • 2 Guests • 3 Nights</p>
               <div className="flex justify-between font-bold text-xl text-blue-600 border-t pt-4">
                 <span>Total Amount</span>
                 <span>BTN 15,000</span>
               </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200">Reserve & Pay</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold">Select Payment</h2>
               <HoldTimer expiry={expiry} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               {['stripe', 'razorpay', 'local_bank', 'cash'].map(m => (
                 <button key={m} onClick={() => setPaymentMethod(m)} className={`p-6 border-2 rounded-xl text-left transition-all ${paymentMethod === m ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                   <p className="font-bold capitalize">{m.replace('_', ' ')}</p>
                 </button>
               ))}
            </div>
            <button onClick={() => setStep(3)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Confirm Payment</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Booking Confirmed!</h2>
            <p className="text-gray-500 mt-4 px-12">Your heritage stay in Thimphu is reserved. Check your email for the digital key and property menu.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
