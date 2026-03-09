import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoldTimer } from '../components/common/HoldTimer';
import { ChevronRight, ShieldCheck, MapPin } from 'lucide-react';

interface BookingFlowProps {
  hotelId: number;
  roomTypeId: number;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ hotelId, roomTypeId }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [expiry] = useState(new Date(Date.now() + 15 * 60000).toISOString());

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-48 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">

        {/* Left Column: The Steps */}
        <div className="lg:col-span-8">
           <div className="mb-20">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold block mb-4">Your Journey</span>
              <div className="flex items-center gap-6">
                 {[1, 2, 3].map(s => (
                   <React.Fragment key={s}>
                     <div className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-stone-900' : 'text-stone-300'}`}>
                        {s === 1 ? 'Room' : s === 2 ? 'Details' : 'Done'}
                     </div>
                     {s < 3 && <ChevronRight className="w-3 h-3 text-stone-200" />}
                   </React.Fragment>
                 ))}
              </div>
           </div>

           <AnimatePresence mode="wait">
             {step === 1 && (
               <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                  <h2 className="text-5xl font-serif">Select Your Sanctuary</h2>
                  {[1, 2].map(r => (
                    <div key={r} className="group cursor-pointer bg-white p-8 border border-stone-100 shadow-sm flex flex-col md:flex-row gap-12 hover:shadow-xl transition-all duration-500">
                       <div className="md:w-1/3 aspect-video overflow-hidden">
                          <img src={r === 1 ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800" : "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Room" />
                       </div>
                       <div className="md:w-2/3 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-serif mb-2">{r === 1 ? 'Valley View Suite' : 'Heritage Residence'}</h3>
                            <p className="text-stone-500 text-sm font-light leading-relaxed">Spacious interior with hand-finished rammed earth walls and a private terrace overlooking the cedar forest.</p>
                          </div>
                          <div className="mt-8 flex justify-between items-end border-t border-stone-100 pt-6">
                             <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 block mb-1">From</span>
                                <span className="text-xl font-serif text-gold">$1,400 <span className="text-xs italic text-stone-400">/ Night</span></span>
                             </div>
                             <button onClick={() => setStep(2)} className="bg-stone-900 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-colors">Select</button>
                          </div>
                       </div>
                    </div>
                  ))}
               </motion.div>
             )}

             {step === 2 && (
               <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
                  <div className="flex justify-between items-end border-b border-stone-200 pb-8">
                     <h2 className="text-5xl font-serif">Guest Details</h2>
                     <HoldTimer expiry={expiry} />
                  </div>

                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">First Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-stone-200 py-4 outline-none font-serif text-lg focus:border-stone-900 transition-colors" placeholder="Tashi" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">Last Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-stone-200 py-4 outline-none font-serif text-lg focus:border-stone-900 transition-colors" placeholder="Dorji" />
                     </div>
                  </div>

                  <div className="space-y-8 pt-8">
                     <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 block">Payment Method</label>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['stripe', 'razorpay', 'local_bank', 'cash'].map(m => (
                          <button key={m} onClick={() => setPaymentMethod(m)} className={`p-6 border text-left transition-all ${paymentMethod === m ? 'border-stone-900 bg-stone-50 shadow-inner' : 'border-stone-100 hover:border-stone-300'}`}>
                             <span className="text-[10px] font-bold uppercase tracking-widest">{m.replace('_', ' ')}</span>
                          </button>
                        ))}
                     </div>
                  </div>

                  <button onClick={() => setStep(3)} className="w-full bg-stone-900 text-white py-6 font-serif text-sm uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500">
                     Confirm Reservation
                  </button>
               </motion.div>
             )}

             {step === 3 && (
               <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-24 text-center shadow-2xl border border-stone-100">
                  <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-12">
                     <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-6xl font-serif mb-6">Reservation Secured</h2>
                  <p className="text-stone-500 font-light text-xl italic max-w-xl mx-auto leading-relaxed mb-12">
                     "In the high valleys of the Himalayas, time slows down. We look forward to welcoming you to the sanctuary."
                  </p>
                  <p className="text-stone-400 text-xs uppercase tracking-[0.4em] mb-16">Confirmation ID: #BT-88291</p>
                  <button className="border border-stone-900 px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-stone-900 hover:text-white transition-all duration-500">Return to Resort</button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Right Column: The Summary */}
        <div className="lg:col-span-4">
           <div className="sticky top-40 bg-white p-12 border border-stone-100 shadow-xl">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-12">Summary</h4>
              <div className="space-y-8 border-b border-stone-100 pb-12">
                 <div className="flex justify-between items-baseline">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Property</span>
                    <span className="font-serif">Amankora Paro</span>
                 </div>
                 <div className="flex justify-between items-baseline">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Arrival</span>
                    <span className="font-serif">01 June, 2026</span>
                 </div>
                 <div className="flex justify-between items-baseline">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Duration</span>
                    <span className="font-serif italic">4 Nights</span>
                 </div>
              </div>
              <div className="mt-12 space-y-4">
                 <div className="flex justify-between font-serif text-2xl">
                    <span>Total Amount</span>
                    <span className="text-gold">$5,600</span>
                 </div>
                 <p className="text-[9px] text-stone-400 italic leading-relaxed">Inclusive of Bhutan Sustainable Development Fee (SDF) and all applicable taxes.</p>
              </div>
              <div className="mt-12 flex items-center gap-4 text-stone-400">
                 <MapPin className="w-4 h-4" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Paro, Bhutan</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
