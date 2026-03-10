import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const HoldTimer: React.FC<{ expiry: string }> = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-3 bg-stone-900 text-white px-6 py-3 rounded-full shadow-2xl">
      <Clock className={`w-4 h-4 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gold'}`} />
      <span className="font-mono text-sm font-bold tracking-tighter">
         SANCTUARY HELD — {format(timeLeft)}
      </span>
    </div>
  );
};
