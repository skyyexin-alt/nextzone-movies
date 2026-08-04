import { getDiscoverMovies, getDiscoverTV, getGenres } from '@/lib/tmdb';
import MovieCard from '@/components/ui/MovieCard';
import CatalogFilters from '@/components/ui/CatalogFilters';
import Pagination from '@/components/ui/Pagination';
import BrowseMore from '@/components/ui/BrowseMore';
import Container from '@/components/ui/Container';
import { notFound, redirect } from 'next/navigation';
import adultMoviesData from '@/data/adult_movies.json';

export default async function CatalogPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ type: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const type = resolvedParams.type;

  // Redirect all catalog routes to /explore for rich horizontal card layout!
  if (type === 'top-rated') {
    redirect('/explore?type=movie&sort=top_rated&cat=Top+100+Rated');
  }
  if (type === 'movies') {
    redirect('/explore?type=movie&sort=popular&cat=Most+Popular+Movies');
  }
  if (type === 'trending') {
    redirect('/explore?type=movie&sort=popular&cat=Trending+Movies');
  }
  if (type === 'new-releases') {
    redirect('/explore?type=movie&sort=newest&cat=Newest+Blockbusters');
  }
  if (type === 'now-playing') {
    redirect('/explore?type=movie&sort=popular&cat=In+Theaters+Now');
  }
  if (type === 'upcoming') {
    redirect('/explore?type=movie&sort=upcoming&cat=Upcoming+Releases');
  }
  if (type === 'tv' || type === 'airing-today') {
    redirect('/explore?type=tv&sort=popular&cat=Top+TV+Dramas');
  }

  const isMovie = type !== 'tv' && type !== 'airing-today';
  const title = type === '18-plus' ? '18+ Intimacy 🍆💦🔥' : 'Movies';

  // Parse search params for TMDB discover endpoint
  const page = typeof resolvedSearchParams.page === 'string' ? resolvedSearchParams.page : '1';
  const sortBy = typeof resolvedSearchParams.sort_by === 'string' ? resolvedSearchParams.sort_by : 'popularity.desc';
  const withGenres = typeof resolvedSearchParams.with_genres === 'string' ? resolvedSearchParams.with_genres : undefined;
  const withCountry = typeof resolvedSearchParams.with_country === 'string' ? resolvedSearchParams.with_country : undefined;
  const primaryReleaseYear = typeof resolvedSearchParams.primary_release_year === 'string' ? resolvedSearchParams.primary_release_year : undefined;

  // Build the query object
  const queryParams: Record<string, string> = {
    page,
    sort_by: sortBy,
  };
  if (withGenres) queryParams.with_genres = withGenres;
  if (primaryReleaseYear) {
    if (isMovie) queryParams.primary_release_year = primaryReleaseYear;
    else queryParams.first_air_date_year = primaryReleaseYear;
  }

  // Inject adult params for 18+ route
  if (type === '18-plus') {
    queryParams.include_adult = 'true';
    queryParams.with_keywords = '10004,158529'; // TMDB keywords for erotica, sex
  }

  let data;
  let genresData;

  if (type === '18-plus') {
    let allMovies: any[] = [...adultMoviesData];
    
    // Sort locally
    if (sortBy === 'popularity.desc') {
      allMovies.sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === 'vote_average.desc') {
      allMovies.sort((a: any, b: any) => (b.vote_average || 0) - (a.vote_average || 0));
    } else if (sortBy === 'primary_release_date.desc') {
      allMovies.sort((a: any, b: any) => new Date(b.release_date || 0).getTime() - new Date(a.release_date || 0).getTime());
    }

    // Filter by country (using original_language)
    if (withCountry) {
      allMovies = allMovies.filter((m: any) => m.original_language === withCountry);
    }

    // Filter by year
    if (primaryReleaseYear) {
      allMovies = allMovies.filter((m: any) => m.release_date && m.release_date.startsWith(primaryReleaseYear));
    }
    
    const pageNum = parseInt(page, 10);
    const limit = 24;
    const startIndex = (pageNum - 1) * limit;
    
    data = {
      results: allMovies.slice(startIndex, startIndex + limit),
      total_pages: Math.ceil(allMovies.length / limit),
      page: pageNum,
      total_results: allMovies.length
    };
    genresData = await getGenres('movie');
  } else {
    const [fetchedData, fetchedGenres] = await Promise.all([
      isMovie ? getDiscoverMovies(queryParams) : getDiscoverTV(queryParams),
      getGenres(isMovie ? 'movie' : 'tv')
    ]);
    data = fetchedData;
    genresData = fetchedGenres;
  }

  const items = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const currentPage = parseInt(page, 10);
  const genres = genresData?.genres || [];

  return (
    <Container className="py-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-zinc-400 text-sm">Page {currentPage} of {Math.min(totalPages, 500)}</p>
        </div>
      </div>

      <CatalogFilters genres={genres} is18Plus={type === '18-plus'} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
        {items.map((item: any) => (
          <MovieCard key={item.id} item={item} className="w-full" />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-zinc-400">
          No results found matching your filters.
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
      
      <BrowseMore genres={genres} />
    </Container>
  );
}
