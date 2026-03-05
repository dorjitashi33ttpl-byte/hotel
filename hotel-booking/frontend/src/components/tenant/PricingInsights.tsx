import React from 'react';

export const PricingInsights: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow-sm border border-gray-100 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Pricing Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs font-bold text-blue-400 uppercase">RevPAR (BTN)</p>
          <p className="text-3xl font-extrabold text-blue-700 mt-2">1,240</p>
        </div>
        <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
          <p className="text-xs font-bold text-green-400 uppercase">Occupancy Rate</p>
          <p className="text-3xl font-extrabold text-green-700 mt-2">78%</p>
        </div>
        <div className="p-6 bg-orange-50 border border-orange-100 rounded-xl">
          <p className="text-xs font-bold text-orange-400 uppercase">Direct Bookings</p>
          <p className="text-3xl font-extrabold text-orange-700 mt-2">32%</p>
        </div>
      </div>
      <div className="mt-8 p-6 bg-gray-50 rounded-xl text-sm text-gray-500">
        <p className="font-bold text-gray-900 mb-2">Trend Analysis</p>
        <p>Demand in Bhutan is peaking next month. We recommend raising base rates by 10% for the Deluxe Room type.</p>
      </div>
    </div>
  );
};
