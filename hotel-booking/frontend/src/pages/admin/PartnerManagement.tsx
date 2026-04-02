import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { EntityFormModal } from '../../components/admin/framework/EntityFormModal';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';
import { Key, Globe, Zap } from 'lucide-react';

export const PartnerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const columns = [
    { header: 'Partner Name', accessor: 'name' },
    { header: 'Client ID', accessor: 'client_id' },
    {
      header: 'Status',
      accessor: 'is_active',
      render: (val: boolean) => <StatusBadge status={val ? 'ACTIVE' : 'INACTIVE'} />
    },
    { header: 'Webhook URL', accessor: 'webhook_url' },
    {
      header: 'Usage',
      accessor: 'id',
      render: (_, row: any) => (
        <div className="flex items-center gap-2 text-stone-400">
          <Zap className="w-3 h-3" />
          <span className="text-[10px] font-bold">{row.current_usage || 0} / {row.daily_limit || 1000}</span>
        </div>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-12">
           <div>
              <h1 className="text-3xl font-serif text-stone-900">Partner Ecosystem</h1>
              <p className="text-stone-500 text-sm mt-2 font-light">Manage OTA integrations and external API consumers.</p>
           </div>
           <button
             onClick={() => { setSelectedPartner(null); setIsModalOpen(true); }}
             className="bg-stone-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-gold transition-all duration-500"
           >
             Register Partner
           </button>
        </div>

        <DataTable
          columns={columns}
          endpoint="/admin/partners"
        />

        <EntityFormModal
          title={selectedPartner ? 'Configure Partner' : 'New API Partnership'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          submitLabel={selectedPartner ? 'Update Configuration' : 'Generate Credentials'}
        >
          <div className="space-y-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Partner Identity</label>
                <input className="wix-input w-full" placeholder="e.g. BookingBhutan.com" defaultValue={selectedPartner?.name} />
             </div>

             <div className="p-6 bg-stone-50 border border-stone-100 space-y-4">
                <div className="flex items-center gap-3 text-stone-900">
                   <Key className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-wider">Webhook Configuration</span>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-stone-400 uppercase">Endpoint URL</label>
                   <input className="w-full bg-white border border-stone-200 p-3 text-sm font-mono" placeholder="https://api.partner.com/webhooks" defaultValue={selectedPartner?.webhook_url} />
                </div>
             </div>

             <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                <p className="text-[11px] text-amber-800 leading-relaxed italic">
                  Partner secrets are only displayed once upon generation. Ensure the partner application
                  uses HMAC-SHA256 to verify the X-Hotel-Signature header.
                </p>
             </div>
          </div>
        </EntityFormModal>
      </div>
    </AdminLayout>
  );
};
