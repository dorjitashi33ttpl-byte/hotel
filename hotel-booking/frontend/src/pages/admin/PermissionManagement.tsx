import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';

export const PermissionManagement: React.FC = () => {
  const columns = [
    { key: 'code', header: 'Permission Code' },
    { key: 'module', header: 'Domain' },
    { key: 'description', header: 'Description' },
    {
      key: 'status',
      header: 'Sync State',
      render: (val: string) => <StatusBadge status={val} />
    },
  ];

  const mockData = [
    { code: 'inventory.manage', module: 'Property', description: 'Modify rooms and rates.', status: 'Active' },
    { code: 'payout.approve', module: 'Finance', description: 'Authorize funds transfer.', status: 'Active' },
    { code: 'audit.view', module: 'System', description: 'Inspect sanctuary chronicles.', status: 'Active' },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Sanctuary Permissions"
        description="Granular control over every mystical action within the realm."
        columns={columns}
        data={mockData}
        onAdd={() => alert('New permissions must be declared in backend code.')}
      />
    </AdminLayout>
  );
};
