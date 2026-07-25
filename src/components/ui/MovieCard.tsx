"use client";

import Link from 'next/link';
import { Play, Plus, Check } from 'lucide-react';
import { MediaItem } from '@/lib/tmdb';
import { useWatchlist } from '@/context/WatchlistContext';

interface MovieCardProps {
  item: MediaItem;
}

export default function MovieCard({ item }: MovieCardProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, isLoaded } = useWatchlist();
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
  const poster = item.poster_path 
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}` 
    : 'https://via.placeholder.com/342x513?text=No+Poster';

  return (
    <Link href={url} className="group relative flex flex-col gap-2 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-violet-500 w-[140px] md:w-[160px] lg:w-[180px] flex-shrink-0">
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-white/5 border border-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={poster} 
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quality Badge */}
        <div className="absolute top-2 right-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg backdrop-blur-md z-10">
          HD
        </div>

        {/* Watchlist Button */}
        <button 
          onClick={handleWatchlist}
          suppressHydrationWarning
          className="absolute top-2 left-2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-violet-600 hover:border-violet-500"
        >
          {isLoaded && inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="px-1">
        <h3 className="font-semibold text-sm text-white truncate group-hover:text-violet-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs text-zinc-500 font-medium">{year}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isMovie ? 'bg-violet-500/20 text-violet-300' : 'bg-blue-500/20 text-blue-300'
          }`}>
            {isMovie ? 'Movie' : 'TV'}
          </span>
        </div>
      </div>
    </Link>
  );
}
