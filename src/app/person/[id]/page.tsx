import { Metadata } from 'next';
import { getPersonDetails, getPersonCredits } from '@/lib/tmdb';
import Container from '@/components/ui/Container';
import PersonFilmography from '@/components/ui/PersonFilmography';
import { User, Calendar, MapPin, Star } from 'lucide-react';
import GlobalBackButton from '@/components/ui/GlobalBackButton';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const person = await getPersonDetails(id);
    const title = `${person.name} - Movies & TV Shows | XFlix`;
    const description = person.biography
      ? (person.biography.length > 200 ? `${person.biography.substring(0, 200)}...` : person.biography)
      : `Explore filmography and movies starring ${person.name} on XFlix.`;

    const profileUrl = person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : 'https://xflix.ink/icon-512.png';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://xflix.ink/person/${id}`,
        siteName: 'XFlix',
        type: 'profile',
        images: [
          {
            url: profileUrl,
            width: 500,
            height: 750,
            alt: person.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [profileUrl],
      },
    };
  } catch {
    return {
      title: 'Actor Profile | XFlix',
      description: 'Explore filmography and cast details on XFlix.',
    };
  }
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [person, credits] = await Promise.all([
      getPersonDetails(id),
      getPersonCredits(id)
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
          <div className="mb-6">
            <GlobalBackButton />
          </div>
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

          {/* Filmography Section with Filters */}
          <PersonFilmography credits={castCredits} />
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
