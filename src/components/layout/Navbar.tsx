"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ChevronDown, Heart, Shuffle, ListVideo } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'MOVIES', href: '/movies' },
    { name: 'TV SHOWS', href: '/tv' },
    { name: 'NEW', href: '/new-releases' },
  ];

  const browseLinks = [
    { name: 'Trending', href: '/trending' },
    { name: 'Genres', href: '/genre' },
    { name: 'Top Rated', href: '/top-rated' },
    { name: 'Collections', href: '/collections' },
    { name: 'Countries', href: '/country' },
    { name: 'Networks', href: '/networks' },
    { name: 'Now Playing', href: '/now-playing' },
    { name: 'Upcoming', href: '/upcoming' },
    { name: 'Airing Today', href: '/airing-today' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0a1a]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[95%] w-full mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ListVideo className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">FlickZone</span>
            </Link>

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
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-violet-500 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
              
              <div className="relative group">
                <button className="flex items-center gap-1 text-xs font-bold tracking-wider text-zinc-400 hover:text-white transition-colors py-2">
                  BROWSE <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#151530] rounded-xl shadow-xl border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all grid grid-cols-1 overflow-hidden">
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
                className="text-xs font-black tracking-widest text-white transition-colors py-2"
              >
                FLIXNETWORK
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div 
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[#1a1a3e] border border-white/5 hover:border-white/10 rounded-full px-4 py-2 cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-500 min-w-[120px]">Enter keywords...</span>
            </div>

            <button 
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2.5 bg-[#1a1a3e] border border-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors hidden sm:block">
              <Shuffle className="w-4 h-4" />
            </button>

            <Link
              href="/watchlist"
              className="p-2.5 bg-[#1a1a3e] border border-white/5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
              title="My List"
            >
              <Heart className="w-4 h-4" />
            </Link>

            <button
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 bottom-0 w-64 bg-[#1a1a3e] border-l border-white/10 shadow-2xl transition-transform transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="font-bold text-white">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="py-4 px-3 flex flex-col gap-1 overflow-y-auto h-full pb-20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  pathname === link.href ? 'bg-violet-600/20 text-violet-400' : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-white/10 my-2 mx-2"></div>
            <p className="px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Browse</p>
            
            {browseLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
