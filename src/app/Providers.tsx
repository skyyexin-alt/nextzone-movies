"use client";

import { WatchlistProvider } from '@/context/WatchlistContext';
import { HistoryProvider } from '@/context/HistoryContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WatchlistProvider>
      <HistoryProvider>
        {children}
      </HistoryProvider>
    </WatchlistProvider>
  );
}
