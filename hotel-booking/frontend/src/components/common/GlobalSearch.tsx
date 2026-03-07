import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-96 group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <svg className={`h-4 w-4 transition-colors ${isFocused ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="block w-full pl-12 pr-4 py-3 border border-transparent rounded-2xl leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-bold shadow-sm"
        placeholder="Where are you going in Bhutan?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <AnimatePresence>
        {isFocused && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute mt-2 w-full bg-white border border-gray-100 shadow-2xl rounded-3xl p-6 z-50">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Recommended for your location</p>
             <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex gap-4 items-center group cursor-pointer">
                     <div className="w-12 h-12 bg-blue-50 rounded-xl flex-shrink-0 group-hover:bg-blue-100 transition-colors" />
                     <div>
                        <p className="text-sm font-bold group-hover:text-blue-600 transition-colors">Heritage Stay {i}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Thimphu • 1.2 km away</p>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
