import React from 'react';
import { InventoryConfig } from '../components/tenant/InventoryConfig';
import { StaffScheduling } from '../components/tenant/StaffScheduling';
import { PricingInsights } from '../components/tenant/PricingInsights';
import { AuditLog } from '../components/tenant/AuditLog';
import { MenuUpload } from '../components/tenant/MenuUpload';
import { HoldActivityFeed } from '../components/tenant/HoldActivityFeed';
import { WalkInBookingForm } from '../components/tenant/WalkInBookingForm';
import { PayoutManagement } from '../components/tenant/PayoutManagement';
import { AvailabilityCalendar } from '../components/tenant/AvailabilityCalendar';

export const TenantDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex justify-between items-end bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="z-10">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Property Dashboard</h1>
            <p className="text-gray-400 mt-2 font-medium">Thimphu Heritage Lodge • <span className="text-blue-600 font-bold underline">Go to Public Page</span></p>
          </div>
          <div className="flex gap-4 z-10">
             <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-gray-200 hover:scale-105 transition-all">Live Inventory</button>
             <button className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">Settings</button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
        </header>

        <AvailabilityCalendar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <WalkInBookingForm />
            <PayoutManagement />
            <PricingInsights />
            <StaffScheduling />
          </div>
          <div className="space-y-12">
            <HoldActivityFeed />
            <InventoryConfig roomTypes={[]} />
            <MenuUpload />
            <AuditLog />
            <div className="p-10 bg-gray-900 text-white rounded-[40px] shadow-2xl relative overflow-hidden">
               <h3 className="text-2xl font-black mb-4 z-10 relative">Subscription</h3>
               <p className="text-gray-400 text-sm mb-8 z-10 relative leading-relaxed">You are currently on the <span className="text-blue-400 font-black">Platinum Plan</span>. All world-class features are active.</p>
               <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black shadow-lg hover:bg-gray-100 transition-all z-10 relative">Manage Billing</button>
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600 opacity-20 -mb-10 -mr-10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
