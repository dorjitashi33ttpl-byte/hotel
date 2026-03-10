import React, { useState } from 'react';

export const PaymentRegistry: React.FC = () => {
  return (
    <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-black mb-8">Payment Provider Registry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {['Stripe', 'Razorpay', 'PayPal', 'Bhutan National Bank'].map(provider => (
          <div key={provider} className="p-8 border-2 border-gray-50 rounded-3xl hover:border-blue-500 transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{provider}</h3>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase text-gray-400">Webhook Secret</label>
                <input type="password" value="••••••••••••••••" className="bg-gray-50 p-3 rounded-xl mt-2 outline-none" readOnly />
              </div>
              <button className="text-blue-600 font-bold text-sm">Edit Configuration</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
