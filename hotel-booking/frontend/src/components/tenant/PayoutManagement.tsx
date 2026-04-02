import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { api } from '../../services/api';
import { DataTable } from '../admin/framework/DataTable';
import { StatusBadge } from '../admin/framework/StatusBadge';
import { DollarSign, ArrowUpRight, History } from 'lucide-react';
import { motion } from 'framer-motion';

export const PayoutManagement = ({ hotelId }: { hotelId: string }) => {
  const { data: balance } = useQuery(['payout-balance', hotelId], () => api.get(`/tenant/hotels/${hotelId}/payout-balance`).then(r => r.data));

  const columns = [
    { header: 'Reference', accessor: 'id' },
    { header: 'Amount', accessor: 'amount', render: (v: number) => `Nu. ${v.toLocaleString()}` },
    { header: 'Status', accessor: 'status', render: (v: string) => <StatusBadge status={v} /> },
    { header: 'Processed At', accessor: 'processed_at' },
  ];

  return (
    <div className="p-12 space-y-16">
       <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-serif text-stone-900">Financial Settlements</h2>
            <p className="text-stone-400 text-xs uppercase tracking-widest mt-3 font-black">Commission Ledger & Payouts</p>
          </div>
          <div className="bg-stone-900 text-white p-10 flex gap-12 rounded shadow-2xl">
             <div>
                <p className="text-[9px] text-stone-500 uppercase font-black tracking-widest mb-2">Net Payout Balance</p>
                <p className="text-3xl font-serif text-gold">Nu. {balance?.balance?.toLocaleString() || '0'}</p>
             </div>
             <div className="flex items-end">
                <button className="bg-gold text-stone-900 px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                   Request Payout
                </button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
             <div className="flex items-center gap-4 mb-8">
                <History className="w-5 h-5 text-stone-400" />
                <h3 className="text-xl font-serif text-stone-900">Payout History</h3>
             </div>
             <DataTable
               columns={columns}
               endpoint={`/tenant/hotels/${hotelId}/payouts`}
             />
          </div>
          <div className="space-y-8">
             <div className="p-8 bg-stone-50 border border-stone-100">
                <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-6">Platform Fees</h4>
                <div className="flex justify-between items-center py-4 border-b border-stone-200">
                   <span className="text-sm text-stone-600">Standard Commission</span>
                   <span className="font-bold text-stone-900">2.0%</span>
                </div>
                <div className="flex justify-between items-center py-4">
                   <span className="text-sm text-stone-600">Processing Fee</span>
                   <span className="font-bold text-stone-900">Waived</span>
                </div>
             </div>
             <div className="p-8 bg-gold/5 border border-gold/20 italic text-gold-800 text-xs leading-relaxed">
                Payouts are processed every Tuesday. Ensure your Bhutanese bank details (BNB/BOB) are up to date in the property settings.
             </div>
          </div>
       </div>
    </div>
  );
};
