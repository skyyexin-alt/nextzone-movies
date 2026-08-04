"use client";

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface DetailTrailerButtonProps {
  videoKey: string;
  title: string;
}

export default function DetailTrailerButton({ videoKey, title }: DetailTrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto text-center px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-violet-600 hover:bg-violet-500 text-xs sm:text-sm font-black text-white shadow-xl shadow-violet-600/40 transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95 cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> Watch Official Trailer
      </button>

      {/* In-Page YouTube Video Player Popup Modal (Matches Screenshot 2!) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#14142f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl space-y-0">
            {/* Header matching Picture 2 */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d1f] border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-extrabold text-xs sm:text-sm truncate pr-4">
                <Play className="w-4 h-4 text-violet-400 fill-current" />
                <span className="truncate">Official Trailer: {title}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close Trailer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Responsive 16:9 YouTube iFrame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
                title={`Official Trailer: ${title}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
