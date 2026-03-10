import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ImportWizard: React.FC<{ isOpen: boolean, onClose: () => void, entityName: string }> = ({
  isOpen, onClose, entityName
}) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden">
             <div className="p-12 space-y-12">
                <div className="flex justify-between items-center border-b border-stone-50 pb-8">
                   <h3 className="text-3xl font-serif tracking-tighter">Import {entityName}</h3>
                   <button onClick={onClose} className="text-stone-400 hover:text-stone-900"><X className="w-5 h-5" /></button>
                </div>

                <div className="space-y-8">
                   <div className="flex items-center gap-8">
                      {[1, 2, 3].map(s => (
                        <div key={s} className="flex items-center gap-3">
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${step >= s ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-300'}`}>{s}</div>
                           <span className={`text-[9px] font-bold uppercase tracking-widest ${step >= s ? 'text-stone-900' : 'text-stone-300'}`}>
                              {s === 1 ? 'Select' : s === 2 ? 'Validate' : 'Result'}
                           </span>
                        </div>
                      ))}
                   </div>

                   {step === 1 && (
                     <div className="space-y-8">
                        <div className="border-2 border-dashed border-stone-100 p-24 rounded-3xl text-center space-y-4 hover:border-gold transition-colors cursor-pointer group">
                           <Upload className="w-12 h-12 text-stone-200 mx-auto group-hover:text-gold transition-colors" />
                           <p className="text-stone-400 font-light">Drag & drop your CSV or Excel file here</p>
                        </div>
                        <div className="bg-stone-50 p-6 flex justify-between items-center">
                           <div className="flex items-center gap-4 text-stone-400">
                              <FileText className="w-4 h-4" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Download Blank Template</span>
                           </div>
                           <button className="text-[10px] font-black uppercase text-gold">Download</button>
                        </div>
                     </div>
                   )}
                </div>

                <div className="flex justify-end gap-4">
                   <button onClick={onClose} className="px-10 py-4 font-serif text-[10px] uppercase tracking-widest text-stone-400">Cancel</button>
                   <button onClick={() => setStep(prev => Math.min(3, prev + 1))} className="btn-wix-luxury">Next Step</button>
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
