import React from 'react';
import { DataTable } from './framework/DataTable';
import { StatusBadge } from './framework/StatusBadge';
import { Eye } from 'lucide-react';

export const WebhookLogViewer: React.FC = () => {
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'target', header: 'Partner App / Gateway' },
    { key: 'event', header: 'Event Type' },
    { key: 'attempts', header: 'Retry Count' },
    {
      key: 'status',
      header: 'Delivery Status',
      render: (val: string) => <StatusBadge status={val} />
    },
    { key: 'timestamp', header: 'Last Attempt' },
  ];

  const mockData = [
    { id: 'WH-8821', target: 'Stripe Connect', event: 'payment.succeeded', attempts: 1, status: 'Success', timestamp: '2026-06-01 14:22:01' },
    { id: 'WH-8819', target: 'Agoda Partner API', event: 'booking.confirmed', attempts: 3, status: 'Failed', timestamp: '2026-06-01 14:15:44' },
    { id: 'WH-8815', target: 'Razorpay Webhook', event: 'refund.processed', attempts: 1, status: 'Success', timestamp: '2026-06-01 14:05:12' },
  ];

  return (
    <div className="space-y-12">
      <DataTable
        title="Webhook Chronicles"
        description="Monitor the synchronization state between our sanctuary and external realms."
        columns={columns}
        data={mockData}
        onView={(log) => alert('Inspecting Raw JSON for ' + log.id)}
      />
    </div>
  );
};
