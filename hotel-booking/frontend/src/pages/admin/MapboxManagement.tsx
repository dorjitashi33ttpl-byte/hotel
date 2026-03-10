import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { ShieldCheck, Map, Globe } from 'lucide-react';

export const MapboxManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="p-12 space-y-12">
        <div className="space-y-2">
           <nav className="flex text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">
              <span>Admin</span>
              <span className="mx-2">/</span>
              <span className="text-stone-900">Mapbox Keys</span>
           </nav>
           <h1 className="text-5xl font-serif tracking-tighter">Geospatial Keys</h1>
           <p className="text-stone-400 font-light text-lg">Manage the mystical connection to global mapping services.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="bg-white p-12 border border-stone-100 rounded-3xl space-y-12">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center">
                       <Map className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold">Public Token</h3>
                       <p className="text-[10px] text-stone-400 uppercase tracking-widest">For search & routing UI</p>
                    </div>
                 </div>
                 <span className="text-[9px] font-black uppercase text-green-500 px-3 py-1 border border-green-100 rounded-full bg-green-50">Active</span>
              </div>
              <input type="password" value="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNre..." className="wix-input w-full" readOnly />
              <button onClick={() => setIsModalOpen(true)} className="text-[10px] font-black uppercase text-gold border-b border-gold pb-1">Rotate Token</button>
           </div>

           <div className="bg-stone-900 text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="z-10 space-y-6">
                 <div className="flex items-center gap-4 text-gold">
                    <Globe className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Region Lockdown</span>
                 </div>
                 <h3 className="text-4xl font-serif tracking-tight">Geo-fencing Active</h3>
                 <p className="text-stone-400 font-light leading-relaxed max-w-xs">Mapping features are currently optimized for Bhutan and bordering regions to ensure financial efficiency.</p>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
           </div>
        </div>
      </div>

      <EntityFormModal
        title="Update Mapping Token"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-stone-400">New Mapbox API Token</label>
              <input className="wix-input w-full" placeholder="pk.ey..." />
           </div>
           <div className="p-8 bg-amber-50 border border-amber-100 text-amber-900 text-sm italic">
              Note: Rotating keys may cause momentary interruptions in sanctuary routing features.
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
