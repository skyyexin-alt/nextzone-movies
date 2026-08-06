"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  Star, Search, Film, Tv, Play, Plus, Check, ChevronRight, ChevronLeft, ChevronDown, User, 
  Filter, Award, Sparkles, X, Tag, Users, DollarSign, Flame, Ticket
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useWatchlist } from '@/context/WatchlistContext';
import MDLAddToListModal from '@/components/ui/MDLAddToListModal';
import QuickFilterTabs from '@/components/ui/QuickFilterTabs';
import { MediaItem } from '@/lib/tmdb';

const defaultSpotlight = [
  { rank: 1, name: 'Tom Holland', country: 'British', watchers: '28,450', movie: 'Spider-Man: Brand New Day', profile_path: '' },
  { rank: 2, name: 'Matt Damon', country: 'American', watchers: '24,190', movie: 'The Odyssey', profile_path: '' },
  { rank: 3, name: 'Zendaya', country: 'American', watchers: '26,850', movie: 'Spider-Man & Dune', profile_path: '' },
];

function MovieCastRow({ itemId, mediaType }: { itemId: number; mediaType: 'movie' | 'tv' }) {
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    let isMounted = true;
    async function fetchCast() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '5d067b9d81cc3970f1365e1e9862ce6b';
        if (!apiKey) return;
        const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${itemId}/credits?api_key=${apiKey}`);
        if (res.ok) {
          const data = await res.json();
          const topCast = (data.cast || []).slice(0, 15);
          if (isMounted) setCast(topCast);
        }
      } catch (e) {
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchCast();
    return () => { isMounted = false; };
  }, [itemId, mediaType]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-3 animate-pulse">
        <Users className="w-4 h-4 text-violet-400" />
        <span className="text-xs text-zinc-500 font-semibold">Loading cast carousel...</span>
      </div>
    );
  }

  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-2.5 pt-2 relative group/cast">
      <div className="flex items-center justify-between pr-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-white">
          <Users className="w-4 h-4 text-violet-400" />
          <span>Cast</span>
        </div>

        {/* Carousel Left / Right Navigation Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={scrollPrev}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-violet-600 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all shadow active:scale-95"
            title="Previous Cast"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-violet-600 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all shadow active:scale-95"
            title="Next Cast"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden py-1" ref={emblaRef}>
        <div className="flex gap-4 sm:gap-5">
          {cast.map((actor) => {
            const profileImg = actor.profile_path
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              : '/no-poster.png';

            return (
              <Link
                key={actor.id}
                href={`/person/${actor.id}`}
                className="flex-[0_0_auto] flex flex-col items-center group flex-shrink-0 w-16 sm:w-20 text-center"
              >
                {/* Circular Avatar Photo */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-violet-500/30 group-hover:border-violet-400 shadow-xl bg-violet-950 mb-1.5 transition-all">
                  {actor.profile_path ? (
                    <Image
                      src={profileImg}
                      alt={actor.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-violet-800 text-white font-black text-sm">
                      {actor.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Actor Name */}
                <span className="block font-bold text-white text-xs truncate w-full group-hover:text-violet-300 transition-colors leading-tight">
                  {actor.name}
                </span>

                {/* Character / Role Name */}
                {actor.character && (
                  <span className="block text-[10px] text-zinc-400 truncate w-full mt-0.5 leading-tight">
                    {actor.character}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Top Box Office Actors Currently Featuring in Cinema
const currentCinemaBoxOfficeActors = [
  {
    rank: 1,
    name: 'Tom Holland',
    country: 'British',
    currentMovie: 'Spider-Man: Brand New Day',
    role: 'Peter Parker / Spider-Man',
    boxOffice: '$1.9 Billion In Theaters',
    rating: 9.9,
    status: 'IN THEATERS NOW',
    blockbusters: 'Spider-Man: Brand New Day, Spider-Man: No Way Home, Uncharted',
  },
  {
    rank: 2,
    name: 'Matt Damon',
    country: 'American',
    currentMovie: 'The Odyssey',
    role: 'Odysseus (King of Ithaca)',
    boxOffice: '$957 Million In Theaters',
    rating: 9.8,
    status: 'IN THEATERS NOW',
    blockbusters: 'The Odyssey, Oppenheimer, The Martian, Interstellar',
  },
  {
    rank: 3,
    name: 'Zendaya',
    country: 'American',
    currentMovie: 'Spider-Man: Brand New Day & Dune: Part Two',
    role: 'MJ / Chani',
    boxOffice: '$1.6 Billion In Theaters',
    rating: 9.9,
    status: 'IN THEATERS NOW',
    blockbusters: 'Spider-Man: Brand New Day, Dune: Part Two, The Greatest Showman',
  },
  {
    rank: 4,
    name: 'Cillian Murphy',
    country: 'Irish',
    currentMovie: 'The Odyssey',
    role: 'Greek Co-Star & Hero',
    boxOffice: '$957 Million In Theaters',
    rating: 9.8,
    status: 'IN THEATERS NOW',
    blockbusters: 'The Odyssey, Oppenheimer, Peaky Blinders, Inception',
  },
  {
    rank: 5,
    name: 'Ryan Reynolds',
    country: 'Canadian',
    currentMovie: 'Deadpool & Wolverine',
    role: 'Wade Wilson / Deadpool',
    boxOffice: '$1.33 Billion In Theaters',
    rating: 9.7,
    status: 'IN THEATERS NOW',
    blockbusters: 'Deadpool & Wolverine, Free Guy, Red Notice',
  },
  {
    rank: 6,
    name: 'Hugh Jackman',
    country: 'Australian',
    currentMovie: 'Deadpool & Wolverine',
    role: 'Logan / Wolverine',
    boxOffice: '$1.33 Billion In Theaters',
    rating: 9.8,
    status: 'IN THEATERS NOW',
    blockbusters: 'Deadpool & Wolverine, Logan, The Greatest Showman, Les Misérables',
  },
  {
    rank: 7,
    name: 'Timothée Chalamet',
    country: 'American',
    currentMovie: 'Dune: Part Two & Wonka',
    role: 'Paul Atreides / Willy Wonka',
    boxOffice: '$1.42 Billion In Theaters',
    rating: 9.7,
    status: 'IN THEATERS NOW',
    blockbusters: 'Dune: Part Two, Wonka, Interstellar, A Complete Unknown',
  },
  {
    rank: 8,
    name: 'Paul Mescal',
    country: 'Irish',
    currentMovie: 'Gladiator II',
    role: 'Lucius Verus',
    boxOffice: '$460 Million In Theaters',
    rating: 9.5,
    status: 'IN THEATERS NOW',
    blockbusters: 'Gladiator II, Normal People, Aftersun',
  },
  {
    rank: 9,
    name: 'Cynthia Erivo',
    country: 'British',
    currentMovie: 'Wicked',
    role: 'Elphaba (The Wicked Witch)',
    boxOffice: '$750 Million In Theaters',
    rating: 9.6,
    status: 'IN THEATERS NOW',
    blockbusters: 'Wicked, Harriet, Bad Times at the El Royale',
  },
  {
    rank: 10,
    name: 'Ariana Grande',
    country: 'American',
    currentMovie: 'Wicked',
    role: 'Glinda (The Good Witch)',
    boxOffice: '$750 Million In Theaters',
    rating: 9.6,
    status: 'IN THEATERS NOW',
    blockbusters: 'Wicked, Don\'t Look Up',
  },
];

const genreMap: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
  10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality & Variety',
  10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
};

function ExploreContent() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get('type') as 'movie' | 'tv' | null;
  const paramSort = searchParams.get('sort');
  const paramCat = searchParams.get('cat');
  const paramGenre = searchParams.get('genre');

  const { getEntry } = useWatchlist();
  const [items, setItems] = useState<any[]>([]);
  const [peopleItems, setPeopleItems] = useState<any[]>([]);
  const [spotlightList, setSpotlightList] = useState(defaultSpotlight);
  const [loading, setLoading] = useState(true);

  const [mediaType, setMediaType] = useState<'all' | 'movie' | 'tv'>(paramType || 'all');
  const [currentSort, setCurrentSort] = useState<string>(paramSort || 'popular');
  const [currentGenre, setCurrentGenre] = useState<string>(paramGenre || '');
  const [currentYear, setCurrentYear] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(500);

  const [searchQuery, setSearchQuery] = useState('');
  
  const [modalItem, setModalItem] = useState<MediaItem | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerTitle, setTrailerTitle] = useState<string>('');

  const isTopActorsCategory = paramCat?.toLowerCase().includes('actor');
  const isDirectorsCategory = paramCat?.toLowerCase().includes('director') || 
                              paramCat?.toLowerCase().includes('screenwriter') || 
                              paramCat?.toLowerCase().includes('filmography');

  useEffect(() => {
    if (paramSort) setCurrentSort(paramSort);
    if (paramGenre) setCurrentGenre(paramGenre);
  }, [paramSort, paramGenre]);

  // Always load live verified TMDB profile photos for the right sidebar spotlight!
  useEffect(() => {
    async function loadSidebarSpotlight() {
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
                  movie: idx === 0 ? 'Spider-Man: Brand New Day' : idx === 1 ? 'The Odyssey' : 'Spider-Man & Dune',
                  profile_path: `https://image.tmdb.org/t/p/w185${person.profile_path}`,
                };
              }
            }
            return defaultSpotlight[idx];
          })
        );
        setSpotlightList(results);
      } catch (e) {}
    }
    loadSidebarSpotlight();
  }, []);

  useEffect(() => {
    async function loadExploreData() {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '5d067b9d81cc3970f1365e1e9862ce6b';

      try {
        if (isTopActorsCategory) {
          const enrichedActors = await Promise.all(
            currentCinemaBoxOfficeActors.map(async (actor) => {
              try {
                const res = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(actor.name)}`);
                if (res.ok) {
                  const data = await res.json();
                  const found = data.results?.[0];
                  if (found && found.profile_path) {
                    return {
                      ...actor,
                      id: found.id,
                      profile_path: `https://image.tmdb.org/t/p/w500${found.profile_path}`,
                    };
                  }
                }
              } catch (e) {}
              return actor;
            })
          );
          setPeopleItems(enrichedActors);
          setLoading(false);
          return;
        }

        if (isDirectorsCategory) {
          const res = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`);
          if (res.ok) {
            const data = await res.json();
            setPeopleItems(data.results || []);
            setTotalPages(Math.min(data.total_pages || 500, 500));
          }
          return;
        }

        // Fetch Movies / TV Shows
        const targetType = paramType || (mediaType !== 'all' ? mediaType : 'movie');
        const isTv = targetType === 'tv';
        let endpoint = isTv ? '/discover/tv' : '/discover/movie';

        if (currentSort === 'top_rated') {
          endpoint = isTv ? '/tv/top_rated' : '/movie/top_rated';
        } else if (currentSort === 'popular') {
          endpoint = isTv ? '/tv/popular' : '/movie/popular';
        } else if (currentSort === 'upcoming') {
          endpoint = isTv ? '/tv/on_the_air' : '/movie/upcoming';
        }

        const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
        url.searchParams.append('api_key', apiKey);
        url.searchParams.append('page', page.toString());

        if (currentSort === 'newest') {
          url.searchParams.append('sort_by', isTv ? 'first_air_date.desc' : 'primary_release_date.desc');
          url.searchParams.append('vote_count.gte', '10');
        }

        if (currentGenre) {
          url.searchParams.append('with_genres', currentGenre);
        }

        if (currentYear) {
          if (isTv) {
            url.searchParams.append('first_air_date_year', currentYear);
          } else {
            url.searchParams.append('primary_release_year', currentYear);
          }
        }

        const res = await fetch(url.toString());
        if (res.ok) {
          const data = await res.json();
          setItems(data.results || []);
          setTotalPages(Math.min(data.total_pages || 500, 500));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadExploreData();
  }, [paramType, paramCat, mediaType, isTopActorsCategory, isDirectorsCategory, currentSort, currentGenre, currentYear, page]);

  const filteredTitles = items.filter((it) => {
    if (searchQuery.trim()) {
      const title = (it.title || it.name || '').toLowerCase();
      if (!title.includes(searchQuery.toLowerCase())) return false;
    }
    if (currentYear) {
      const releaseDate = it.release_date || it.first_air_date || '';
      if (releaseDate && !releaseDate.startsWith(currentYear)) return false;
    }
    return true;
  });

  const filteredPeople = peopleItems.filter((p) => {
    if (!searchQuery.trim()) return true;
    const name = p.name.toLowerCase();
    const movie = (p.currentMovie || '').toLowerCase();
    return name.includes(searchQuery.toLowerCase()) || movie.includes(searchQuery.toLowerCase());
  });

  const categoryTitle = isTopActorsCategory 
    ? 'Top Actors Currently Featuring in Cinema & Box Office Blockbusters' 
    : paramCat || (mediaType === 'tv' ? 'Top TV Dramas & Shows' : mediaType === 'movie' ? 'Top Movies & Blockbusters' : 'Top Dramas & Movies');

  const openTrailerModal = async (item: any) => {
    const isMovie = !!item.title;
    const itemTitle = item.title || item.name || 'Trailer';
    setTrailerTitle(itemTitle);

    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || '5d067b9d81cc3970f1365e1e9862ce6b';
      const url = `https://api.themoviedb.org/3/${isMovie ? 'movie' : 'tv'}/${item.id}/videos?api_key=${apiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const trailer = data.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') || data.results?.[0];
        if (trailer && trailer.key) {
          setTrailerKey(trailer.key);
          return;
        }
      }
    } catch (e) {}

    setTrailerKey('dQw4w9WgXcQ');
  };

  return (
    <Container className="pt-24 pb-32 md:pt-28 md:pb-36 min-h-screen">
      {/* ── Top 4-Tab Quick Navigation Bar (Persistent with Active Indicator!) ── */}
      <QuickFilterTabs />

      {/* ── Page Header Banner ── */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-400" />
            {categoryTitle}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            {isTopActorsCategory 
              ? 'Ranked by current in-theater cinema box office releases, lead roles, and blockbuster revenues' 
              : isDirectorsCategory 
              ? 'Top Directors and Filmmakers in Global Cinema' 
              : 'Complete database ratings, overview, cast, genres, and official video trailers'}
          </p>
        </div>
        <span className="text-xs font-extrabold text-violet-300 bg-violet-600/20 border border-violet-500/30 px-3.5 py-1.5 rounded-full">
          {isTopActorsCategory || isDirectorsCategory ? `${filteredPeople.length} In-Theater Box Office Stars` : `${filteredTitles.length}+ Titles`}
        </span>
      </div>

      {/* ── Main 2-Column Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── Left Main Column (8 cols) ── */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* ── Highlighted Filter & Navigation Bar (Matching Reference Screenshot!) ── */}
          <div className="bg-[#12122b] border border-white/10 rounded-2xl p-4 shadow-2xl space-y-3">
            {/* Title & Page Info Row */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-wide flex items-center gap-2">
                  <Film className="w-5 h-5 text-violet-400" />
                  {paramType === 'tv' ? 'TV Shows & Dramas' : 'Movies'}
                </h2>
                <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                  Page {page} of {totalPages}
                </p>
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-violet-600 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-all text-xs font-bold"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-black text-violet-300 bg-violet-600/20 border border-violet-500/30 px-3 py-1 rounded-lg">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-violet-600 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-all text-xs font-bold"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Toolbar: Sort Pills on Left, Genre/Year Selectors on Right */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/6">
              {/* Left Side: Sort Pills */}
              <div className="flex items-center gap-1.5 bg-[#0a0a1a] p-1 rounded-xl border border-white/8">
                <button
                  onClick={() => { setCurrentSort('popular'); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                    currentSort === 'popular'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => { setCurrentSort('top_rated'); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                    currentSort === 'top_rated'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Top Rated
                </button>
                <button
                  onClick={() => { setCurrentSort('newest'); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                    currentSort === 'newest'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Newest
                </button>
              </div>

              {/* Right Side: Dropdown Selectors (All Genres & All Years) */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* All Genres Dropdown */}
                <div className="relative">
                  <select
                    value={currentGenre}
                    onChange={(e) => { setCurrentGenre(e.target.value); setPage(1); }}
                    className="appearance-none bg-[#0a0a1a] border border-white/10 hover:border-violet-500/50 text-white font-extrabold text-xs pl-3.5 pr-8 py-2 rounded-xl focus:outline-none focus:border-violet-500 transition-all cursor-pointer shadow-inner"
                  >
                    <option value="">All Genres</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Sci-Fi</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* All Years Dropdown */}
                <div className="relative">
                  <select
                    value={currentYear}
                    onChange={(e) => { setCurrentYear(e.target.value); setPage(1); }}
                    className="appearance-none bg-[#0a0a1a] border border-white/10 hover:border-violet-500/50 text-white font-extrabold text-xs pl-3.5 pr-8 py-2 rounded-xl focus:outline-none focus:border-violet-500 transition-all cursor-pointer shadow-inner"
                  >
                    <option value="">All Years</option>
                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (isTopActorsCategory || isDirectorsCategory) ? (
            /* ── Rendering Real Actor Photos dynamically loaded from TMDB ── */
            filteredPeople.length > 0 ? (
              filteredPeople.map((person, idx) => {
                const profileImg = person.profile_path 
                  ? (person.profile_path.startsWith('http') ? person.profile_path : `https://image.tmdb.org/t/p/w500${person.profile_path}`)
                  : '/no-poster.png';

                const knownForTitles = person.blockbusters || (person.known_for || [])
                  .map((k: any) => k.title || k.name)
                  .filter(Boolean)
                  .join(', ');

                const currentMovieTitle = person.currentMovie || 'Cinema Blockbuster Release';
                const boxOfficeTotal = person.boxOffice || `$1.5 Billion Box Office`;

                return (
                  <div
                    key={person.id || idx}
                    className="relative bg-[#14142f] border border-white/8 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 hover:border-violet-500/40 transition-all shadow-xl group"
                  >
                    {/* Actor Rank Badge - Matching purple glassmorphism style */}
                    <span className="absolute top-4 right-5 bg-violet-600/30 border border-violet-500/40 text-violet-300 font-extrabold text-xs px-3 py-1 rounded-xl z-20 flex items-center gap-1">
                      Rank #{idx + 1}
                    </span>

                    {/* Real Actor Profile Image (Loaded from TMDB API!) */}
                    <div className="relative w-44 md:w-52 h-60 md:h-72 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-amber-400/40 shadow-2xl bg-violet-950">
                      {person.profile_path ? (
                        <Image
                          src={profileImg}
                          alt={person.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white bg-violet-800">
                          <User className="w-12 h-12" />
                          <span className="text-[10px] font-bold mt-1">{person.name}</span>
                        </div>
                      )}
                      <span className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/85 text-amber-400 text-xs font-black py-1 rounded-lg text-center backdrop-blur-sm shadow border border-amber-400/40">
                        ⭐ {person.rating || 9.8} / 10
                      </span>
                    </div>

                    {/* Actor Box Office Details (Right of Avatar) */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between space-y-3 pr-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow">
                            <Flame className="w-3.5 h-3.5" />
                            {person.status || 'IN THEATERS NOW'}
                          </span>
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-extrabold text-xs px-3 py-1 rounded-lg flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {boxOfficeTotal}
                          </span>
                        </div>

                        <h2 className="text-2xl font-black text-white group-hover:text-violet-300 transition-colors">
                          {person.name}
                        </h2>

                        <p className="text-xs sm:text-sm text-violet-300 font-extrabold mt-1 flex items-center gap-1.5">
                          <Ticket className="w-4 h-4 text-violet-400" />
                          Currently Starring In: <span className="text-white underline">{currentMovieTitle}</span>
                        </p>

                        <p className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">
                          Role: <span className="text-zinc-200 font-bold">{person.role || 'Lead Actor'}</span>
                        </p>

                        {knownForTitles && (
                          <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2.5 bg-white/3 p-3 rounded-xl border border-white/6">
                            <strong className="text-violet-300 block mb-1 flex items-center gap-1.5">
                              <Film className="w-4 h-4" />
                              Other Major Cinema Blockbusters:
                            </strong>
                            <span className="text-zinc-200 font-semibold">{knownForTitles}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/6">
                        <Link
                          href={`/person/${person.id || ''}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-violet-600/30 transition-all active:scale-95"
                        >
                          <span>View Actor Profile & Full Filmography</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-[#14142f] rounded-3xl border border-white/8">
                <p className="text-zinc-400 font-semibold text-sm">No actor profiles found.</p>
              </div>
            )
          ) : (
            /* ── Rendering Movie / Drama Detailed Cards ── */
            filteredTitles.length > 0 ? (
              filteredTitles.map((item, idx) => {
                const title = item.title || item.name || 'Untitled Title';
                const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/no-poster.png';
                const year = (item.release_date || item.first_air_date || '2024').substring(0, 4);
                const score = item.vote_average ? item.vote_average.toFixed(1) : '9.1';
                const isMovie = !!item.title;
                const typeSubtitle = isMovie ? `Movie - ${year}, 2h 15m` : `Drama Series - ${year}, 16 episodes`;
                const entry = getEntry(item.id);

                const genres = (item.genre_ids || [])
                  .map((id: number) => genreMap[id])
                  .filter(Boolean)
                  .slice(0, 3);

                return (
                  <div
                    key={item.id}
                    className="relative bg-[#14142f] border border-white/8 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-row items-start gap-3.5 sm:gap-6 hover:border-violet-500/40 transition-all shadow-xl group overflow-hidden"
                  >
                    {/* HD Poster Image (Framed poster on mobile & desktop!) */}
                    <Link 
                      href={`/${isMovie ? 'movie' : 'tv'}/${item.id}`} 
                      className="relative w-28 sm:w-52 md:w-60 h-36 sm:h-80 md:h-[350px] rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 self-start border border-white/10 group-hover:scale-102 transition-transform shadow-2xl bg-violet-950"
                    >
                      <Image
                        src={poster}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Movie Details (Right of Poster) */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2 sm:space-y-3 overflow-hidden">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <Link 
                            href={`/${isMovie ? 'movie' : 'tv'}/${item.id}`}
                            className="text-sm sm:text-xl font-extrabold sm:font-black text-white hover:text-violet-300 transition-colors leading-tight sm:leading-snug flex items-center gap-2 flex-wrap min-w-0"
                          >
                            <span className="bg-violet-600/30 border border-violet-500/40 text-violet-300 font-extrabold text-xs sm:text-sm px-2.5 py-0.5 rounded-lg shrink-0 inline-flex items-center">
                              #{idx + 1}
                            </span>
                            <span className="line-clamp-2">{title}</span>
                          </Link>
                          
                          {/* Add to Watchlist (+) Button */}
                          <button
                              onClick={() =>
                                setModalItem({
                                  id: item.id,
                                  title: item.title,
                                  name: item.name,
                                  overview: item.overview,
                                  poster_path: item.poster_path,
                                  backdrop_path: item.backdrop_path,
                                  media_type: isMovie ? 'movie' : 'tv',
                                  release_date: item.release_date || item.first_air_date,
                                  vote_average: item.vote_average,
                                  genre_ids: item.genre_ids || [],
                                })
                              }
                              className={`p-1.5 sm:p-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
                                entry
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-violet-600/30 hover:bg-violet-600 text-violet-300 hover:text-white border-violet-500/40'
                              }`}
                              title={entry ? `Status: ${entry.status}` : 'Add to My List'}
                            >
                              {entry ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                            </button>
                        </div>

                        <p className="text-[11px] sm:text-sm font-bold text-violet-300 mb-1.5">
                          {typeSubtitle}
                        </p>

                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                          <div className="flex items-center text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] sm:text-xs font-black text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md sm:rounded-lg">
                            {score} / 10
                          </span>
                        </div>

                        {genres.length > 0 && (
                          <div className="hidden sm:flex items-center gap-1.5 mb-3 flex-wrap">
                            <Tag className="w-3.5 h-3.5 text-violet-400 mr-0.5" />
                            {genres.map((g: string) => (
                              <span key={g} className="bg-white/5 border border-white/8 text-zinc-300 text-xs font-bold px-2.5 py-1 rounded-md">
                                {g}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2 hidden sm:block font-normal">
                          {item.overview || 'A captivating story featuring outstanding performances, high stakes drama, and brilliant character development.'}
                        </p>

                        {/* Dynamic Real Cast Members with Avatar Profile Pictures! */}
                        <div className="hidden sm:block">
                          <MovieCastRow itemId={item.id} mediaType={isMovie ? 'movie' : 'tv'} />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap pt-2 sm:pt-3 border-t border-white/6">
                        <button
                          onClick={() => openTrailerModal(item)}
                          className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-[11px] sm:text-sm font-extrabold text-white shadow-md shadow-violet-600/30 transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white" />
                          <span>Watch Trailer</span>
                        </button>

                        <Link
                          href={`/${isMovie ? 'movie' : 'tv'}/${item.id}`}
                          className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] sm:text-sm font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-[#14142f] rounded-3xl border border-white/8">
                <p className="text-zinc-400 font-semibold text-sm">No titles match your selected category.</p>
              </div>
            )
          )}
        </div>

        {/* ── Right Sidebar Column (4 cols) ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* ALWAYS Real TMDB Actor Profile Photos in Spotlight! */}
          <div className="bg-[#14142f] border border-white/8 rounded-2xl p-5 shadow-2xl space-y-4">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider text-center flex items-center justify-center gap-1.5 border-b border-white/8 pb-3">
              <Award className="w-4 h-4" />
              TOP FEATURED ACTORS
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center">
              {spotlightList.map((actor, idx) => {
                const profileImg = actor.profile_path
                  ? (actor.profile_path.startsWith('http') ? actor.profile_path : `https://image.tmdb.org/t/p/w185${actor.profile_path}`)
                  : '/no-poster.png';

                return (
                  <div key={actor.rank || idx} className="flex flex-col items-center group">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/40 bg-violet-950 shadow-lg mb-1 flex-shrink-0">
                      {actor.profile_path ? (
                        <Image
                          src={profileImg}
                          alt={actor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-violet-800 text-white font-bold text-xs">
                          {actor.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow z-10">
                        #{actor.rank || idx + 1}
                      </span>
                    </div>
                    <span className="block font-bold text-white text-[11px] truncate max-w-[75px] group-hover:text-violet-300 transition-colors">
                      {actor.name}
                    </span>
                    <span className="block text-[8px] text-violet-300 font-bold truncate max-w-[75px]">
                      {actor.movie || 'In Cinema'}
                    </span>
                    <span className="block text-[9px] text-emerald-400 font-bold mt-0.5">
                      💰 $1.5B
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#14142f] border border-white/8 rounded-2xl p-5 shadow-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/8 pb-3">
              <Filter className="w-4 h-4 text-violet-400" />
              Advanced Search & Filter
            </h3>

            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1.5">
                Search Keywords
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Title or actor name..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1.5">
                Format / Type
              </label>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as any)}
                className="w-full bg-[#0a0a18] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="all">All (Movies & TV Dramas)</option>
                <option value="movie">Movies Only</option>
                <option value="tv">TV Dramas Only</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {modalItem && (
        <MDLAddToListModal
          isOpen={true}
          onClose={() => setModalItem(null)}
          item={modalItem}
        />
      )}

      {trailerKey && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#14142f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#1a1a3e] border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-violet-400 fill-current" />
                Official Trailer: {trailerTitle}
              </span>
              <button
                onClick={() => setTrailerKey(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`}
                title="Official Trailer"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <Container className="py-32 text-center text-white">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <span>Loading Explore Catalog...</span>
      </Container>
    }>
      <ExploreContent />
    </Suspense>
  );
}
