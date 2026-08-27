import React from 'react';
import { Search, Filter, ArrowUpDown, LayoutGrid, Table, X } from 'lucide-react';

export default function UserFilterBar({
  searchInput,
  setSearchInput,
  selectedCompany,
  setSelectedCompany,
  sortBy,
  setSortBy,
  companyList,
  viewMode,
  setViewMode,
  onResetFilters,
}) {
  const hasActiveFilters = searchInput.trim() !== '' || selectedCompany !== '' || sortBy !== 'name-asc';

  return (
    <div className="glass-panel p-4 rounded-xl mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border border-slate-800 shadow-lg">
      {/* Search Box */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or email address..."
          className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        {searchInput && (
          <button
            onClick={() => setSearchInput('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filters & Sorting Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Company Dropdown */}
        <div className="relative flex-1 sm:flex-initial min-w-[160px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Companies</option>
            {companyList.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="relative flex-1 sm:flex-initial min-w-[150px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
          >
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="company-asc">Sort: Company</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="px-3 py-2 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg border border-indigo-500/30 transition-colors"
          >
            Reset Filters
          </button>
        )}

        {/* View Switcher (Grid vs Table) */}
        <div className="flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-lg ml-auto sm:ml-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Grid View"
            aria-label="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Table View"
            aria-label="Table View"
          >
            <Table className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
