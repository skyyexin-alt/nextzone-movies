import { Metadata } from 'next';
import { getPersonDetails, getPersonCredits } from '@/lib/tmdb';
import Container from '@/components/ui/Container';
import MovieCard from '@/components/ui/MovieCard';
import { User, Calendar, MapPin, Star } from 'lucide-react';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const person = await getPersonDetails(params.id);
    return {
      title: `${person.name} - Movies & TV Shows | XFlix`,
      description: person.biography?.substring(0, 160) || `Watch movies and TV shows starring ${person.name}.`,
    };
  } catch (error) {
    return { title: 'Actor Profile | XFlix' };
  }
}

export default async function PersonPage({ params }: { params: { id: string } }) {
  try {
    const [person, credits] = await Promise.all([
      getPersonDetails(params.id),
      getPersonCredits(params.id)
    ]);

    // Filter out items without posters and sort by popularity
    const castCredits = (credits.cast || [])
      .filter((item: any) => item.poster_path)
      .sort((a: any, b: any) => b.popularity - a.popularity);

    const profileUrl = person.profile_path 
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : null;

    return (
      <main className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
        <Container>
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12 bg-white/5 border border-white/5 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
            <div className="flex-shrink-0 mx-auto md:mx-0 relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#1e88e5]/20 shadow-[0_0_30px_rgba(30,136,229,0.15)]">
              {profileUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={profileUrl} 
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#1a2f50] flex items-center justify-center">
                  <User className="w-20 h-20 text-[#1e88e5]" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 text-center md:text-left">{person.name}</h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-blue-200/80 mb-6 font-medium">
                {person.known_for_department && (
                  <div className="flex items-center gap-1.5 bg-[#1e88e5]/20 px-3 py-1 rounded-full border border-[#1e88e5]/30">
                    <Star className="w-4 h-4 text-[#1e88e5]" />
                    {person.known_for_department}
                  </div>
                )}
                {person.birthday && (
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <Calendar className="w-4 h-4" />
                    {person.birthday}
                  </div>
                )}
                {person.place_of_birth && (
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <MapPin className="w-4 h-4" />
                    {person.place_of_birth}
                  </div>
                )}
              </div>

              {person.biography && (
                <div>
                  <h2 className="text-white font-bold mb-2">Biography</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4 md:line-clamp-6">
                    {person.biography}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Filmography Grid */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Known For
              <span className="text-sm font-semibold bg-white/10 text-white/60 px-2 py-0.5 rounded-md">
                {castCredits.length}
              </span>
            </h2>
          </div>

          {castCredits.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
              {castCredits.map((item: any) => (
                <MovieCard key={`${item.id}-${item.credit_id}`} item={item} className="w-full" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-zinc-500">No filmography available.</p>
            </div>
          )}
        </Container>
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Actor Not Found</h1>
          <p className="text-zinc-500">We couldn&apos;t load details for this person.</p>
        </div>
      </div>
    );
  }
}
