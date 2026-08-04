"use client";

import Link from 'next/link';
import Container from '@/components/ui/Container';
import { Film, Moon, Sun, Smartphone, Play, Apple } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 bg-[#0b0b1a] border-t border-violet-500/30 text-white py-14 overflow-hidden">
      {/* Decorative top glow bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <Container className="relative z-10">
        {/* 4-Column Footer Grid matching MyDramaList Layout! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 items-start">

          {/* Column 1: Logo, Copyright, Social Pills, App Store Badges (5 cols) */}
          <div className="md:col-span-5 space-y-4">
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
              © Copyright {currentYear}. All rights reserved.
            </p>

            {/* Social Circle Icons (f, X, ig, yt, tt, rss) */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {['f', 'X', 'ig', 'yt', 'tt', 'rss'].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-violet-600 hover:border-violet-500 text-zinc-300 hover:text-white flex items-center justify-center text-xs font-black transition-all shadow"
                >
                  {soc}
                </a>
              ))}
            </div>

            {/* App Store & Google Play Download Pills */}
            <div className="space-y-2 pt-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all w-52 shadow"
              >
                <Apple className="w-5 h-5 text-zinc-200" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase">Download on the</span>
                  <span className="text-xs font-black text-white">App Store</span>
                </div>
              </a>

              <br />

              <a
                href="#"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all w-52 shadow"
              >
                <Play className="w-5 h-5 text-emerald-400 fill-current" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase">Download on the</span>
                  <span className="text-xs font-black text-white">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: ABOUT (2 cols) */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs font-extrabold text-zinc-300">
              <li><Link href="/explore" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Support Us</Link></li>
            </ul>
          </div>

          {/* Column 3: DARK MODE & WORK WITH US (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
                DARK MODE
              </h4>
              <div className="flex items-center gap-2 pt-1">
                <button className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow border border-violet-400/40">
                  <Moon className="w-4 h-4 fill-current" />
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors">
                  <Sun className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
                WORK WITH US
              </h4>
              <ul className="space-y-2 text-xs font-extrabold text-zinc-300">
                <li><Link href="/explore" className="hover:text-white transition-colors">Advertise</Link></li>
                <li><Link href="/explore" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4: RECOMMENDED (3 cols) */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black text-violet-400 uppercase tracking-widest border-b border-white/10 pb-2">
              RECOMMENDED
            </h4>
            <ul className="space-y-2.5 text-xs font-extrabold text-zinc-300">
              <li><Link href="/upcoming" className="hover:text-white transition-colors">Dramas & Movie Calendar</Link></li>
              <li><Link href="/explore?sort=top_rated&type=movie" className="hover:text-white transition-colors">Top 100 Movies</Link></li>
              <li><Link href="/explore?sort=top_rated&type=tv" className="hover:text-white transition-colors">Top 100 Dramas & Series</Link></li>
              <li><Link href="/explore?cat=Variety+Shows" className="hover:text-white transition-colors">Top Variety Shows</Link></li>
              <li><Link href="/explore?cat=Top+Actors" className="hover:text-white transition-colors">Top Actors & Actresses</Link></li>
            </ul>
          </div>

        </div>
      </Container>
    </footer>
  );
}
