"use client";

import { useEffect } from 'react';
import { useHistory } from '@/context/HistoryContext';
import { MediaItem } from '@/lib/tmdb';

export default function HistoryTracker({ item }: { item: MediaItem }) {
  const { addToHistory, isLoaded } = useHistory();

  useEffect(() => {
    if (isLoaded && item) {
      addToHistory(item);
    }
  }, [isLoaded, item]); // Intentionally omitting addToHistory to prevent infinite loops if it's not memoized properly

  return null; // This is a logic-only component
}
