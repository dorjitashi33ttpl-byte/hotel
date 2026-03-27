import React, { useState } from 'react';
import { Terminal, Copy, Check, Info } from 'lucide-react';

export const BankTemplateConfig = ({ initialData, onSave }: any) => {
  const [template, setTemplate] = useState(initialData?.redirect_url_template || 'https://bank.bt/pay?bid={{bid}}&amt={{amt}}');
  const [method, setMethod] = useState(initialData?.http_method || 'GET');
  const [secret, setSecret] = useState('********************************');
  const [copied, setCopied] = useState(false);

  const placeholders = [
    { key: '{{bid}}', desc: 'Internal Booking ID' },
    { key: '{{amt}}', desc: 'Total Amount (Standard format)' },
    { key: '{{cur}}', desc: 'ISO Currency Code (e.g. BTN)' },
    { key: '{{callback_url}}', desc: 'The return URL for the bank to POST to' },
  ];

  return (
    <div className="space-y-12 bg-stone-50 p-12 border border-stone-100">
       <div className="flex items-start gap-6">
          <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center flex-shrink-0">
             <Terminal className="text-gold w-5 h-5" />
          </div>
          <div>
             <h3 className="text-xl font-serif text-stone-900">Redirect Engine Config</h3>
             <p className="text-stone-400 text-xs mt-2 uppercase tracking-widest font-bold">Local Bank Protocol</p>
          </div>
       </div>

       <div className="space-y-4">
          <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
             Redirect URL Template <Info className="w-3 h-3" />
          </label>
          <input
            className="w-full bg-white border border-stone-200 p-5 font-mono text-sm text-stone-700 outline-none focus:border-gold transition-colors shadow-sm"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
             {placeholders.map(p => (
               <div key={p.key} className="flex items-center gap-3 p-3 bg-white/50 rounded border border-stone-100">
                  <code className="text-[10px] text-gold font-bold">{p.key}</code>
                  <span className="text-[10px] text-stone-400 uppercase font-black tracking-tighter">{p.desc}</span>
               </div>
             ))}
          </div>
       </div>

       <div className="grid grid-cols-2 gap-12">
          <div className="space-y-4">
             <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">HTTP Method</label>
             <select className="w-full bg-white border border-stone-200 p-5 text-sm" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option>GET</option>
                <option>POST</option>
             </select>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">HMAC Signature Secret</label>
             <div className="relative">
                <input className="w-full bg-white border border-stone-200 p-5 text-sm font-mono" value={secret} readOnly />
                <button
                  onClick={() => { navigator.clipboard.writeText('whsec_bhutan_heritage_2026'); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-900 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
             </div>
          </div>
       </div>

       <div className="pt-8 border-t border-stone-200 flex justify-end">
          <button className="bg-stone-900 text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-700">
             Apply Protocol
          </button>
       </div>
    </div>
  );
};
