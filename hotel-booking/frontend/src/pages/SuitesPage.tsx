import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/common/FadeIn';
import { Maximize, Users, Wind, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SuitesPage = () => {
  const suites = [
    {
      id: 'rt_deluxe',
      name: 'Heritage Deluxe Suite',
      img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
      size: '65 sqm',
      guests: '2 Guests',
      desc: 'A fusion of traditional Bhutanese design and modern luxury, featuring hand-carved pine and sweeping views of the Paro Valley.',
      price: '5,500'
    },
    {
      id: 'rt_royal',
      name: 'Royal Sanctuary Suite',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      size: '120 sqm',
      guests: '3 Guests',
      desc: 'Our most prestigious residence, offering a private hot stone bath, expansive terrace, and dedicated butler service.',
      price: '12,000'
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-40 pb-40">
       <div className="container mx-auto px-12">
          <FadeIn>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-8 block text-center">Sanctuaries</span>
             <h1 className="text-8xl font-serif text-stone-900 text-center mb-32 italic">Living Art</h1>
          </FadeIn>

          <div className="space-y-64">
             {suites.map((suite, idx) => (
               <div key={suite.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className={`lg:col-span-7 ${idx % 2 !== 0 ? 'order-2' : ''}`}
                  >
                     <div className="aspect-[16/10] overflow-hidden gold-border bg-stone-100 shadow-2xl">
                        <img src={suite.img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" />
                     </div>
                  </motion.div>

                  <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'order-1' : ''}`}>
                     <FadeIn delay={0.2}>
                        <h2 className="text-5xl font-serif text-stone-900 mb-8">{suite.name}</h2>
                        <p className="text-stone-500 font-light text-lg leading-relaxed mb-12">{suite.desc}</p>

                        <div className="grid grid-cols-2 gap-8 mb-16">
                           <div className="flex items-center gap-4 text-stone-400">
                              <Maximize className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">{suite.size}</span>
                           </div>
                           <div className="flex items-center gap-4 text-stone-400">
                              <Users className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">{suite.guests}</span>
                           </div>
                           <div className="flex items-center gap-4 text-stone-400">
                              <Wind className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Climate Controlled</span>
                           </div>
                           <div className="flex items-center gap-4 text-stone-400">
                              <Coffee className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Organic Minibar</span>
                           </div>
                        </div>

                        <div className="flex items-end justify-between border-t border-stone-100 pt-10">
                           <div>
                              <p className="text-[10px] text-stone-400 uppercase font-black tracking-tighter mb-1">Starting from</p>
                              <p className="text-3xl font-serif text-stone-900 italic">Nu. {suite.price}</p>
                           </div>
                           <Link to={`/hotel/H1/book`} className="bg-stone-900 text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500 rounded shadow-lg">
                              Inquire Availability
                           </Link>
                        </div>
                     </FadeIn>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};
