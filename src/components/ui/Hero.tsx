import Link from 'next/link';
import { Play, Info, Star, ChevronRight } from 'lucide-react';
import { MediaItem } from '@/lib/tmdb';
import Container from '@/components/ui/Container';

interface HeroProps {
  item: MediaItem;
}

export default function Hero({ item }: HeroProps) {
  if (!item) return null;

  const isMovie = item.media_type === 'movie' || !item.first_air_date;
  const title = item.title || item.name;
  const url = `/${isMovie ? 'movie' : 'tv'}/${item.id}`;
  const year = (item.release_date || item.first_air_date || '').substring(0, 4);
  const backdrop = item.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` 
    : '';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;

  return (
    <section className="relative w-full h-[58vh] sm:h-[62vh] md:h-[68vh] min-h-[340px] sm:min-h-[440px] flex items-end overflow-hidden">
      {/* Background Image */}
      {backdrop && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={backdrop} 
            alt={title}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </div>
      )}

      {/* Deep cinematic gradient — stronger at bottom for mobile legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0f0f23] via-[#0f0f23]/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0f0f23]/90 via-[#0f0f23]/40 to-transparent hidden sm:block" />

      {/* Content — anchored to bottom for a Netflix-style feel */}
      <Container className="relative z-20 pb-8 sm:pb-12 w-full">
        <div className="max-w-xl">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-violet-600 text-white uppercase tracking-widest">
              {isMovie ? 'Movie' : 'Series'}
            </span>
            {rating && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Star className="w-3 h-3 fill-current" />
                {rating}
              </span>
            )}
            {year && (
              <span className="px-2.5 py-0.5 text-[11px] rounded-full bg-white/10 text-zinc-300 border border-white/10">
                {year}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-[1.05] tracking-tight drop-shadow-lg">
            {title}
          </h1>

          {/* Overview — 2 lines on mobile, 3 on desktop */}
          <p className="text-sm sm:text-base text-zinc-300 mb-5 line-clamp-2 md:line-clamp-3 leading-relaxed font-light max-w-lg">
            {item.overview || 'No synopsis available.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link 
              href={`/watch/${isMovie ? 'movie' : 'tv'}/${item.id}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-zinc-100 active:scale-95 transition-all shadow-lg"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black flex-shrink-0" />
              Watch Now
            </Link>
            
            <Link 
              href={url}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 glass-panel text-white px-6 py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-white/15 active:scale-95 transition-all"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Details
            </Link>
          </div>
        </div>
      </Container>

      {/* Scroll hint for mobile */}
      <div className="absolute bottom-2 right-4 z-20 sm:hidden flex items-center gap-1 text-white/40 text-[10px]">
        <ChevronRight className="w-3 h-3" />
        <span>Scroll to browse</span>
      </div>
    </section>
  );
}
