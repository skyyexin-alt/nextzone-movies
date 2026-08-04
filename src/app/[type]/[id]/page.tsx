import { getDetails } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Globe, Calendar, Users, Play, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import CastCarousel from '@/components/ui/CastCarousel';
import GlobalBackButton from '@/components/ui/GlobalBackButton';
import MDLReviewSection from '@/components/ui/MDLReviewSection';
import RecommendedReviewsList from '@/components/ui/RecommendedReviewsList';

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

  const title = data.title || data.name || 'Untitled';
  const overview = data.overview || 'No synopsis available for this title.';
  const posterPath = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '/no-poster.png';
  const backdropPath = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null;
  const rating = data.vote_average ? data.vote_average.toFixed(1) : 'NR';
  const voteCount = data.vote_count || 0;
  const releaseDate = data.release_date || data.first_air_date || 'N/A';
  const runtime = data.runtime ? `${data.runtime}m` : data.episode_run_time?.[0] ? `${data.episode_run_time[0]}m` : null;
  const genres = data.genres || [];
  const tagLine = data.tagline || null;
  const status = data.status || 'Released';

  const cast = data.credits?.cast || [];
  const crew = data.credits?.crew || [];
  const directors = crew.filter((c: any) => c.job === 'Director').map((d: any) => d.name);

  const trailer = data.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') || data.videos?.results?.[0];
  const similar = data.similar?.results || [];

  return (
    <Container className="pt-6 pb-24 md:py-12 relative z-10">
      <GlobalBackButton />

      {/* Hero Backdrop Banner (With elegant top margin space!) */}
      <div className="relative w-full h-[260px] sm:h-[380px] md:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden mt-3 sm:mt-6 mb-6 sm:mb-8 border border-white/10 shadow-2xl bg-violet-950">
        {backdropPath ? (
          <Image
            src={backdropPath}
            alt={title}
            fill
            priority
            className="object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-950 via-[#101026] to-[#0a0a18]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a18] via-[#0a0a18]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a18] via-[#0a0a18]/40 to-transparent" />

        {/* Floating Details Overlay */}
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            {tagLine && (
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {tagLine}
              </span>
            )}
            <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-lg">
              {title}
            </h1>
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm font-extrabold text-zinc-300 flex-wrap">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> {rating} ({voteCount} votes)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" /> {releaseDate.substring(0, 4)}
              </span>
              {runtime && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" /> {runtime}
                  </span>
                </>
              )}
              <span>•</span>
              <span className="bg-violet-600/40 text-violet-200 border border-violet-500/40 px-2 py-0.5 rounded-md text-[10px] sm:text-xs">
                {status}
              </span>
            </div>
          </div>

          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-violet-600 hover:bg-violet-500 text-xs sm:text-sm font-black text-white shadow-xl shadow-violet-600/40 transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> Watch Official Trailer
            </a>
          )}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Side: Framed Poster Image (Mobile Centered Framed 2:3 Poster!) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative w-48 sm:w-64 lg:w-full aspect-[2/3] mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-violet-950">
            <Image
              src={posterPath}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Overview & Metadata Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Genre Tags */}
          {genres.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {genres.map((g: any) => (
                <Link
                  key={g.id}
                  href={`/explore?genre=${g.id}`}
                  className="bg-white/5 hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/40 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-extrabold text-zinc-300 hover:text-white transition-all"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}

          {/* Synopsis Plot */}
          <div className="bg-[#14142f] border border-white/8 rounded-2xl p-4 sm:p-6 space-y-2.5 sm:space-y-3 shadow-xl">
            <h3 className="text-base sm:text-lg font-black text-white">Storyline & Plot Summary</h3>
            <p className="text-xs sm:text-base text-zinc-200 leading-relaxed font-normal">
              {overview}
            </p>
          </div>

          {/* Key Details Card */}
          <div className="bg-[#14142f] border border-white/8 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-xl">
            <h3 className="text-base sm:text-lg font-black text-white">Production Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs md:text-sm">
              {data.spoken_languages?.length > 0 && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  <div>
                    <span className="text-zinc-400 font-medium">Languages: </span>
                    <span className="text-white font-bold">{data.spoken_languages.map((l: any) => l.english_name || l.name).join(', ')}</span>
                  </div>
                </div>
              )}
              {directors.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-violet-400 font-black text-xs w-4 text-center mt-0.5">D</span>
                  <div>
                    <span className="text-zinc-400 font-medium">Director: </span>
                    <span className="text-white font-bold">{directors.join(', ')}</span>
                  </div>
                </div>
              )}
              {cast.length > 0 && (
                <div className="flex items-start gap-2 sm:col-span-2">
                  <Users className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-zinc-400 font-medium">Starring Cast: </span>
                    <span className="text-white font-bold">
                      {cast.slice(0, 6).map((a: any) => a.name).join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cast Carousel */}
          <CastCarousel cast={cast} />

          {/* MDL Audience Review Section */}
          <MDLReviewSection mediaId={id} mediaTitle={title} />
        </div>
      </div>

      {/* Recommended Reviews Section */}
      <RecommendedReviewsList items={similar.slice(0, 6)} currentTitle={title} />
    </Container>
  );
}
