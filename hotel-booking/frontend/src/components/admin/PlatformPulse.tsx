import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { motion } from 'framer-motion';

export const PlatformPulse = () => {
  const { data } = useQuery('admin-pulse', () => api.get('/admin/reports/revenue-by-region').then(r => r.data));

  const stats = data || [
    { region: 'Thimphu', revenue: 1240000, bookings: 142 },
    { region: 'Paro', revenue: 890000, bookings: 98 },
    { region: 'Bumthang', revenue: 450000, bookings: 34 },
  ];

  const maxRev = Math.max(...stats.map((s:any) => s.revenue));

  return (
    <div className="p-12 bg-white border border-stone-100 shadow-sm">
       <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif text-stone-900">Revenue by Dzongkhag</h2>
            <p className="text-stone-400 text-xs uppercase tracking-widest mt-2 font-black">Platform Economic Pulse</p>
          </div>
          <div className="text-right">
             <p className="text-2xl font-serif text-gold">Nu. {(stats.reduce((a:any, b:any) => a + b.revenue, 0)).toLocaleString()}</p>
             <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Total Gross Volume</p>
          </div>
       </div>

       <div className="space-y-12">
          {stats.map((s:any) => (
            <div key={s.region}>
               <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold text-stone-900 uppercase tracking-widest">{s.region}</span>
                  <span className="text-xs text-stone-400">Nu. {s.revenue.toLocaleString()} ({s.bookings} stays)</span>
               </div>
               <div className="h-1 bg-stone-50 w-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.revenue / maxRev) * 100}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gold"
                  />
               </div>
            </div>
          ))}
       </div>

       <div className="mt-16 pt-12 border-t border-stone-50 flex gap-12">
          <div>
             <p className="text-xl font-serif text-stone-900">2.0%</p>
             <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Base Commission</p>
          </div>
          <div>
             <p className="text-xl font-serif text-stone-900">Nu. {(stats.reduce((a:any, b:any) => a + b.revenue, 0) * 0.02).toLocaleString()}</p>
             <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Platform Earnings</p>
          </div>
       </div>
    </div>
  );
};
