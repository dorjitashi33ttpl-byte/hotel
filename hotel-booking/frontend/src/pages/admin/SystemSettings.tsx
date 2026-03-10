import React from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { Settings, Shield, Bell, Globe } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-12 space-y-16 max-w-4xl">
        <div className="space-y-2">
           <h1 className="text-5xl font-serif tracking-tighter">System Pulse</h1>
           <p className="text-stone-400 font-light text-lg">Fine-tune the global parameters of the sanctuary ecosystem.</p>
        </div>

        <div className="space-y-12">
           <section className="space-y-8">
              <div className="flex items-center gap-4 text-gold border-b border-stone-100 pb-4">
                 <Shield className="w-5 h-5" />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Security & Auth</h2>
              </div>
              <div className="grid grid-cols-1 gap-8">
                 <div className="flex justify-between items-center">
                    <div>
                       <p className="text-sm font-bold text-stone-900">Enforce Multi-Factor (SSO)</p>
                       <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Required for all platform admins</p>
                    </div>
                    <div className="w-12 h-6 bg-stone-900 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
                 </div>
                 <div className="flex justify-between items-center">
                    <div>
                       <p className="text-sm font-bold text-stone-900">Auto-hold Expiration (Minutes)</p>
                       <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Default inventory lock time</p>
                    </div>
                    <input type="number" defaultValue={15} className="w-20 bg-stone-50 border-b border-stone-200 text-center outline-none font-serif" />
                 </div>
              </div>
           </section>

           <section className="space-y-8">
              <div className="flex items-center gap-4 text-gold border-b border-stone-100 pb-4">
                 <Bell className="w-5 h-5" />
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em]">Global Notifications</h2>
              </div>
              <div className="grid grid-cols-1 gap-8">
                 <div className="flex justify-between items-center text-stone-400">
                    <p className="text-sm font-medium">Broadcast system alerts to all tenants</p>
                    <div className="w-12 h-6 bg-stone-200 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" /></div>
                 </div>
              </div>
           </section>
        </div>

        <div className="pt-12 border-t border-stone-100">
           <button className="btn-wix-luxury w-full py-6">Commit Global Changes</button>
        </div>
      </div>
    </AdminLayout>
  );
};
