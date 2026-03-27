import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { motion } from 'framer-motion';
import { Save, Globe, Lock, Bell, ShieldCheck } from 'lucide-react';

export const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('global');

  const tabs = [
    { id: 'global', label: 'Global Defaults', icon: Globe },
    { id: 'localization', label: 'Bhutan Config', icon: ShieldCheck },
    { id: 'security', label: 'API & Keys', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl">
        <div className="flex justify-between items-end mb-12">
           <div>
              <h1 className="text-4xl font-serif text-stone-900 mb-2">Platform Governance</h1>
              <p className="text-stone-500 text-sm">Orchestrate the global parameters of the sanctuary network.</p>
           </div>
           <button className="bg-stone-900 text-white px-8 py-3 text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-gold transition-all">
              <Save className="w-4 h-4" /> Save Configuration
           </button>
        </div>

        <div className="flex gap-12">
           <div className="w-64 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-xs uppercase tracking-widest font-bold transition-all ${activeTab === tab.id ? 'bg-stone-100 text-stone-900 border-l-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
           </div>

           <div className="flex-1 bg-white border border-stone-100 p-12 shadow-sm">
              {activeTab === 'global' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Base Currency</label>
                         <select className="wix-input w-full"><option>USD</option><option>BTN</option></select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Commission Rate (%)</label>
                         <input className="wix-input w-full" defaultValue="2.0" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Platform Support Email</label>
                      <input className="wix-input w-full" defaultValue="support@hotel-masterpiece.bt" />
                   </div>
                </motion.div>
              )}

              {activeTab === 'localization' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Default Tax Label</label>
                      <input className="wix-input w-full" defaultValue="BST (Bhutan Sales Tax)" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">SDF Rate (per night)</label>
                      <input className="wix-input w-full" defaultValue="1200" />
                   </div>
                   <div className="p-6 bg-stone-50 border border-stone-100">
                      <p className="text-[11px] text-stone-500 leading-relaxed italic">
                        Bhutanese regional settings include automated Dzongkhag tax validation and
                        standard Nu. (BTN) rounding rules.
                      </p>
                   </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Mapbox Public Token</label>
                      <input className="wix-input w-full font-mono text-[11px]" placeholder="pk.eyJ1..." />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Webhook Signing Secret</label>
                      <input className="wix-input w-full font-mono text-[11px]" defaultValue="whsec_83921..." readOnly />
                   </div>
                </motion.div>
              )}
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};
