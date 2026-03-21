import React from 'react';
import { DataTable } from '../../components/admin/framework/DataTable';

export const AuditLogManagement = () => {
  const columns = [
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Action', accessor: 'action' },
    { header: 'Resource', accessor: 'resource_type' },
    { header: 'User', accessor: 'user_email' },
    { header: 'IP', accessor: 'ip_address' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-serif mb-8">Platform Audit Chronicles</h1>
      <DataTable
        columns={columns}
        endpoint="/admin/audit-logs"
      />
    </div>
  );
};
