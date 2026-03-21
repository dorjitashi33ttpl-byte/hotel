import React from 'react';
import { FileText, Upload } from 'lucide-react';

export const MenuUpload = () => {
  return (
    <div className="p-8 border border-dashed border-stone-200 bg-stone-50 rounded-2xl flex flex-col items-center text-center">
       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <FileText className="w-8 h-8 text-gold" />
       </div>
       <h4 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-2">Property Menu PDF</h4>
       <p className="text-xs text-stone-400 mb-8 max-w-[200px]">Upload your seasonal menu to be included in guest confirmation emails.</p>

       <button className="flex items-center gap-3 bg-stone-900 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all">
          <Upload className="w-4 h-4" />
          Choose File
       </button>

       <div className="mt-8 pt-8 border-t border-stone-100 w-full">
          <div className="flex justify-between items-center text-left">
             <div>
                <p className="text-xs font-medium">summer_experience_2026.pdf</p>
                <p className="text-[9px] text-stone-400 uppercase font-black">Uploaded 2 days ago</p>
             </div>
             <button className="text-[9px] font-black text-red-400 uppercase">Remove</button>
          </div>
       </div>
    </div>
  );
};
