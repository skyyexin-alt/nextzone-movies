import { getDiscoverMovies, getGenres } from '@/lib/tmdb';
import Container from '@/components/ui/Container';
import CommunityList from '@/components/ui/CommunityList';
import GlobalBackButton from '@/components/ui/GlobalBackButton';

export default async function ListsPage() {
  const [data, genresData] = await Promise.all([
    getDiscoverMovies({ sort_by: 'popularity.desc', page: '1' }),
    getGenres('movie')
  ]);

  const items = data?.results || [];
  const genresMap = (genresData?.genres || []).reduce((acc: any, g: any) => {
    acc[g.id] = g.name;
    return acc;
  }, {});

  return (
    <Container className="pt-6 pb-24 md:py-12 relative z-10 min-h-screen">
      <GlobalBackButton />
      
      <div className="flex flex-col mb-6 mt-3 sm:mt-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shadow-inner">
            <span className="text-xl">🔥</span>
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Community Lists</h1>
        </div>
        <p className="text-zinc-400 text-sm">Top rated & trending among our community</p>
      </div>

      <div className="mt-8">
        <CommunityList items={items} genreMap={genresMap} />
      </div>
    </Container>
  );
}
