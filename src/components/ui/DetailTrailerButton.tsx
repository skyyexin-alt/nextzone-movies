"use client";

import { Play } from 'lucide-react';

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
      className="w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-2xl bg-violet-600 hover:bg-violet-500 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-violet-600/30 border border-violet-400/30 transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95 cursor-pointer"
      aria-label={`Watch Full Movies Here for ${title}`}
    >
      <Play className="w-4 h-4 fill-current text-white" />
      <span>Watch Full Movies Here!</span>
    </button>
  );
}
