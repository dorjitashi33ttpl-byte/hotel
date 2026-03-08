import React from 'react';
import { MapPin, Wifi, Coffee, Utensils, Award, ShieldCheck, Clock } from 'lucide-react';
import PriceBreakdown from '../components/hotel/PriceBreakdown';
import RoomTypeCard from '../components/hotel/RoomTypeCard';

const HotelDetail = ({ hotel }) => {
  return (
    <div className="bg-luxury-stone min-h-screen">
      {/* Immersive Section: Experience */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="text-6xl md:text-8xl font-serif text-luxury-charcoal mb-8 tracking-tighter">
            The Art of Stay
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed italic">
            "A sanctuary designed for those who seek the sublime. Experience a harmony of luxury and tradition in Thimphu's most coveted address."
          </p>
        </div>

        {/* Multi-column Layout */}
        <div className="flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-24 mb-32">
          <div className="lg:w-1/2">
            <div className="relative h-[600px] rounded-sm overflow-hidden gold-border">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80" className="w-full h-full object-cover" alt="Main Experience" />
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
             <h2 className="text-4xl font-serif mb-8 border-l-4 border-luxury-gold pl-6">Refined Hospitality</h2>
             <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                <p>Since our inception, we have curated experiences that transcend the ordinary. Every detail, from the hand-woven linens to the bespoke mountain tours, is crafted with intention.</p>
                <p>Discover our wellness sanctuary, fine-dining restaurants, and quiet corners designed for reflection.</p>
             </div>
             <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                   <span className="text-luxury-gold font-bold text-3xl mb-1">24/7</span>
                   <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Personal Butler</span>
                </div>
                <div className="flex flex-col">
                   <span className="text-luxury-gold font-bold text-3xl mb-1">Michelin</span>
                   <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Rated Dining</span>
                </div>
             </div>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="mb-32">
          <h3 className="text-4xl font-serif text-center mb-16 tracking-tight">Suites & Sanctuaries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <RoomTypeCard roomType={{ name: 'Cloud Nine Suite', base_price: 450, occupancy: '2 Adults', view: 'Himalayan View' }} />
            <RoomTypeCard roomType={{ name: 'The Royal Residence', base_price: 1200, occupancy: '4 Adults', view: 'Panoramic View' }} />
            <RoomTypeCard roomType={{ name: 'Zen Garden Studio', base_price: 320, occupancy: '2 Adults', view: 'Garden View' }} />
          </div>
        </div>

        {/* Facilities Section */}
        <div className="bg-luxury-beige/50 p-16 rounded-sm mb-32 border border-gray-100">
           <h3 className="text-3xl font-serif text-center mb-16">World Class Facilities</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { icon: <Wifi />, name: 'Fiber WiFi' },
                { icon: <Coffee />, name: 'Artisan Cafe' },
                { icon: <Utensils />, name: 'Global Cuisine' },
                { icon: <Award />, name: 'Luxury Spa' },
                { icon: <ShieldCheck />, name: '24/7 Security' },
                { icon: <Clock />, name: 'Airport Transfer' }
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                  <div className="text-luxury-gold">{f.icon}</div>
                  <span className="text-xs uppercase tracking-widest font-bold text-luxury-charcoal">{f.name}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Location & Booking */}
        <div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-16">
          <div className="flex-1">
             <h3 className="text-3xl font-serif mb-8">Prime Location</h3>
             <div className="h-96 bg-gray-200 rounded-sm overflow-hidden gold-border mb-8">
                {/* Map Placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-serif">Interactive Mapbox Experience</div>
             </div>
             <div className="flex items-center text-gray-600">
                <MapPin className="text-luxury-gold mr-3" />
                <span className="font-light">Zangtho Pelri Road, Thimphu 11001, Bhutan</span>
             </div>
          </div>

          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-8 rounded-lg shadow-2xl border border-gray-100 gold-border sticky top-12">
              <h4 className="text-2xl font-serif mb-6 border-b pb-4">Reserve Your Experience</h4>
              <PriceBreakdown base={450} seasonalAdjustment={0} yieldAdjustment={0} taxes={45} total={495} />
              <button className="w-full mt-8 bg-luxury-charcoal text-white py-5 rounded-sm font-serif text-lg hover:bg-luxury-gold transition-colors duration-500 uppercase tracking-[0.2em]">
                Book My Stay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetail;
