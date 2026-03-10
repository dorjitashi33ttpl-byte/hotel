import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';
import { FileText, MapPin, Building } from 'lucide-react';

export const HotelApprovals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const columns = [
    { key: 'name', header: 'Proposed Sanctuary' },
    { key: 'owner', header: 'Owner' },
    { key: 'location', header: 'Dzongkhag' },
    {
      key: 'status',
      header: 'Review State',
      render: (val: string) => <StatusBadge status={val} />
    },
    { key: 'submitted', header: 'Submitted At' },
  ];

  const mockData = [
    { id: 1, name: 'Amankora Punakha', owner: 'Amankora Group', location: 'Punakha', status: 'Pending', submitted: '2026-06-01' },
    { id: 2, name: 'Six Senses Paro', owner: 'Six Senses', location: 'Paro', status: 'Pending', submitted: '2026-05-30' },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Sanctuary Approvals"
        description="Verify the essence and legitimacy of new sanctuaries entering the ecosystem."
        columns={columns}
        data={mockData}
        onEdit={(i) => { setSelected(i); setIsModalOpen(true); }}
        onView={(i) => setSelected(i)}
      />

      <EntityFormModal
        title="Appraisal of Sanctuary"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => setIsModalOpen(false)}
      >
        <div className="space-y-12">
           <div className="flex items-center gap-6 p-8 bg-stone-50 border border-stone-100">
              <Building className="w-10 h-10 text-gold" />
              <div>
                 <h3 className="text-xl font-serif">{selected?.name}</h3>
                 <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{selected?.owner}</p>
              </div>
           </div>

           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300">Document Review</h4>
              {[
                { name: 'Business License', status: 'Verified' },
                { name: 'Environmental Permit', status: 'Pending' },
                { name: 'Insurance Certificate', status: 'Verified' }
              ].map(d => (
                <div key={d.name} className="flex justify-between items-center p-6 border border-stone-100">
                   <div className="flex items-center gap-4">
                      <FileText className="w-4 h-4 text-stone-400" />
                      <span className="text-sm font-medium">{d.name}</span>
                   </div>
                   <span className={`text-[9px] font-black uppercase ${d.status === 'Verified' ? 'text-green-500' : 'text-amber-500'}`}>{d.status}</span>
                </div>
              ))}
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="bg-red-600 text-white py-4 font-serif text-xs uppercase tracking-widest hover:bg-red-700 transition-all">Reject Portal</button>
              <button className="bg-green-600 text-white py-4 font-serif text-xs uppercase tracking-widest hover:bg-green-700 transition-all">Grant Passage</button>
           </div>
        </div>
      </EntityFormModal>
    </AdminLayout>
  );
};
