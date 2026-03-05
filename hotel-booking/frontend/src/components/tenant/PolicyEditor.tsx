import React from 'react';

export const PolicyEditor: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Hotel Policies</h2>
      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Cancellation Policy</label>
          <textarea
            className="w-full mt-2 p-4 border rounded-xl h-24"
            defaultValue="Free cancellation up to 48 hours before check-in. Within 48 hours, 100% of the first night will be charged."
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">House Rules</label>
          <textarea
            className="w-full mt-2 p-4 border rounded-xl h-24"
            defaultValue="No smoking. Pets allowed on request. Quiet hours: 10 PM - 7 AM."
          />
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700">Save Policies</button>
      </div>
    </div>
  );
};
