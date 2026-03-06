import React, { useState } from 'react';

export const WalkInBookingForm: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-bold mb-6">Quick Walk-in Booking</h2>
      <div className="space-y-4">
        <input className="w-full border p-3 rounded-xl" placeholder="Guest Full Name" />
        <input className="w-full border p-3 rounded-xl" placeholder="ID Number (Passport/CID)" />
        <div className="grid grid-cols-2 gap-4">
           <input type="date" className="border p-3 rounded-xl" />
           <input type="date" className="border p-3 rounded-xl" />
        </div>
        <select className="w-full border p-3 rounded-xl bg-white">
           <option>Select Room Type...</option>
           <option>Deluxe Heritage (2 available)</option>
           <option>Royal Suite (1 available)</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100">Confirm & Generate Receipt</button>
      </div>
    </div>
  );
};
