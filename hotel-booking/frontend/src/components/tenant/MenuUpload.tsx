import React, { useState } from 'react';

export const MenuUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-8 bg-blue-50 border border-blue-100 rounded-2xl">
      <h2 className="text-xl font-bold text-blue-900 mb-2">Property Menu (PDF)</h2>
      <p className="text-sm text-blue-600 mb-6">Upload your latest menu to be attached to booking confirmation emails.</p>

      <div className="flex items-center gap-4">
        <label className="bg-white border-2 border-dashed border-blue-300 p-8 rounded-xl flex-1 text-center cursor-pointer hover:bg-blue-100 transition-colors">
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <span className="text-blue-500 font-bold">{file ? file.name : 'Choose PDF File'}</span>
        </label>
        <button className="bg-blue-600 text-white px-8 py-8 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50" disabled={!file}>
          Upload
        </button>
      </div>
    </div>
  );
};
