import React, { useState, useEffect } from 'react';

export const HoldTimer: React.FC<{ expiry: string }> = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(expiry).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(timer);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [expiry]);

  return (
    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 border border-red-100">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Hold expires in: {timeLeft}
    </div>
  );
};
