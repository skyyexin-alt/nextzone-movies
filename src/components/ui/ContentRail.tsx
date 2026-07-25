"use client";

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { MediaItem } from '@/lib/tmdb';
import MovieCard from './MovieCard';
import Container from '@/components/ui/Container';

interface ContentRailProps {
  title: string;
  items: MediaItem[];
  icon?: React.ReactNode;
  viewAllLink?: string;
}

export default function ContentRail({ title, items, icon, viewAllLink }: ContentRailProps) {
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

  if (!items || items.length === 0) return null;

  return (
    <section className="py-8 relative group">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400">
              {icon || <TrendingUp className="w-5 h-5" />}
            </span>
            {title}
          </h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="text-sm font-semibold text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex-none">
                  <MovieCard item={item} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-violet-600 hover:border-violet-500 z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex hover:bg-violet-600 hover:border-violet-500 z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </Container>
    </section>
  );
}
