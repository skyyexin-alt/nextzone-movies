import { Suspense } from 'react';
import Hero from '@/components/ui/Hero';
import ContentRail from '@/components/ui/ContentRail';
import TelegramBanner from '@/components/ui/TelegramBanner';
import ShareButtons from '@/components/ui/ShareButtons';
import ContinueWatchingSection from '@/components/ui/ContinueWatchingSection';
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
    <div className="pb-20">
      <Hero item={heroItem} />
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] mt-4">
        <TelegramBanner />
        <ShareButtons />
        <ContinueWatchingSection />
      </div>
      
      <div className="mt-8 flex flex-col gap-4">
        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Trending This Week" 
            items={trendingItems} 
            icon={<Flame className="w-5 h-5" />} 
            viewAllLink="/trending" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Hot Today" 
            items={popularMovies?.results?.slice(0, 10) || []} 
            icon={<Zap className="w-5 h-5" />} 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Popular Movies" 
            items={popularMovies?.results?.slice(10, 20) || []} 
            icon={<Film className="w-5 h-5" />} 
            viewAllLink="/movies" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Popular TV Shows" 
            items={popularTV?.results || []} 
            icon={<Tv className="w-5 h-5" />} 
            viewAllLink="/tv" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="In Theaters Now" 
            items={nowPlaying?.results || []} 
            icon={<PlayCircle className="w-5 h-5" />} 
            viewAllLink="/now-playing" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Coming Soon" 
            items={upcoming?.results || []} 
            icon={<Calendar className="w-5 h-5" />} 
            viewAllLink="/upcoming" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="On Air Now" 
            items={airingToday?.results || []} 
            icon={<Radio className="w-5 h-5" />} 
            viewAllLink="/airing-today" 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Top Rated" 
            items={topRated?.results || []} 
            icon={<Star className="w-5 h-5" />} 
            viewAllLink="/top-rated" 
          />
        </Suspense>

        {/* SEO Text Block */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-[#222255]/50 border border-white/5 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Your Ultimate Streaming Destination</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                NextZone is the premiere platform for streaming movies and television shows online in high definition. We offer an extensive library spanning decades of cinematic history, from timeless classics to the latest blockbusters hitting theaters.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Enjoy seamless playback across all your devices without the hassle of registration. Our smart recommendation engine helps you discover hidden gems, while our responsive design ensures a perfect viewing experience whether you're on a mobile phone or a massive smart TV.
              </p>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Action Movies" 
            items={actionMovies?.results || []} 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Horror Movies" 
            items={horrorMovies?.results || []} 
          />
        </Suspense>

        <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl mx-4 md:mx-8"></div>}>
          <ContentRail 
            title="Science Fiction" 
            items={scifiMovies?.results || []} 
          />
        </Suspense>
      </div>
    </div>
  );
}
