"use client";

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';

interface CastCarouselProps {
  cast: any[];
}

export default function CastCarousel({ cast }: CastCarouselProps) {
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

  if (!cast || cast.length === 0) return null;

  return (
    <div className="mb-8 md:mb-12 relative group/cast">
      <h2 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-violet-400" />
        Cast
      </h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {cast.slice(0, 20).map((actor: any) => {
              const profileUrl = actor.profile_path 
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=1d1d1d&color=fff&size=185`;
              
              return (
                <Link 
                  key={actor.id} 
                  href={`/person/${actor.id}`}
                  className="flex-[0_0_auto] flex flex-col items-center gap-3 w-[100px] sm:w-[120px] group/actor"
                >
                  <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden border-2 border-transparent group-hover/actor:border-violet-500 transition-colors shadow-lg shadow-black/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={profileUrl} 
                      alt={actor.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center w-full">
                    <p className="text-white text-xs sm:text-sm font-bold leading-tight group-hover/actor:text-violet-400 transition-colors">{actor.name}</p>
                    <p className="text-zinc-500 text-[10px] sm:text-xs mt-1 truncate w-full px-1">{actor.character}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows - visible on hover for desktop, always visible on mobile */}
        <button
          onClick={scrollPrev}
          className="absolute -left-3 sm:-left-4 top-[40px] sm:top-[50px] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/80 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-90 sm:opacity-0 sm:group-hover/cast:opacity-100 transition-all z-20 hover:bg-violet-600 hover:border-violet-500 shadow-xl"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute -right-3 sm:-right-4 top-[40px] sm:top-[50px] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/80 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white opacity-90 sm:opacity-0 sm:group-hover/cast:opacity-100 transition-all z-20 hover:bg-violet-600 hover:border-violet-500 shadow-xl"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
