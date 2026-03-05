import React from 'react';

export const CountrySettings: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Global Country Settings</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6">+ Add New Country</button>

      <table className="min-w-full bg-white border border-gray-200 shadow rounded">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Country</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">ISO</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Currency</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Payments</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-6 py-4">Bhutan</td>
            <td className="px-6 py-4">BT</td>
            <td className="px-6 py-4">BTN</td>
            <td className="px-6 py-4">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Stripe</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs ml-1">Razorpay</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs ml-1">Local Bank</span>
            </td>
            <td className="px-6 py-4">
              <button className="text-blue-600 hover:underline">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
