import React, { useState } from 'react';
import { Settings, Shield, Globe, Save } from 'lucide-react';

export const BankTemplateConfig = () => {
  const [template, setTemplate] = useState({
    bankName: 'Bank of Bhutan (BoB)',
    redirectUrl: 'https://payment.bob.bt/pay',
    method: 'POST',
    hmacKey: '••••••••••••••••',
    bodyTemplate: '{"booking_id": "{{booking_id}}", "amount": {{amount}}, "token": "{{secret}}"}'
  });

  return (
    <div className="p-12 max-w-4xl">
      <div className="flex justify-between items-end mb-12">
        <div>
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold block mb-4">Payment Orchestration</span>
           <h1 className="text-4xl font-serif">Local Bank Template Engine</h1>
        </div>
        <button className="flex items-center gap-3 bg-stone-900 text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500">
           <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
         <section className="bg-white p-10 border border-stone-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-stone-50 pb-6">
               <Globe className="w-5 h-5 text-stone-300" />
               <h3 className="text-sm font-bold uppercase tracking-widest">Gateway Endpoints</h3>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Bank Name</label>
                  <input value={template.bankName} className="w-full border-stone-200 p-3 text-sm focus:border-gold outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Redirect URL</label>
                  <input value={template.redirectUrl} className="w-full border-stone-200 p-3 text-sm font-mono focus:border-gold outline-none" />
               </div>
            </div>
         </section>

         <section className="bg-white p-10 border border-stone-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4 border-b border-stone-50 pb-6">
               <Shield className="w-5 h-5 text-stone-300" />
               <h3 className="text-sm font-bold uppercase tracking-widest">Security & Signature</h3>
            </div>

            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">HMAC Shared Secret</label>
                  <input type="password" value={template.hmacKey} className="w-full border-stone-200 p-3 text-sm focus:border-gold outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-stone-400">Payload Template (Jinja2)</label>
                  <textarea rows={4} value={template.bodyTemplate} className="w-full border-stone-200 p-4 text-xs font-mono bg-stone-50 focus:border-gold outline-none" />
               </div>
            </div>
         </section>
      </div>
    </div>
  );
};
