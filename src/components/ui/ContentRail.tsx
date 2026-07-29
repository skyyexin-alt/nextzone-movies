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
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApiDesktop) emblaApiDesktop.scrollPrev();
  }, [emblaApiDesktop]);

  const scrollNext = useCallback(() => {
    if (emblaApiDesktop) emblaApiDesktop.scrollNext();
  }, [emblaApiDesktop]);

  if (!items || items.length === 0) return null;

  // Split items into chunks of 2 for the mobile 2-row layout
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    chunkedItems.push(items.slice(i, i + 2));
  }

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
              className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-white bg-white/5 hover:bg-white/15 active:scale-95 transition-all whitespace-nowrap px-3 py-1.5 rounded-md border border-white/10 uppercase tracking-wider"
            >
              View All <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
            </Link>
          )}
        </div>

        {/* Carousel with edge fade */}
        <div className="relative">
          {/* Right edge fade (mobile hint that more cards exist) */}
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#0f0f23] to-transparent z-10 pointer-events-none rounded-r-xl" />

          {/* MOBILE 2-ROW CAROUSEL */}
          <div className="overflow-hidden md:hidden" ref={emblaRefMobile}>
            <div className="flex -ml-3">
              {chunkedItems.map((chunk, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_33.333333%] pl-3 min-w-0 flex flex-col gap-4"
                >
                  {chunk.map(item => (
                    <MovieCard key={item.id} item={item} className="w-full" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP 1-ROW CAROUSEL */}
          <div className="overflow-hidden hidden md:block" ref={emblaRefDesktop}>
            <div className="flex -ml-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-auto pl-4 min-w-0"
                >
                  <MovieCard item={item} className="w-[160px] lg:w-[175px]" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop nav arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 backdrop-blur border border-white/10 rounded-full items-center justify-center text-white opacity-0 group-hover/rail:opacity-100 transition-all disabled:opacity-0 hidden md:flex hover:bg-violet-600 hover:border-violet-500 hover:scale-105 z-20 shadow-xl"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 backdrop-blur border border-white/10 rounded-full items-center justify-center text-white opacity-0 group-hover/rail:opacity-100 transition-all disabled:opacity-0 hidden md:flex hover:bg-violet-600 hover:border-violet-500 hover:scale-105 z-20 shadow-xl"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
