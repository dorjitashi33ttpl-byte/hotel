import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 py-6 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Minimalist Centered Menu */}
        <div className="hidden md:flex items-center space-x-12 flex-1">
          <Link to="/" className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-charcoal hover:text-luxury-gold transition-colors">Home</Link>
          <Link to="/rooms" className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-charcoal hover:text-luxury-gold transition-colors">Rooms</Link>
          <Link to="/experience" className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-charcoal hover:text-luxury-gold transition-colors">Experience</Link>
        </div>

        {/* Serif Logo */}
        <Link to="/" className="text-3xl font-serif text-luxury-charcoal flex-1 text-center tracking-tighter">
          BHUTANESE <span className="text-luxury-gold">JEWEL</span>
        </Link>

        {/* Right Action */}
        <div className="flex items-center justify-end space-x-8 flex-1">
          <Link to="/wishlist" className="hidden md:block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-luxury-gold transition-colors">Wishlist</Link>
          <button className="bg-luxury-gold text-white px-8 py-3 rounded-sm font-serif text-xs uppercase tracking-[0.2em] hover:bg-luxury-charcoal transition-all duration-500">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
