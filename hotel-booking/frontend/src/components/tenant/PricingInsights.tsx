import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Percent } from 'lucide-react';

export const PricingInsights = ({ hotelId }: { hotelId: string }) => {
  const { data: metrics, isLoading } = useQuery(['pricing-metrics', hotelId], () => api.get(`/tenant/hotels/${hotelId}/metrics`).then(r => r.data));

  const stats = [
    { label: 'ADR', value: `Nu. ${metrics?.adr || '0'}`, sub: 'Avg Daily Rate', icon: DollarSign, color: 'text-gold' },
    { label: 'RevPAR', value: `Nu. ${metrics?.revpar || '0'}`, sub: 'Rev Per Room', icon: TrendingUp, color: 'text-stone-900' },
    { label: 'Occupancy', value: `${metrics?.occupancy_rate || '0'}%`, sub: '30-Day Average', icon: Percent, color: 'text-gold' },
  ];

  if (isLoading) return <div className="p-12 animate-pulse text-[10px] font-black uppercase tracking-widest text-stone-300">Calculating yields...</div>;

  return (
    <div className="space-y-12">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-stone-100 p-10 shadow-sm hover:shadow-md transition-all group"
            >
               <div className="flex justify-between items-start mb-8">
                  <div className={`p-3 bg-stone-50 rounded-full group-hover:bg-gold/10 transition-colors ${s.color}`}>
                     <s.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{s.label}</span>
               </div>
               <p className="text-3xl font-serif text-stone-900 mb-2">{s.value}</p>
               <p className="text-[10px] text-stone-400 uppercase font-bold tracking-tighter">{s.sub}</p>
            </motion.div>
          ))}
       </div>

       <div className="bg-stone-900 p-12 text-white overflow-hidden relative">
          <div className="relative z-10">
             <h3 className="text-xl font-serif mb-2">Yield Forecast</h3>
             <p className="text-stone-400 text-[10px] uppercase tracking-widest font-black mb-10">AI-Driven Revenue Potential</p>

             <div className="flex items-end gap-2 h-32">
                {[45, 62, 58, 75, 90, 85, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                    className="flex-1 bg-gold/40 border-t border-gold hover:bg-gold transition-colors"
                  />
                ))}
             </div>
             <div className="flex justify-between mt-6 border-t border-white/10 pt-4">
                <span className="text-[9px] text-stone-500 uppercase tracking-tighter">Current Week</span>
                <span className="text-[9px] text-stone-500 uppercase tracking-tighter">Forecasted Peak</span>
             </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
       </div>
    </div>
  );
};
