import React from 'react';
import {
  ChevronLeft, ChevronRight, Search, Filter,
  MoreVertical, Edit2, Trash2, Eye, Download, Upload
} from 'lucide-react';

interface Column {
  key: string;
  header: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  description?: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  onExport?: () => void;
  onImport?: () => void;
  loading?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  title, description, columns, data,
  onAdd, onEdit, onDelete, onView, onExport, onImport, loading
}) => {
  return (
    <div className="p-12 space-y-10">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
           <nav className="flex text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-4">
              <span>Admin</span>
              <span className="mx-2">/</span>
              <span className="text-stone-900">{title}</span>
           </nav>
           <h1 className="text-5xl font-serif tracking-tighter">{title}</h1>
           {description && <p className="text-stone-400 font-light text-lg">{description}</p>}
        </div>
        <div className="flex gap-4">
           {onImport && (
             <button onClick={onImport} className="flex items-center gap-2 border border-stone-200 px-6 py-3 font-serif text-[10px] uppercase tracking-widest hover:bg-stone-50 transition-all">
                <Upload className="w-3 h-3" /> Import
             </button>
           )}
           {onExport && (
             <button onClick={onExport} className="flex items-center gap-2 border border-stone-200 px-6 py-3 font-serif text-[10px] uppercase tracking-widest hover:bg-stone-50 transition-all">
                <Download className="w-3 h-3" /> Export
             </button>
           )}
           {onAdd && (
             <button onClick={onAdd} className="bg-stone-900 text-white px-8 py-3 font-serif text-[10px] uppercase tracking-widest hover:bg-gold transition-all duration-500">
                Add New {title.slice(0, -1)}
             </button>
           )}
        </div>
      </div>

      <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-stone-50 flex justify-between items-center bg-stone-50/30">
           <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
              <input type="text" placeholder="Search entries..." className="w-full bg-white border border-stone-100 py-3 pl-12 pr-4 outline-none font-light text-sm focus:border-gold transition-colors" />
           </div>
           <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900">
              <Filter className="w-4 h-4" /> Filters
           </button>
        </div>

        <table className="w-full text-left">
           <thead>
              <tr className="border-b border-stone-100">
                 <th className="p-6 w-12"><input type="checkbox" className="accent-stone-900" /></th>
                 {columns.map(col => (
                   <th key={col.key} className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">{col.header}</th>
                 ))}
                 <th className="p-6 text-right text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-stone-50">
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-stone-50/50 transition-colors group">
                   <td className="p-6"><input type="checkbox" className="accent-stone-900" /></td>
                   {columns.map(col => (
                     <td key={col.key} className="p-6 text-sm font-medium text-stone-600">
                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                     </td>
                   ))}
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         {onView && <button onClick={() => onView(item)} className="p-2 hover:text-blue-600"><Eye className="w-4 h-4" /></button>}
                         {onEdit && <button onClick={() => onEdit(item)} className="p-2 hover:text-gold"><Edit2 className="w-4 h-4" /></button>}
                         {onDelete && <button onClick={() => onDelete(item)} className="p-2 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>

        {data.length === 0 && (
          <div className="p-32 text-center">
             <div className="text-stone-200 font-serif text-8xl mb-8 leading-none italic opacity-50">Nothing found</div>
             <p className="text-stone-400 font-light text-lg">Your sanctuary database is currently empty for this criteria.</p>
          </div>
        )}

        <div className="p-8 bg-stone-50/30 border-t border-stone-50 flex justify-between items-center">
           <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Showing 1 to {data.length} of {data.length} entries</span>
           <div className="flex gap-4">
              <button className="p-2 border border-stone-200 hover:bg-stone-100 transition-all"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-2 border border-stone-200 hover:bg-stone-100 transition-all"><ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  );
};
