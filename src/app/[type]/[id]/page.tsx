import { getDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ChevronRight } from 'lucide-react';
import ContentRail from '@/components/ui/ContentRail';
import IntegratedPlayer from '@/components/ui/IntegratedPlayer';

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
    <div className="container mx-auto px-4 md:px-8 py-8 min-h-screen pt-24">
      
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
        <div className="mt-12 border-t border-white/5 pt-8 -mx-4 md:-mx-8 px-4 md:px-8">
          <ContentRail title="You May Also Like" items={similar.slice(0, 15)} />
        </div>
      )}
    </div>
  );
}
