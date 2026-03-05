import React from 'react';
import { HoldTimer } from '../common/HoldTimer';

export const HoldActivityFeed: React.FC = () => {
  const activeHolds = [
    { id: 'BK-105', room: 'Deluxe Heritage', expiry: new Date(Date.now() + 8 * 60000).toISOString() },
    { id: 'BK-108', room: 'Royal Suite', expiry: new Date(Date.now() + 12 * 60000).toISOString() }
  ];

  return (
    <div className="p-8 bg-white shadow-sm border border-gray-100 rounded-2xl">
      <h2 className="text-xl font-bold mb-6">Real-time Hold Activity</h2>
      <div className="space-y-4">
        {activeHolds.map(hold => (
          <div key={hold.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-900">{hold.id}</p>
              <p className="text-xs text-gray-500">{hold.room}</p>
            </div>
            <HoldTimer expiry={hold.expiry} />
          </div>
        ))}
      </div>
    </div>
  );
};
