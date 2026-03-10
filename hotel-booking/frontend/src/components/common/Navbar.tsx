import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-[100] w-full px-12 py-8 flex justify-between items-center transition-all duration-1000 ease-in-out ${scrolled ? 'py-6 bg-white/80 backdrop-blur-xl border-b border-stone-100' : 'bg-transparent'}`}>
      <div className="flex items-center gap-16">
        <Link to="/" className={`font-serif text-2xl tracking-tighter transition-colors duration-1000 ${scrolled ? 'text-luxury-charcoal' : 'text-white'}`}>
          AMAN <span className="text-[9px] tracking-[0.4em] font-sans font-bold opacity-60 ml-2 italic">BHUTAN</span>
        </Link>
        <div className={`hidden items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] md:flex ${scrolled ? 'text-luxury-charcoal' : 'text-white/80'}`}>
          <Link to="/" className="hover:text-luxury-gold transition-colors">Experience</Link>
          <Link to="/" className="hover:text-luxury-gold transition-colors">Suites</Link>
          <Link to="/" className="hover:text-luxury-gold transition-colors">Wellness</Link>
          <Link to="/" className="hover:text-luxury-gold transition-colors">Dining</Link>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Link to="/tenant" className={`text-[10px] font-bold uppercase tracking-[0.3em] ${scrolled ? 'text-luxury-charcoal' : 'text-white'}`}>Property Center</Link>
        <button className={`px-10 py-3 font-serif text-[10px] uppercase tracking-[0.2em] transition-all duration-700 ${scrolled ? 'bg-luxury-charcoal text-white hover:bg-luxury-gold' : 'bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white'}`}>
          Book Now
        </button>
      </div>
    </nav>
  );
};
