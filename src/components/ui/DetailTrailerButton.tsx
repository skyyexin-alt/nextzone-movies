"use client";

import { Play, Sparkles, ChevronDown } from 'lucide-react';

interface DetailTrailerButtonProps {
  videoKey?: string;
  title: string;
  mediaType?: 'movie' | 'tv';
  mediaId?: string | number;
}

export default function DetailTrailerButton({ title }: DetailTrailerButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-storyline-with-trailer'));
      const el = document.getElementById('storyline-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full sm:w-auto text-center px-5 py-3 sm:px-7 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-violet-600 to-fuchsia-600 hover:from-amber-400 hover:via-violet-500 hover:to-fuchsia-500 text-xs sm:text-sm font-black text-white shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] border border-amber-300/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 flex-shrink-0 cursor-pointer group"
      aria-label={`Watch Full Movies Here for ${title}`}
    >
      <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
        <Sparkles className="w-4 h-4 text-amber-200 fill-current" />
      </div>
      <span className="tracking-wide drop-shadow-md text-sm sm:text-base">
        🍿 Watch Full Movies Here!
      </span>
      <ChevronDown className="w-4 h-4 text-amber-200 group-hover:translate-y-0.5 transition-transform animate-bounce" />
    </button>
  );
}
