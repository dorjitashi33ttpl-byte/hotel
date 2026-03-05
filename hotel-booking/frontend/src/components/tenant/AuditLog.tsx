import React from 'react';

export const AuditLog: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Security Audit Logs</h2>
      <div className="space-y-4">
        {[
          { user: 'Jigme', action: 'Update Shift', time: '2 mins ago', ip: '192.168.1.1' },
          { user: 'Sonam', action: 'Cancel Booking #102', time: '1 hour ago', ip: '192.168.1.5' }
        ].map((log, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="font-bold text-gray-900">{log.action}</p>
              <p className="text-xs text-gray-500">By {log.user} • {log.ip}</p>
            </div>
            <span className="text-xs font-medium text-gray-400">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
