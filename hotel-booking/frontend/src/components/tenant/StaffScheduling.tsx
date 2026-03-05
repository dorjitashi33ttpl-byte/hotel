import React from 'react';

export const StaffScheduling: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Staff Shift Assignments</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-7 border-b bg-gray-50 text-center font-bold text-xs uppercase text-gray-500 py-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}
        </div>
        <div className="grid grid-cols-7 h-96">
          {Array(7).fill(0).map((_, i) => (
            <div key={i} className="border-r border-b p-2 hover:bg-blue-50 transition-colors">
              <div className="text-xs font-bold text-gray-300 mb-2">{i + 1}</div>
              <div className="bg-blue-100 text-blue-700 p-2 rounded-lg text-[10px] font-bold mb-1">Morning: Jigme</div>
              <div className="bg-orange-100 text-orange-700 p-2 rounded-lg text-[10px] font-bold">Evening: Sonam</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
