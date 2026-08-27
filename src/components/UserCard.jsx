import React from 'react';
import { Mail, Phone, Globe, Building2, Eye, Edit3, Trash2, ExternalLink } from 'lucide-react';

export default function UserCard({ user, onView, onEdit, onDelete }) {
  const companyName = typeof user.company === 'string' ? user.company : user.company?.name || 'N/A';
  
  // Format avatar initials
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  // Format website link
  const websiteUrl = user.website
    ? user.website.startsWith('http')
      ? user.website
      : `https://${user.website}`
    : null;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden">
      {/* Top accent border hover effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header section with Avatar and Actions */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-indigo-500/20 shrink-0">
              {initials}
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors line-clamp-1">
                {user.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-indigo-300/80 mt-0.5">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[160px] font-medium">{companyName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-2.5 my-4 text-sm text-slate-300">
          {/* Email */}
          <div className="flex items-center gap-2.5 text-slate-300">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <a
              href={`mailto:${user.email}`}
              className="hover:text-indigo-400 transition-colors truncate text-xs sm:text-sm"
            >
              {user.email || 'No email provided'}
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2.5 text-slate-300">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-300 font-mono">
              {user.phone || 'N/A'}
            </span>
          </div>

          {/* Website */}
          <div className="flex items-center gap-2.5 text-slate-300">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            {websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors text-xs sm:text-sm text-indigo-400/90 underline-offset-2 hover:underline truncate"
              >
                <span>{user.website}</span>
                <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
              </a>
            ) : (
              <span className="text-xs sm:text-sm text-slate-400">N/A</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
        <button
          onClick={() => onView(user)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/70 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 text-xs font-semibold border border-slate-700/50 hover:border-indigo-500/40 transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          View
        </button>

        <button
          onClick={() => onEdit(user)}
          className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-800/70 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs font-semibold border border-slate-700/50 hover:border-amber-500/40 transition-all cursor-pointer"
          title="Edit User"
          aria-label="Edit User"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onDelete(user)}
          className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-800/70 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-semibold border border-slate-700/50 hover:border-rose-500/40 transition-all cursor-pointer"
          title="Delete User"
          aria-label="Delete User"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
