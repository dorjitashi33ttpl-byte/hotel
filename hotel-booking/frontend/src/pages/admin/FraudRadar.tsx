import React from 'react';
import { DataTable } from '../../components/admin/framework/DataTable';
import { ShieldAlert, Eye } from 'lucide-react';

export const FraudRadar = () => {
  const columns = [
    { header: 'Booking Ref', accessor: 'booking_id' },
    { header: 'Guest', accessor: 'guest_name' },
    {
      header: 'Risk Score',
      accessor: 'risk_score',
      render: (val: number) => (
        <div className="flex items-center gap-2">
           <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden w-24">
              <div className="bg-red-500 h-full" style={{ width: `${val}%` }} />
           </div>
           <span className="text-[10px] font-black text-red-600">{val}/100</span>
        </div>
      )
    },
    { header: 'Amount', accessor: 'amount', render: (val: number) => `Nu. ${val.toLocaleString()}` },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
         <ShieldAlert className="w-8 h-8 text-red-500" />
         <h1 className="text-2xl font-serif">Fraud Radar</h1>
      </div>

      <DataTable
        columns={columns}
        endpoint="/admin/fraud/alerts"
        onView={(item) => console.log('Viewing alert', item)}
      />
    </div>
  );
};
