import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-12 z-[150] bg-stone-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-gold transition-all duration-500 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-12 right-0 bg-white text-stone-900 text-[8px] font-bold uppercase tracking-widest px-4 py-2 shadow-xl border border-stone-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
           Concierge Chat
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-32 right-12 z-[150] w-[400px] bg-white shadow-2xl border border-stone-100 overflow-hidden"
          >
            <div className="bg-stone-900 p-8 flex justify-between items-center text-white">
               <div>
                  <h4 className="font-serif text-xl">Sanctuary Concierge</h4>
                  <p className="text-[8px] uppercase tracking-widest text-stone-400 mt-1">Available 24/7 — Online</p>
               </div>
               <button onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors">
                  <X className="w-5 h-5" />
               </button>
            </div>

            <div className="h-[400px] p-8 overflow-y-auto bg-stone-50 flex flex-col gap-6">
               <div className="bg-white p-4 max-w-[80%] shadow-sm text-sm text-stone-600 font-light border border-stone-100 self-start">
                  Kuzu zangpo la! How may we assist with your stay today?
               </div>
               <div className="bg-stone-200 p-4 max-w-[80%] shadow-sm text-sm text-stone-800 font-light self-end">
                  I'd like to arrange a private dinner at the Paro river side.
               </div>
               <div className="bg-white p-4 max-w-[80%] shadow-sm text-sm text-stone-600 font-light border border-stone-100 self-start italic">
                  Typing...
               </div>
            </div>

            <div className="p-8 bg-white border-t border-stone-100 flex items-center gap-4">
               <input
                 type="text"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="Compose your request..."
                 className="flex-1 text-sm outline-none font-light italic"
               />
               <button className="text-stone-400 hover:text-stone-900 transition-colors">
                  <Send className="w-5 h-5" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
