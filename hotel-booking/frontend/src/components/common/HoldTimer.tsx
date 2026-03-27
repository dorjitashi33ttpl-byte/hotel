import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const HoldTimer = ({ expiryTime, onExpire }: { expiryTime: string, onExpire: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const expiry = new Date(expiryTime).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((expiry - now) / 1000));
      setTimeLeft(diff);

      if (diff === 0) {
        clearInterval(timer);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime, onExpire]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex items-center gap-4 bg-stone-900 text-white px-6 py-4 rounded shadow-2xl">
       <div className="relative">
          <Clock className="w-5 h-5 text-gold" />
          {timeLeft < 60 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute inset-0 bg-gold/20 rounded-full"
            />
          )}
       </div>
       <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Inventory Secured</p>
          <p className="text-sm font-mono font-bold">
             {mins}:{secs.toString().padStart(2, '0')} <span className="text-stone-500 font-sans text-[10px] ml-1">REMAINING</span>
          </p>
       </div>
    </div>
  );
};
