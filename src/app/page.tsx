import { Suspense } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MDLHeroGrid from '@/components/ui/MDLHeroGrid';
import MDLNewsFeed from '@/components/ui/MDLNewsFeed';
import MDLSidebarWidgets from '@/components/ui/MDLSidebarWidgets';
import { 
  getTrending, 
  getPopularMovies, 
  getNowPlaying, 
  getTopRatedMovies,
  getUpcoming
} from '@/lib/tmdb';
import { Star, Sparkles, Tv, Layers } from 'lucide-react';

import QuickFilterTabs from '@/components/ui/QuickFilterTabs';
import AdsterraBannerAd from '@/components/ui/AdsterraBannerAd';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let trendingItems = [];
  let popularList = [];
  let nowPlayingList = [];
  let topRatedItems = [];
  let upcomingList = [];

  try {
    const results = await Promise.allSettled([
      getTrending('all'),
      getPopularMovies(),
      getNowPlaying(),
      getTopRatedMovies(),
      getUpcoming()
    ]);

    trendingItems = results[0].status === 'fulfilled' ? results[0].value?.results || [] : [];
    popularList = results[1].status === 'fulfilled' ? results[1].value?.results || [] : [];
    nowPlayingList = results[2].status === 'fulfilled' ? results[2].value?.results || [] : [];
    topRatedItems = results[3].status === 'fulfilled' ? results[3].value?.results || [] : [];
    upcomingList = results[4].status === 'fulfilled' ? results[4].value?.results || [] : [];
  } catch (e) {
    console.error("Home page TMDB fetch error:", e);
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#161633]">
      <Container>
        {/* ── Top Quick Database Chips (Touch-scrollable on mobile, non-sticky like before!) ── */}
        <QuickFilterTabs />

        {/* ── Adsterra Banner Ad (Sticky) ── */}
        <div className="sticky top-20 z-30 my-4 bg-[#161633]/95 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl transition-all">
          <AdsterraBannerAd />
        </div>

        {/* ── Top Hero Feature News Grid (Spider-Man, Obsession, Devil's Mouth) ── */}
        <div id="explore-catalog" className="scroll-mt-28">
          <MDLHeroGrid items={trendingItems.length > 0 ? trendingItems : popularList} />
        </div>

        {/* ── Main 2-Column Portal Layout (Left: Movie Reviews/Feed | Right: Top Airing Leaderboard) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Feed Column (Left - 8 cols) */}
          <div id="movies-review-section" className="lg:col-span-8 space-y-8 scroll-mt-28">
            <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-2xl"></div>}>
              <MDLNewsFeed 
                popularMovies={popularList} 
                nowPlaying={nowPlayingList} 
                upcoming={upcomingList} 
                topRated={topRatedItems} 
              />
            </Suspense>
          </div>

          {/* Right Sidebar Column (Right - 4 cols: Top Airing & Rated Leaderboard + Reviews) */}
          <div id="top-rated-section" className="lg:col-span-4 space-y-8 scroll-mt-28">
            <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-2xl"></div>}>
              <MDLSidebarWidgets topRated={topRatedItems} upcoming={upcomingList} />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
