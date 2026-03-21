import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  ChevronLeft, ChevronRight, Search, Filter,
  MoreVertical, Edit2, Trash2, Eye, Download, Upload,
  CheckSquare, Square, Loader2
} from 'lucide-react';
import { api } from '../../../services/api';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  endpoint: string;
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  bulkActions?: { label: string, action: (items: any[]) => void }[];
}

export const DataTable: React.FC<DataTableProps> = ({
  columns, endpoint, onAdd, onEdit, onDelete, bulkActions
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { data, isLoading, isError } = useQuery(
    [endpoint, page, search],
    () => api.get(endpoint, { params: { page, search, limit: 10 } }).then(res => res.data),
    { keepPreviousData: true }
  );

  const items = data?.items || [];
  const totalPages = Math.ceil((data?.total || 0) / 10);

  const toggleSelect = (item: any) => {
    setSelectedItems(prev => prev.some(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]);
  };

  return (
    <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
      {/* Search & Actions Bar */}
      <div className="p-8 border-b border-stone-50 flex justify-between items-center bg-stone-50/30">
         <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
            <input
              type="text"
              placeholder="Search entries..."
              className="w-full bg-white border border-stone-100 py-3 pl-12 pr-4 outline-none font-light text-sm focus:border-gold transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <div className="flex gap-4">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors">
               <Filter className="w-4 h-4" /> Filters
            </button>
            {onAdd && (
              <button onClick={onAdd} className="bg-stone-900 text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500">
                Add New
              </button>
            )}
         </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="p-4 bg-stone-900 text-white flex justify-between items-center px-12 animate-in slide-in-from-top duration-300">
           <span className="text-[10px] font-bold uppercase tracking-widest">{selectedItems.length} items selected</span>
           <div className="flex gap-6">
              {bulkActions?.map(ba => (
                <button key={ba.label} onClick={() => ba.action(selectedItems)} className="text-[10px] font-black uppercase tracking-widest text-gold hover:text-white transition-colors">{ba.label}</button>
              ))}
              <button onClick={() => setSelectedItems([])} className="text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100">Clear</button>
           </div>
        </div>
      )}

      {/* Table */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
             <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        )}

        <table className="w-full text-left">
           <thead>
              <tr className="border-b border-stone-100">
                 <th className="p-6 w-12 text-center">
                    <button onClick={() => setSelectedItems(selectedItems.length === items.length ? [] : [...items])}>
                       {selectedItems.length === items.length && items.length > 0 ? <CheckSquare className="w-4 h-4 text-stone-900" /> : <Square className="w-4 h-4 text-stone-200" />}
                    </button>
                 </th>
                 {columns.map(col => (
                   <th key={col.accessor} className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">{col.header}</th>
                 ))}
                 <th className="p-6 text-right text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-stone-50">
              {items.map((item: any) => (
                <tr key={item.id} className={`hover:bg-stone-50/50 transition-colors group ${selectedItems.some(i => i.id === item.id) ? 'bg-stone-50' : ''}`}>
                   <td className="p-6 text-center">
                      <button onClick={() => toggleSelect(item)}>
                         {selectedItems.some(i => i.id === item.id) ? <CheckSquare className="w-4 h-4 text-stone-900" /> : <Square className="w-4 h-4 text-stone-200" />}
                      </button>
                   </td>
                   {columns.map(col => (
                     <td key={col.accessor} className="p-6 text-sm font-medium text-stone-600">
                        {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                     </td>
                   ))}
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         {onEdit && <button onClick={() => onEdit(item)} className="p-2 hover:text-gold transition-colors"><Edit2 className="w-4 h-4" /></button>}
                         {onDelete && <button onClick={() => onDelete(item)} className="p-2 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>}
                         <button className="p-2 hover:text-stone-900 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>

        {!isLoading && items.length === 0 && (
          <div className="p-32 text-center">
             <div className="text-stone-200 font-serif text-8xl mb-8 leading-none italic opacity-50">Nothing found</div>
             <p className="text-stone-400 font-light text-lg tracking-tight">Your sanctuary database is currently empty for this criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="p-8 bg-stone-50/30 border-t border-stone-50 flex justify-between items-center">
         <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
           Showing {items.length} of {data?.total || 0} entries
         </span>
         <div className="flex gap-4 items-center">
            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest mr-4">Page {page} of {totalPages || 1}</span>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-stone-200 hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-2 border border-stone-200 hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  );
};
