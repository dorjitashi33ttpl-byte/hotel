import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toLowerCase();

  const getStyles = () => {
    switch (normalized) {
      case 'active':
      case 'verified':
      case 'confirmed':
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'pending':
      case 'hold':
      case 'draft':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'inactive':
      case 'disabled':
      case 'cancelled':
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-100';
    }
  };

  return (
    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full ${getStyles()}`}>
      {status}
    </span>
  );
};
