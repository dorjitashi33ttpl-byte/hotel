import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Navigation, MapPin, Search } from 'lucide-react';

export const MapboxSearch: React.FC = () => {
  const [radius, setRadius] = useState(10);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const m = new mapboxgl.Map({
      container: 'search-map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [89.6339, 27.4728],
      zoom: 12
    });
    setMap(m);
    return () => m.remove();
  }, []);

  return (
    <div className="flex h-screen bg-stone-50">
      <div className="w-[450px] p-12 bg-white shadow-2xl z-10 overflow-y-auto border-r border-stone-100">
        <div className="mb-12">
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold block mb-4">Curated Stays</span>
          <h2 className="text-5xl font-serif tracking-tighter">Bhutan Discovery</h2>
        </div>

        <div className="mb-16 space-y-8">
           <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
              <input type="text" placeholder="Filter by region..." className="w-full bg-transparent border-b border-stone-100 py-3 pl-8 outline-none font-light italic text-sm focus:border-stone-900 transition-colors" />
           </div>

           <div>
              <div className="flex justify-between items-baseline mb-4">
                 <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Radius</label>
                 <span className="text-xs font-serif italic text-gold">{radius} km</span>
              </div>
              <input
                 type="range" min="1" max="50" value={radius}
                 onChange={(e) => setRadius(parseInt(e.target.value))}
                 className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
           </div>
        </div>

        <div className="space-y-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="group cursor-pointer">
               <div className="aspect-[16/10] bg-stone-100 mb-6 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80&sig=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
               </div>
               <div className="flex justify-between items-start border-b border-stone-100 pb-6">
                  <div>
                    <h3 className="text-2xl font-serif group-hover:text-gold transition-colors">Amankora {i === 1 ? 'Paro' : i === 2 ? 'Thimphu' : 'Punakha'}</h3>
                    <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                       <MapPin className="w-3 h-3 text-gold" /> {1.2 * i} km from center • Luxury Suite
                    </p>
                  </div>
                  <div className="text-right">
                     <span className="text-sm font-serif italic block">From $1,400</span>
                  </div>
               </div>
               <div className="mt-4 flex gap-4">
                  <button className="flex-1 border border-stone-900 py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all">Details</button>
                  <button className="px-4 border border-stone-100 hover:bg-stone-50 transition-colors">
                     <Navigation className="w-4 h-4 text-stone-400" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
      <div id="search-map" className="flex-1 grayscale-[0.5] opacity-90" />
    </div>
  );
};
