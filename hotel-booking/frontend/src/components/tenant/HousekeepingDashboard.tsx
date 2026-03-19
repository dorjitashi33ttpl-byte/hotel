import React from 'react';

const tasks = [
  { id: 'HK-001', room: '101', type: 'FULL_CLEAN', status: 'IN_PROGRESS', staff: 'Pema' },
  { id: 'HK-002', room: '201', type: 'TURNDOWN', status: 'PENDING', staff: 'Dorji' },
  { id: 'HK-003', room: '104', type: 'STAY_OVER', status: 'COMPLETED', staff: 'Pema' },
];

export const HousekeepingDashboard = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-serif">Housekeeping Overview</h2>
        <div className="flex gap-4">
           <div className="text-center px-6 py-2 bg-stone-50 border border-stone-100">
              <p className="text-[10px] font-black text-stone-400 uppercase">Dirty Rooms</p>
              <p className="text-xl font-serif">12</p>
           </div>
           <div className="text-center px-6 py-2 bg-stone-50 border border-stone-100">
              <p className="text-[10px] font-black text-stone-400 uppercase">In Progress</p>
              <p className="text-xl font-serif">3</p>
           </div>
        </div>
      </div>

      <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50">
              <th className="p-6 text-[10px] font-black uppercase text-stone-400">Room</th>
              <th className="p-6 text-[10px] font-black uppercase text-stone-400">Task Type</th>
              <th className="p-6 text-[10px] font-black uppercase text-stone-400">Assigned To</th>
              <th className="p-6 text-[10px] font-black uppercase text-stone-400">Status</th>
              <th className="p-6 text-[10px] font-black uppercase text-stone-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-t border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="p-6 text-sm font-bold">#{task.room}</td>
                <td className="p-6 text-xs text-stone-500">{task.type}</td>
                <td className="p-6 text-sm italic">{task.staff}</td>
                <td className="p-6 text-[9px] font-black">
                  <span className={`px-3 py-1 ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-stone-900 text-white'}`}>
                    {task.status}
                  </span>
                </td>
                <td className="p-6">
                  <button className="text-[10px] font-black uppercase text-[var(--luxury-gold)] hover:underline">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
