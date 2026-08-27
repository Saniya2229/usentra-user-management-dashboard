import React from 'react';
import { Mail, Phone, Globe, Building2, Eye, Edit3, Trash2, ExternalLink } from 'lucide-react';

export default function UserTable({ users, onView, onEdit, onDelete }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/90 text-xs uppercase text-slate-400 font-semibold tracking-wider border-b border-slate-800">
            <tr>
              <th scope="col" className="px-6 py-4">User</th>
              <th scope="col" className="px-6 py-4">Company</th>
              <th scope="col" className="px-6 py-4">Contact</th>
              <th scope="col" className="px-6 py-4">Website</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {users.map((user) => {
              const companyName = typeof user.company === 'string' ? user.company : user.company?.name || 'N/A';
              const initials = user.name
                ? user.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : 'U';

              const websiteUrl = user.website
                ? user.website.startsWith('http')
                  ? user.website
                  : `https://${user.website}`
                : null;

              return (
                <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Name & Email */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100">{user.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      <Building2 className="w-3.5 h-3.5" />
                      {companyName}
                    </span>
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      {user.phone || 'N/A'}
                    </div>
                  </td>

                  {/* Website */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    {websiteUrl ? (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-400 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{user.website}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    ) : (
                      <span className="text-slate-500">N/A</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/20 transition-all"
                        title="View Details"
                        aria-label="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEdit(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-amber-500/20 transition-all"
                        title="Edit User"
                        aria-label="Edit User"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete(user)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-all"
                        title="Delete User"
                        aria-label="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
