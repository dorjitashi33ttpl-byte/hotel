import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-charcoal">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1549294413-26f195200c16?w=2400&q=80"
          alt="Luxury Bhutanese Resort"
          className="h-full w-full object-cover grayscale"
        />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-8 block text-[10px] font-bold uppercase tracking-[0.8em] text-[var(--luxury-gold)]"
        >
          Since 2026 — Kingdom of Bhutan
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="max-w-6xl font-serif text-7xl md:text-[10rem] leading-[0.9] tracking-tighter"
        >
          The Art of <br />
          <span className="italic">Sublime Living</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <span className="text-[8px] uppercase tracking-[0.5em] text-stone-400 font-bold">Scroll to explore</span>
          <div className="h-16 w-[1px] bg-gradient-to-b from-[var(--luxury-gold)] to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};
