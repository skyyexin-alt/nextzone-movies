"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ChevronDown, Heart, Shuffle, ListVideo, Home, Film, Tv, Compass, Sparkles, Flame, LayoutList, Star, Library, Globe, Radio, PlayCircle, Calendar, Clock } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchOverlay from './SearchOverlay';
import Container from '@/components/ui/Container';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'HOME', href: '/', icon: Home },
    { name: 'MOVIES', href: '/movies', icon: Film },
    { name: 'TV SHOWS', href: '/tv', icon: Tv },
    { name: 'NEW', href: '/new-releases', icon: Sparkles },
  ];

  const browseLinks = [
    { name: 'Trending', href: '/trending', icon: Flame },
    { name: 'Genres', href: '/genre', icon: LayoutList },
    { name: 'Top Rated', href: '/top-rated', icon: Star },
    { name: 'Collections', href: '/collections', icon: Library },
    { name: 'Countries', href: '/country', icon: Globe },
    { name: 'Networks', href: '/networks', icon: Radio },
    { name: 'Now Playing', href: '/now-playing', icon: PlayCircle },
    { name: 'Upcoming', href: '/upcoming', icon: Calendar },
    { name: 'Airing Today', href: '/airing-today', icon: Clock },
  ];

  // Bottom nav tabs for mobile
  const bottomTabs = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Film, label: 'Movies', href: '/movies' },
    { icon: Tv, label: 'TV', href: '/tv' },
    { icon: Compass, label: 'Browse', href: '/trending' },
    { icon: Heart, label: 'Watchlist', href: '/watchlist' },
  ];

  return (
    <>
      {/* ── Top Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a1a]/97 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)] py-3'
            : 'bg-gradient-to-b from-black/60 to-transparent py-4'
        }`}
      >
        <Container className="w-full flex items-center justify-between">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-transform shadow-lg shadow-violet-500/30">
                <ListVideo className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">XFlix</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs font-bold tracking-wider transition-colors py-2 ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-violet-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
              
              {/* Browse Dropdown */}
              <div className="relative group/browse">
                <button className="flex items-center gap-1 text-xs font-bold tracking-wider text-zinc-400 hover:text-white transition-colors py-2">
                  BROWSE <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/browse:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#0f0f23] rounded-xl shadow-2xl border border-white/5 opacity-0 invisible group-hover/browse:opacity-100 group-hover/browse:visible transition-all grid grid-cols-1 overflow-hidden">
                  {browseLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/network"
                className="text-xs font-black tracking-widest text-white/90 hover:text-violet-400 transition-colors py-2"
              >
                FLIXNETWORK
              </Link>
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all hidden sm:block">
              <Shuffle className="w-5 h-5" />
            </button>

            <Link
              href="/watchlist"
              className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all hidden sm:block"
              title="My Watchlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <button
              className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* ── Mobile Slide-in Drawer ── */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[#0f0f23] border-l border-white/8 shadow-2xl transition-transform duration-300 flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/8 flex items-center justify-between flex-shrink-0">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <ListVideo className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white">XFlix</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable nav content */}
          <div className="flex-1 overflow-y-auto py-3 px-3">
            <p className="px-3 py-1.5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Navigation</p>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold mb-0.5 transition-colors ${
                  pathname === link.href ? 'bg-violet-600/15 text-violet-400' : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 opacity-70" />
                {link.name}
              </Link>
            )})}
            
            <div className="h-px bg-white/8 my-3 mx-2" />
            <p className="px-3 py-1.5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Browse</p>
            
            {browseLinks.map((link) => {
              const Icon = link.icon;
              return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 mb-0.5 transition-colors"
              >
                <Icon className="w-4 h-4 opacity-70" />
                {link.name}
              </Link>
            )})}
          </div>

          {/* Bottom safe area */}
          <div className="h-20 flex-shrink-0 safe-bottom" />
        </div>
      </div>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-bottom">
        <div className="bg-[#0a0a1a]/98 backdrop-blur-xl border-t border-white/8 px-1 pt-2 pb-2">
          <div className="flex items-center justify-around max-w-lg mx-auto">
            {bottomTabs.map((tab) => {
              const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all active:scale-90 ${
                    isActive ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <div className={`relative transition-all ${isActive ? 'scale-110' : ''}`}>
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold leading-none ${isActive ? 'text-violet-400' : 'text-zinc-600'}`}>
                    {tab.label}
                  </span>
                </Link>
              );
            })}

            {/* Search tab — triggers overlay */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-zinc-500 hover:text-zinc-300 active:scale-90 transition-all"
            >
              <Search className="w-5 h-5" strokeWidth={2} />
              <span className="text-[10px] font-semibold leading-none text-zinc-600">Search</span>
            </button>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
