import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wifi, Coffee, Utensils, Award, ShieldCheck, Clock, Navigation } from 'lucide-react';
import PriceBreakdown from '../components/hotel/PriceBreakdown';

const HotelDetail = () => {
  return (
    <div className="bg-stone-50 min-h-screen selection:bg-gold selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1549294413-26f195200c16?w=2400&q=90"
            className="w-full h-full object-cover grayscale opacity-80"
            alt="Amankora Paro"
          />
          <div className="absolute inset-0 bg-stone-900/20"></div>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-bold uppercase tracking-[0.8em] mb-6"
          >
            Boutique Sanctuary
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-7xl md:text-[8rem] font-serif tracking-tighter leading-none"
          >
            Amankora <span className="italic">Paro</span>
          </motion.h1>
        </div>
      </section>

      {/* The Story */}
      <section className="py-48 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] overflow-hidden shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80" className="w-full h-full object-cover" alt="The Story" />
            </motion.div>
          </div>
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold block mb-6">Our Heritage</span>
              <h2 className="text-6xl font-serif leading-tight">A Sanctuary in the High Valleys</h2>
              <p className="mt-8 text-stone-500 font-light text-xl leading-relaxed">
                Nestled in a blue-pine forest, the lodge overlooks the snow-capped peaks of Mount Jhomolhari. Rammed-earth walls and wood-panelled interiors create a contemporary take on traditional Bhutanese architecture.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Suites Grid */}
      <section className="py-48 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h3 className="text-6xl font-serif">The Suites</h3>
            <p className="mt-6 text-stone-400 uppercase tracking-widest text-[10px] font-bold">Refined comfort, ancient vistas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {[1, 2].map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[4/5] mb-12 shadow-xl bg-stone-200">
                  <img
                    src={r === 1 ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200" : "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200"}
                    className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-105"
                    alt="Suite"
                  />
                </div>
                <div className="flex justify-between items-baseline border-b border-stone-200 pb-8">
                  <h4 className="text-4xl font-serif">{r === 1 ? 'Valley View Suite' : 'Heritage Residence'}</h4>
                  <span className="text-xl font-serif italic text-gold">$1,400</span>
                </div>
                <p className="mt-6 text-stone-500 font-light text-lg">Overlooking the pine forest with a private hot stone bath.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Location */}
      <section className="py-48 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-32">
          <div className="lg:col-span-8">
             <div className="h-[600px] bg-stone-100 relative shadow-2xl group overflow-hidden">
                <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-stone-400 font-serif text-2xl">
                  [Interactive Mapbox Map]
                </div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur p-8 shadow-2xl">
                   <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-2xl font-serif mb-2">Prime Location</h4>
                        <p className="text-stone-500 text-sm flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-gold" /> Paro Valley, Thimphu 11001, Bhutan
                        </p>
                      </div>
                      <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-stone-900 text-white px-6 py-3 hover:bg-gold transition-colors">
                         <Navigation className="w-3 h-3" /> Get Directions
                      </button>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-16">
             <div className="bg-stone-50 p-12 shadow-sm border border-stone-100">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-12">Reservations</h4>
                <PriceBreakdown base={1400} seasonalAdjustment={0} yieldAdjustment={0} taxes={140} total={1540} />
                <button className="w-full mt-12 bg-stone-900 text-white py-6 font-serif text-sm uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500">
                   Book My Stay
                </button>
             </div>

             <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: <Wifi className="w-5 h-5" />, name: 'Fiber WiFi' },
                  { icon: <Award className="w-5 h-5" />, name: 'Luxury Spa' },
                  { icon: <Utensils className="w-5 h-5" />, name: 'Fine Dining' },
                  { icon: <Clock className="w-5 h-5" />, name: '24/7 Butler' }
                ].map((f, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="text-gold">{f.icon}</div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-900">{f.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Floating Check-in Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-100 p-6 md:hidden flex justify-between items-center">
         <div>
            <span className="text-2xl font-serif text-stone-900">$1,400</span>
            <span className="text-[8px] block uppercase tracking-widest text-stone-400">Per Night</span>
         </div>
         <button className="bg-stone-900 text-white px-10 py-4 font-serif uppercase text-xs tracking-widest">
            Reserve
         </button>
      </div>
    </div>
  );
};

export default HotelDetail;
