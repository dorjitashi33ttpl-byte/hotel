import React, { useState } from 'react';
import { Sparkles, Trash2, CheckCircle, RefreshCw } from 'lucide-react';
import { StatusBadge } from '../admin/framework/StatusBadge';

export const HousekeepingDashboard: React.FC = () => {
  const [rooms, setRooms] = useState([
    { id: '101', type: 'Deluxe', status: 'DIRTY', assignee: 'Sonam P.' },
    { id: '102', type: 'Deluxe', status: 'READY', assignee: 'None' },
    { id: '201', type: 'Heritage', status: 'IN_PROGRESS', assignee: 'Karma W.' },
    { id: '202', type: 'Heritage', status: 'DIRTY', assignee: 'Sonam P.' },
  ]);

  const toggleStatus = (id: string) => {
    setRooms(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'DIRTY' ? 'IN_PROGRESS' : r.status === 'IN_PROGRESS' ? 'READY' : 'DIRTY';
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  return (
    <div className="bg-white p-12 border border-stone-100 shadow-sm rounded-3xl space-y-12">
      <div className="flex justify-between items-center">
         <h3 className="text-2xl font-serif">Housekeeping Center</h3>
         <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-stone-400">
            <RefreshCw className="w-3 h-3" /> Auto-Refresh Active
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {rooms.map(room => (
           <div key={room.id} className="p-8 border border-stone-50 rounded-2xl bg-stone-50/30 space-y-6">
              <div className="flex justify-between items-start">
                 <span className="font-serif text-2xl">{room.id}</span>
                 <StatusBadge status={room.status} />
              </div>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{room.type} • {room.assignee}</p>
              <button
                onClick={() => toggleStatus(room.id)}
                className="w-full py-3 bg-white border border-stone-200 text-[9px] font-black uppercase tracking-widest hover:border-gold transition-all"
              >
                Mark as {room.status === 'DIRTY' ? 'In Progress' : room.status === 'IN_PROGRESS' ? 'Ready' : 'Dirty'}
              </button>
           </div>
         ))}
      </div>
    </div>
  );
};
