import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/common/FadeIn';

export const DiningPage = () => {
  return (
    <div className="bg-white min-h-screen pt-32">
      <section className="relative h-[80vh] overflow-hidden flex items-center justify-center">
         <motion.div
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
           className="absolute inset-0 z-0"
         >
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600" className="w-full h-full object-cover grayscale opacity-80" />
         </motion.div>
         <div className="relative z-10 text-center text-white px-8">
            <FadeIn>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold mb-6 block">Gastronomy</span>
               <h1 className="text-8xl font-serif tracking-tighter mb-12 italic">The Art of the Table</h1>
               <p className="text-xl max-w-2xl mx-auto font-light leading-relaxed">Experience a symphony of Bhutanese flavors and global techniques, sourced from our own organic gardens.</p>
            </FadeIn>
         </div>
         <div className="absolute inset-0 bg-stone-900/40 z-[5]" />
      </section>

      <section className="py-48 px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
         <FadeIn>
            <h2 className="text-5xl font-serif mb-12">Epicurean Journeys</h2>
            <div className="space-y-12">
               <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gold mb-4">Farm-to-Table</h4>
                  <p className="text-stone-500 leading-relaxed font-light">Every ingredient tells a story. We work closely with local farmers in the Paro valley to bring you the freshest seasonal produce, from red rice to organic Ema Datshi.</p>
               </div>
               <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gold mb-4">The Wine Cellar</h4>
                  <p className="text-stone-500 leading-relaxed font-light">An extensive collection of global vintages, curated to complement our unique high-altitude cuisine.</p>
               </div>
            </div>
         </FadeIn>
         <div className="grid grid-cols-2 gap-8">
            <div className="pt-24">
               <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600" className="w-full aspect-[3/4] object-cover gold-border grayscale" />
            </div>
            <div>
               <img src="https://images.unsplash.com/photo-1550966841-3ee2cc309068?w=600" className="w-full aspect-[3/4] object-cover gold-border grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
         </div>
      </section>
    </div>
  );
};
