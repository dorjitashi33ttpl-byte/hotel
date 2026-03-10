import React from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { DataTable } from '../../components/admin/framework/DataTable';
import { StatusBadge } from '../../components/admin/framework/StatusBadge';
import { Star } from 'lucide-react';

export const ReviewManagement: React.FC = () => {
  const columns = [
    { key: 'hotel', header: 'Sanctuary' },
    { key: 'customer', header: 'Guest' },
    {
      key: 'rating',
      header: 'Rating',
      render: (val: number) => (
        <div className="flex gap-1">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className={`w-3 h-3 ${i < val ? 'fill-gold text-gold' : 'text-stone-200'}`} />
           ))}
        </div>
      )
    },
    { key: 'content', header: 'Testimonial', render: (val: string) => <span className="italic">"{val.slice(0, 40)}..."</span> },
    {
      key: 'is_verified',
      header: 'Authenticity',
      render: (val: boolean) => <StatusBadge status={val ? 'Verified' : 'Unverified'} />
    },
  ];

  const mockData = [
    { id: 1, hotel: 'Amankora Paro', customer: 'Tashi D.', rating: 5, content: 'An ethereal experience. The hot stone bath was magical.', is_verified: true },
    { id: 2, hotel: 'Zhiwa Ling', customer: 'Karma W.', rating: 4, content: 'Beautiful architecture but the staff shifts were changing.', is_verified: false },
  ];

  return (
    <AdminLayout>
      <DataTable
        title="Verified Reviews"
        description="Curate the reputation of our sanctuaries based on authentic guest reflections."
        columns={columns}
        data={mockData}
        onEdit={(r) => alert('Verifying Review ' + r.id)}
        onDelete={(r) => alert('Expunging Review ' + r.id)}
      />
    </AdminLayout>
  );
};
