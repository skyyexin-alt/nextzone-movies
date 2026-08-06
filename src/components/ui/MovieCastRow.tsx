"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight, ChevronLeft, Users } from 'lucide-react';

export default function MovieCastRow({ itemId, mediaType }: { itemId: number; mediaType: 'movie' | 'tv' }) {
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    let isMounted = true;
    async function fetchCast() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '5d067b9d81cc3970f1365e1e9862ce6b';
        if (!apiKey) return;
        const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${itemId}/credits?api_key=${apiKey}`);
        if (res.ok) {
          const data = await res.json();
          const topCast = (data.cast || []).slice(0, 15);
          if (isMounted) setCast(topCast);
        }
      } catch (e) {
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchCast();
    return () => { isMounted = false; };
  }, [itemId, mediaType]);

  if (loading || !cast || cast.length === 0) return null;

  return (
    <div className="space-y-2 pt-2 relative group/cast">
      <div className="flex items-center justify-between pr-1">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
          <Users className="w-3.5 h-3.5 text-violet-400" />
          <span>Cast</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={scrollPrev}
            className="w-6 h-6 rounded-full bg-white/5 hover:bg-violet-600 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all shadow active:scale-95"
            title="Previous Cast"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-6 h-6 rounded-full bg-white/5 hover:bg-violet-600 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all shadow active:scale-95"
            title="Next Cast"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden py-1" ref={emblaRef}>
        <div className="flex gap-3 sm:gap-4">
          {cast.map((actor) => {
            const profileImg = actor.profile_path
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              : '/no-poster.png';

            return (
              <Link
                key={actor.id}
                href={`/person/${actor.id}`}
                className="flex-[0_0_auto] flex flex-col items-center group flex-shrink-0 w-14 sm:w-16 text-center"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-violet-500/30 group-hover:border-violet-400 shadow-xl bg-violet-950 mb-1 transition-all">
                  {actor.profile_path ? (
                    <Image
                      src={profileImg}
                      alt={actor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-violet-800 text-white font-black text-xs">
                      {actor.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <span className="block font-bold text-white text-[11px] truncate w-full group-hover:text-violet-300 transition-colors leading-tight">
                  {actor.name}
                </span>

                {actor.character && (
                  <span className="block text-[9px] text-zinc-400 truncate w-full mt-0.5 leading-tight">
                    {actor.character}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
