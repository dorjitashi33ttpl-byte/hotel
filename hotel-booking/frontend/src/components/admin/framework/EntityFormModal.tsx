import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntityFormModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onSave: () => void;
  saving?: boolean;
}

export const EntityFormModal: React.FC<EntityFormModalProps> = ({
  title, isOpen, onClose, children, onSave, saving
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-[600px] h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-12 flex justify-between items-center border-b border-stone-100 bg-stone-50/30">
               <h2 className="text-3xl font-serif tracking-tighter">{title}</h2>
               <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-all">
                  <X className="w-5 h-5" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-8">
               {children}
            </div>

            <div className="p-12 border-t border-stone-100 bg-stone-50/30 flex gap-4">
               <button
                 onClick={onSave}
                 className="flex-1 bg-stone-900 text-white py-4 font-serif text-sm uppercase tracking-widest hover:bg-gold transition-all duration-500 disabled:opacity-50"
                 disabled={saving}
               >
                  {saving ? 'Synchronizing...' : 'Save Sanctuary Entity'}
               </button>
               <button
                 onClick={onClose}
                 className="px-10 border border-stone-200 py-4 font-serif text-sm uppercase tracking-widest hover:bg-stone-50 transition-all"
               >
                  Cancel
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
