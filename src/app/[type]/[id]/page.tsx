import { getDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ChevronRight, Heart, TrendingUp } from 'lucide-react';
import MovieCard from '@/components/ui/MovieCard';
import IntegratedPlayer from '@/components/ui/IntegratedPlayer';
import HistoryTracker from '@/components/ui/HistoryTracker';

export default async function DetailPage({
  params,
}: {
  params: Promise<{ type: 'movie' | 'tv'; id: string }>;
}) {
  const { type, id } = await params;

  if (type !== 'movie' && type !== 'tv') {
    return notFound();
  }

  let data;
  try {
    data = await getDetails(type, id);
  } catch (e) {
    return notFound();
  }

  const title = data.title || data.name;
  const year = (data.release_date || data.first_air_date || '').substring(0, 4);
  const backdrop = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : 'https://via.placeholder.com/1920x1080?text=No+Backdrop';
  const similar = data.similar?.results || [];

  const videos = data.videos?.results || [];
  const trailerKey = (videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') || videos.find((v: any) => v.site === 'YouTube'))?.key;

  return (
    <div className="max-w-[95%] w-full mx-auto px-4 md:px-8 py-8 min-h-screen pt-24">
      <HistoryTracker item={data} />
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6 font-medium">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="text-zinc-600">/</span>
        <Link href={`/${type === 'movie' ? 'movies' : 'tv'}`} className="hover:text-white transition-colors">
          {type === 'movie' ? 'Movies' : 'TV Shows'}
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-white truncate">{title}</span>
      </div>

      {/* Integrated Player & Server Selection */}
      <IntegratedPlayer 
        title={title} 
        backdrop={backdrop} 
        trailerKey={trailerKey} 
        tmdbId={id} 
        type={type} 
      />

      {/* Movie Details (Below Player) */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-4 h-4 fill-current" />
            {data.vote_average ? data.vote_average.toFixed(1) : 'NR'}
          </span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">{year}</span>
        </div>

        <p className="text-zinc-300 leading-relaxed text-sm max-w-4xl mb-2">
          {data.overview}
        </p>

        <button className="text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors flex items-center gap-1">
          + View Details
        </button>
      </div>

      {/* Similar Titles */}
      {similar.length > 0 && (
        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-violet-400" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">You may also like</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Because you're watching {title}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-5 justify-start">
            {similar.slice(0, 18).map((item: any) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
