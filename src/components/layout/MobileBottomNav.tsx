"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, Tv, Flame, Heart, Search } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
}

export default function MobileBottomNav({ onOpenSearch }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { watchlist } = useWatchlist();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Movies',
      href: '/explore?type=movie&sort=popular&cat=Most+Popular+Movies',
      icon: Film,
      isActive: pathname.includes('type=movie') || pathname === '/movies',
    },
    {
      label: 'TV',
      href: '/explore?type=tv&sort=popular&cat=Top+TV+Dramas',
      icon: Tv,
      isActive: pathname.includes('type=tv') || pathname === '/tv',
    },
    {
      label: '18+',
      href: '/explore?cat=Adult+18+Plus',
      icon: Flame,
      isActive: pathname.includes('18+'),
      isHot: true,
    },
    {
      label: 'Watchlist',
      href: '/watchlist',
      icon: Heart,
      isActive: pathname === '/watchlist',
      badge: watchlist.length > 0 ? watchlist.length : undefined,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c1d]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
              item.isActive
                ? 'text-violet-400 font-black'
                : 'text-zinc-400 hover:text-white font-bold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${item.isActive ? 'text-violet-400 fill-violet-500/20' : ''}`} />
              {item.isHot && (
                <span className="absolute -top-1 -right-1.5 bg-rose-600 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                  🔥
                </span>
              )}
              {item.badge !== undefined && (
                <span className="absolute -top-1 -right-2 bg-violet-600 text-white text-[9px] font-black px-1 rounded-full border border-violet-400 shadow">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-extrabold">{item.label}</span>
          </Link>
        );
      })}

      {/* Search Button */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center w-14 py-1 text-zinc-400 hover:text-white font-bold transition-all"
      >
        <Search className="w-5 h-5 text-violet-400" />
        <span className="text-[10px] mt-0.5 tracking-tight font-extrabold">Search</span>
      </button>
    </div>
  );
}
