"use client";

import { useWatchlist } from '@/context/WatchlistContext';
import MovieCard from '@/components/ui/MovieCard';
import Container from '@/components/ui/Container';
import { ListVideo } from 'lucide-react';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <Container className="py-24 md:py-32 min-h-screen">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400">
          <ListVideo className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">My Watchlist</h1>
      </div>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {watchlist.map((item) => (
            <MovieCard key={item.id} item={item} className="w-full" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white/5 rounded-2xl border border-white/10">
          <ListVideo className="w-16 h-16 text-zinc-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Your watchlist is empty</h2>
          <p className="text-zinc-400 max-w-md">
            Save shows and movies to keep track of what you want to watch.
          </p>
        </div>
      )}
    </Container>
  );
}
