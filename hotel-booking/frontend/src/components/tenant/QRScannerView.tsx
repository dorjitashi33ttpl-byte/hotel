import React from 'react';

export const QRScannerView: React.FC = () => {
  return (
    <div className="p-8 bg-gray-900 text-white rounded-3xl overflow-hidden relative shadow-2xl">
      <h3 className="text-xl font-bold mb-6">Scan Guest Digital Key</h3>
      <div className="aspect-square bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-700 relative">
         <div className="w-64 h-64 border-2 border-blue-500 rounded-xl" />
         <div className="absolute inset-0 bg-blue-500 opacity-10 animate-pulse" />
         <span className="absolute bottom-4 text-[10px] uppercase font-bold text-gray-500">Awaiting Guest QR Code...</span>
      </div>
      <div className="mt-8 space-y-4">
         <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Manual Check-in</button>
      </div>
    </div>
  );
};
