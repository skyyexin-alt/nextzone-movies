"use client";

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, PlayCircle, Trash2 } from 'lucide-react';
import { useHistory } from '@/context/HistoryContext';
import MovieCard from './MovieCard';

export default function ContinueWatchingSection() {
  const { history, clearHistory, isLoaded } = useHistory();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!isLoaded || history.length === 0) return null;

  return (
    <section className="py-8 relative group mb-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#25d366]/20 border border-[#25d366]/30 flex items-center justify-center text-[#25d366]">
            <PlayCircle className="w-5 h-5" />
          </span>
          Continue Watching
        </h2>
        <button 
          onClick={clearHistory}
          className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear History
        </button>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-3 md:-ml-4">
            {history.map((item) => (
              <div key={item.id} className="flex-[0_0_33.333333%] md:flex-none md:w-auto pl-3 md:pl-4 min-w-0">
                <MovieCard item={item} className="w-full md:w-[160px] lg:w-[180px]" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-[#25d366] hover:border-[#25d366] z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-[#25d366] hover:border-[#25d366] z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
