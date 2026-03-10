import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-12 z-[100] bg-stone-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-gold transition-all duration-500"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-32 right-12 z-[100] w-[400px] bg-white shadow-2xl border border-stone-100 overflow-hidden"
          >
            <div className="bg-stone-900 p-8 flex justify-between items-center text-white">
               <h4 className="font-serif text-xl tracking-tighter">Sanctuary Concierge</h4>
               <button onClick={() => setIsOpen(false)} className="hover:text-gold transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="h-80 p-8 bg-stone-50 overflow-y-auto">
               <div className="bg-white p-4 max-w-[80%] shadow-sm text-sm text-stone-600 font-light border border-stone-100 italic">
                  How may we assist your stay today?
               </div>
            </div>
            <div className="p-8 bg-white border-t border-stone-100 flex items-center gap-4">
               <input type="text" placeholder="Your request..." className="flex-1 text-sm outline-none font-light italic" />
               <button className="text-stone-400 hover:text-stone-900 transition-colors"><Send className="w-5 h-5" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
