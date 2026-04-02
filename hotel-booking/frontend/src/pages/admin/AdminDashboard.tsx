import React from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { PlatformPulse } from '../../components/admin/PlatformPulse';
import { motion } from 'framer-motion';
import { Hotel, Users, ShieldAlert, CreditCard } from 'lucide-react';

export const AdminDashboard = () => {
  const quickStats = [
    { label: 'Active Sanctuaries', val: '42', icon: Hotel },
    { label: 'Verified Citizens', val: '1,204', icon: Users },
    { label: 'High Risk Alerts', val: '3', icon: ShieldAlert, color: 'text-red-500' },
    { label: 'Pending Payouts', val: 'Nu. 240k', icon: CreditCard },
  ];

  return (
    <AdminLayout>
      <div className="p-12 space-y-16">
        <div className="flex justify-between items-end">
           <div>
              <h1 className="text-4xl font-serif text-stone-900">Sanctuary Command</h1>
              <p className="text-stone-500 text-sm mt-3 font-light">Global governance of the boutique hotel ecosystem.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {quickStats.map((s, idx) => (
             <motion.div
               key={s.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white border border-stone-100 p-8 shadow-sm rounded-xl group hover:border-gold transition-all"
             >
                <div className="flex justify-between items-center mb-6">
                   <s.icon className={`w-5 h-5 ${s.color || 'text-stone-300'} group-hover:text-gold transition-colors`} />
                </div>
                <p className="text-2xl font-serif text-stone-900 mb-1">{s.val}</p>
                <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest">{s.label}</p>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2">
              <PlatformPulse />
           </div>
           <div className="space-y-8">
              <div className="bg-stone-900 text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-xl font-serif mb-6 text-gold">Market Expansion</h3>
                    <p className="text-sm text-stone-400 leading-relaxed mb-8 font-light">
                       Thailand and India territories are currently in preparation. Local bank templates are 80% mapped.
                    </p>
                    <button className="text-[10px] font-black uppercase text-white border-b border-white/30 pb-1">View Readiness</button>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>

              <div className="p-8 border border-stone-100 bg-white">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-8">System Health</h4>
                 <div className="space-y-6">
                    {['PostGIS Engine', 'Redis Cache', 'Celery Workers', 'Mapbox API'].map(h => (
                      <div key={h} className="flex justify-between items-center">
                         <span className="text-xs font-bold text-stone-700">{h}</span>
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-black uppercase text-stone-400">Stable</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};
