import React, { useState } from 'react';

export const PaymentRegistry: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Payment Provider Registry</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Stripe', 'Razorpay', 'PayPal', 'Bhutan Bank'].map(provider => (
          <div key={provider} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-4">{provider}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                  <span className="text-sm font-semibold">Active</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Credentials</label>
                <p className="text-sm font-mono text-gray-500 mt-1">Encrypted ••••••••••••</p>
              </div>
              <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-black">Configure</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
