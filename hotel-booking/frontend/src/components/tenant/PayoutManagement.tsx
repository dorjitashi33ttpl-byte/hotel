import React from 'react';

export const PayoutManagement: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Payouts & Financials</h2>
      <div className="bg-blue-600 text-white p-8 rounded-2xl mb-8 flex justify-between items-center shadow-lg shadow-blue-200">
         <div>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Net Balance Available</p>
            <p className="text-4xl font-black mt-2">BTN 42,500.00</p>
         </div>
         <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100">Request Payout</button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Payout History</h3>
        {[
          { date: '2024-05-15', amount: 'BTN 120,000', status: 'Processed', ref: 'REF-8892' },
          { date: '2024-04-10', amount: 'BTN 95,000', status: 'Processed', ref: 'REF-7721' }
        ].map((p, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
             <div>
                <p className="font-bold">{p.amount}</p>
                <p className="text-xs text-gray-500">{p.date} • {p.ref}</p>
             </div>
             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
