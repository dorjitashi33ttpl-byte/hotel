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
import { HousekeepingDashboard } from '../components/tenant/HousekeepingDashboard';
import { RoomRack } from '../components/tenant/RoomRack';

export const TenantDashboard: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen p-12">
      <div className="max-w-[1600px] mx-auto space-y-16">
        <header className="flex justify-between items-end border-b border-stone-200 pb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold block mb-4">Owner Center</span>
            <h1 className="text-5xl font-serif tracking-tighter">Amankora Paro</h1>
            <p className="text-stone-400 mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-4">
              Platinum Tier • <span className="text-stone-900 border-b border-stone-900 cursor-pointer hover:opacity-50 transition-opacity">Preview Public Sanctuary</span>
            </p>
          </div>
          <div className="flex gap-4">
             <button className="bg-stone-900 text-white px-8 py-4 font-serif text-xs uppercase tracking-widest hover:bg-gold transition-all duration-500">Live Grid</button>
             <button className="bg-white border border-stone-200 text-stone-900 px-8 py-4 font-serif text-xs uppercase tracking-widest hover:bg-stone-50 transition-all duration-500">Settings</button>
          </div>
        </header>

        <AvailabilityCalendar />
        <RoomRack />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <HousekeepingDashboard />
            <div className="bg-white p-12 shadow-sm border border-stone-100">
               <h3 className="text-2xl font-serif mb-12 border-b border-stone-50 pb-6">Operations</h3>
               <div className="space-y-16">
                  <WalkInBookingForm />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-stone-100">
                     <PayoutManagement />
                     <StaffScheduling />
                  </div>
               </div>
            </div>

            <div className="bg-white p-12 shadow-sm border border-stone-100">
               <h3 className="text-2xl font-serif mb-12 border-b border-stone-50 pb-6">Yield & Analytics</h3>
               <PricingInsights />
               <div className="pt-12 border-t border-stone-50">
                  <SeasonalRateForm />
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-16">
            <div className="bg-white p-10 shadow-sm border border-stone-100">
               <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8">Active Holds</h3>
               <HoldActivityFeed />
            </div>

            <div className="bg-white p-10 shadow-sm border border-stone-100">
               <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8">Inventory Mode</h3>
               <InventoryConfig roomTypes={[]} />
            </div>

            <div className="bg-stone-900 text-white p-12 shadow-2xl relative overflow-hidden group">
               <span className="text-[9px] font-bold uppercase tracking-widest text-gold block mb-4">Account Status</span>
               <h3 className="text-2xl font-serif mb-6">Platinum Partnership</h3>
               <p className="text-stone-400 text-sm mb-12 font-light leading-relaxed">Unlimited staff members, advanced yield management, and zero commission on direct bookings are active.</p>
               <button className="w-full bg-white text-stone-900 py-5 font-serif text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-500 relative z-10">Manage Subscription</button>
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-all duration-1000" />
            </div>

            <div className="bg-white p-10 shadow-sm border border-stone-100">
               <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8">Audit History</h3>
               <AuditLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
