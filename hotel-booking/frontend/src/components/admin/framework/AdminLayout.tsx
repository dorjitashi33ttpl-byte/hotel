import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users, Shield, Lock, Settings, Percent, Database,
  Activity, LayoutDashboard, ChevronDown, Menu, X,
  FileText, CreditCard, Map, Building, Star, CheckSquare,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    title: "Operations",
    icon: <Building className="w-5 h-5" />,
    items: [
      { name: "Approvals", path: "/admin/approvals", icon: <CheckSquare className="w-4 h-4" /> },
      { name: "Reviews", path: "/admin/reviews", icon: <Star className="w-4 h-4" /> },
    ]
  },
  {
    title: "Configuration",
    icon: <Settings className="w-5 h-5" />,
    items: [
      { name: "Tax Rules", path: "/admin/tax", icon: <Percent className="w-4 h-4" /> },
      { name: "Payments", path: "/admin/payments", icon: <CreditCard className="w-4 h-4" /> },
      { name: "Mapbox Keys", path: "/admin/mapbox", icon: <Map className="w-4 h-4" /> },
      { name: "System Pulse", path: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
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
    title: "Chronicles",
    icon: <FileText className="w-5 h-5" />,
    items: [
      { name: "Audit Logs", path: "/admin/audit", icon: <Activity className="w-4 h-4" /> },
      { name: "Webhooks", path: "/admin/webhook-logs", icon: <FileText className="w-4 h-4" /> },
    ]
  }
];

const NavGroup = ({ group, isSidebarOpen, location }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const isActive = group.items.some((item: any) => location.pathname.startsWith(item.path));

  return (
    <div className="space-y-2">
      {isSidebarOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-[9px] font-black uppercase tracking-[0.4em] text-stone-300 hover:text-stone-900 transition-colors"
        >
          <span>{group.title}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
        </button>
      )}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-1"
          >
            {group.items.map((item: any) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${location.pathname.startsWith(item.path) ? 'bg-stone-50 text-gold shadow-sm border border-stone-100' : 'text-stone-500 hover:bg-stone-50'}`}
              >
                {item.icon}
                {isSidebarOpen && <span className="font-bold text-[10px] tracking-widest uppercase">{item.name}</span>}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [toasts, setToasts] = useState<any[]>([]);
  const location = useLocation();

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans antialiased">
      {/* Toast Notification Container */}
      <div className="fixed top-8 right-8 z-[300] space-y-4">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`px-8 py-4 shadow-2xl border border-stone-100 font-bold text-xs uppercase tracking-widest flex items-center gap-4 ${t.type === 'success' ? 'bg-stone-900 text-white' : 'bg-red-600 text-white'}`}
            >
              {t.type === 'success' ? <CheckSquare className="w-4 h-4 text-gold" /> : <X className="w-4 h-4" />}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <aside className={`bg-white border-r border-stone-200 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
        <div className="p-8 flex items-center justify-between border-b border-stone-100">
           {isSidebarOpen && (
             <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif text-xl tracking-tighter">
                ADMIN <span className="text-[10px] text-gold uppercase tracking-[0.4em] font-sans font-bold">Realm</span>
             </motion.span>
           )}
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-stone-400 hover:text-stone-900 transition-colors">
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 mx-auto" />}
           </button>
        </div>

        <nav className="p-4 space-y-6">
           <Link to="/admin" className={`flex items-center gap-4 p-4 rounded-xl transition-all ${location.pathname === '/admin' ? 'bg-stone-900 text-white shadow-xl' : 'text-stone-500 hover:bg-stone-50'}`}>
              <LayoutDashboard className="w-5 h-5" />
              {isSidebarOpen && <span className="font-bold text-[10px] uppercase tracking-widest">Dash of Essence</span>}
           </Link>

           {navGroups.map(group => (
             <NavGroup key={group.title} group={group} isSidebarOpen={isSidebarOpen} location={location} />
           ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
           <motion.div
             key={location.pathname}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.4 }}
           >
              {children}
           </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
