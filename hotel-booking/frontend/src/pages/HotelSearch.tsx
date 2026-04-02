import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, List as ListIcon, MapPin, Star, Search, Sliders } from 'lucide-react';

export const HotelSearch = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: hotels, isLoading } = useQuery(['hotel-search', searchQuery], () =>
    api.get('/hotels/search', { params: { lat: 27.47, lng: 89.63, radius_km: 50 } }).then(r => r.data)
  );

  return (
    <div className="bg-white min-h-screen pt-24">
       {/* Search Header */}
       <div className="border-b border-stone-100 bg-stone-50/30 p-8 sticky top-24 z-40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="relative w-full md:w-[500px]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                <input
                   className="w-full bg-white border border-stone-100 py-4 pl-14 pr-6 rounded-full text-sm font-light shadow-sm focus:ring-1 focus:ring-gold outline-none transition-all"
                   placeholder="Search Dzongkhags or Sanctuaries..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>

             <div className="flex items-center gap-6">
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
                   <Sliders className="w-4 h-4" /> Filters
                </button>
                <div className="h-4 w-px bg-stone-200" />
                <div className="bg-stone-100 p-1 rounded-full flex">
                   <button
                    onClick={() => setViewMode('list')}
                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}
                   >
                    <ListIcon className="w-3 h-3 inline mr-2" /> List
                   </button>
                   <button
                    onClick={() => setViewMode('map')}
                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}
                   >
                    <MapIcon className="w-3 h-3 inline mr-2" /> Map
                   </button>
                </div>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-8 py-12">
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {hotels?.map((h: any, idx: number) => (
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={h.hotel.id}
                    className="group"
                 >
                    <div className="aspect-[4/3] bg-stone-100 overflow-hidden mb-6 gold-border relative">
                       <img src="https://images.unsplash.com/photo-1549411013-91bdca44ef9c?w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                       <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="text-[10px] font-black">{h.hotel.reputation_score}</span>
                       </div>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-serif text-stone-900">{h.hotel.name}</h3>
                       <p className="text-sm font-bold text-stone-900">Nu. {h.starting_price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400 mb-6">
                       <MapPin className="w-3 h-3" />
                       <span className="text-[10px] uppercase font-black tracking-widest">{h.hotel.city} • {h.distance_km}km away</span>
                    </div>
                 </motion.div>
               ))}
            </div>
          ) : (
            <div className="h-[70vh] bg-stone-50 border border-stone-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
               <div className="text-stone-300 font-serif text-4xl italic opacity-50">[ Mapbox GL Implementation ]</div>
               <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
               {/* Marker Stubs */}
               <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-stone-900 rounded-full border-2 border-gold shadow-2xl animate-bounce" />
            </div>
          )}
       </div>
    </div>
  );
};
