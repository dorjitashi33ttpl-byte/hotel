import React from 'react';
import { DataTable } from './framework/DataTable';
import { EntityFormModal } from './framework/EntityFormModal';
import { StatusBadge } from './framework/StatusBadge';

export const PaymentRegistry = () => {
  const columns = [
    { header: 'Provider', accessor: 'provider_type' },
    { header: 'Country', accessor: 'country_name' },
    {
      header: 'Status',
      accessor: 'is_active',
      render: (val: boolean) => <StatusBadge status={val ? 'ACTIVE' : 'INACTIVE'} />
    },
    { header: 'Currencies', accessor: 'supported_currencies' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif">Payment Provider Registry</h1>
        <button className="bg-stone-900 text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors">
          Add Provider
        </button>
      </div>

      <DataTable
        columns={columns}
        endpoint="/admin/payments/providers"
      />

      {/* Simplified Modal Logic */}
      <EntityFormModal
        title="Configure Gateway"
        isOpen={false}
        onClose={() => {}}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase mb-2">API Keys (Encrypted)</label>
            <textarea className="w-full border-stone-200 p-3 font-mono text-sm" rows={4} placeholder='{"public_key": "...", "secret_key": "..."}' />
          </div>
        </div>
      </EntityFormModal>
    </div>
  );
};
