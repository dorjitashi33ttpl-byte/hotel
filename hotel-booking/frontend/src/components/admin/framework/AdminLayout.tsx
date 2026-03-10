import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users, Shield, Lock, Settings, Percent, Database,
  Activity, LayoutDashboard, ChevronDown, Menu, X,
  FileText, CreditCard, Map
} from 'lucide-react';

const navGroups = [
  {
    title: "User & Access",
    icon: <Users className="w-5 h-5" />,
    items: [
      { name: "Users", path: "/admin/users", icon: <Users className="w-4 h-4" /> },
      { name: "Roles", path: "/admin/roles", icon: <Shield className="w-4 h-4" /> },
      { name: "Permissions", path: "/admin/permissions", icon: <Lock className="w-4 h-4" /> },
    ]
  },
  {
    title: "Configuration",
    icon: <Settings className="w-5 h-5" />,
    items: [
      { name: "Tax Rules", path: "/admin/tax", icon: <Percent className="w-4 h-4" /> },
      { name: "Payment Providers", path: "/admin/payments", icon: <CreditCard className="w-4 h-4" /> },
      { name: "Mapbox Keys", path: "/admin/mapbox", icon: <Map className="w-4 h-4" /> },
      { name: "System Settings", path: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
    ]
  },
  {
    title: "Masters",
    icon: <Database className="w-5 h-5" />,
    items: [
      { name: "Countries", path: "/admin/countries", icon: <Database className="w-4 h-4" /> },
      { name: "Regions", path: "/admin/regions", icon: <Database className="w-4 h-4" /> },
    ]
  },
  {
    title: "Logs & Reports",
    icon: <FileText className="w-5 h-5" />,
    items: [
      { name: "Audit Logs", path: "/admin/audit", icon: <Activity className="w-4 h-4" /> },
      { name: "Webhook Logs", path: "/admin/webhook-logs", icon: <FileText className="w-4 h-4" /> },
    ]
  }
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans antialiased">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-stone-200 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-8 flex items-center justify-between border-b border-stone-100">
           {isSidebarOpen && <span className="font-serif text-xl tracking-tighter">ADMIN <span className="text-[10px] text-gold uppercase tracking-[0.4em] ml-2">Center</span></span>}
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-stone-400 hover:text-stone-900 transition-colors">
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 mx-auto" />}
           </button>
        </div>

        <nav className="p-4 space-y-8">
           <Link to="/admin" className={`flex items-center gap-4 p-4 rounded-xl transition-all ${location.pathname === '/admin' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:bg-stone-50'}`}>
              <LayoutDashboard className="w-5 h-5" />
              {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-widest">Dashboard</span>}
           </Link>

           {navGroups.map(group => (
             <div key={group.title} className="space-y-4">
                {isSidebarOpen && <span className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 ml-4">{group.title}</span>}
                <div className="space-y-1">
                   {group.items.map(item => (
                     <Link
                       key={item.name}
                       to={item.path}
                       className={`flex items-center gap-4 p-4 rounded-xl transition-all ${location.pathname.startsWith(item.path) ? 'bg-stone-50 text-gold shadow-sm border border-stone-100' : 'text-stone-500 hover:bg-stone-50'}`}
                     >
                        {item.icon}
                        {isSidebarOpen && <span className="font-bold text-xs tracking-wider">{item.name}</span>}
                     </Link>
                   ))}
                </div>
             </div>
           ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
