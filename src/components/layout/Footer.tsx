import Link from 'next/link';
import { ListVideo } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pt-20 pb-10 bg-[#151532] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <ListVideo className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">NextZone</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              Stream your favorite movies and TV shows in HD quality. Free, fast, and always updated with the latest releases. The best cinematic experience on the web.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Browse</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/movies" className="text-sm text-zinc-400 hover:text-white transition-colors">Movies</Link></li>
              <li><Link href="/tv" className="text-sm text-zinc-400 hover:text-white transition-colors">TV Shows</Link></li>
              <li><Link href="/trending" className="text-sm text-zinc-400 hover:text-white transition-colors">Trending</Link></li>
              <li><Link href="/top-rated" className="text-sm text-zinc-400 hover:text-white transition-colors">Top Rated</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Movies</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/movies" className="text-sm text-zinc-400 hover:text-white transition-colors">Popular</Link></li>
              <li><Link href="/now-playing" className="text-sm text-zinc-400 hover:text-white transition-colors">Now Playing</Link></li>
              <li><Link href="/upcoming" className="text-sm text-zinc-400 hover:text-white transition-colors">Upcoming</Link></li>
              <li><Link href="/top-rated" className="text-sm text-zinc-400 hover:text-white transition-colors">Top Rated</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">TV Shows</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/tv" className="text-sm text-zinc-400 hover:text-white transition-colors">Popular</Link></li>
              <li><Link href="/airing-today" className="text-sm text-zinc-400 hover:text-white transition-colors">Airing Today</Link></li>
              <li><Link href="/networks" className="text-sm text-zinc-400 hover:text-white transition-colors">Networks</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          <p className="text-xs text-zinc-500">
            &copy; {currentYear} NextZone. All rights reserved. This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/dmca" className="text-xs text-zinc-500 hover:text-white transition-colors">DMCA</Link>
            <Link href="/privacy-policy" className="text-xs text-zinc-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-xs text-zinc-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
