import { Suspense } from 'react';
import Hero from '@/components/ui/Hero';
import ContentRail from '@/components/ui/ContentRail';
import ContinueWatchingSection from '@/components/ui/ContinueWatchingSection';
import Container from '@/components/ui/Container';
import AdsterraBannerAd from '@/components/ui/AdsterraBannerAd';
import { 
  getTrending, 
  getPopularMovies, 
  getPopularTV, 
  getNowPlaying,
  getUpcoming,
  getAiringToday,
  getTopRatedMovies,
  getDiscoverMovies
} from '@/lib/tmdb';
import { Flame, Film, Tv, PlayCircle, Calendar, Radio, Star, Zap } from 'lucide-react';

export default async function Home() {
  const [
    trending,
    popularMovies,
    popularTV,
    nowPlaying,
    upcoming,
    airingToday,
    topRated,
    actionMovies,
    horrorMovies,
    scifiMovies
  ] = await Promise.all([
    getTrending('all'),
    getPopularMovies(),
    getPopularTV(),
    getNowPlaying(),
    getUpcoming(),
    getAiringToday(),
    getTopRatedMovies(),
    getDiscoverMovies({ with_genres: '28' }), // Action
    getDiscoverMovies({ with_genres: '27' }), // Horror
    getDiscoverMovies({ with_genres: '878' }) // Sci-Fi
  ]);

  const heroItem = trending?.results?.[0] || popularMovies?.results?.[0];
  const trendingItems = trending?.results?.slice(1) || [];

  return (
    <div className="pb-28 md:pb-20">
      <Hero item={heroItem} />
      
      <Container className="mt-4">
        {/* Adsterra 728x90 Banner Ad */}
        <AdsterraBannerAd adKey="282e852f5808b9dd01d12c1ed30bf5d2" />
        <ContinueWatchingSection />
      </Container>
      
      <div className="mt-8 flex flex-col gap-4 w-full">
        <Suspense fallback={<Container><div className="h-64 animate-pulse bg-white/5 rounded-xl"></div></Container>}>
          <ContentRail 
            title="Trending This Week" 
            items={trendingItems} 
            icon={<Flame className="w-5 h-5 animate-pulse text-fuchsia-400" />} 
            viewAllLink="/trending" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Hot Today" 
            items={popularMovies?.results?.slice(0, 10) || []} 
            icon={<Zap className="w-5 h-5 animate-pulse text-yellow-400" />} 
            viewAllLink="/movies"
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Popular Movies" 
            items={popularMovies?.results?.slice(10, 20) || []} 
            icon={<Film className="w-5 h-5 animate-pulse text-blue-400" />} 
            viewAllLink="/movies" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Popular TV Shows" 
            items={popularTV?.results || []} 
            icon={<Tv className="w-5 h-5 animate-pulse text-green-400" />} 
            viewAllLink="/tv" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="In Theaters Now" 
            items={nowPlaying?.results || []} 
            icon={<PlayCircle className="w-5 h-5 animate-pulse text-red-500" />} 
            viewAllLink="/now-playing" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Coming Soon" 
            items={upcoming?.results || []} 
            icon={<Calendar className="w-5 h-5 animate-pulse text-purple-400" />} 
            viewAllLink="/upcoming" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="On Air Now" 
            items={airingToday?.results || []} 
            icon={<Radio className="w-5 h-5 animate-pulse text-orange-500" />} 
            viewAllLink="/airing-today" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Top Rated" 
            items={topRated?.results || []} 
            icon={<Star className="w-5 h-5 animate-pulse text-yellow-500" />} 
            viewAllLink="/top-rated" 
          />
        </Suspense>


        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Action Movies" 
            items={actionMovies?.results || []} 
            viewAllLink="/movies?with_genres=28"
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Horror Movies" 
            items={horrorMovies?.results || []} 
            viewAllLink="/movies?with_genres=27"
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Science Fiction" 
            items={scifiMovies?.results || []} 
            viewAllLink="/movies?with_genres=878"
          />
        </Suspense>

        {/* SEO Text Block */}
        <section className="py-8 md:py-12">
          <Container>
            <div className="relative overflow-hidden rounded-2xl p-6 md:p-10 text-center max-w-4xl mx-auto border border-[#1e88e5]/25 bg-gradient-to-br from-[#1a2f50]/60 via-[#1565c0]/15 to-[#0d47a1]/30 backdrop-blur-sm shadow-xl shadow-blue-900/10">
              {/* Background glow elements to perfectly match Telegram banner */}
              <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#1e88e5]/10 to-transparent pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1e88e5]/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Your Ultimate Streaming Destination</h2>
                <p className="text-blue-300/80 text-sm md:text-base leading-relaxed mb-4">
                  XFlix is the premiere platform for streaming movies and television shows online in high definition. We offer an extensive library spanning decades of cinematic history, from timeless classics to the latest blockbusters hitting theaters.
                </p>
                <p className="text-blue-300/80 text-sm md:text-base leading-relaxed">
                  Enjoy seamless playback across all your devices without the hassle of registration. Our smart recommendation engine helps you discover hidden gems, while our responsive design ensures a perfect viewing experience whether you&apos;re on a mobile phone or a massive smart TV.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </div>
  );
}
