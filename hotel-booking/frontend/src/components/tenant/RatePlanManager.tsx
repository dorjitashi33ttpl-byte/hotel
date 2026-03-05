import React, { useState } from 'react';

export const RatePlanManager: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Rate Plans & Seasonality</h2>
      <div className="space-y-4">
        {[
          { name: 'Standard Rate', multiplier: 1.0, active: true },
          { name: 'Peak Season (Oct-Dec)', multiplier: 1.25, active: true },
          { name: 'Non-refundable Discount', multiplier: 0.9, active: true }
        ].map((plan, i) => (
          <div key={i} className="flex justify-between items-center p-6 border rounded-xl hover:border-blue-500 transition-colors">
            <div>
              <p className="font-bold text-lg">{plan.name}</p>
              <p className="text-sm text-gray-500">Multiplier: x{plan.multiplier}</p>
            </div>
            <button className="text-blue-600 font-bold">Edit Rates</button>
          </div>
        ))}
      </div>
      <button className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black">+ Create Rate Plan</button>
    </div>
  );
};
