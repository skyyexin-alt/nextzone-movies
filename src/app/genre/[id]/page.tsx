import { redirect } from 'next/navigation';

export default async function GenreRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/movies?with_genres=${id}`);
}
