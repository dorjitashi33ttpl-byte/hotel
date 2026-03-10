import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';

export const RegionManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const columns = [
    { key: 'name', header: 'Region / Dzongkhag' },
    { key: 'country', header: 'Country' },
    { key: 'hotel_count', header: 'Sanctuaries' },
    {
      key: 'status',
      header: 'Operational',
      render: (val: string) => <StatusBadge status={val} />
    },
  ];

  const mockData = [
    { id: 1, name: 'Thimphu', country: 'Bhutan', hotel_count: 12, status: 'Active' },
    { id: 2, name: 'Paro', country: 'Bhutan', hotel_count: 8, status: 'Active' },
    { id: 3, name: 'Punakha', country: 'Bhutan', hotel_count: 4, status: 'Active' },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Regional Masters"
        description="Govern the administrative divisions and sanctuary clusters across territories."
        columns={columns}
        data={mockData}
        onAdd={() => setIsModalOpen(true)}
        onEdit={(i) => { setSelected(i); setIsModalOpen(true); }}
        onDelete={(i) => alert('Deleting ' + i.name)}
        onImport={() => alert('Importing Regions...')}
      />

      <EntityFormModal
        title={selected ? 'Refine Region' : 'Define New Region'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-stone-400">Region Name</label>
              <input className="wix-input w-full" placeholder="e.g. Bumthang" defaultValue={selected?.name} />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-stone-400">Country Context</label>
              <select className="w-full bg-transparent border-b border-stone-200 py-3 outline-none font-serif text-lg">
                 <option>Bhutan</option>
                 <option>India</option>
              </select>
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
