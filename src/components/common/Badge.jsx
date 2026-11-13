import React from 'react';

export default function Badge({ status, size = 'sm' }) {
  let style = 'bg-slate-100 text-slate-700 border-slate-200';

  switch (status?.toLowerCase()) {
    case 'paid':
    case 'completed':
    case 'active':
      style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'pending':
    case 'in progress':
      style = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'overdue':
    case 'rejected':
    case 'cancelled':
      style = 'bg-rose-50 text-rose-700 border-rose-200';
      break;
    case 'requested':
      style = 'bg-sky-50 text-sky-700 border-sky-200';
      break;
    case 'draft':
      style = 'bg-slate-100 text-slate-600 border-slate-200';
      break;
    default:
      style = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }

  const sizeClasses = size === 'xs' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-xs font-medium px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${style}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
}
