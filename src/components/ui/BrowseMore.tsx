import Link from 'next/link';

interface BrowseMoreProps {
  genres: any[]; 
}

export default function BrowseMore({ genres }: BrowseMoreProps) {
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
  const quickLinks = [
    { name: 'Popular Movies', href: '/movies' },
    { name: 'Popular TV Shows', href: '/tv' },
    { name: 'Trending This Week', href: '/trending' },
    { name: 'Top Rated', href: '/top-rated' },
    { name: 'New Releases', href: '/new-releases' },
    { name: 'Now Playing', href: '/now-playing' },
    { name: 'Upcoming', href: '/upcoming' },
    { name: 'Airing Today', href: '/airing-today' }
  ];

  return (
    <div className="bg-[#222255]/30 border border-white/5 rounded-xl p-6 md:p-8 mt-12 mb-8">
      <h3 className="text-white font-bold text-lg mb-6">Browse More</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {quickLinks.map(link => (
          <Link 
            key={link.name} 
            href={link.href}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm text-zinc-300 hover:text-white hover:bg-white/10 hover:border-violet-500/50 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-zinc-400 mb-3">Popular Genres</h4>
        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 15).map(g => (
            <Link 
              key={g.id} 
              href={`/movies?with_genres=${g.id}`}
              className="px-3 py-1.5 bg-black/20 rounded text-xs text-zinc-400 hover:text-white hover:bg-violet-600/20 transition-colors"
            >
              {g.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-zinc-400 mb-3">Browse by Year</h4>
        <div className="flex flex-wrap gap-2">
          {years.map(y => (
            <Link 
              key={y} 
              href={`/movies?primary_release_year=${y}`}
              className="px-3 py-1.5 bg-black/20 rounded text-xs text-zinc-400 hover:text-white hover:bg-violet-600/20 transition-colors"
            >
              {y}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
