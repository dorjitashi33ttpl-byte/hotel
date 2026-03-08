import React from 'react';

const GlobalBookingWidget = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-luxury-charcoal text-white p-4 md:p-6 z-50 flex flex-col md:flex-row items-center justify-between border-t border-luxury-gold shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
        <div>
           <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block">Check Dates</span>
           <span className="text-sm font-medium">Select Arrival - Departure</span>
        </div>
        <div>
           <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block">Guest Info</span>
           <span className="text-sm font-medium">Add Adults & Children</span>
        </div>
      </div>
      <button className="bg-luxury-gold text-white px-12 py-3 rounded-sm font-serif text-lg hover:bg-luxury-stone hover:text-luxury-charcoal transition-all duration-500 uppercase tracking-[0.2em]">
        Book Now
      </button>
    </div>
  );
};

export default GlobalBookingWidget;
