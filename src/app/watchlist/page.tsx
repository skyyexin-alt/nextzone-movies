"use client";

import { useState, useEffect } from 'react';
import { useWatchlist, WatchStatus, WatchlistItem } from '@/context/WatchlistContext';
import Container from '@/components/ui/Container';
import { Bookmark, Star, Edit3, User, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MDLAddToListModal from '@/components/ui/MDLAddToListModal';

import QuickFilterTabs from '@/components/ui/QuickFilterTabs';

export default function WatchlistPage() {
  const { watchlist, getStats, isLoaded } = useWatchlist();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | WatchStatus>('all');
  const [editingItem, setEditingItem] = useState<WatchlistItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = getStats();

  const filteredList = watchlist.filter((entry) => {
    if (activeTab === 'all') return true;
    return entry.status === activeTab;
  });

  const getStatusBadge = (st: WatchStatus) => {
    switch (st) {
      case 'watching':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase">Watching</span>;
      case 'completed':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase">Completed</span>;
      case 'plan_to_watch':
        return <span className="bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase">Plan to Watch</span>;
      case 'on_hold':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase">On Hold</span>;
      case 'dropped':
        return <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase">Dropped</span>;
    }
  };

  return (
    <Container className="pt-24 pb-32 md:pt-28 md:pb-36 min-h-screen">
      {/* ── Top 4-Tab Quick Navigation Bar (Persistent with Active Indicator!) ── */}
      <QuickFilterTabs />

      {/* MDL User Profile Header Banner */}
      <div className="bg-[#14142f] border border-white/8 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 border border-violet-400/40 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="text-2xl md:text-3xl font-black text-white">My Watchlist Dashboard</h1>
                <span className="bg-violet-600/20 text-violet-300 border border-violet-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Profile Stats
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">Track your watched movies, dramas, scores, and progress</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/3 border border-white/8 px-4 py-2.5 rounded-2xl">
            <BarChart2 className="w-5 h-5 text-violet-400" />
            <div>
              <span className="block text-[10px] font-bold text-zinc-400 uppercase">Mean Rating Score</span>
              <span className="text-lg font-black text-amber-400">{stats.meanScore > 0 ? `⭐ ${stats.meanScore} / 10` : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div className="bg-white/3 border border-white/6 p-3 rounded-2xl text-center">
            <span className="block text-[10px] font-extrabold text-zinc-400 uppercase">Total Items</span>
            <span className="text-xl font-black text-white">{stats.total}</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl text-center">
            <span className="block text-[10px] font-extrabold text-emerald-400 uppercase">Watching</span>
            <span className="text-xl font-black text-emerald-400">{stats.watching}</span>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-2xl text-center">
            <span className="block text-[10px] font-extrabold text-blue-400 uppercase">Completed</span>
            <span className="text-xl font-black text-blue-400">{stats.completed}</span>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/20 p-3 rounded-2xl text-center">
            <span className="block text-[10px] font-extrabold text-violet-300 uppercase">Plan to Watch</span>
            <span className="text-xl font-black text-violet-300">{stats.planToWatch}</span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-center">
            <span className="block text-[10px] font-extrabold text-amber-400 uppercase">On Hold</span>
            <span className="text-xl font-black text-amber-400">{stats.onHold}</span>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-2xl text-center">
            <span className="block text-[10px] font-extrabold text-rose-400 uppercase">Dropped</span>
            <span className="text-xl font-black text-rose-400">{stats.dropped}</span>
          </div>
        </div>
      </div>

      {/* MDL Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-[#14142f] border border-white/8 p-1.5 rounded-2xl mb-6 overflow-x-auto scrollbar-hide">
        {[
          { id: 'all', label: `All (${stats.total})` },
          { id: 'watching', label: `Watching (${stats.watching})` },
          { id: 'completed', label: `Completed (${stats.completed})` },
          { id: 'plan_to_watch', label: `Plan to Watch (${stats.planToWatch})` },
          { id: 'on_hold', label: `On Hold (${stats.onHold})` },
          { id: 'dropped', label: `Dropped (${stats.dropped})` },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Watchlist Content */}
      {!mounted || !isLoaded ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredList.length > 0 ? (
        <div className="space-y-3">
          {filteredList.map((entry) => {
            const item = entry.item;
            const title = item.title || item.name || 'Untitled';
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w185${item.poster_path}` : '/no-poster.png';
            const year = (item.release_date || item.first_air_date || '').substring(0, 4);

            return (
              <div
                key={item.id}
                className="bg-[#14142f] border border-white/8 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-violet-500/30 transition-all shadow-lg"
              >
                {/* Poster & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <Link href={`/${item.media_type || 'movie'}/${item.id}`} className="relative w-14 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group">
                    <Image src={poster} alt={title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </Link>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {getStatusBadge(entry.status)}
                      <span className="text-[11px] text-zinc-400 capitalize">{item.media_type || 'movie'}</span>
                      {year && <span className="text-[11px] text-zinc-500">• {year}</span>}
                    </div>

                    <Link href={`/${item.media_type || 'movie'}/${item.id}`} className="font-extrabold text-white text-sm hover:text-violet-300 transition-colors line-clamp-1">
                      {title}
                    </Link>

                    {entry.notes && (
                      <p className="text-[11px] text-zinc-400 italic line-clamp-1 mt-1">&ldquo;{entry.notes}&rdquo;</p>
                    )}
                  </div>
                </div>

                {/* Rating & Progress Actions */}
                <div className="flex items-center gap-4 self-end sm:self-center flex-shrink-0">
                  {entry.userRating ? (
                    <div className="flex items-center gap-1 bg-amber-500/15 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{entry.userRating} / 10</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500 font-semibold">Unrated</span>
                  )}

                  <button
                    onClick={() => setEditingItem(entry)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-violet-400" />
                    <span>Edit Status</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#14142f] rounded-3xl border border-white/8">
          <Bookmark className="w-14 h-14 text-zinc-600 mb-3" />
          <h2 className="text-xl font-bold text-white mb-1">No items in this status list</h2>
          <p className="text-zinc-400 text-xs max-w-md">
            Explore movies and dramas to add them to your watchlist.
          </p>
        </div>
      )}

      {/* Edit Entry Modal */}
      {editingItem && (
        <MDLAddToListModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          item={editingItem.item}
        />
      )}
    </Container>
  );
}
