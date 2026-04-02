import React, { useState } from 'react';
import { RoomRack } from '../components/tenant/RoomRack';
import { HousekeepingDashboard } from '../components/tenant/HousekeepingDashboard';
import { PayoutManagement } from '../components/tenant/PayoutManagement';
import { PricingInsights } from '../components/tenant/PricingInsights';
import { ChannelAllocationManager } from '../components/tenant/ChannelAllocationManager';
import { CheckInVerification } from '../components/tenant/CheckInVerification';
import { QRScannerView } from '../components/tenant/QRScannerView';
import { StaffScheduling } from '../components/tenant/StaffScheduling';
import { PartnerAccess } from '../components/tenant/PartnerAccess';
import MediaManagement from '../components/tenant/MediaManagement';
import { StaffChatDashboard } from './tenant/StaffChatDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Wind, CreditCard, BarChart3, Globe, ShieldCheck, Scan, MessageSquare, Users, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export const TenantDashboard = () => {
  const [activeView, setActiveView] = useState('rooms');
  const hotelId = 'hotel_thimphu_1';

  const menuItems = [
    { id: 'rooms', label: 'Room Rack', icon: LayoutGrid },
    { id: 'arrivals', label: 'Arrivals', icon: ShieldCheck },
    { id: 'cleaning', label: 'Housekeeping', icon: Wind },
    { id: 'shifts', label: 'Staffing', icon: Users },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'chat', label: 'Concierge', icon: MessageSquare },
    { id: 'scanner', label: 'QR Scanner', icon: Scan },
    { id: 'pricing', label: 'Yields', icon: BarChart3 },
    { id: 'channels', label: 'Distribution', icon: Globe },
    { id: 'partner', label: 'Partners', icon: LinkIcon },
    { id: 'payouts', label: 'Financials', icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50">
       <div className="w-72 bg-white border-r border-stone-100 flex flex-col p-8 sticky top-0 h-screen">
          <div className="mb-16">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold block mb-2">Management Console</span>
             <h1 className="text-xl font-serif text-stone-900">Bhutan Sanctuary</h1>
          </div>
          <div className="flex-1 space-y-2">
             {menuItems.map(item => (
               <button
                 key={item.id}
                 onClick={() => setActiveView(item.id)}
                 className={}
               >
                  <item.icon className="w-4 h-4" /> {item.label}
               </button>
             ))}
          </div>
       </div>

       <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
             <motion.div
               key={activeView}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.5, ease: "circOut" }}
             >
                {activeView === 'rooms' && <RoomRack />}
                {activeView === 'arrivals' && <CheckInVerification hotelId={hotelId} />}
                {activeView === 'cleaning' && <HousekeepingDashboard />}
                {activeView === 'shifts' && <StaffScheduling hotelId={hotelId} />}
                {activeView === 'media' && <div className="p-12"><MediaManagement /></div>}
                {activeView === 'chat' && <StaffChatDashboard />}
                {activeView === 'scanner' && <QRScannerView />}
                {activeView === 'pricing' && <div className="p-12"><PricingInsights hotelId={hotelId} /></div>}
                {activeView === 'channels' && <div className="p-12"><ChannelAllocationManager hotelId={hotelId} /></div>}
                {activeView === 'partner' && <PartnerAccess hotelId={hotelId} />}
                {activeView === 'payouts' && <PayoutManagement hotelId={hotelId} />}
             </motion.div>
          </AnimatePresence>
       </div>
    </div>
  );
};
