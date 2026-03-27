import React from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';
import { ShieldAlert, Fingerprint, MapPin } from 'lucide-react';

export const FraudRadar = () => {
  const columns = [
    {
        header: 'Risk Level',
        accessor: 'risk_level',
        render: (val: string) => (
            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                val === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
            }`}>
                {val}
            </span>
        )
    },
    { header: 'Reasoning', accessor: 'reason' },
    { header: 'Source IP', accessor: 'ip_address' },
    { header: 'Detected', accessor: 'timestamp' },
    {
        header: 'Intelligence',
        accessor: 'id',
        render: () => (
            <div className="flex gap-4 text-stone-300">
                <Fingerprint className="w-4 h-4" />
                <MapPin className="w-4 h-4" />
            </div>
        )
    }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-start gap-6 mb-16">
           <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <ShieldAlert className="text-red-600 w-8 h-8" />
           </div>
           <div>
              <h1 className="text-4xl font-serif text-stone-900">Fraud Radar</h1>
              <p className="text-stone-500 text-sm mt-2">Automated threat detection and behavioral analysis.</p>
           </div>
        </div>

        <DataTable
          columns={columns}
          endpoint="/admin/fraud/alerts"
          bulkActions={[
             { label: 'Blacklist IP', action: (items) => console.log('Blacklisting', items) },
             { label: 'Dismiss Alert', action: (items) => console.log('Dismissing', items) }
          ]}
        />
      </div>
    </AdminLayout>
  );
};
