"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { MediaItem } from '@/lib/tmdb';

interface HistoryContextType {
  history: MediaItem[];
  addToHistory: (item: MediaItem) => void;
  clearHistory: () => void;
  isLoaded: boolean;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<MediaItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nextzone_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nextzone_history', JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const addToHistory = (item: MediaItem) => {
    setHistory(prev => {
      const filtered = prev.filter(i => i.id !== item.id); // Remove if exists to move to top
      return [item, ...filtered].slice(0, 15); // Keep top 15
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory, isLoaded }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
