"use client";

import { useState, useEffect } from 'react';
import { X, Star, Check, Trash2, Bookmark } from 'lucide-react';
import { MediaItem } from '@/lib/tmdb';
import { useWatchlist, WatchStatus } from '@/context/WatchlistContext';

interface MDLAddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MediaItem;
}

const statusOptions: { value: WatchStatus; label: string; color: string }[] = [
  { value: 'watching', label: 'Watching', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'plan_to_watch', label: 'Plan to Watch', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  { value: 'on_hold', label: 'On Hold', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { value: 'dropped', label: 'Dropped', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
];

export default function MDLAddToListModal({ isOpen, onClose, item }: MDLAddToListModalProps) {
  const { getEntry, updateEntry, removeEntry } = useWatchlist();
  const existing = getEntry(item.id);

  const [status, setStatus] = useState<WatchStatus>(existing?.status || 'plan_to_watch');
  const [rating, setRating] = useState<number>(existing?.userRating || 0);
  const [progress, setProgress] = useState<number>(existing?.progress || 0);
  const [notes, setNotes] = useState<string>(existing?.notes || '');

  useEffect(() => {
    if (existing) {
      setStatus(existing.status);
      setRating(existing.userRating || 0);
      setProgress(existing.progress || 0);
      setNotes(existing.notes || '');
    }
  }, [existing, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    updateEntry(item, status, rating > 0 ? rating : undefined, progress, notes);
    onClose();
  };

  const handleDelete = () => {
    removeEntry(item.id);
    onClose();
  };

  const titleName = item.title || item.name || 'Untitled';
  const totalEps = item.media_type === 'tv' ? 16 : 1;

  const getRatingLabel = (score: number) => {
    if (score === 10) return '(10) Masterpiece';
    if (score === 9) return '(9) Great';
    if (score === 8) return '(8) Very Good';
    if (score === 7) return '(7) Good';
    if (score === 6) return '(6) Fine';
    if (score === 5) return '(5) Average';
    if (score === 4) return '(4) Bad';
    if (score === 3) return '(3) Very Bad';
    if (score === 2) return '(2) Horrible';
    if (score === 1) return '(1) Appalling';
    return 'Select Rating';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#14142f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1a1a3e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base line-clamp-1">{titleName}</h3>
              <p className="text-xs text-zinc-400">MyDramaList Watch Status</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Status Selection */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Watch Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statusOptions.map((opt) => {
                const isSelected = status === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? `${opt.color} ring-2 ring-violet-500/50`
                        : 'bg-white/3 border-white/8 text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating (1-10 Stars) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                My Score / Rating
              </label>
              <span className="text-xs font-semibold text-violet-300">
                {rating > 0 ? getRatingLabel(rating) : 'Unrated'}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white/3 border border-white/8 p-3 rounded-xl justify-between flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star === rating ? 0 : star)}
                  className={`p-1.5 rounded-lg transition-transform active:scale-95 ${
                    star <= rating ? 'text-amber-400' : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                  title={`${star}/10`}
                >
                  <Star className={`w-5 h-5 ${star <= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Progress (Episodes watched) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Episode / Progress Tracker
              </label>
              <span className="text-xs font-semibold text-zinc-300">
                {progress} / {totalEps} {item.media_type === 'tv' ? 'Eps' : 'Movie'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max={totalEps}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="flex-1 accent-violet-500 h-2 bg-white/10 rounded-lg cursor-pointer"
              />
              <input
                type="number"
                min="0"
                max={totalEps}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-16 bg-white/5 border border-white/10 rounded-xl px-2 py-1 text-center text-xs text-white font-bold"
              />
            </div>
          </div>

          {/* Personal Notes */}
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Personal Notes / Commentary
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add private notes about your thoughts on this title..."
              className="w-full bg-white/3 border border-white/8 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 bg-[#1a1a3e] flex items-center justify-between">
          {existing ? (
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Remove from List
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-500/25 transition-all active:scale-95"
            >
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
