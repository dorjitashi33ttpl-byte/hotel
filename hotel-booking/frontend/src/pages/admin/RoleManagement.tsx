import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';

export const RoleManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const columns = [
    { key: 'name', header: 'Role Name' },
    { key: 'description', header: 'Description' },
    { key: 'user_count', header: 'Inhabitants' },
    {
      key: 'status',
      header: 'Status',
      render: (val: string) => <StatusBadge status={val} />
    },
  ];

  const mockData = [
    { id: 1, name: 'platform_admin', description: 'Supreme authority over the ecosystem.', user_count: 5, status: 'Active' },
    { id: 2, name: 'hotel_owner', description: 'Management rights for a specific tenant.', user_count: 142, status: 'Active' },
    { id: 3, name: 'support_agent', description: 'Limited access for issue resolution.', user_count: 12, status: 'Active' },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Role Identities"
        description="Define the access hierarchies and mystical powers of each user group."
        columns={columns}
        data={mockData}
        onAdd={() => setIsModalOpen(true)}
        onEdit={(r) => { setSelectedRole(r); setIsModalOpen(true); }}
        onDelete={(r) => alert('Dissolving Role ' + r.name)}
      />

      <EntityFormModal
        title={selectedRole ? 'Refine Role Essence' : 'Manifest New Role'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Unique Identifier</label>
              <input className="wix-input w-full" placeholder="e.g. concierge_staff" defaultValue={selectedRole?.name} />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Description</label>
              <textarea className="wix-input w-full h-32" placeholder="Describe the duties of this role..." defaultValue={selectedRole?.description} />
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
