import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoldTimer } from '../components/common/HoldTimer';
import { api } from '../services/api';
import { Check, CreditCard, Landmark, Wallet } from 'lucide-react';

export const BookingFlow = ({ hotelId, roomTypeId }: any) => {
  const [step, setStep] = useState(1);
  const [hold, setHold] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const initiateHold = async () => {
    try {
      const resp = await api.post('/bookings/holds', {
        room_type_id: roomTypeId,
        check_in: '2026-06-15',
        check_out: '2026-06-20'
      });
      setHold(resp.data);
      setStep(2);
    } catch (err) {
      alert("Inventory is no longer available for these dates.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-24 px-12">
       <div className="max-w-4xl mx-auto">
          {hold && (
            <div className="fixed top-12 right-12 z-[100]">
               <HoldTimer expiryTime={hold.expires_at || new Date(Date.now() + 15*60000).toISOString()} onExpire={() => setStep(1)} />
            </div>
          )}

          <div className="mb-20">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-4 block">Reservation Sequence</span>
             <h1 className="text-5xl font-serif text-stone-900">Your Bhutanese <span className="italic">Odyssey</span></h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
             <div className="lg:col-span-2 space-y-12">
                <AnimatePresence mode="wait">
                   {step === 1 && (
                     <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                        <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-xl">
                           <h3 className="text-xl font-serif mb-8 text-stone-900">1. Guest Particulars</h3>
                           <div className="grid grid-cols-2 gap-8">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Full Name</label>
                                 <input className="wix-input w-full" placeholder="Tashi Wangchuk" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Address</label>
                                 <input className="wix-input w-full" placeholder="tashi@druk.bt" />
                              </div>
                           </div>
                           <button onClick={initiateHold} className="mt-12 w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all duration-700 rounded-lg">
                              Secure Inventory
                           </button>
                        </div>
                     </motion.div>
                   )}

                   {step === 2 && (
                     <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                        <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-xl">
                           <h3 className="text-xl font-serif mb-10 text-stone-900">2. Select Settlement Protocol</h3>
                           <div className="space-y-4">
                              {[
                                { id: 'stripe', label: 'International Card (Stripe)', icon: CreditCard },
                                { id: 'bank', label: 'Local Bank Transfer (BOB/BNB)', icon: Landmark },
                                { id: 'paypal', label: 'Digital Wallet (PayPal)', icon: Wallet },
                              ].map(m => (
                                <button
                                  key={m.id}
                                  onClick={() => setPaymentMethod(m.id)}
                                  className={`w-full p-8 border flex items-center justify-between transition-all ${paymentMethod === m.id ? 'border-gold bg-gold/5 shadow-inner' : 'border-stone-100 hover:bg-stone-50'}`}
                                >
                                   <div className="flex items-center gap-6">
                                      <m.icon className={`w-5 h-5 ${paymentMethod === m.id ? 'text-gold' : 'text-stone-300'}`} />
                                      <span className="text-sm font-bold uppercase tracking-widest text-stone-700">{m.label}</span>
                                   </div>
                                   {paymentMethod === m.id && <Check className="w-4 h-4 text-gold" />}
                                </button>
                              ))}
                           </div>
                           <button onClick={() => setStep(3)} disabled={!paymentMethod} className="mt-12 w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all duration-700 rounded-lg disabled:opacity-20">
                              Finalize Reservation
                           </button>
                        </div>
                     </motion.div>
                   )}

                   {step === 3 && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20 bg-white border border-stone-100 rounded-2xl shadow-2xl">
                         <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10">
                            <Check className="text-green-500 w-8 h-8" />
                         </div>
                         <h2 className="text-3xl font-serif text-stone-900 mb-4">Reservation Confirmed</h2>
                         <p className="text-stone-400 text-sm max-w-sm mx-auto mb-12">Your sanctuary awaits. A confirmation has been dispatched to your digital correspondence.</p>
                         <button onClick={() => window.location.href = '/'} className="text-[10px] font-black uppercase text-gold tracking-[0.3em] border-b border-gold/30 pb-1">Return to Kingdom</button>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

             <div className="space-y-8">
                <div className="bg-stone-900 text-white p-10 rounded-xl shadow-xl border-t-4 border-gold">
                   <h4 className="text-xs font-black uppercase tracking-widest text-gold mb-8">Summary of Stay</h4>
                   <div className="space-y-6">
                      <div className="flex justify-between border-b border-white/10 pb-4">
                         <span className="text-xs text-stone-400">Suites</span>
                         <span className="text-sm font-serif italic">1x Deluxe Heritage</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-4">
                         <span className="text-xs text-stone-400">Duration</span>
                         <span className="text-sm">5 Nights</span>
                      </div>
                      <div className="flex justify-between pt-4">
                         <span className="text-xs text-stone-400 uppercase font-black">Total Vol.</span>
                         <span className="text-xl font-serif text-gold">Nu. 27,500</span>
                      </div>
                   </div>
                </div>
                <div className="p-8 border border-stone-100 bg-white italic text-stone-400 text-[11px] leading-relaxed">
                   Cancellation Protocol: Complete refund available until 7 days prior to arrival. 10% BST and daily SDF are included in the final valuation.
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
