import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../../services/api';
import { Key, RefreshCw, Globe, Shield, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PartnerAccess = ({ hotelId }: { hotelId: string }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: partnerConfig } = useQuery(['partner-config', hotelId], () =>
    api.get(`/tenant/hotels/${hotelId}/partner-config`).then(r => r.data)
  );

  const rotateKey = useMutation(
    () => api.post(`/tenant/hotels/${hotelId}/partner-config/rotate-key`),
    { onSuccess: () => queryClient.invalidateQueries('partner-config') }
  );

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-12">
       <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-serif text-stone-900">Partner Connectivity</h2>
            <p className="text-stone-400 text-xs uppercase tracking-widest mt-3 font-black">OTA Integrations & API Access</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase text-stone-600">v1.0 API Stable</span>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white border border-stone-100 p-10 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-xl font-serif text-stone-900">API Credentials</h3>
                   <button
                     onClick={() => rotateKey.mutate()}
                     className="text-[10px] font-black uppercase text-gold hover:text-stone-900 flex items-center gap-2 transition-all"
                   >
                      <RefreshCw className="w-3 h-3" /> Rotate Keys
                   </button>
                </div>

                <div className="space-y-8">
                   <div className="space-y-3">
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Client Identifier</label>
                      <div className="flex items-center gap-4 bg-stone-50 p-4 border border-stone-100 rounded-lg">
                         <code className="flex-1 text-sm font-mono text-stone-600">hotel_client_83921_prod</code>
                         <button onClick={() => handleCopy('hotel_client_83921_prod', 'id')} className="text-stone-300 hover:text-stone-900">
                            {copied === 'id' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                         </button>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Client Secret</label>
                      <div className="flex items-center gap-4 bg-stone-50 p-4 border border-stone-100 rounded-lg">
                         <code className="flex-1 text-sm font-mono text-stone-600">••••••••••••••••••••••••••••••••</code>
                         <button className="text-[9px] font-black uppercase text-gold border border-gold/20 px-3 py-1">Reveal</button>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-white border border-stone-100 p-10 rounded-2xl shadow-sm">
                <h3 className="text-xl font-serif text-stone-900 mb-10">Endpoint Configuration</h3>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                      <div className="flex items-center gap-4">
                         <Globe className="w-5 h-5 text-stone-300" />
                         <span className="text-sm font-medium text-stone-700">Webhook URL</span>
                      </div>
                      <span className="text-xs text-stone-400 italic font-light">Not configured</span>
                   </div>
                   <button className="w-full py-4 border-2 border-dashed border-stone-100 rounded-xl text-[10px] font-black uppercase text-stone-400 hover:text-gold hover:border-gold transition-all">
                      Configure Webhooks
                   </button>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="bg-stone-900 text-white p-10 rounded-2xl shadow-xl border-t-4 border-gold">
                <h4 className="text-xs font-black uppercase tracking-widest text-gold mb-6">Security Posture</h4>
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                      <Shield className="w-5 h-5 text-gold mt-1" />
                      <div>
                         <p className="text-sm font-bold">HMAC-SHA256</p>
                         <p className="text-[10px] text-stone-500 leading-relaxed uppercase mt-1">All partner events are cryptographically signed for integrity.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-8 bg-stone-50 border border-stone-100">
                <h4 className="text-[10px] font-black uppercase text-stone-400 tracking-widest mb-6">Quota Usage</h4>
                <div className="h-1 bg-stone-200 w-full mb-4">
                   <div className="h-full bg-stone-900" style={{ width: '42%' }} />
                </div>
                <p className="text-[10px] font-bold text-stone-600">421 / 1,000 daily requests</p>
             </div>
          </div>
       </div>
    </div>
  );
};
