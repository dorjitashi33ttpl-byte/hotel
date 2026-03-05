import React from 'react';
import { InventoryConfig } from '../components/tenant/InventoryConfig';
import { StaffScheduling } from '../components/tenant/StaffScheduling';
import { PricingInsights } from '../components/tenant/PricingInsights';
import { AuditLog } from '../components/tenant/AuditLog';
import { MenuUpload } from '../components/tenant/MenuUpload';

export const TenantDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Property Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage Thimphu Heritage Lodge</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Live View</button>
             <button className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold">Settings</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <InventoryConfig roomTypes={[]} />
            <StaffScheduling />
            <PricingInsights />
          </div>
          <div className="space-y-8">
            <MenuUpload />
            <AuditLog />
            <div className="p-8 bg-gray-900 text-white rounded-2xl shadow-xl">
               <h3 className="text-xl font-bold mb-4">Subscription</h3>
               <p className="text-gray-400 text-sm mb-6">You are on the <span className="text-blue-400 font-bold">Platinum Plan</span>.</p>
               <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold">Manage Billing</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
