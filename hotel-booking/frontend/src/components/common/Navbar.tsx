import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurrencySelector } from './CurrencySelector';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 ${scrolled ? 'bg-white/90 backdrop-blur-2xl py-4 shadow-sm' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
        <Link to="/" className={`text-2xl font-serif tracking-tighter transition-colors ${!scrolled && isDark ? 'text-white' : 'text-stone-900'}`}>
          DRUK <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-gold">Sanctuary</span>
        </Link>

        <div className="hidden lg:flex items-center gap-16">
           <div className="flex gap-10">
              {['Suites', 'Dining', 'Wellness', 'Heritage'].map(item => (
                <Link key={item} to={`/${item.toLowerCase()}`} className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-gold ${!scrolled && isDark ? 'text-stone-300' : 'text-stone-500'}`}>
                  {item}
                </Link>
              ))}
           </div>
           <div className="h-4 w-[1px] bg-stone-200" />
           <CurrencySelector />
           <Link to="/tenant" className="bg-stone-900 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500">
              Reserve
           </Link>
        </div>

        <button className="lg:hidden" onClick={() => setIsOpen(true)}>
           <Menu className={!scrolled && isDark ? 'text-white' : 'text-stone-900'} />
        </button>
      </div>
    </nav>
  );
};
