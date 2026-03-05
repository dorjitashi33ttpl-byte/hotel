import React, { useState } from 'react';

export const SeasonalRateForm: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl">
      <h2 className="text-xl font-bold mb-6">Create Seasonal Pricing</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-400">Start Date</label>
          <input type="date" className="w-full border p-3 rounded-xl mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400">End Date</label>
          <input type="date" className="w-full border p-3 rounded-xl mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400">Price Multiplier</label>
          <input type="number" step="0.1" defaultValue="1.2" className="w-full border p-3 rounded-xl mt-1" />
        </div>
        <div className="flex items-end">
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">Apply Rule</button>
        </div>
      </div>
    </div>
  );
};
