import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';

export const UserManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const columns = [
    { key: 'full_name', header: 'Full Name' },
    { key: 'email', header: 'Email Address' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      render: (val: string) => <StatusBadge status={val} />
    },
    { key: 'last_login', header: 'Last Login' },
  ];

  const mockData = [
    { id: 1, full_name: 'Tashi Dorji', email: 'tashi@druk.bt', role: 'Platform Admin', status: 'Active', last_login: '2 hours ago' },
    { id: 2, full_name: 'Karma Wangmo', email: 'karma@hotel.bt', role: 'Hotel Owner', status: 'Active', last_login: '5 mins ago' },
    { id: 3, full_name: 'Support Agent', email: 'support@hotel.bt', role: 'Support', status: 'Pending', last_login: 'Never' },
  ];

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <DataTable
        title="User Management"
        description="Oversee all platform and tenant-level identities within the sanctuary."
        columns={columns}
        data={mockData}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={(u) => alert('Deleting ' + u.full_name)}
        onExport={() => alert('Exporting Users...')}
        onImport={() => alert('Importing Users...')}
      />

      <EntityFormModal
        title={selectedUser ? 'Refine User Identity' : 'Invite New Inhabitant'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-8">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Full Name</label>
                 <input className="wix-input w-full" placeholder="e.g. Sonam Peldon" defaultValue={selectedUser?.full_name} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Email Address</label>
                 <input className="wix-input w-full" placeholder="e.g. sonam@druk.bt" defaultValue={selectedUser?.email} />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Assigned Role</label>
              <select className="w-full bg-transparent border-b border-stone-200 py-3 outline-none font-serif text-lg">
                 <option>Platform Admin</option>
                 <option>Support Agent</option>
                 <option>Hotel Owner</option>
                 <option>Hotel Staff</option>
              </select>
           </div>

           <div className="p-8 bg-stone-50 border border-stone-100 italic text-stone-500 text-sm">
              Note: Changing a role will re-sync permissions across all sanctuary nodes immediately.
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
