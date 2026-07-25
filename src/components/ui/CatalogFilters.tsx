"use client";

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface Genre {
  id: number;
  name: string;
}

interface CatalogFiltersProps {
  genres: Genre[];
}

export default function CatalogFilters({ genres }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort_by') || 'popularity.desc';
  const currentGenre = searchParams.get('with_genres') || '';
  const currentYear = searchParams.get('primary_release_year') || '';

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    // Reset page to 1 on filter change
    params.set('page', '1');
    return params.toString();
  };

  const handleFilterChange = (name: string, value: string) => {
    router.push(`${pathname}?${createQueryString(name, value)}`);
  };

  const currentYearNum = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYearNum - i);

  return (
    <div className="bg-[#222255]/50 border border-white/5 rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center">
      {/* Quick Filters */}
      <div className="flex gap-2 mr-auto flex-wrap">
        <button 
          onClick={() => handleFilterChange('sort_by', 'popularity.desc')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            currentSort === 'popularity.desc' ? 'bg-violet-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Popular
        </button>
        <button 
          onClick={() => handleFilterChange('sort_by', 'vote_average.desc')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            currentSort === 'vote_average.desc' ? 'bg-violet-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Top Rated
        </button>
        <button 
          onClick={() => handleFilterChange('sort_by', 'primary_release_date.desc')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            currentSort === 'primary_release_date.desc' ? 'bg-violet-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          Newest
        </button>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative">
          <select 
            value={currentGenre}
            onChange={(e) => handleFilterChange('with_genres', e.target.value)}
            className="appearance-none bg-black/40 border border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-violet-500 min-w-[140px]"
          >
            <option value="" className="bg-[#1a1a3e] text-white">All Genres</option>
            {genres.map(g => (
              <option key={g.id} value={g.id.toString()} className="bg-[#1a1a3e] text-white">{g.name}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select 
            value={currentYear}
            onChange={(e) => handleFilterChange('primary_release_year', e.target.value)}
            className="appearance-none bg-black/40 border border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-violet-500 min-w-[120px]"
          >
            <option value="" className="bg-[#1a1a3e] text-white">All Years</option>
            {years.map(y => (
              <option key={y} value={y.toString()} className="bg-[#1a1a3e] text-white">{y}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
