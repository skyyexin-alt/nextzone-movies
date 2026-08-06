"use client";

import Link from 'next/link';
import Image from 'next/image';
import { X, Film, Tv, User, Sparkles, Flame, Star, Ticket, Heart, Award, Calendar, UserCheck, Clapperboard, FileText, Users } from 'lucide-react';

interface ExploreCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  spotlightActors: Array<{
    rank: number;
    name: string;
    watchers: string;
    image: string;
  }>;
}

export default function ExploreCategoriesModal({
  isOpen,
  onClose,
  spotlightActors,
}: ExploreCategoriesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#14142f] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6 text-white">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-violet-300">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h3 className="text-lg sm:text-xl font-black tracking-wide uppercase">Explore Movie & TV Categories</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Category Columns Grid matching screenshot! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Column 1: MOVIES */}
          <div className="lg:col-span-3 space-y-3.5 bg-white/3 p-4 rounded-xl border border-white/6">
            <h4 className="text-sm font-black text-violet-300 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
              <Film className="w-4 h-4 text-violet-400" /> MOVIES
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm font-bold text-zinc-300">
              <Link href="/explore?type=movie&sort=popular&cat=Most+Popular+Movies" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all text-white font-extrabold">
                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Most Popular Movies</span>
              </Link>
              <Link href="/explore?type=movie&sort=top_rated&cat=Top+Rated+Movies" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
                <span>Top Movies</span>
              </Link>
              <Link href="/explore?type=movie&sort=newest&cat=Newest+Blockbusters" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span>Newest Blockbusters</span>
              </Link>
              <Link href="/explore?type=movie&sort=upcoming&cat=Upcoming+Movies" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Ticket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Upcoming Movies</span>
              </Link>
              <Link href="/explore?type=movie&sort=top_rated&cat=Movie+Reviews" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Film className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Movie Reviews</span>
              </Link>
              <Link href="/explore?type=movie&sort=popular&cat=Recommended+Movies" onClick={onClose} className="flex items-center gap-2 text-violet-300 font-extrabold hover:text-white hover:translate-x-1 transition-all pt-2 border-t border-white/8">
                <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Recommendations</span>
              </Link>
            </div>
          </div>

          {/* Column 2: TV SHOWS */}
          <div className="lg:col-span-3 space-y-3.5 bg-white/3 p-4 rounded-xl border border-white/6">
            <h4 className="text-sm font-black text-violet-300 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
              <Tv className="w-4 h-4 text-violet-400" /> TV SHOWS
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm font-bold text-zinc-300">
              <Link href="/explore?type=tv&sort=popular&cat=Most+Popular+TV+Shows" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all text-white font-extrabold">
                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Most Popular Shows</span>
              </Link>
              <Link href="/explore?type=tv&sort=top_rated&cat=Top+TV+Shows+%26+Dramas" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Top Shows</span>
              </Link>
              <Link href="/explore?type=tv&genre=10764&cat=Variety+Shows" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Tv className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Variety Shows</span>
              </Link>
              <Link href="/explore?type=tv&sort=newest&cat=Newest+TV+Releases" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span>Newest Releases</span>
              </Link>
              <Link href="/explore?type=tv&sort=upcoming&cat=Upcoming+Dramas" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Upcoming Dramas</span>
              </Link>
              <Link href="/explore?type=tv&sort=top_rated&cat=TV+Reviews+%26+Ratings" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Reviews & Ratings</span>
              </Link>
              <Link href="/explore?type=tv&sort=popular&cat=Recommended+For+You" onClick={onClose} className="flex items-center gap-2 text-violet-300 font-extrabold hover:text-white hover:translate-x-1 transition-all pt-2 border-t border-white/8">
                <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Recommended For You</span>
              </Link>
            </div>
          </div>

          {/* Column 3: PEOPLE */}
          <div className="lg:col-span-3 space-y-3.5 bg-white/3 p-4 rounded-xl border border-white/6">
            <h4 className="text-sm font-black text-violet-300 uppercase tracking-wider border-b border-white/10 pb-2.5 flex items-center gap-2">
              <User className="w-4 h-4 text-violet-400" /> PEOPLE
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm font-bold text-zinc-300">
              <Link href="/explore?cat=Top+Actors" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Top Actors</span>
              </Link>
              <Link href="/explore?cat=Popular+Directors" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Clapperboard className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span>Popular Directors</span>
              </Link>
              <Link href="/explore?cat=Screenwriters" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Screenwriters</span>
              </Link>
              <Link href="/explore?cat=Actor+Filmographies" onClick={onClose} className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all">
                <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Actor Filmographies</span>
              </Link>
            </div>
          </div>

          {/* Column 4: TOP FEATURED ACTORS */}
          <div className="lg:col-span-3 bg-white/4 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5 text-center">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block border-b border-white/8 pb-2">
                👑 TOP FEATURED ACTORS
              </span>

              <div className="flex items-center justify-center gap-3 pt-1">
                {spotlightActors.map((actor) => (
                  <Link 
                    key={actor.rank} 
                    href="/explore?cat=Top+Actors" 
                    onClick={onClose}
                    className="flex flex-col items-center group/actor"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/40 bg-violet-950 flex items-center justify-center shadow-md">
                      {actor.image ? (
                        <Image src={actor.image} alt={actor.name} fill className="object-cover" />
                      ) : (
                        <span className="font-extrabold text-white text-xs">{actor.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="text-xs font-extrabold text-white mt-1 truncate max-w-[70px] group-hover/actor:text-violet-300">
                      {actor.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-semibold">{actor.watchers}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/explore?cat=Top+Actors"
              onClick={onClose}
              className="block text-center text-xs font-black bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl transition-all shadow-lg"
            >
              View Actor Leaderboard
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
