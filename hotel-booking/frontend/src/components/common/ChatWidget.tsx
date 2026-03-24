import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Druk Sanctuary. How may we assist you today?", sender: "hotel" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: "guest" }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-12 right-12 z-[300]">
       <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-[400px] h-[600px] shadow-2xl border border-stone-100 flex flex-col overflow-hidden mb-8"
            >
               <div className="bg-stone-900 p-8 text-white flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-serif">Concierge</h4>
                    <p className="text-[10px] text-gold uppercase tracking-widest font-bold">Online • Amankora Paro</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X /></button>
               </div>

               <div className="flex-1 p-8 overflow-y-auto space-y-8 bg-stone-50/30">
                  {messages.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'guest' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[80%] p-5 text-sm ${m.sender === 'guest' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-100 text-stone-700'}`}>
                          {m.text}
                       </div>
                    </div>
                  ))}
               </div>

               <div className="p-8 border-t border-stone-100 flex gap-4">
                  <input
                    className="flex-1 outline-none text-sm font-light"
                    placeholder="Inquire about your stay..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button onClick={handleSend} className="text-stone-400 hover:text-stone-900 transition-colors"><Send className="w-5 h-5" /></button>
               </div>
            </motion.div>
          )}
       </AnimatePresence>

       <button
         onClick={() => setIsOpen(!isOpen)}
         className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gold transition-all duration-500"
       >
          <MessageSquare className="w-6 h-6" />
       </button>
    </div>
  );
};
