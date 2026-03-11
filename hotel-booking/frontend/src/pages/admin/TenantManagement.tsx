import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';
import { Building } from 'lucide-react';

export const TenantManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const columns = [
    { key: 'name', header: 'Sanctuary Name' },
    { key: 'owner', header: 'Steward' },
    { key: 'region', header: 'Dzongkhag' },
    {
      key: 'status',
      header: 'Ecosystem State',
      render: (val: string) => <StatusBadge status={val} />
    },
    { key: 'rooms', header: 'Inventory' },
  ];

  const mockData = [
    { id: 1, name: 'Amankora Paro', owner: 'Amankora Group', region: 'Paro', status: 'Active', rooms: 24 },
    { id: 2, name: 'Zhiwa Ling Heritage', owner: 'Druk Hospitality', region: 'Paro', status: 'Active', rooms: 45 },
    { id: 3, name: 'Dhensa Boutique', owner: 'Punakha Resorts', region: 'Punakha', status: 'Pending', rooms: 12 },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Sanctuary Management"
        description="Oversee the registration and operational state of all hotel properties within the realm."
        columns={columns}
        data={mockData}
        onAdd={() => setIsModalOpen(true)}
        onEdit={(i) => { setSelected(i); setIsModalOpen(true); }}
        onDelete={(i) => alert('Dissolving Sanctuary ' + i.name)}
        bulkActions={[
           { label: 'Deactivate All', action: (items) => alert('Deactivating ' + items.length + ' properties') }
        ]}
      />

      <EntityFormModal
        title={selected ? 'Refine Sanctuary Essence' : 'Manifest New Sanctuary'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-12">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-stone-400">Official Name</label>
              <input className="wix-input w-full" placeholder="e.g. Six Senses Thimphu" defaultValue={selected?.name} />
           </div>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-stone-400">Region</label>
                 <select className="w-full bg-transparent border-b border-stone-200 py-3 outline-none font-serif text-lg">
                    <option>Thimphu</option>
                    <option>Paro</option>
                    <option>Punakha</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-stone-400">Inventory Mode</label>
                 <select className="w-full bg-transparent border-b border-stone-200 py-3 outline-none font-serif text-lg">
                    <option>Room-Type (Mode A)</option>
                    <option>Fixed-Room (Mode B)</option>
                 </select>
              </div>
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
