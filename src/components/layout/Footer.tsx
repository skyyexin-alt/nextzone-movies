"use client";

import Link from 'next/link';
import Script from 'next/script';
import Container from '@/components/ui/Container';
import { Film, Moon, Sun, Play, Apple } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 sm:mt-20 bg-[#0b0b1a] border-t border-violet-500/30 text-white pt-10 sm:pt-14 pb-24 sm:pb-14 overflow-hidden">
      {/* Decorative top glow bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <Container className="relative z-10">
        {/* Organized Multi-Column Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">

          {/* Column 1: Brand Logo, Copyright, Social Pills, App Store Badges (Full Width on Mobile) */}
          <div className="col-span-2 lg:col-span-5 space-y-4 border-b sm:border-b-0 border-white/10 pb-6 sm:pb-0">
            {/* Brand Logo with v2.0 Badge */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-600/30 border border-violet-400/30">
                <Film className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black text-white tracking-tight">XFlix</span>
                  <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">REVIEWS</span>
                </div>
                <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow">
                  v2.0
                </span>
              </div>
            </Link>

            {/* Copyright text */}
            <p className="text-xs text-zinc-400 font-semibold">
              © Copyright {currentYear} XFlix Reviews. All rights reserved.
            </p>

            {/* Whos.amung.us Live Visitor Widget */}
            <div className="pt-1 flex items-center min-h-[30px]">
              <Script id="_wau8bc" strategy="afterInteractive">
                {`var _wau = _wau || []; _wau.push(["dynamic", "2t9n5mrulj", "8bc", "c4302bffffff", "small"]);`}
              </Script>
              <Script src="https://waust.at/d.js" strategy="afterInteractive" />
            </div>

            {/* Social Circle Icons */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {['f', 'X', 'ig', 'yt', 'tt', 'rss'].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-violet-600 hover:border-violet-500 text-zinc-300 hover:text-white flex items-center justify-center text-xs font-black transition-all shadow hover:scale-105"
                >
                  {soc}
                </a>
              ))}
            </div>

            {/* App Store & Google Play Download Side-by-Side Pills */}
            <div className="flex items-center gap-2.5 flex-wrap pt-2">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all shadow hover:border-violet-500/40"
              >
                <Apple className="w-4 h-4 text-zinc-200" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[8px] text-zinc-400 font-bold uppercase">Download on</span>
                  <span className="text-[11px] font-black text-white">App Store</span>
                </div>
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all shadow hover:border-violet-500/40"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-current" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[8px] text-zinc-400 font-bold uppercase">Get it on</span>
                  <span className="text-[11px] font-black text-white">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: ABOUT */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
              ABOUT
            </h4>
            <ul className="space-y-2 text-xs font-extrabold text-zinc-300">
              <li><Link href="/explore" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Support Us</Link></li>
            </ul>
          </div>

          {/* Column 3: RECOMMENDED */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
              RECOMMENDED
            </h4>
            <ul className="space-y-2 text-xs font-extrabold text-zinc-300">
              <li><Link href="/upcoming" className="hover:text-white transition-colors">Dramas & Movie Calendar</Link></li>
              <li><Link href="/explore?sort=top_rated&type=movie" className="hover:text-white transition-colors">Top 100 Movies</Link></li>
              <li><Link href="/explore?sort=top_rated&type=tv" className="hover:text-white transition-colors">Top 100 Dramas & Series</Link></li>
              <li><Link href="/explore?cat=Variety+Shows" className="hover:text-white transition-colors">Top Variety Shows</Link></li>
              <li><Link href="/explore?cat=Top+Actors" className="hover:text-white transition-colors">Top Actors & Actresses</Link></li>
            </ul>
          </div>

          {/* Column 4: WORK WITH US & DARK MODE */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 space-y-5">
            <div className="space-y-2">
              <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
                WORK WITH US
              </h4>
              <ul className="space-y-1.5 text-xs font-extrabold text-zinc-300">
                <li><Link href="/explore" className="hover:text-white transition-colors">Advertise</Link></li>
                <li><Link href="/explore" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
                THEME
              </h4>
              <div className="flex items-center gap-2 pt-1">
                <button className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow border border-violet-400/40" title="Dark Mode Active">
                  <Moon className="w-3.5 h-3.5 fill-current" />
                </button>
                <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors" title="Light Mode">
                  <Sun className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </footer>
  );
}
