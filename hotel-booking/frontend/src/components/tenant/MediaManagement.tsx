import React, { useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, Video, Star, ExternalLink, RefreshCw } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  isPrimary: boolean;
  category: 'exterior' | 'interior' | 'room' | 'amenity' | 'other';
  label: string;
}

const MediaManagement: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([
    { id: '1', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', type: 'image', isPrimary: true, category: 'exterior', label: 'Hotel Frontage' },
    { id: '2', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', type: 'image', isPrimary: false, category: 'room', label: 'Deluxe Suite' },
  ]);

  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      const newItem: MediaItem = {
        id: Math.random().toString(),
        url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
        type: 'image',
        isPrimary: false,
        category: 'interior',
        label: 'Lobby area'
      };
      setItems([...items, newItem]);
      setUploading(false);
    }, 1500);
  };

  const setPrimary = (id: string) => {
    setItems(items.map(item => ({ ...item, isPrimary: item.id === id })));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Media Management</h2>
          <p className="text-sm text-slate-500">Upload and organize property photos and videos</p>
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {uploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          <span>Upload Media</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group relative bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
            <div className="aspect-video relative">
              <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
              {item.isPrimary && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-yellow-900" /> Primary
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <button
                  onClick={() => setPrimary(item.id)}
                  title="Set as Primary"
                  className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md"
                >
                  <Star className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  title="Delete"
                  className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-md"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <a href={item.url} target="_blank" rel="noreferrer" className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.category}</span>
                {item.type === 'image' ? <ImageIcon className="w-3 h-3 text-slate-400" /> : <Video className="w-3 h-3 text-slate-400" />}
              </div>
              <p className="text-sm font-medium text-slate-700 truncate">{item.label}</p>
            </div>
          </div>
        ))}

        {/* Upload Placeholder */}
        <button
          onClick={handleUpload}
          className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center p-6 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
            <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
          </div>
          <p className="text-sm font-medium text-slate-600 group-hover:text-indigo-700">Add New</p>
        </button>
      </div>

      <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <h4 className="text-sm font-bold text-indigo-900 mb-2">Storage Optimization Tips</h4>
        <ul className="text-xs text-indigo-700 space-y-1">
          <li>• Recommended resolution: 1920x1080 for standard photos</li>
          <li>• Use JPEG format for photos to reduce file size</li>
          <li>• Ensure videos are under 50MB and in MP4 format</li>
        </ul>
      </div>
    </div>
  );
};

export default MediaManagement;
