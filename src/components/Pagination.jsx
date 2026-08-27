import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  if (totalCount === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="glass-panel p-4 rounded-xl mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 text-sm text-slate-300">
      {/* Range Info */}
      <div className="text-xs text-slate-400">
        Showing <span className="font-semibold text-slate-200">{startItem}</span> to{' '}
        <span className="font-semibold text-slate-200">{endItem}</span> of{' '}
        <span className="font-semibold text-slate-200">{totalCount}</span> users
      </div>

      {/* Page Navigation & Size Switcher */}
      <div className="flex items-center gap-4">
        {/* Items Per Page Select */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 bg-slate-900 border border-slate-700/80 rounded-md text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
          </select>
        </div>

        {/* Page Switcher Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-300 transition-colors"
            title="Previous Page"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-lg">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent text-slate-300 transition-colors"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
