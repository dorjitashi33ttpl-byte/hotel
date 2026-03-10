import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';

export const CountryManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const columns = [
    { key: 'name', header: 'Country Name' },
    { key: 'iso_code', header: 'ISO Code' },
    { key: 'currency', header: 'Currency' },
    { key: 'timezone', header: 'Timezone' },
    {
      key: 'status',
      header: 'Status',
      render: (val: string) => <StatusBadge status={val} />
    },
  ];

  const mockData = [
    { id: 1, name: 'Bhutan', iso_code: 'BT', currency: 'BTN', timezone: 'Asia/Thimphu', status: 'Active' },
    { id: 2, name: 'India', iso_code: 'IN', currency: 'INR', timezone: 'Asia/Kolkata', status: 'Active' },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Country Masters"
        description="Manage the geopolitical reach of the sanctuary ecosystem."
        columns={columns}
        data={mockData}
        onAdd={() => setIsModalOpen(true)}
        onEdit={(i) => { setSelected(i); setIsModalOpen(true); }}
        onDelete={(i) => alert('Deleting ' + i.name)}
      />

      <EntityFormModal
        title={selected ? 'Update Territory' : 'Map New Territory'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Country Name</label>
              <input className="wix-input w-full" placeholder="e.g. Thailand" defaultValue={selected?.name} />
           </div>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">ISO Code</label>
                 <input className="wix-input w-full" placeholder="e.g. TH" defaultValue={selected?.iso_code} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Currency</label>
                 <input className="wix-input w-full" placeholder="e.g. THB" defaultValue={selected?.currency} />
              </div>
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
