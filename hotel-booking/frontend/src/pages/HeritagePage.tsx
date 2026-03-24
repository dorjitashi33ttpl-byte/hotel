import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/common/FadeIn';

export const HeritagePage = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32">
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center px-12 text-center">
         <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600" className="w-full h-full object-cover grayscale opacity-60" />
         </motion.div>
         <div className="relative z-10 space-y-12">
            <FadeIn>
               <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gold block mb-8">Architectural Legacy</span>
               <h1 className="text-[10vw] font-serif tracking-tighter leading-[0.8] italic">Bhutanese <br/>Soul</h1>
               <p className="text-xl max-w-xl mx-auto font-light leading-relaxed mt-16 text-stone-600">A tribute to the dzong architecture and the sacred geometry that defines the Land of the Thunder Dragon.</p>
            </FadeIn>
         </div>
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-[8px] font-bold uppercase tracking-widest text-gold animate-bounce">Descend</span>
            <div className="w-[1px] h-24 bg-gold/30" />
         </div>
      </section>

      <section className="py-64 px-12 max-w-5xl mx-auto space-y-48">
         <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
               <h2 className="text-5xl font-serif leading-tight">The Prayer Wheel <br/>in Every Corner.</h2>
               <p className="text-stone-500 font-light leading-relaxed text-lg">Our properties are built using traditional rammed earth techniques, with hand-carved pine and local slate. Each room is a meditation on space and light, designed to ground you in the present moment.</p>
            </div>
         </FadeIn>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 aspect-[4/5] bg-stone-100 overflow-hidden gold-border">
               <img src="https://images.unsplash.com/photo-1578164082121-7299a4e98f06?w=1000" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="lg:col-span-5 pt-32 space-y-12">
               <FadeIn delay={0.2}>
                  <h3 className="text-2xl font-serif italic border-b border-stone-200 pb-8">Sacred Symmetry</h3>
                  <p className="text-stone-400 font-light leading-relaxed">The orientation of our sanctuaries follows the principles of Vastu Shastra and local spiritual guidance, ensuring a harmonious flow of energy.</p>
               </FadeIn>
            </div>
         </div>
      </section>
    </div>
  );
};
