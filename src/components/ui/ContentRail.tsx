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
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-5 sm:py-7 relative group/rail">
      <Container>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2.5">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-600/25 to-fuchsia-600/25 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
              {icon || <TrendingUp className="w-4 h-4" />}
            </span>
            {title}
          </h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-violet-400 bg-gradient-to-br from-violet-600/25 to-fuchsia-600/25 hover:from-violet-600/40 hover:to-fuchsia-600/40 hover:text-violet-300 active:scale-95 transition-all whitespace-nowrap px-3 py-1.5 rounded-lg border border-violet-500/20 hover:border-violet-500/40 uppercase tracking-wider shadow-lg shadow-violet-900/20"
            >
              View All <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
            </Link>
          )}
        </div>

        {/* Carousel with edge fade */}
        <div className="relative">
          {/* Right edge fade (mobile hint that more cards exist) */}
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#0f0f23] to-transparent z-10 pointer-events-none rounded-r-xl" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-3 md:-ml-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_33.333333%] md:flex-none md:w-auto pl-3 md:pl-4 min-w-0"
                >
                  <MovieCard item={item} className="w-full md:w-[160px] lg:w-[175px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop nav arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-3 top-1/3 -translate-y-1/2 w-10 h-10 bg-black/70 backdrop-blur border border-white/10 rounded-full items-center justify-center text-white opacity-0 group-hover/rail:opacity-100 transition-all disabled:opacity-0 hidden md:flex hover:bg-violet-600 hover:border-violet-500 hover:scale-105 z-20 shadow-xl"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute -right-3 top-1/3 -translate-y-1/2 w-10 h-10 bg-black/70 backdrop-blur border border-white/10 rounded-full items-center justify-center text-white opacity-0 group-hover/rail:opacity-100 transition-all disabled:opacity-0 hidden md:flex hover:bg-violet-600 hover:border-violet-500 hover:scale-105 z-20 shadow-xl"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
