"use client";

import { useState, useMemo } from 'react';
import MovieCard from '@/components/ui/MovieCard';
import { ChevronDown } from 'lucide-react';

interface PersonFilmographyProps {
  credits: any[];
}

export default function PersonFilmography({ credits }: PersonFilmographyProps) {
  const [sortBy, setSortBy] = useState<'popular' | 'top_rated' | 'newest'>('popular');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Hardcode genre names since TMDB gives us IDs. This is standard mapping.
  const genreMap: Record<number, string> = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 
    18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 
    9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 
    10752: 'War', 37: 'Western',
    10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality', 
    10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
  };

  // Derive all unique years and genres from the credits
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    credits.forEach((item) => {
      const date = item.release_date || item.first_air_date;
      if (date) years.add(date.substring(0, 4));
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [credits]);

  const availableGenres = useMemo(() => {
    const genres = new Set<number>();
    credits.forEach((item) => {
      if (item.genre_ids) {
        item.genre_ids.forEach((id: number) => genres.add(id));
      }
    });
    return Array.from(genres).map(id => ({ id, name: genreMap[id] || `Genre ${id}` })).sort((a, b) => a.name.localeCompare(b.name));
  }, [credits]);

  // Filter and sort
  const filteredAndSorted = useMemo(() => {
    let result = [...credits];

    // Filter by Genre
    if (selectedGenre !== 'all') {
      const genreId = parseInt(selectedGenre);
      result = result.filter(item => item.genre_ids?.includes(genreId));
    }

    // Filter by Year
    if (selectedYear !== 'all') {
      result = result.filter(item => {
        const date = item.release_date || item.first_air_date;
        return date && date.startsWith(selectedYear);
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.popularity || 0) - (a.popularity || 0);
      } else if (sortBy === 'top_rated') {
        return (b.vote_average || 0) - (a.vote_average || 0);
      } else if (sortBy === 'newest') {
        const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01').getTime();
        const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01').getTime();
        return dateB - dateA;
      }
      return 0;
    });

    return result;
  }, [credits, sortBy, selectedGenre, selectedYear]);

  return (
    <div>
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          Known For
          <span className="text-sm font-semibold bg-white/10 text-white/60 px-2 py-0.5 rounded-md">
            {filteredAndSorted.length}
          </span>
        </h2>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#1e1e38]/50 border border-white/5 p-4 rounded-2xl shadow-lg">
        
        {/* Left Side: Sort Buttons */}
        <div className="flex items-center gap-2 bg-[#2a2a4a] p-1 rounded-xl w-full md:w-auto overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setSortBy('popular')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
              sortBy === 'popular' ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setSortBy('top_rated')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
              sortBy === 'top_rated' ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Top Rated
          </button>
          <button
            onClick={() => setSortBy('newest')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
              sortBy === 'newest' ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Newest
          </button>
        </div>

        {/* Right Side: Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full md:w-40 appearance-none bg-[#2a2a4a] border border-white/10 text-white text-sm font-semibold px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
            >
              <option value="all">All Genres</option>
              {availableGenres.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 md:flex-none">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full md:w-32 appearance-none bg-[#2a2a4a] border border-white/10 text-white text-sm font-semibold px-4 py-2.5 rounded-xl focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
            >
              <option value="all">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Movie Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {filteredAndSorted.map((item: any) => (
            <MovieCard key={`${item.id}-${item.credit_id}`} item={item} className="w-full" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-zinc-500 font-medium">No titles found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
