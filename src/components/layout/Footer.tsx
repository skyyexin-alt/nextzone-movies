import Link from 'next/link';
import { ListVideo, Send } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 pt-14 bg-[#070714] border-t border-white/5 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/8 blur-[100px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand — full width on mobile */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <ListVideo className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">XFlix</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-6">
              Stream your favorite movies and TV shows in HD quality. Free, fast, and always updated. The best cinematic experience on any device.
            </p>

            {/* Telegram Join Card */}
            <div className="relative overflow-hidden rounded-2xl p-4 w-full max-w-[320px] border border-[#2AABEE]/30 bg-[#0f0f23]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(42,171,238,0.2)]">
              {/* Background glow elements */}
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#2AABEE]/20 to-transparent pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#229ED9]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#2AABEE] to-[#229ED9] flex items-center justify-center shrink-0 shadow-lg border border-white/10 relative">
                    <Send className="w-6 h-6 text-white ml-[-2px] mt-[2px]" />
                  </div>
                  <div className="pr-2">
                    <h3 className="font-bold text-white text-[15px] leading-tight">Join Our Telegram</h3>
                    <p className="text-zinc-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                      Get instant updates on new movies and exclusive content.
                    </p>
                  </div>
                </div>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-1 py-2.5 bg-gradient-to-r from-[#2AABEE] to-[#229ED9] hover:from-[#3BB8F5] hover:to-[#2FB2EC] active:scale-[0.98] transition-all text-white font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(42,171,238,0.3)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Join Channel
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Browse</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Movies', '/movies'],
                ['TV Shows', '/tv'],
                ['Trending', '/trending'],
                ['Top Rated', '/top-rated'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Discover</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['Now Playing', '/now-playing'],
                ['Upcoming', '/upcoming'],
                ['Airing Today', '/airing-today'],
                ['Networks', '/networks'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-500 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-white/5 gap-4 pb-6 md:pb-8">
          <p className="text-xs text-zinc-600 leading-relaxed">
            © {currentYear} XFlix. All rights reserved. This site does not store any files on its server.
          </p>
          <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
            {[
              ['DMCA', '/dmca'],
              ['Privacy', '/privacy-policy'],
              ['Terms', '/terms'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-xs text-zinc-600 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile bottom nav spacer */}
        <div className="h-16 lg:hidden" />

        {/* Tracker */}
        <div className="mt-8 flex justify-center pb-8" dangerouslySetInnerHTML={{ __html: `<script id="_waul11">var _wau = _wau || []; _wau.push(["dynamic", "wft2mup9o8", "l11", "c4302bffffff", "small"]);</script><script async src="//waust.at/d.js"></script>` }} />
      </Container>
    </footer>
  );
}
