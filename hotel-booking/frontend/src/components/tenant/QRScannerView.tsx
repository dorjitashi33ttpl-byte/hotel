import React from 'react';
import { Camera, ShieldCheck } from 'lucide-react';

export const QRScannerView = () => {
  return (
    <div className="bg-stone-900 p-12 text-white space-y-12">
      <div className="flex justify-between items-center">
         <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gold mb-2 block">Security Checkpoint</span>
            <h2 className="text-3xl font-serif">Front-Desk Key Verification</h2>
         </div>
         <div className="flex items-center gap-2 text-green-500">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Scanner Active</span>
         </div>
      </div>

      <div className="relative aspect-video bg-stone-800 rounded-3xl overflow-hidden flex items-center justify-center border border-stone-700">
         <div className="absolute inset-0 border-[40px] border-stone-900/50 pointer-events-none" />
         <div className="w-64 h-64 border-2 border-gold/50 rounded-3xl animate-pulse flex items-center justify-center">
            <div className="w-full h-0.5 bg-gold/30 absolute" />
            <Camera className="w-12 h-12 text-stone-600" />
         </div>
         <p className="absolute bottom-8 text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500">Align Guest QR Code within frame</p>
      </div>

      <div className="bg-stone-800/50 p-8 border border-stone-700 rounded-2xl">
         <p className="text-stone-400 text-xs font-light leading-relaxed">This terminal is authorized for <span className="text-white font-medium italic">Amankora Paro</span>. All scan events are logged in the platform audit trail.</p>
      </div>
    </div>
  );
};
