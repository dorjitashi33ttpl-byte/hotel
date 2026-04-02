import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import { ShieldCheck, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckInVerification = ({ hotelId }: { hotelId: string }) => {
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const { data: pending } = useQuery(['pending-checkins', hotelId], () =>
    api.get(`/tenant/hotels/${hotelId}/pending-verifications`).then(r => r.data)
  );

  const verifyMutation = useMutation(
    (bookingId: string) => api.post(`/tenant/bookings/${bookingId}/verify-checkin`),
    {
        onSuccess: () => {
            queryClient.invalidateQueries('pending-checkins');
            setSelectedBooking(null);
        }
    }
  );

  return (
    <div className="p-12 min-h-screen bg-white">
       <div className="mb-16">
          <h2 className="text-4xl font-serif text-stone-900">Digital Arrivals</h2>
          <p className="text-stone-400 text-xs uppercase tracking-widest mt-3 font-black">Pre-Arrival Verification Queue</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
             {pending?.map((b: any) => (
               <button
                key={b.id}
                onClick={() => setSelectedBooking(b)}
                className={`w-full p-8 text-left border transition-all ${selectedBooking?.id === b.id ? 'border-gold bg-gold/5' : 'border-stone-100 bg-stone-50/50 hover:bg-stone-50'}`}
               >
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-lg font-serif text-stone-900">{b.guest_name}</span>
                     <span className="text-[9px] font-black uppercase text-gold tracking-widest">Awaiting Verification</span>
                  </div>
                  <p className="text-xs text-stone-500 uppercase tracking-tighter">Booking ID: {b.id.split('-')[0]}</p>
               </button>
             ))}
             {pending?.length === 0 && <p className="text-stone-300 italic text-sm">No pending digital check-ins.</p>}
          </div>

          <AnimatePresence mode="wait">
             {selectedBooking ? (
               <motion.div
                key={selectedBooking.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-stone-900 text-white p-12 rounded-2xl shadow-2xl relative overflow-hidden"
               >
                  <div className="relative z-10">
                     <h3 className="text-2xl font-serif mb-10">Verification Protocol</h3>

                     <div className="space-y-8 mb-12">
                        <div className="flex items-start gap-4">
                           <FileText className="w-5 h-5 text-gold" />
                           <div>
                              <p className="text-[10px] text-stone-500 uppercase font-black tracking-widest mb-1">ID Document (DrukID/Passport)</p>
                              <p className="text-sm font-medium">{selectedBooking.guest_id_number || 'N/A'}</p>
                              <button className="text-[9px] text-gold mt-2 uppercase font-black border-b border-gold/30">View Document Scan</button>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <ShieldCheck className="w-5 h-5 text-gold" />
                           <div>
                              <p className="text-[10px] text-stone-500 uppercase font-black tracking-widest mb-1">SDF Status</p>
                              <p className="text-sm font-medium text-green-400">Paid & Verified via TCB</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <button
                            onClick={() => verifyMutation.mutate(selectedBooking.id)}
                            className="flex-1 bg-gold text-stone-900 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
                        >
                           <CheckCircle2 className="w-4 h-4" /> Issue Digital Key
                        </button>
                        <button className="px-6 py-4 border border-white/20 hover:bg-white/10 transition-all">
                           <XCircle className="w-4 h-4 text-red-400" />
                        </button>
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
               </motion.div>
             ) : (
               <div className="flex flex-col items-center justify-center border-2 border-dashed border-stone-100 rounded-2xl opacity-20">
                  <span className="text-stone-300 font-serif text-6xl italic">Select Arrival</span>
               </div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};
