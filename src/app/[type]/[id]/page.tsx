import { getDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ChevronRight, Heart, Clock, Globe, Calendar, Users } from 'lucide-react';
import MovieCard from '@/components/ui/MovieCard';
import Container from '@/components/ui/Container';
import AdBanner from '@/components/ui/AdBanner';
import IntegratedPlayer from '@/components/ui/IntegratedPlayer';
import HistoryTracker from '@/components/ui/HistoryTracker';

export default async function DetailPage({
  params,
}: {
  params: Promise<{ type: 'movie' | 'tv'; id: string }>;
}) {
  const { type, id } = await params;

  if (type !== 'movie' && type !== 'tv') return notFound();

  let data: any;
  try {
    data = await getDetails(type, id);
  } catch {
    return notFound();
  }

  const title       = data.title || data.name;
  const year        = (data.release_date || data.first_air_date || '').substring(0, 4);
  const releaseDate = data.release_date || data.first_air_date || '';
  const backdrop    = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : '';
  const similar     = data.similar?.results || [];
  const videos      = data.videos?.results || [];
  const trailerKey  = (
    videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') ||
    videos.find((v: any) => v.site === 'YouTube')
  )?.key;

  // Credits
  const cast: any[]     = data.credits?.cast?.slice(0, 12) || [];
  const crew: any[]     = data.credits?.crew || [];
  const directors       = crew.filter((c: any) => c.job === 'Director').map((c: any) => c.name);
  const writers         = crew
    .filter((c: any) => ['Writer', 'Screenplay', 'Story'].includes(c.job))
    .slice(0, 3)
    .map((c: any) => c.name);

  // Metadata
  const genres          = data.genres || [];
  const runtime         = data.runtime; // minutes (movie)
  const episodes        = data.number_of_episodes;
  const seasons         = data.number_of_seasons;
  const country         = data.production_countries?.[0]?.name || data.origin_country?.[0] || '';
  const productions     = (data.production_companies || []).slice(0, 3).map((p: any) => p.name);
  const rating          = data.vote_average ? data.vote_average.toFixed(1) : 'NR';

  const fmtRuntime = (min: number) => {
    if (!min) return null;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  };

  const duration = runtime ? fmtRuntime(runtime) : seasons ? `${seasons} Season${seasons > 1 ? 's' : ''}` : null;

  return (
    <Container className="py-8 min-h-screen pt-24">
      <HistoryTracker item={data} />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6 font-medium flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <Link href={`/${type === 'movie' ? 'movies' : 'tv'}`} className="hover:text-white transition-colors">
          {type === 'movie' ? 'Movies' : 'TV Shows'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-white truncate">{title}</span>
      </div>

      {/* Ad Banner */}
      <div className="mb-6">
        <AdBanner />
      </div>

      {/* Player — 10% larger */}
      <div className="-mx-[5%] w-[110%]">
        <IntegratedPlayer
          title={title}
          backdrop={backdrop}
          trailerKey={trailerKey}
          tmdbId={id}
          type={type}
        />
      </div>

      {/* ── Movie Details Section ── */}
      <div className="mt-8 space-y-6">

        {/* Title + Rating */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">{title}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Star className="w-3 h-3 fill-current" /> {rating}
            </span>
            {year && (
              <span className="text-xs text-zinc-400 bg-white/5 border border-white/8 px-2.5 py-0.5 rounded-full">{year}</span>
            )}
            {duration && (
              <span className="flex items-center gap-1 text-xs text-zinc-400 bg-white/5 border border-white/8 px-2.5 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />{duration}
              </span>
            )}
            {genres.slice(0, 3).map((g: any) => (
              <span key={g.id} className="text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                {g.name}
              </span>
            ))}
          </div>
        </div>

        {/* Summary sentence */}
        {(directors.length > 0 || genres.length > 0) && (
          <p className="text-sm text-zinc-300 leading-relaxed">
            <span className="font-semibold text-white">{title}</span>
            {year ? ` (${year})` : ''} is a{' '}
            {genres.slice(0, 2).map((g: any) => g.name.toLowerCase()).join(', ')}{' '}
            {type === 'movie' ? 'film' : 'series'}
            {directors.length > 0 ? ` directed by ${directors.join(', ')}` : ''}
            {data.vote_average ? ` rated ${data.vote_average.toFixed(1)}/10` : ''}.
          </p>
        )}

        {/* Overview */}
        {data.overview && (
          <p className="text-zinc-400 leading-relaxed text-sm">{data.overview}</p>
        )}

        {/* Metadata grid */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {releaseDate && (
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-zinc-500">Released: </span>
                <span className="text-white font-medium">{releaseDate}</span>
              </div>
            </div>
          )}
          {duration && (
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-zinc-500">{type === 'movie' ? 'Duration' : 'Seasons'}: </span>
                <span className="text-white font-medium">
                  {type === 'movie' ? duration : `${seasons} Season${seasons > 1 ? 's' : ''} · ${episodes} Episodes`}
                </span>
              </div>
            </div>
          )}
          {genres.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 mt-0.5 flex-shrink-0 text-xs font-bold w-4 text-center">#</span>
              <div>
                <span className="text-zinc-500">Genre: </span>
                {genres.map((g: any, i: number) => (
                  <span key={g.id}>
                    <Link href={`/genre/${g.id}`} className="text-violet-400 hover:text-violet-300 transition-colors font-medium">{g.name}</Link>
                    {i < genres.length - 1 && <span className="text-zinc-600">, </span>}
                  </span>
                ))}
              </div>
            </div>
          )}
          {country && (
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-zinc-500">Country: </span>
                <span className="text-white font-medium">{country}</span>
              </div>
            </div>
          )}
          {directors.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 mt-0.5 flex-shrink-0 text-xs font-bold w-4 text-center">D</span>
              <div>
                <span className="text-zinc-500">Director: </span>
                <span className="text-white font-medium">{directors.join(', ')}</span>
              </div>
            </div>
          )}
          {writers.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 mt-0.5 flex-shrink-0 text-xs font-bold w-4 text-center">W</span>
              <div>
                <span className="text-zinc-500">Writer: </span>
                <span className="text-white font-medium">{writers.join(', ')}</span>
              </div>
            </div>
          )}
          {cast.length > 0 && (
            <div className="flex items-start gap-2 sm:col-span-2">
              <Users className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-zinc-500">Cast: </span>
                <span className="text-white font-medium">
                  {cast.slice(0, 6).map((a: any) => a.name).join(', ')}
                </span>
              </div>
            </div>
          )}
          {productions.length > 0 && (
            <div className="flex items-start gap-2 sm:col-span-2">
              <span className="text-zinc-500 mt-0.5 flex-shrink-0 text-xs font-bold w-4 text-center">P</span>
              <div>
                <span className="text-zinc-500">Production: </span>
                <span className="text-white font-medium">{productions.join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Cast Section ── */}
        {cast.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-400" />
              Cast
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {cast.map((actor: any) => {
                const photo = actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : null;
                return (
                  <div key={actor.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 w-20 sm:w-24">
                    {/* Circular photo */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-violet-500/30 bg-white/5 flex-shrink-0">
                      {photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photo} alt={actor.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-violet-600/20">
                          <Users className="w-6 h-6 text-violet-400" />
                        </div>
                      )}
                    </div>
                    {/* Name */}
                    <span className="text-xs font-semibold text-white text-center leading-tight line-clamp-2">{actor.name}</span>
                    {/* Character */}
                    {actor.character && (
                      <span className="text-[10px] text-zinc-500 text-center leading-tight line-clamp-1">{actor.character}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
              <p className="text-xs text-zinc-500 mt-0.5">Because you&apos;re watching {title}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {similar.slice(0, 18).map((item: any) => (
              <MovieCard key={item.id} item={item} className="w-full" />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
