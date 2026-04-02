import React, { useState } from 'react';
import { Scan, Smartphone, CheckCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QRScannerView = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        bookingId: 'B-83921',
        guest: 'Tashi Dorji',
        room: '104',
        validUntil: '12:42 PM'
      });
    }, 2500);
  };

  return (
    <div className="p-12 max-w-4xl mx-auto flex flex-col items-center">
       <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-stone-900 mb-4">Digital Key Authentication</h2>
          <p className="text-stone-400 text-[10px] uppercase tracking-widest font-black">Secure Verification Terminal</p>
       </div>

       <div className="relative w-80 h-80 border-2 border-stone-100 rounded-3xl flex items-center justify-center bg-stone-50 overflow-hidden">
          <AnimatePresence>
             {isScanning ? (
               <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-white/80 backdrop-blur-sm z-20"
               >
                  <RefreshCw className="w-12 h-12 text-gold animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-900">Decoding Secure Token...</p>
               </motion.div>
             ) : null}
          </AnimatePresence>

          {/* Scanner UI */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-stone-300">
             <Scan className="w-20 h-20" />
             <p className="text-[10px] font-bold uppercase tracking-tighter">Ready for Guest Input</p>
          </div>

          {/* Animated Scan Line */}
          {isScanning && (
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-gold/40 shadow-[0_0_15px_rgba(180,151,90,0.5)] z-10"
            />
          )}
       </div>

       <div className="mt-16 w-full space-y-8">
          <button
            onClick={simulateScan}
            disabled={isScanning}
            className="w-full bg-stone-900 text-white py-6 text-xs font-black uppercase tracking-[0.3em] hover:bg-gold transition-all duration-700 disabled:opacity-50"
          >
            Initiate Scan Sequence
          </button>

          <AnimatePresence>
             {scanResult && (
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-100 p-8 rounded-xl flex items-center gap-8 shadow-sm"
               >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-green-100 shadow-inner">
                     <CheckCircle className="text-green-500 w-8 h-8" />
                  </div>
                  <div className="flex-1">
                     <p className="text-[9px] text-green-600 font-black uppercase tracking-widest mb-2">Access Granted</p>
                     <div className="flex justify-between items-end">
                        <div>
                           <h4 className="text-lg font-serif text-stone-900">{scanResult.guest}</h4>
                           <p className="text-xs text-stone-500 font-medium uppercase tracking-tighter">Room {scanResult.room} • Verified via DrukID</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] text-stone-400 font-bold uppercase mb-1">Token Expiry</p>
                           <p className="text-xs font-mono font-bold text-stone-900">{scanResult.validUntil}</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
             )}
          </AnimatePresence>
       </div>

       <div className="mt-20 flex gap-12 opacity-30 grayscale">
          <Smartphone className="w-6 h-6" />
          <p className="text-[10px] max-w-[200px] leading-relaxed uppercase font-black tracking-widest text-stone-500">Supported by all RSA-2048 physical lock systems within the sanctuary network.</p>
       </div>
    </div>
  );
};
