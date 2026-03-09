import React from 'react';
import { motion } from 'framer-motion';

export const DiningPage = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      <section className="relative h-[80vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1550966842-30cae750f2e8?w=1600&q=80" className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" />
        <div className="absolute inset-0 bg-stone-900/30 flex flex-col items-center justify-center text-white px-6">
           <span className="text-[10px] font-bold uppercase tracking-[0.8em] mb-8">Gastronomy</span>
           <h1 className="text-7xl md:text-9xl font-serif tracking-tighter">Dining</h1>
        </div>
      </section>

      <section className="py-48 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-5xl font-serif italic">"A journey through Bhutanese flavors."</h2>
          <p className="text-stone-500 font-light text-xl leading-relaxed">
            Our kitchens celebrate the kingdom's rich biodiversity. From high-altitude buckwheat to the iconic Ema Datshi, every dish is a tribute to local heritage and seasonal purity.
          </p>
          <div className="pt-12">
             <button className="btn-wix-luxury">View Menu (PDF)</button>
          </div>
        </div>
      </section>

      <section className="pb-48 px-6 bg-white">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-stone-100 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200" className="w-full h-full object-cover transition-all duration-1000 hover:scale-110" />
            </div>
            <div className="aspect-square bg-stone-100 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200" className="w-full h-full object-cover transition-all duration-1000 hover:scale-110" />
            </div>
         </div>
      </section>
    </div>
  );
};
