import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-luxury-charcoal text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h4 className="text-4xl font-serif mb-8 text-luxury-stone">BHUTANESE JEWEL</h4>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm mb-12">
              A haven of peace and high-end hospitality in the heart of the Himalayas. Experience true serenity.
            </p>
            <div className="flex space-x-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-luxury-gold cursor-pointer hover:text-white transition-colors">Instagram</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-luxury-gold cursor-pointer hover:text-white transition-colors">Facebook</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-luxury-gold cursor-pointer hover:text-white transition-colors">Twitter</span>
            </div>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-gold mb-8">Navigation</h5>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Rooms & Suites</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Our Experience</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Special Offers</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Wellness Spa</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-gold mb-8">Newsletter</h5>
            <p className="text-xs text-gray-500 mb-6">Receive exclusive updates and offers.</p>
            <div className="flex border-b border-gray-700 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent outline-none flex-1 text-xs" />
              <button className="text-[10px] uppercase tracking-widest font-bold hover:text-luxury-gold">Join</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] uppercase tracking-widest font-bold">
           <span>&copy; 2026 Bhutanese Jewel. All Rights Reserved.</span>
           <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
