import React from 'react';
import { motion } from 'framer-motion';

const suites = [
  {
    title: "Valley View Suite",
    description: "Our classic suite offering panoramic views of the Paro Valley and the majestic Mount Jhomolhari.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=80",
    features: ["52 sqm", "King Bed", "Traditional Hot Stone Bath", "Fireplace"]
  },
  {
    title: "Heritage Residence",
    description: "A two-bedroom sanctuary combining historical Bhutanese architecture with modern minimalist luxury.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=80",
    features: ["120 sqm", "2 King Bedrooms", "Private Dining Room", "Dedicated Butler"]
  }
];

export const SuitesPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-48 pb-24 px-6 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-gold block mb-8">Accommodation</span>
        <h1 className="text-7xl md:text-9xl font-serif tracking-tighter">The Suites</h1>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-48 pb-48">
        {suites.map((suite, idx) => (
          <div key={idx} className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="aspect-[21/9] overflow-hidden"
            >
              <img src={suite.image} alt={suite.title} className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105" />
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <h2 className="text-5xl font-serif mb-8">{suite.title}</h2>
                <p className="text-stone-500 font-light text-xl leading-relaxed max-w-2xl">{suite.description}</p>
              </div>
              <div className="lg:col-span-4">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-8">Features</h3>
                 <ul className="space-y-4">
                    {suite.features.map(f => (
                      <li key={f} className="text-[11px] font-bold uppercase tracking-widest text-stone-900 flex items-center gap-4">
                         <div className="w-1 h-1 bg-gold rounded-full" /> {f}
                      </li>
                    ))}
                 </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
