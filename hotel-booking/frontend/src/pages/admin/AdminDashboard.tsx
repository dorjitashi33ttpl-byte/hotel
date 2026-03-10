import React from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import {
  Users, Building, CreditCard, Activity,
  ArrowUpRight, ArrowDownRight, Globe
} from 'lucide-react';

const stats = [
  { label: 'Total Inhabitants', value: '1,248', change: '+12%', trend: 'up' },
  { label: 'Active Sanctuaries', value: '42', change: '+4%', trend: 'up' },
  { label: 'Gross Offerings', value: 'BTN 1.2M', change: '-2%', trend: 'down' },
  { label: 'Active Webhooks', value: '15', change: 'Stable', trend: 'neutral' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-12 space-y-12">
        <div className="space-y-2">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold block mb-4">Supreme Overseer</span>
           <h1 className="text-5xl font-serif tracking-tighter">Platform Essence</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {stats.map(s => (
             <div key={s.label} className="bg-white p-8 border border-stone-100 shadow-sm rounded-2xl group hover:shadow-xl transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">{s.label}</span>
                   {s.trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-baseline gap-4">
                   <span className="text-3xl font-serif">{s.value}</span>
                   <span className={`text-[10px] font-black ${s.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{s.change}</span>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="bg-white border border-stone-100 p-12 rounded-3xl space-y-8">
              <h3 className="text-2xl font-serif">Recent Manifestations</h3>
              <div className="space-y-6">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center justify-between border-b border-stone-50 pb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center">
                            <Users className="w-4 h-4 text-stone-400" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-stone-900">New User Registered</p>
                            <p className="text-[10px] text-stone-400 uppercase tracking-widest">2 minutes ago</p>
                         </div>
                      </div>
                      <button className="text-[9px] font-black uppercase tracking-widest text-gold">View</button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-stone-900 text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="z-10 space-y-6">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500">Ecosystem Health</span>
                 <h3 className="text-4xl font-serif">Global Sync Status</h3>
                 <div className="flex items-center gap-4 text-green-400">
                    <Globe className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-bold tracking-widest uppercase">All Nodes Optimal</span>
                 </div>
              </div>
              <button className="mt-12 bg-white text-stone-900 py-4 px-8 rounded-2xl font-serif text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-500 relative z-10">
                 Run System Diagnostics
              </button>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};
