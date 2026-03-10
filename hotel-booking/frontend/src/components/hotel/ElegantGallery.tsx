import React from 'react';
import { Upload, X, Grid } from 'lucide-react';

export const ElegantGallery: React.FC = () => {
  return (
    <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-3xl space-y-12">
      <div className="flex justify-between items-center">
         <div className="space-y-2">
            <h3 className="text-2xl font-serif">Sanctuary Portfolio</h3>
            <p className="text-stone-400 text-sm italic">High-fidelity imagery for the public sanctuary page.</p>
         </div>
         <button className="flex items-center gap-2 bg-stone-900 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-colors">
            <Upload className="w-3 h-3" /> Upload Media
         </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
         {[1, 2, 3, 4, 5].map(i => (
           <div key={i} className="group relative aspect-square overflow-hidden bg-stone-50 border border-stone-100 hover:border-gold transition-all cursor-pointer">
              <img src={`https://images.unsplash.com/photo-1549294413-26f195200c16?w=400&q=80&sig=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="bg-white/90 p-1 text-red-600 rounded shadow-sm hover:bg-white"><X className="w-3 h-3" /></button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-stone-900/40 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[8px] text-white font-bold uppercase tracking-widest">Master Shot</span>
              </div>
           </div>
         ))}
         <button className="aspect-square border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 text-stone-300 hover:text-stone-500 hover:border-stone-400 transition-all">
            <Grid className="w-6 h-6" />
            <span className="text-[8px] font-black uppercase tracking-widest">Add Grid</span>
         </button>
      </div>
    </div>
  );
};
