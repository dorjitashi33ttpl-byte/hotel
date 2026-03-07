import React from 'react';
import { motion } from 'framer-motion';

export const CountrySettings: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-gray-900">Regional Management</h1>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-all">Add New Country</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Country</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">ISO</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-blue-50 transition-colors cursor-pointer">
              <td className="px-6 py-5 font-bold">Bhutan</td>
              <td className="px-6 py-5 font-mono text-sm">BT</td>
              <td className="px-6 py-5">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</span>
              </td>
              <td className="px-6 py-5 text-right font-bold text-blue-600">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
