"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Star, Sparkles, Film, ArrowRight } from 'lucide-react';
import { MediaItem } from '@/lib/tmdb';

interface MDLHeroGridProps {
  items: MediaItem[];
}

export default function MDLHeroGrid({ items }: MDLHeroGridProps) {
  if (!items || items.length === 0) return null;

  const mainItem = items[0];

  const getBackdrop = (item: MediaItem) => {
    if (item.backdrop_path) return `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`;
    if (item.poster_path) return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    return '/no-poster.png';
  };

  const mainTitle = mainItem.title || mainItem.name || 'Latest Movie Release';
  const mainYear = (mainItem.release_date || mainItem.first_air_date || '').substring(0, 4);

  return (
    <div className="mb-6 sm:mb-8">
      {/* Single Big Featured Article (Full Width Banner) */}
      <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#14142f] h-[260px] sm:h-[380px] lg:h-[460px] flex flex-col justify-end">
        <Image
          src={getBackdrop(mainItem)}
          alt={mainTitle}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1f] via-[#0d0d1f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1f]/90 via-[#0d0d1f]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 space-y-2 sm:space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-violet-600 text-white text-xs sm:text-sm font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-300 animate-pulse" />
              HOT RELEASE
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-black px-3 py-1 rounded-xl flex items-center gap-1.5 shadow">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-amber-400" /> {mainItem.vote_average ? mainItem.vote_average.toFixed(1) : '8.5'} / 10
            </span>
            {mainYear && (
              <span className="text-xs sm:text-sm text-white font-extrabold bg-white/10 px-3 py-1 rounded-xl border border-white/10 shadow">
                {mainYear}
              </span>
            )}
          </div>

          <Link href={`/${mainItem.title ? 'movie' : 'tv'}/${mainItem.id}`} className="block group/title">
            <h2 className="text-lg sm:text-3xl lg:text-4xl font-black text-white group-hover/title:text-violet-300 transition-colors leading-tight drop-shadow-md">
              Official Review & Details: {mainTitle}
            </h2>
          </Link>

          <p className="text-xs sm:text-base text-zinc-200 font-medium line-clamp-2 leading-relaxed drop-shadow max-w-2xl">
            {mainItem.overview || 'Everything you need to know about the latest premiere, cast ratings, and plot details.'}
          </p>

          <div className="pt-1">
            <Link 
              href={`/${mainItem.title ? 'movie' : 'tv'}/${mainItem.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-extrabold transition-all shadow-lg shadow-violet-600/30 active:scale-95 group/btn"
            >
              <Film className="w-4 h-4 text-violet-200" />
              <span>Read Full Review & Watch Details</span>
              <ArrowRight className="w-4 h-4 text-violet-200 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
