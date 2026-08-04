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

export default async function Home() {
  const [
    trending,
    popularMovies,
    nowPlaying,
    topRated,
    upcoming
  ] = await Promise.all([
    getTrending('all'),
    getPopularMovies(),
    getNowPlaying(),
    getTopRatedMovies(),
    getUpcoming()
  ]);

  const trendingItems = trending?.results || [];
  const popularList = popularMovies?.results || [];
  const nowPlayingList = nowPlaying?.results || [];
  const topRatedItems = topRated?.results || [];
  const upcomingList = upcoming?.results || [];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#161633]">
      <Container>
        {/* ── Top Quick Database Chips (Touch-scrollable on mobile!) ── */}
        <div className="touch-scroll flex items-center gap-2 pb-4 max-w-full select-none">
          <Link 
            href="/explore" 
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-violet-600/30 transition-all flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-violet-300" />
            <span>Explore Movie Database</span>
          </Link>
          <Link 
            href="/explore?type=movie&sort=top_rated&cat=Top+100+Rated" 
            className="flex items-center gap-1.5 bg-[#14142f] hover:bg-white/10 text-amber-400 border border-amber-500/30 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex-shrink-0"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Top 100 Rated</span>
          </Link>
          <Link 
            href="/lists" 
            className="flex items-center gap-1.5 bg-[#14142f] hover:bg-white/10 text-violet-300 border border-white/10 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex-shrink-0"
          >
            <Layers className="w-4 h-4 text-violet-400" />
            <span>Movies Review</span>
          </Link>
          <Link 
            href="/watchlist" 
            className="flex items-center gap-1.5 bg-[#14142f] hover:bg-white/10 text-zinc-300 border border-white/10 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex-shrink-0"
          >
            <Tv className="w-4 h-4 text-emerald-400" />
            <span>My Watchlist Tracker</span>
          </Link>
        </div>

        {/* ── Top Hero Feature News Grid (Spider-Man, Obsession, Devil's Mouth) ── */}
        <MDLHeroGrid items={trendingItems.length > 0 ? trendingItems : popularList} />

        {/* ── Main 2-Column Portal Layout (Left: Movie Reviews/Feed | Right: Top Airing Leaderboard) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Feed Column (Left - 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
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
          <div className="lg:col-span-4 space-y-8">
            <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-2xl"></div>}>
              <MDLSidebarWidgets topRated={topRatedItems} upcoming={upcomingList} />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
