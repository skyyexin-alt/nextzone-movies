import Link from 'next/link';
import { Play, Info, Star } from 'lucide-react';
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

  return (
    <section className="relative w-full h-[55vh] md:h-[60vh] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      {backdrop && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={backdrop} 
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Cinematic Gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1a1a3e] via-[#1a1a3e]/80 to-transparent"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1a1a3e] via-[#1a1a3e]/20 to-transparent"></div>

      <Container className="relative z-20 mt-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30 backdrop-blur-md">
              {isMovie ? 'Movie' : 'TV Show'}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-currentColor" />
              {item.vote_average ? item.vote_average.toFixed(1) : 'NR'}
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-zinc-300 border border-white/10 backdrop-blur-md">
              {year}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {title}
          </h1>

          <p className="text-base md:text-lg text-zinc-300 mb-8 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl font-light">
            {item.overview || 'No synopsis available.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={`/watch/${isMovie ? 'movie' : 'tv'}/${item.id}`}
              className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-zinc-200 transition-colors"
            >
              <Play className="w-5 h-5 fill-black" />
              Watch Now
            </Link>
            
            <Link 
              href={url}
              className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
            >
              <Info className="w-5 h-5" />
              More Info
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
