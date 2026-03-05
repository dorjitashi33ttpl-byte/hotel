import React from 'react';

export const PricingInsights: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow-sm border border-gray-100 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Revenue & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs font-bold text-blue-400 uppercase">RevPAR (BTN)</p>
          <p className="text-3xl font-extrabold text-blue-700 mt-2">1,240</p>
        </div>
        <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
          <p className="text-xs font-bold text-green-400 uppercase">Occupancy</p>
          <p className="text-3xl font-extrabold text-green-700 mt-2">78%</p>
        </div>
        <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl">
          <p className="text-xs font-bold text-purple-400 uppercase">Net Revenue</p>
          <p className="text-3xl font-extrabold text-purple-700 mt-2">BTN 142k</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-64 w-full bg-gray-50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200">
         <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Monthly Revenue Chart (Recharts)</span>
      </div>

      <div className="mt-8 p-6 bg-orange-50 rounded-xl text-sm text-orange-800 border border-orange-100">
        <p className="font-bold mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          Smart Insight
        </p>
        <p>Demand in Bhutan is peaking next month. We recommend raising base rates by 12% for the Deluxe Heritage Room.</p>
      </div>
    </div>
  );
};
