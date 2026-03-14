import React from 'react';
import { DataTable } from './framework/DataTable';

export const CountrySettings = () => {
  const columns = [
    { header: 'Country', accessor: 'name' },
    { header: 'ISO', accessor: 'iso_code' },
    { header: 'Currency', accessor: 'currency' },
    { header: 'Timezone', accessor: 'timezone' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif">Global Localization</h1>
        <div className="flex gap-4">
           <button className="border border-stone-200 px-6 py-2 text-sm uppercase tracking-widest hover:bg-stone-50 transition-colors">
            Import CSV
          </button>
          <button className="bg-stone-900 text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors">
            Add Country
          </button>
        </div>
      </div>

      <DataTable columns={columns} endpoint="/admin/geo/countries" />
    </div>
  );
};
