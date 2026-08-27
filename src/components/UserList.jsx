import React from 'react';
import UserCard from './UserCard';
import UserTable from './UserTable';
import { AlertTriangle, RefreshCw, UserX } from 'lucide-react';

export default function UserList({
  users,
  loading,
  error,
  viewMode,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onRetry,
  onResetFilters,
}) {
  // Skeleton Loading State
  if (loading) {
    return (
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'w-full'}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 border border-slate-800 animate-pulse space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800/60 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3.5 bg-slate-800/80 rounded w-full" />
              <div className="h-3.5 bg-slate-800/80 rounded w-5/6" />
              <div className="h-3.5 bg-slate-800/80 rounded w-2/3" />
            </div>
            <div className="h-8 bg-slate-800 rounded-lg w-full pt-2" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="glass-panel p-8 rounded-2xl border border-rose-500/30 text-center my-8 max-w-lg mx-auto shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">Failed to Load Users</h3>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-600/30 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  // Empty State ("No users found")
  if (!users || users.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center my-8 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
          <UserX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">No users found</h3>
        <p className="text-slate-400 text-sm mb-6">
          We couldn't find any users matching your search or active filter criteria.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  // Render Grid or Table View
  if (viewMode === 'table') {
    return (
      <UserTable
        users={users}
        onView={onViewUser}
        onEdit={onEditUser}
        onDelete={onDeleteUser}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onView={onViewUser}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      ))}
    </div>
  );
}
