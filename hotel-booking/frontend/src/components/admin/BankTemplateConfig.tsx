import React, { useState } from 'react';

export const BankTemplateConfig: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Local Bank Template Engine</h2>
      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Redirect URL Template (Jinja2)</label>
          <input
            className="w-full mt-2 p-4 border rounded-xl font-mono text-sm bg-gray-50"
            defaultValue="https://bank.bt/pay?bid={{booking_id}}&amt={{amount}}"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Signature Method</label>
            <select className="w-full mt-2 p-4 border rounded-xl bg-white">
              <option>HMAC-SHA256</option>
              <option>SHA512</option>
              <option>RSA-PSS</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Callback Status Mapping</label>
            <input className="w-full mt-2 p-4 border rounded-xl" placeholder='{"00": "success", "01": "failed"}' />
          </div>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-100">Save Configuration</button>
      </div>
    </div>
  );
};
