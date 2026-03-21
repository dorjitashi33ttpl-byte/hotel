import React from 'react';
import { DataTable } from './framework/DataTable';

export const WebhookLogViewer = () => {
  const columns = [
    { header: 'Event', accessor: 'event_type' },
    { header: 'Partner', accessor: 'partner_name' },
    {
      header: 'Status',
      accessor: 'status_code',
      render: (val: number) => (
        <span className={`px-2 py-1 text-[9px] font-black ${val >= 200 && val < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {val}
        </span>
      )
    },
    { header: 'Latency', accessor: 'duration_ms', render: (val: number) => `${val}ms` },
    { header: 'Time', accessor: 'created_at' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-serif mb-8">Partner Webhook Chronicles</h1>
      <DataTable
        columns={columns}
        endpoint="/admin/partner/webhook-logs"
      />
    </div>
  );
};
