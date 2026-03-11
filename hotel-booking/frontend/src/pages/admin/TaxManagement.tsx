import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';
import { TaxRuleEditor } from '../../components/admin/TaxRuleEditor';

export const TaxManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState<any>(null);

  const columns = [
    { key: 'name', header: 'Tax Name' },
    { key: 'country', header: 'Country' },
    { key: 'rate', header: 'Percentage' },
    {
      key: 'type',
      header: 'Calculation',
      render: (val: string) => <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{val}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (val: string) => <StatusBadge status={val} />
    },
  ];

  const mockData = [
    { id: 1, name: 'SDF (Sustainable Dev Fee)', country: 'Bhutan', rate: '10%', type: 'Inclusive', status: 'Active' },
    { id: 2, name: 'Tourism Levy', country: 'Bhutan', rate: '5%', type: 'Exclusive', status: 'Active' },
    { id: 3, name: 'Service Charge', country: 'Global', rate: '10%', type: 'Exclusive', status: 'Active' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-12">
        <DataTable
          title="Tax Configuration"
          description="Govern the fiscal landscape of each sanctuary region."
          columns={columns}
          data={mockData}
          onAdd={() => setIsModalOpen(true)}
          onEdit={(t) => { setSelectedTax(t); setIsModalOpen(true); }}
          onDelete={(t) => alert('Rescinding Tax ' + t.name)}
        />

        <div className="p-12 pt-0">
           <TaxRuleEditor />
        </div>
      </div>

      <EntityFormModal
        title={selectedTax ? 'Amend Fiscal Rule' : 'Enact New Tax'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Rule Name</label>
              <input className="wix-input w-full" placeholder="e.g. Sales Tax" defaultValue={selectedTax?.name} />
           </div>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Percentage Rate</label>
                 <input className="wix-input w-full" placeholder="e.g. 10.0" defaultValue={selectedTax?.rate.replace('%', '')} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Calculation Mode</label>
                 <select className="w-full bg-transparent border-b border-stone-200 py-3 outline-none font-serif text-lg">
                    <option>Inclusive</option>
                    <option>Exclusive</option>
                 </select>
              </div>
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
