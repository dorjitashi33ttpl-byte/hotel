import React from 'react';

export const AvailabilityCalendar: React.FC = () => {
  return (
    <div className="p-8 bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Availability Matrix</h2>
        <div className="flex gap-4">
           <button className="px-4 py-2 border rounded-xl font-bold text-sm bg-gray-50 hover:bg-white transition-all shadow-sm">Previous</button>
           <button className="px-4 py-2 border rounded-xl font-bold text-sm bg-gray-50 hover:bg-white transition-all shadow-sm">Next</button>
        </div>
      </div>

      <div className="grid grid-cols-8 border rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 border-r p-4 font-black uppercase text-[10px] text-gray-400">Room Type</div>
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-gray-50 border-r p-4 text-center font-black text-sm text-gray-700">Jun {10 + i}</div>
        ))}

        <div className="border-t border-r p-6 font-bold text-sm">Deluxe Heritage</div>
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`border-t border-r p-6 flex items-center justify-center ${i % 3 === 0 ? 'bg-red-50 text-red-600 font-black' : 'bg-green-50 text-green-600 font-bold'}`}>
            {i % 3 === 0 ? '0' : '8'}
          </div>
        ))}

        <div className="border-t border-r p-6 font-bold text-sm">Royal Suite</div>
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`border-t border-r p-6 flex items-center justify-center ${i === 2 ? 'bg-orange-50 text-orange-600 font-black' : 'bg-green-50 text-green-600 font-bold'}`}>
            {i === 2 ? '1' : '2'}
          </div>
        ))}
      </div>
    </div>
  );
};
