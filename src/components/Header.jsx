import React from 'react';
import { Users, Plus, ShieldCheck, Building2, Sparkles } from 'lucide-react';

export default function Header({ totalUsers, totalCompanies, onOpenCreateModal }) {
  return (
    <header className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 mb-8 border border-slate-800 shadow-2xl">
      {/* Background glow accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Live REST API Integration
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Usentra Management Dashboard
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            A modern React-based user management dashboard for viewing, searching, filtering, sorting, creating, editing, and deleting users through a REST API.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800/50">
              <Users className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="text-xs text-slate-400">Total Users</div>
                <div className="text-sm font-bold text-white">{totalUsers}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800/50">
              <Building2 className="w-4 h-4 text-violet-400" />
              <div>
                <div className="text-xs text-slate-400">Companies</div>
                <div className="text-sm font-bold text-white">{totalCompanies}</div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> API Connected
            </div>
          </div>

          {/* Create User Button */}
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add New User
          </button>
        </div>
      </div>
    </header>
  );
}
