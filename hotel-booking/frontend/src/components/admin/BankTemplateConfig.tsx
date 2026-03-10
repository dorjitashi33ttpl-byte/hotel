import React from 'react';

export const BankTemplateConfig: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-12 rounded-[40px] shadow-2xl mt-12">
      <h2 className="text-3xl font-black mb-8">Local Bank Template Engine</h2>
      <div className="space-y-8 max-w-3xl">
        <div className="grid grid-cols-2 gap-8">
           <div className="flex flex-col gap-2">
             <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Redirect URL</label>
             <input className="bg-gray-800 p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500" defaultValue="https://bnb.bt/pay" />
           </div>
           <div className="flex flex-col gap-2">
             <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Signature Method</label>
             <select className="bg-gray-800 p-4 rounded-2xl outline-none">
               <option>HMAC-SHA256</option>
               <option>RSA-SHA256</option>
             </select>
           </div>
        </div>
        <div className="flex flex-col gap-2">
           <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Parameter Mapping (JSON)</label>
           <textarea className="bg-gray-800 p-6 rounded-2xl outline-none h-32 font-mono text-sm" defaultValue='{ "booking_id": "ref", "amount": "amt" }' />
        </div>
        <button className="bg-blue-600 px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-900/40">Save Engine Config</button>
      </div>
    </div>
  );
};
