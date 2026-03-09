import React from 'react';
import { motion } from 'framer-motion';

export const WellnessPage = () => {
  return (
    <div className="bg-stone-900 text-white min-h-screen">
      <section className="pt-48 pb-48 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5">
             <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-stone-500 block mb-8">Rejuvenation</span>
             <h1 className="text-7xl md:text-9xl font-serif tracking-tighter italic">Wellness</h1>
             <p className="mt-12 text-stone-400 font-light text-xl leading-relaxed">
               Drawing inspiration from ancient Tibetan medicine and Bhutanese rituals, our sanctuary offers a profound return to oneself.
             </p>
          </div>
          <div className="lg:col-span-7">
             <div className="aspect-[3/4] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1544124499-58912cbddaad?w=1200" className="w-full h-full object-cover opacity-80" />
             </div>
          </div>
        </div>
      </section>

      <section className="py-48 px-6 bg-stone-800/30">
         <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-serif mb-24 tracking-tighter">The Rituals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
               {[
                 { name: "Hot Stone Bath", desc: "Mineral-rich river stones released into herb-infused mountain water." },
                 { name: "Meditation Hall", desc: "A silent space overlooking the pine forests for deep contemplation." },
                 { name: "Yoga Pavilion", desc: "Morning sun salutations amidst the morning mountain mist." }
               ].map(r => (
                 <div key={r.name} className="space-y-6">
                    <h3 className="text-xl font-serif text-gold italic">{r.name}</h3>
                    <p className="text-stone-400 font-light leading-relaxed">{r.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};
