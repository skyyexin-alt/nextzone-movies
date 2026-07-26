"use client";

import Link from 'next/link';
import { Play, Plus, Check, Star } from 'lucide-react';
import { MediaItem } from '@/lib/tmdb';
import { useWatchlist } from '@/context/WatchlistContext';

interface MovieCardProps {
  item: MediaItem;
}

export default function MovieCard({ item }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, isLoaded } = useWatchlist();
  const inList = isInWatchlist(item.id);

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inList) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  const isMovie = item.media_type === 'movie' || !item.first_air_date;
  const title = item.title || item.name || 'Untitled';
  const url = `/${isMovie ? 'movie' : 'tv'}/${item.id}`;
  const year = (item.release_date || item.first_air_date || '').substring(0, 4);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;
  const poster = item.poster_path 
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}` 
    : null;

  return (
    <Link href={url} className="group/card relative flex flex-col gap-2 focus:outline-none focus:ring-2 focus:ring-violet-500 w-[calc((100vw-56px)/3)] sm:w-[140px] md:w-[160px] lg:w-[175px] flex-shrink-0">
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-white/5 border border-white/5">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={poster} 
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <Play className="w-8 h-8 text-white/20" />
          </div>
        )}
        
        {/* Quality Badge */}
        <div className="absolute top-1.5 right-1.5 bg-emerald-500/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg z-10 leading-none">
          HD
        </div>

        {/* Watchlist Button — always visible on mobile (touch), hover on desktop */}
        <button 
          onClick={handleWatchlist}
          suppressHydrationWarning
          className={`absolute top-1.5 left-1.5 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white transition-all active:scale-90
            ${inList && isLoaded
              ? 'bg-violet-600 border-violet-500 opacity-100'
              : 'bg-black/60 backdrop-blur-md border border-white/20 opacity-100 sm:opacity-0 sm:group-hover/card:opacity-100 hover:bg-violet-600 hover:border-violet-500'
            }`}
        >
          {isLoaded && inList ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>

        {/* Rating badge (bottom-left on hover) */}
        {rating && (
          <div className="absolute bottom-1.5 left-1.5 z-10 flex items-center gap-0.5 bg-black/70 backdrop-blur-sm text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover/card:opacity-100 transition-opacity">
            <Star className="w-2.5 h-2.5 fill-current" />
            {rating}
          </div>
        )}

        {/* Hover Play Overlay — desktop only */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center z-10">
          <div className="w-11 h-11 rounded-full bg-violet-600 flex items-center justify-center shadow-[0_0_24px_rgba(108,92,231,0.7)] transform scale-75 group-hover/card:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-0.5">
        <h3 className="font-semibold text-xs sm:text-sm text-white truncate leading-tight group-hover/card:text-violet-300 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          {year && <span className="text-[10px] text-zinc-500">{year}</span>}
          <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${
            isMovie ? 'bg-violet-500/20 text-violet-300' : 'bg-blue-500/20 text-blue-300'
          }`}>
            {isMovie ? 'Movie' : 'TV'}
          </span>
        </div>
      </div>
    </Link>
  );
}
