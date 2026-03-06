import React, { useState } from 'react';

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-96 group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-sm font-medium"
        placeholder="Search Dzongkhags or Hotels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
