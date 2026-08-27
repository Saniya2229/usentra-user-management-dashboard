import React, { useState, useEffect } from 'react';
import userApi from '../services/userApi';
import { X, Mail, Phone, Globe, Building, MapPin, FileText, Loader2, ExternalLink, MessageSquare } from 'lucide-react';

export default function UserDetailsModal({ user, onClose }) {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    setLoadingPosts(true);
    setPostsError(null);

    userApi
      .getUserPosts(user.id)
      .then((data) => {
        if (isMounted) {
          setPosts(data || []);
          setLoadingPosts(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setPostsError(err.message || 'Failed to load user posts');
          setLoadingPosts(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!user) return null;

  const companyObj = typeof user.company === 'object' ? user.company : { name: user.company };
  const addressObj = user.address || {};

  const fullAddress = [
    addressObj.suite,
    addressObj.street,
    addressObj.city,
    addressObj.zipcode,
  ]
    .filter(Boolean)
    .join(', ');

  const geoMapLink = addressObj.geo?.lat && addressObj.geo?.lng
    ? `https://maps.google.com/?q=${addressObj.geo.lat},${addressObj.geo.lng}`
    : null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-details-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-900/40 via-slate-900 to-purple-900/30 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
              {initials}
            </div>
            <div>
              <h2 id="user-details-title" className="text-2xl font-bold text-slate-100">
                {user.name}
              </h2>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">
                User ID: #{user.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* User Meta Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Details Card */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> Contact Information
              </h3>
              <div className="text-xs space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block">Email Address</span>
                  <a href={`mailto:${user.email}`} className="text-indigo-300 hover:underline font-medium">
                    {user.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone Number</span>
                  <span className="font-mono">{user.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Website</span>
                  {user.website ? (
                    <a
                      href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline inline-flex items-center gap-1"
                    >
                      {user.website} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>
            </div>

            {/* Company Details Card */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-purple-400" /> Company Details
              </h3>
              <div className="text-xs space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block">Company Name</span>
                  <span className="font-semibold text-slate-100">{companyObj.name || 'N/A'}</span>
                </div>
                {companyObj.catchPhrase && (
                  <div>
                    <span className="text-slate-500 block">Catchphrase</span>
                    <span className="italic text-slate-400">"{companyObj.catchPhrase}"</span>
                  </div>
                )}
                {companyObj.bs && (
                  <div>
                    <span className="text-slate-500 block">Business Strategy</span>
                    <span className="text-slate-400">{companyObj.bs}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Address Information Card */}
          {fullAddress && (
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Location & Address
              </h3>
              <p className="text-xs text-slate-300">{fullAddress}</p>
              {geoMapLink && (
                <a
                  href={geoMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline font-medium"
                >
                  View Geolocation on Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* User Posts Section (Requirements Point 3) */}
          <div className="pt-2">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> User's Published Posts
            </h3>

            {loadingPosts ? (
              <div className="flex items-center justify-center py-8 text-slate-400 gap-2 text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                Loading posts...
              </div>
            ) : postsError ? (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {postsError}
              </div>
            ) : posts.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No posts found for this user.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <h4 className="text-xs font-bold text-indigo-200 capitalize mb-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed capitalize">
                      {post.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
