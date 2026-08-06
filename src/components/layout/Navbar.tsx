"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import { 
  Film, Search, Tv, Heart, Menu, X, ChevronDown, ChevronRight, User, Sparkles, Star, Smartphone,
  Flame, Ticket, Award, Calendar, UserCheck, Clapperboard, FileText, Users
} from 'lucide-react';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import ExploreCategoriesModal from '@/components/layout/ExploreCategoriesModal';
import CenteredSearchModal from '@/components/layout/CenteredSearchModal';
import { useWatchlist } from '@/context/WatchlistContext';

const defaultSpotlight = [
  { rank: 1, name: 'Tom Holland', country: 'British', watchers: '28,450', image: '' },
  { rank: 2, name: 'Matt Damon', country: 'American', watchers: '24,190', image: '' },
  { rank: 3, name: 'Zendaya', country: 'American', watchers: '26,850', image: '' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { watchlist } = useWatchlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [spotlightActors, setSpotlightActors] = useState<any[]>(defaultSpotlight);

  useEffect(() => {
    async function loadSpotlightImages() {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '5d067b9d81cc3970f1365e1e9862ce6b';
      if (!apiKey) return;

      try {
        const names = ['Tom Holland', 'Matt Damon', 'Zendaya'];
        const results = await Promise.all(
          names.map(async (name, idx) => {
            const res = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(name)}`);
            if (res.ok) {
              const data = await res.json();
              const person = data.results?.[0];
              if (person && person.profile_path) {
                return {
                  rank: idx + 1,
                  name: person.name,
                  country: idx === 0 ? 'British' : 'American',
                  watchers: idx === 0 ? '28,450' : idx === 1 ? '24,190' : '26,850',
                  image: `https://image.tmdb.org/t/p/w185${person.profile_path}`,
                };
              }
            }
            return defaultSpotlight[idx];
          })
        );
        setSpotlightActors(results);
      } catch (e) {}
    }
    loadSpotlightImages();
  }, []);

  const closeExplore = () => setExploreOpen(false);

  return (
    <>
      {/* ── Top Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0b0b1a] border-b border-violet-500/40 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-4"
      >
        <Container className="w-full flex items-center justify-between">
          
          {/* Brand Logo + Main MDL Nav */}
          <div className="flex items-center gap-4 xl:gap-8">
            
            {/* Movie Review Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-violet-600/40 border border-violet-400/40">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black text-white tracking-tight">XFlix</span>
                  <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">REVIEWS</span>
                </div>
                <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow">
                  v2.0
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 2xl:gap-8 text-xs xl:text-sm 2xl:text-base font-black tracking-wider">
              
              {/* HOME Link */}
              <Link
                href="/"
                className={`transition-colors py-2 flex items-center gap-1 ${
                  pathname === '/' ? 'text-white font-black' : 'text-zinc-300 hover:text-white'
                }`}
              >
                HOME
              </Link>

              {/* EXPLORE Link & Dropdown */}
              <div 
                className="relative group/explore"
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
              >
                <button 
                  onClick={() => setExploreModalOpen(true)}
                  className={`flex items-center gap-1.5 transition-colors py-2 ${
                    pathname.startsWith('/explore') ? 'text-violet-300 font-black' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  EXPLORE <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180 text-violet-400' : ''}`} />
                </button>

                {/* ── 4-COLUMN MEGA DROPDOWN MENU ── */}
                <div 
                  className={`absolute top-full left-0 mt-2 w-[920px] bg-[#14142f] border border-white/10 rounded-2xl shadow-2xl p-7 backdrop-blur-2xl transition-all duration-200 grid grid-cols-12 gap-7 ${
                    exploreOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  {/* Column 1: Movies (FIRST Line/Column!) */}
                  <div className="col-span-3 space-y-3.5">
                    <h4 className="text-xs md:text-sm font-black text-violet-300 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
                      <Film className="w-4 h-4 text-violet-400" /> Movies
                    </h4>
                    <div className="space-y-2 text-xs md:text-sm font-bold text-zinc-300">
                      <Link href="/explore?type=movie&sort=popular&cat=Most+Popular+Movies" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all text-white font-extrabold">
                        <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Most Popular Movies</span>
                      </Link>
                      <Link href="/explore?type=movie&sort=top_rated&cat=Top+Rated+Movies" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
                        <span>Top Movies</span>
                      </Link>
                      <Link href="/explore?type=movie&sort=newest&cat=Newest+Blockbusters" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span>Newest Blockbusters</span>
                      </Link>
                      <Link href="/explore?type=movie&sort=upcoming&cat=Upcoming+Movies" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Ticket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Upcoming Movies</span>
                      </Link>
                      <Link href="/explore?type=movie&sort=top_rated&cat=Movie+Reviews" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Film className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>Movie Reviews</span>
                      </Link>
                      <Link href="/explore?type=movie&sort=popular&cat=Recommended+Movies" onClick={closeExplore} className="flex items-center gap-2 text-violet-300 font-extrabold hover:text-white hover:translate-x-1 transition-all pt-2 border-t border-white/8">
                        <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Recommendations</span>
                      </Link>
                    </div>
                  </div>

                  {/* Column 2: TV Shows & Series */}
                  <div className="col-span-3 space-y-3.5">
                    <h4 className="text-xs md:text-sm font-black text-violet-300 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
                      <Tv className="w-4 h-4 text-violet-400" /> TV Shows
                    </h4>
                    <div className="space-y-2 text-xs md:text-sm font-bold text-zinc-300">
                      <Link href="/explore?type=tv&sort=popular&cat=Most+Popular+TV+Shows" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all text-white font-extrabold">
                        <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Most Popular Shows</span>
                      </Link>
                      <Link href="/explore?type=tv&sort=top_rated&cat=Top+TV+Shows+%26+Dramas" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Top Shows</span>
                      </Link>
                      <Link href="/explore?type=tv&genre=10764&cat=Variety+Shows" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Tv className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Variety Shows</span>
                      </Link>
                      <Link href="/explore?type=tv&sort=newest&cat=Newest+TV+Releases" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span>Newest Releases</span>
                      </Link>
                      <Link href="/explore?type=tv&sort=upcoming&cat=Upcoming+Dramas" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Upcoming Dramas</span>
                      </Link>
                      <Link href="/explore?type=tv&sort=top_rated&cat=TV+Reviews+%26+Ratings" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Reviews & Ratings</span>
                      </Link>
                      <Link href="/explore?type=tv&sort=popular&cat=Recommended+For+You" onClick={closeExplore} className="flex items-center gap-2 text-violet-300 font-extrabold hover:text-white hover:translate-x-1 transition-all pt-2 border-t border-white/8">
                        <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Recommended For You</span>
                      </Link>
                    </div>
                  </div>

                  {/* Column 3: People / Actors */}
                  <div className="col-span-3 space-y-3.5">
                    <h4 className="text-xs md:text-sm font-black text-violet-300 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
                      <User className="w-4 h-4 text-violet-400" /> People
                    </h4>
                    <div className="space-y-2 text-xs md:text-sm font-bold text-zinc-300">
                      <Link href="/explore?cat=Top+Actors" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Top Actors</span>
                      </Link>
                      <Link href="/explore?cat=Popular+Directors" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Clapperboard className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span>Popular Directors</span>
                      </Link>
                      <Link href="/explore?cat=Screenwriters" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Screenwriters</span>
                      </Link>
                      <Link href="/explore?cat=Actor+Filmographies" onClick={closeExplore} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Actor Filmographies</span>
                      </Link>
                    </div>
                  </div>

                  {/* Column 4: Featured Spotlight Widget (With Real TMDB Actor Photos!) */}
                  <div className="col-span-3 bg-white/4 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="space-y-3.5 text-center">
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider block border-b border-white/8 pb-2">
                        👑 TOP FEATURED ACTORS
                      </span>

                      <div className="flex items-center justify-center gap-3 pt-1">
                        {spotlightActors.map((actor) => (
                          <Link 
                            key={actor.rank} 
                            href="/explore?cat=Top+Actors" 
                            onClick={closeExplore}
                            className="flex flex-col items-center group/actor"
                          >
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/40 bg-violet-950 flex items-center justify-center shadow-md">
                              {actor.image ? (
                                <Image src={actor.image} alt={actor.name} fill className="object-cover" />
                              ) : (
                                <span className="font-extrabold text-white text-xs">{actor.name.substring(0, 2).toUpperCase()}</span>
                              )}
                              <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                                #{actor.rank}
                              </span>
                            </div>
                            <span className="text-xs font-extrabold text-white mt-1 truncate max-w-[70px] group-hover/actor:text-violet-300">
                              {actor.name.split(' ')[0]}
                            </span>
                            <span className="text-[9px] text-zinc-400 font-semibold">{actor.watchers}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/explore?cat=Top+Actors"
                      onClick={closeExplore}
                      className="mt-4 block text-center text-xs font-black bg-violet-600/40 hover:bg-violet-600 text-violet-200 hover:text-white py-2 rounded-xl transition-all border border-violet-500/40"
                    >
                      View Actor Leaderboard
                    </Link>
                  </div>

                </div>
              </div>

              {/* MOVIES REVIEW Link with green NEW badge */}
              <Link
                href="/lists"
                className={`transition-colors py-2 flex items-center gap-2 ${
                  pathname === '/lists' ? 'text-white font-black' : 'text-zinc-300 hover:text-white'
                }`}
              >
                <span>MOVIES REVIEW</span>
                <span className="bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">
                  NEW
                </span>
              </Link>


              {/* APP Link with HOT badge */}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('trigger-install-popup'));
                  }
                }}
                className="transition-colors py-2 flex items-center gap-1.5 text-zinc-300 hover:text-white font-black"
              >
                <span>APP</span>
                <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">
                  HOT
                </span>
              </button>

            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 xl:gap-3.5">
            
            {/* Search Input Box */}
            <div 
              onClick={() => setSearchOpen(true)}
              className="relative hidden sm:flex items-center cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400 transition-all w-44 xl:w-64 shadow-inner"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
              <span className="truncate font-semibold">Find Movies, Dramas...</span>
            </div>

            {/* Mobile Search Button */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white sm:hidden"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Selector Pill (EN) */}
            <span className="hidden xl:inline-block bg-white/5 border border-white/10 text-zinc-300 font-black text-xs px-2.5 py-1.5 rounded-xl uppercase">
              EN
            </span>

            {/* Watchlist Badge Button */}
            <Link
              href="/watchlist"
              className="relative px-3 py-2 bg-violet-600/30 border border-violet-500/40 hover:bg-violet-600/50 rounded-xl text-violet-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-black shadow-lg shadow-violet-600/20"
              title="My Watchlist"
            >
              <Heart className="w-4 h-4 text-violet-400 fill-violet-500/30 shrink-0" />
              <span className="hidden sm:inline">My List</span>
              {watchlist.length > 0 && (
                <span className="bg-violet-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow">
                  {watchlist.length}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-zinc-400 hover:text-white rounded-xl bg-white/5 border border-white/10 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </Container>

        {/* ── Mobile Hamburger Drawer Menu ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0e24]/98 border-t border-white/10 px-4 py-5 space-y-3.5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-violet-600/30 text-sm font-extrabold text-white transition-all border border-white/8"
            >
              <span>HOME</span>
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </Link>

            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-violet-600/30 text-sm font-extrabold text-white transition-all border border-white/8"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                EXPLORE DATABASE
              </span>
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </Link>

            <Link
              href="/explore?type=movie&sort=top_rated&cat=Top+100+Rated"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-sm font-extrabold text-amber-400 transition-all border border-amber-500/30"
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current text-amber-400" />
                TOP 100 RATED
              </span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </Link>

            <Link
              href="/explore?type=movie&sort=popular&cat=Most+Popular+Movies"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-violet-600/30 text-sm font-extrabold text-white transition-all border border-white/8"
            >
              <span className="flex items-center gap-2">
                <Film className="w-4 h-4 text-violet-400" />
                MOVIES & BLOCKBUSTERS
              </span>
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </Link>

            <Link
              href="/explore?type=tv&sort=popular&cat=Top+TV+Dramas"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-violet-600/30 text-sm font-extrabold text-white transition-all border border-white/8"
            >
              <span className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-violet-400" />
                TV SHOWS & DRAMAS
              </span>
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </Link>

            <Link
              href="/explore?cat=Top+Actors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-violet-600/30 text-sm font-extrabold text-white transition-all border border-white/8"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-violet-400" />
                PEOPLE & ACTORS
              </span>
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </Link>

            <Link
              href="/lists"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-violet-600/30 text-sm font-extrabold text-white transition-all border border-white/8"
            >
              <span>MOVIES REVIEW</span>
              <span className="bg-emerald-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">NEW</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('trigger-install-popup'));
                }
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-sm font-extrabold text-white transition-all border border-violet-500/30"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-violet-400" />
                INSTALL XFLIX APP
              </span>
              <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">HOT</span>
            </button>
          </div>
        )}
      </header>

      {/* ── Fixed Mobile Bottom Navigation Bar (Matching Screenshot!) ── */}
      <MobileBottomNav
        onOpenSearch={() => setSearchOpen(true)}
        onOpenExplore={() => setExploreModalOpen(true)}
      />

      {/* ── Explore Categories Pop-up Modal ── */}
      <ExploreCategoriesModal
        isOpen={exploreModalOpen}
        onClose={() => setExploreModalOpen(false)}
        spotlightActors={spotlightActors}
      />

      {/* ── Centered Instant Live Search Modal (Middle of Screen!) ── */}
      <CenteredSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
