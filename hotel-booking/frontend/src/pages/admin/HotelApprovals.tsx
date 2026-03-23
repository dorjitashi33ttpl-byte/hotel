import React from 'react';
import { DataTable } from '../../components/admin/framework/DataTable';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';

export const HotelApprovals = () => {
  const columns = [
    { header: 'Property Name', accessor: 'name' },
    { header: 'Location', accessor: 'city' },
    {
      header: 'Review Status',
      accessor: 'status',
      render: (val: string) => <StatusBadge status={val} />
    },
    { header: 'Submitted', accessor: 'created_at' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-serif mb-8">Property Onboarding Queue</h1>
      <DataTable
        columns={columns}
        endpoint="/admin/onboarding/queue"
        bulkActions={[
           { label: 'Approve Selected', action: (items) => console.log('Approving', items) },
           { label: 'Reject', action: (items) => console.log('Rejecting', items) }
        ]}
      />
    </div>
  );
};
