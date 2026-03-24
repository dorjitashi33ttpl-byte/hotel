import React from 'react';
import { FadeIn } from '../components/common/FadeIn';

export const WellnessPage = () => {
  return (
    <div className="bg-[var(--luxury-stone)] min-h-screen pt-32">
      <section className="py-48 px-12 max-w-7xl mx-auto">
         <div className="text-center mb-32">
            <FadeIn>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold mb-6 block">Revitalize</span>
               <h1 className="text-7xl font-serif tracking-tighter mb-12 leading-tight">A Sanctuary for <br/><span className="italic">Mind, Body & Spirit</span></h1>
            </FadeIn>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {[
              { name: 'Ancient Rituals', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600', desc: 'Bhutanese hot stone baths and herbal compress therapies.' },
              { name: 'Yoga Shala', img: 'https://images.unsplash.com/photo-1545201071-75f058a69418?w=600', desc: 'Morning meditation overlooking the misty Himalayan peaks.' },
              { name: 'Thermal Suites', img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600', desc: 'Experience the healing power of water and steam in our state-of-the-art facilities.' }
            ].map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.2}>
                 <div className="space-y-10 group cursor-pointer">
                    <div className="aspect-[4/5] overflow-hidden gold-border bg-stone-200">
                       <img src={s.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-serif mb-4 italic">{s.name}</h3>
                       <p className="text-stone-500 text-sm font-light leading-relaxed">{s.desc}</p>
                    </div>
                 </div>
              </FadeIn>
            ))}
         </div>
      </section>
    </div>
  );
};
