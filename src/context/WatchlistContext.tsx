"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { MediaItem } from '@/lib/tmdb';

interface WatchlistContextType {
  watchlist: MediaItem[];
  addToWatchlist: (item: MediaItem) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  isLoaded: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('xflix_watchlist');
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load watchlist', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('xflix_watchlist', JSON.stringify(watchlist));
      } catch (error) {}
    }
  }, [watchlist, isLoaded]);

  const addToWatchlist = (item: MediaItem) => {
    setWatchlist(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [item, ...prev];
    });
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(prev => prev.filter(i => i.id !== id));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some(i => i.id === id);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, isLoaded }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
