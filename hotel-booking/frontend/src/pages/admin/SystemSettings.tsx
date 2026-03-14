import React from 'react';

export const SystemSettings = () => {
  return (
    <div className="p-12 max-w-4xl">
      <h1 className="text-3xl font-serif mb-12">System Orchestration</h1>

      <div className="space-y-12">
        <section className="bg-white p-8 border border-stone-100 shadow-sm">
           <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-8">Mapbox Configurations</h3>
           <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase mb-2">Public Token</label>
                <input type="text" className="w-full border-stone-200 p-3 font-mono text-xs" value="pk.eyJ1Ijo..." readOnly />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mb-2">Secret Key (Geocoding)</label>
                <input type="password" placeholder="••••••••••••" className="w-full border-stone-200 p-3" />
              </div>
           </div>
        </section>

        <section className="bg-white p-8 border border-stone-100 shadow-sm">
           <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-8">Platform Policies</h3>
           <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-stone-50">
                 <span className="text-sm">Enforce 2FA for Hotel Owners</span>
                 <input type="checkbox" checked readOnly />
              </div>
              <div className="flex justify-between items-center py-4 border-b border-stone-50">
                 <span className="text-sm">Automatic Hold Expiry (Minutes)</span>
                 <input type="number" className="w-20 border-stone-200 p-2 text-right" value={15} />
              </div>
           </div>
        </section>

        <button className="bg-stone-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-all">
           Save Configuration
        </button>
      </div>
    </div>
  );
};
