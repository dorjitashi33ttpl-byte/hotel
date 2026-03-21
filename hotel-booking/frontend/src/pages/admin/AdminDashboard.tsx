import React from 'react';
import { AdminLayout } from '../../components/admin/framework/AdminLayout';
import { Routes, Route } from 'react-router-dom';
import { PaymentRegistry } from '../../components/admin/PaymentRegistry';
import { CountrySettings } from '../../components/admin/CountrySettings';
import { AuditLogManagement } from './AuditLogManagement';
import { WebhookLogViewer } from '../../components/admin/WebhookLogViewer';
import { SystemSettings } from './SystemSettings';

const DashboardOverview = () => (
  <div className="p-12">
    <h1 className="text-4xl font-serif mb-8">Platform Essence</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="bg-white p-8 border border-stone-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-stone-400 mb-2">Total Managed Keys</p>
          <p className="text-3xl font-serif">1,240</p>
       </div>
       <div className="bg-white p-8 border border-stone-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-stone-400 mb-2">Platform Commission (Nu.)</p>
          <p className="text-3xl font-serif">842,000</p>
       </div>
       <div className="bg-white p-8 border border-stone-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-stone-400 mb-2">Active Countries</p>
          <p className="text-3xl font-serif">1 (Bhutan)</p>
       </div>
    </div>
  </div>
);

export const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/payments" element={<PaymentRegistry />} />
        <Route path="/countries" element={<CountrySettings />} />
        <Route path="/audit" element={<AuditLogManagement />} />
        <Route path="/webhook-logs" element={<WebhookLogViewer />} />
        <Route path="/settings" element={<SystemSettings />} />
        {/* Other stubs */}
        <Route path="*" element={<div className="p-12 text-stone-400 italic">This portal segment is under aesthetic refinement.</div>} />
      </Routes>
    </AdminLayout>
  );
};
