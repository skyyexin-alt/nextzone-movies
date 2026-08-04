"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Layers, Calendar, Heart, Search } from 'lucide-react';
import { useWatchlist } from '@/context/WatchlistContext';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
}

export default function MobileBottomNav({ onOpenSearch }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { watchlist } = useWatchlist();

  const navItems = [
    {
      label: 'HOME',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'EXPLORE',
      href: '/explore',
      icon: Sparkles,
      isActive: pathname.startsWith('/explore'),
    },
    {
      label: 'COMMUNITY',
      href: '/lists',
      icon: Layers,
      isActive: pathname === '/lists',
      isNew: true,
    },
    {
      label: 'CALENDAR',
      href: '/upcoming',
      icon: Calendar,
      isActive: pathname === '/upcoming',
    },
    {
      label: 'WATCHLIST',
      href: '/watchlist',
      icon: Heart,
      isActive: pathname === '/watchlist',
      badge: watchlist.length > 0 ? watchlist.length : undefined,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0c1d]/98 backdrop-blur-xl border-t border-white/10 px-1 py-1.5 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex flex-col items-center justify-center min-w-[54px] py-1 rounded-xl transition-all ${
              item.isActive
                ? 'text-violet-400 font-black'
                : 'text-zinc-400 hover:text-white font-bold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${item.isActive ? 'text-violet-400 fill-violet-500/20' : ''}`} />
              {item.isNew && (
                <span className="absolute -top-1 -right-2 bg-emerald-500 text-black text-[7px] font-black px-1 rounded uppercase tracking-tighter shadow">
                  NEW
                </span>
              )}
              {item.badge !== undefined && (
                <span className="absolute -top-1 -right-2 bg-violet-600 text-white text-[8px] font-black px-1 rounded-full border border-violet-400 shadow">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[9px] mt-0.5 tracking-tight font-black uppercase">{item.label}</span>
          </Link>
        );
      })}

      {/* SEARCH Button */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center min-w-[54px] py-1 text-zinc-400 hover:text-white font-bold transition-all"
      >
        <Search className="w-5 h-5 text-violet-400" />
        <span className="text-[9px] mt-0.5 tracking-tight font-black uppercase">SEARCH</span>
      </button>
    </div>
  );
}
