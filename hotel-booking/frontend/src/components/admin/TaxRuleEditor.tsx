import React from 'react';

export const TaxRuleEditor: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Regional Tax Configuration</h2>
      <div className="space-y-4">
        {[
          { country: 'Bhutan', region: 'Global', rate: '10%', name: 'Sales Tax' },
          { country: 'India', region: 'Karnataka', rate: '12%', name: 'SGST' }
        ].map((rule, i) => (
          <div key={i} className="flex justify-between items-center p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="font-bold text-lg">{rule.name} - {rule.country} ({rule.region})</p>
              <p className="text-sm text-gray-500">Effective Rate: {rule.rate}</p>
            </div>
            <button className="text-blue-600 font-bold hover:underline">Edit Rule</button>
          </div>
        ))}
      </div>
      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100">+ New Tax Rule</button>
    </div>
  );
};
