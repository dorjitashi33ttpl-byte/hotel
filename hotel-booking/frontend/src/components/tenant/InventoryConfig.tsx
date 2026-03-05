import React, { useState } from 'react';

interface RoomType {
  id: number;
  name: string;
  totalQuantity: number;
  mode: 'room_type' | 'fixed_room';
}

export const InventoryConfig: React.FC<{ roomTypes: RoomType[] }> = ({ roomTypes }) => {
  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Inventory Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roomTypes.map(rt => (
          <div key={rt.id} className="border p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{rt.name}</h3>
            <p className="text-sm text-gray-500">Mode: {rt.mode}</p>
            {rt.mode === 'room_type' ? (
              <div className="mt-2">
                <label className="text-xs uppercase font-bold text-gray-500">Total Count</label>
                <input type="number" defaultValue={rt.totalQuantity} className="block w-full border p-2 rounded mt-1" />
              </div>
            ) : (
              <div className="mt-2">
                <label className="text-xs uppercase font-bold text-gray-500">Room Numbers</label>
                <div className="flex gap-2 mt-1">
                  {['101', '102', '103'].map(r => (
                    <span key={r} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{r}</span>
                  ))}
                  <button className="text-blue-500 text-sm font-bold">+ Add Room</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
