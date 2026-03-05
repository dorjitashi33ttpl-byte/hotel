import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const MapboxSearch: React.FC = () => {
  const [radius, setRadius] = useState(10);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const m = new mapboxgl.Map({
      container: 'search-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [89.6339, 27.4728],
      zoom: 12
    });
    setMap(m);
    return () => m.remove();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 p-8 bg-white shadow-xl z-10 overflow-y-auto">
        <h2 className="text-3xl font-black mb-6">Find Hotels</h2>
        <div className="mb-8">
           <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Search Radius (km)</label>
           <input
              type="range" min="1" max="50" value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full mt-4 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
           />
           <div className="text-right text-sm font-bold text-blue-600 mt-2">{radius} km</div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 border border-gray-100 rounded-2xl hover:border-blue-500 transition-all cursor-pointer group bg-white shadow-sm">
               <div className="h-40 bg-gray-100 rounded-xl mb-4" />
               <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">Heritage Bhutan Lodge {i}</h3>
               <p className="text-sm text-gray-500">1.2 km from search center • 15 mins drive</p>
               <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-black text-xl">BTN 5,500</span>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Details</button>
               </div>
            </div>
          ))}
        </div>
      </div>
      <div id="search-map" className="flex-1" />
    </div>
  );
};
