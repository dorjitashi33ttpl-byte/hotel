import React from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';

export const AuditLogManagement: React.FC = () => {
  const columns = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'user', header: 'Inhabitant' },
    { key: 'action', header: 'Action' },
    { key: 'resource', header: 'Resource' },
    {
      key: 'status',
      header: 'Outcome',
      render: (val: string) => <StatusBadge status={val} />
    },
  ];

  const mockData = [
    { timestamp: '2026-06-01 12:44:12', user: 'Tashi Dorji', action: 'CREATE_TENANT', resource: 'Amankora Paro', status: 'Success' },
    { timestamp: '2026-06-01 12:40:05', user: 'Karma Wangmo', action: 'UPDATE_TAX', resource: 'SDF Rule', status: 'Success' },
    { timestamp: '2026-06-01 12:35:18', user: 'Support Agent', action: 'DELETE_USER', resource: 'Test User', status: 'Failed' },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Sanctuary Chronicles"
        description="Immutable record of every significant manifestation within the system."
        columns={columns}
        data={mockData}
        onExport={() => alert('Exporting Chronicles...')}
      />
    </AdminLayout>
  );
};
