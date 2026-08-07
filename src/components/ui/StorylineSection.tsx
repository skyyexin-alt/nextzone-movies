"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen, ChevronDown, ChevronUp, Sparkles, Layers, ShieldAlert, Award, Film, Flame, Camera, Play } from 'lucide-react';
import CustomVideoPlayer from '@/components/ui/CustomVideoPlayer';
import XFlixTrailerPlayer from '@/components/ui/XFlixTrailerPlayer';
import AdsterraBannerAd from '@/components/ui/AdsterraBannerAd';

interface StorylineSectionProps {
  title: string;
  overview: string;
  tagline?: string | null;
  genres: { id: number; name: string }[];
  releaseDate?: string;
  status?: string;
  backdropPath?: string | null;
  sceneImages?: string[];
  videoKey?: string | null;
  customVideoUrl?: string | null;
  mediaType?: 'movie' | 'tv';
  mediaId?: string | number;
}

export default function StorylineSection({ 
  title, 
  overview, 
  tagline, 
  genres, 
  releaseDate, 
  status,
  backdropPath,
  sceneImages = [],
  videoKey,
  customVideoUrl,
  mediaType = 'movie',
  mediaId
}: StorylineSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoPlayTrailer, setAutoPlayTrailer] = useState(false);

  useEffect(() => {
    const handleOpenWithTrailer = () => {
      setIsExpanded(true);
      setAutoPlayTrailer(true);
      setTimeout(() => {
        const el = document.getElementById('storyline-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    };

    window.addEventListener('open-storyline-with-trailer', handleOpenWithTrailer);
    return () => {
      window.removeEventListener('open-storyline-with-trailer', handleOpenWithTrailer);
    };
  }, []);

  const genreNames = (genres || []).map((g) => g.name).filter(Boolean).join(', ') || 'Action, Adventure, Fantasy';
  const year = (releaseDate || '2026').substring(0, 4);
  const mainOverview = overview.trim() || `Watch ${title} online for free in HD quality.`;

  // Array of available movie scene images from TMDB API
  const availableImages = (sceneImages && sceneImages.length > 0) 
    ? sceneImages 
    : (backdropPath ? [backdropPath] : []);

  const displayHeroBanner = (sceneImages && sceneImages[0]) || backdropPath || null;

  // Helper to pick image for each section (cycling through available images)
  const getSectionImage = (index: number) => {
    if (!availableImages || availableImages.length === 0) return null;
    return availableImages[index % availableImages.length];
  };

  // Build massive, comprehensive 10x extended storyline paragraphs
  const paragraph1_Premise = mainOverview;

  const paragraph2_WorldSetting = `Set in a meticulously crafted universe filled with intricate lore and ancient traditions, ${title} (${year}) expands upon foundational myths to present a world on the brink of dramatic transformation. As old balance fractures and new powers emerge, the narrative immerses viewers in a sweeping landscape where every region holds unique histories, cultural rivalries, and long-buried secrets waiting to be uncovered.`;

  const paragraph3_CharacterJourneys = `At the core of this epic story lies a deeply emotional character-driven journey. Main protagonists are forced to confront profound personal challenges, grappling with the heavy weight of destiny, identity, and duty. Their evolving dynamics—from tentative allies to fiercely loyal companions—form the emotional backbone of the narrative as they learn to master their distinct skills, overcome past trauma, and trust one another against overwhelming odds.`;

  const paragraph4_RisingConflicts = `As the central quest unfolds, escalating threats push the heroes across vast uncharted territories. Along their path, they encounter formidable adversaries driven by complex motives, as well as unexpected allies who test their moral compass. High-stakes encounters, tactical battles, and clandestine maneuvers keep the tension tight as ancient relics and forgotten powers are brought to light.`;

  const paragraph5_ClimaxStakes = `The narrative climaxes in a thrilling culmination of physical mastery, strategic warfare, and emotional resolution. With peace and survival hanging in the balance, every character's growth is put to the ultimate test in a decisive confrontation that determines the future of their world and solidifies their legacy for generations to come.`;

  const paragraph6_Themes = `Beyond its thrilling plot, ${title} explores resonant universal themes: the resilience of hope in the face of extinction, the burden of responsibility, redemption, and the enduring power of unity. The story skillfully balances lighthearted camaraderie with poignant dramatic gravity, ensuring viewers of all ages find deep emotional resonance throughout.`;

  const paragraph7_CinematicDirection = `Synthesizing ${genreNames} elements, the production boasts breathtaking visual direction, fluid action choreography, and expressive art design. Every sequence is elevated by a rich orchestral score that heightens emotional climaxes and underscores the grand scale of the world.`;

  const paragraph8_LegacySummary = `Whether you are a lifelong fan returning to this beloved universe or a newcomer discovering it for the first time, ${title} stands as a masterclass in modern storytelling—delivering an unforgettable, multi-layered saga of heroics, heart, and timeless adventure.`;

  return (
    <div id="storyline-section" className="bg-[#14142f] border border-white/8 rounded-2xl p-4 sm:p-6 shadow-xl transition-all duration-300 scroll-mt-24 space-y-4">
      {/* ── Combined Sticky Header Box (Adsterra Banner + Storyline Controls Sticky Together) ── */}
      <div className="sticky top-20 z-40 p-2.5 sm:p-3.5 pt-1.5 sm:pt-2 bg-[#101027]/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl space-y-2.5">
        {/* Adsterra 728x90 Banner Ad (Sticky at top of container, no empty top space) */}
        <div className="w-full flex justify-center items-center overflow-hidden">
          <AdsterraBannerAd />
        </div>

        {/* Storyline Controls Sub-Box (Sticky directly under the banner ad) */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none group bg-white/4 hover:bg-white/7 border border-white/10 p-3 rounded-xl transition-all shadow-md"
        >
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all shadow shrink-0 mt-0.5 sm:mt-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base md:text-lg font-black text-white group-hover:text-violet-300 transition-colors">
                  Storyline & Full Plot Breakdown
                </h3>
                <span className="text-[9px] sm:text-[10px] font-black text-violet-300 bg-violet-600/30 border border-violet-500/30 px-2 py-0.5 rounded-full uppercase shrink-0">
                  10x Extended
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
                {isExpanded ? 'Click to minimize storyline' : 'Minimized by default • Click to expand full plot & stills'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <div className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-violet-600/30 to-amber-500/20 border border-amber-400/50 text-amber-300 font-black text-xs sm:text-sm shadow-xl animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400 fill-current shrink-0" />
              <span className="uppercase tracking-wider drop-shadow">Watch Full Movies At The Bottom ↓</span>
            </div>

            <button 
              type="button"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 group-hover:bg-violet-600 border border-white/10 text-zinc-300 group-hover:text-white text-xs font-bold transition-all shadow active:scale-95"
              aria-label={isExpanded ? "Minimize Storyline" : "Expand Full Storyline"}
            >
              <span>{isExpanded ? 'Minimize' : 'Read Full Storyline'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Minimized Preview (Collapsed State) */}
      {!isExpanded && (
        <div 
          onClick={() => setIsExpanded(true)}
          className="mt-3.5 relative cursor-pointer group/preview bg-white/2 hover:bg-white/4 border border-white/6 rounded-xl p-3.5 transition-all"
        >
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2 font-normal">
            {mainOverview}
          </p>
          <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-bold">
            <span className="text-violet-400 group-hover/preview:text-violet-300 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse text-violet-400" />
              <span>Click to expand full storyline with movie images &rarr;</span>
            </span>
            {availableImages.length > 0 && (
              <span className="self-start sm:self-auto shrink-0 text-zinc-300 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/8 flex items-center gap-1.5 text-[10px]">
                <Camera className="w-3 h-3 text-amber-400" />
                <span>{availableImages.length} Movie Images</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Full Expanded 10x Storyline Content */}
      {isExpanded && (
        <div className="relative z-10 mt-5 space-y-6 pt-4 border-t border-white/8 text-xs sm:text-base text-zinc-200 leading-relaxed font-normal animate-in fade-in duration-300">
          
          {/* 🎬 OFFICIAL HD VIDEO PLAYER AT TOP OF STORYLINE 🎬 */}
          {(customVideoUrl || videoKey) && (
            <div className="space-y-2 border-b border-white/10 pb-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Play className="w-4 h-4 text-violet-400 fill-current shrink-0" />
                  <span className="text-xs sm:text-sm font-black text-white truncate">
                    Official HD Video Stream: {title}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded whitespace-nowrap">
                  1080p Full HD
                </span>
              </div>
              
              {customVideoUrl ? (
                <CustomVideoPlayer src={customVideoUrl} poster={displayHeroBanner || undefined} />
              ) : videoKey ? (
                <XFlixTrailerPlayer videoKey={videoKey} title={title} autoPlay={autoPlayTrailer} />
              ) : null}
            </div>
          )}

          {/* Section I */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              I. Premise & Official Overview
            </h4>
            <p className="text-zinc-200 leading-relaxed">{paragraph1_Premise}</p>
            {getSectionImage(0) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(0)!}
                  alt={`${title} Premise`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    🎬 Premise & Inciting Moment
                  </span>
                  <span className="text-[10px] text-zinc-300 font-bold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    HD Quality
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section II */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              II. World-Building & Lore
            </h4>
            <p className="text-zinc-300 leading-relaxed">{paragraph2_WorldSetting}</p>
            {getSectionImage(1) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(1)!}
                  alt={`${title} World Lore`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-violet-300 border border-violet-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Film className="w-3.5 h-3.5 text-violet-400" />
                    ✨ World & Cinematic Environment
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section III */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-violet-400" />
              III. Character Journeys & Squad Dynamics
            </h4>
            <p className="text-zinc-300 leading-relaxed">{paragraph3_CharacterJourneys}</p>
            {getSectionImage(2) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(2)!}
                  alt={`${title} Character Journey`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    👥 Character & Dynamics
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section IV */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-violet-400" />
              IV. Rising Action & High-Stakes Escalation
            </h4>
            <p className="text-zinc-300 leading-relaxed">{paragraph4_RisingConflicts}</p>
            {getSectionImage(3) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(3)!}
                  alt={`${title} Key Action`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    🔥 Key Action Sequence
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section V */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-violet-400" />
              V. Climax & Resolution
            </h4>
            <p className="text-zinc-300 leading-relaxed">{paragraph5_ClimaxStakes}</p>
            {getSectionImage(4) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(4)!}
                  alt={`${title} Climax`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-rose-300 border border-rose-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    ⚡ Climax Encounter
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section VI */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              VI. Thematic Depth & Emotional Resonance
            </h4>
            <p className="text-zinc-300 leading-relaxed">{paragraph6_Themes}</p>
            {getSectionImage(5) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(5)!}
                  alt={`${title} Emotional Atmosphere`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-violet-300 border border-violet-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    🌟 Emotional Atmosphere
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section VII */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              VII. Visual Direction & Musical Score
            </h4>
            <p className="text-zinc-300 leading-relaxed">{paragraph7_CinematicDirection}</p>
            {getSectionImage(6) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(6)!}
                  alt={`${title} Visual Direction`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                    🎨 Visual Direction
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section VIII */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <h4 className="text-xs font-black text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-violet-400" />
              VIII. Final Verdict & Legacy
            </h4>
            <p className="text-zinc-300 leading-relaxed">{paragraph8_LegacySummary}</p>
            {getSectionImage(7) && (
              <div className="mt-3.5 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-violet-950 group">
                <Image
                  src={getSectionImage(7)!}
                  alt={`${title} Final Legacy`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d21] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shadow">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    🏆 Final Legacy
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 🔥 GO WATCH FULL MOVIE CALL-TO-ACTION BUTTON AT THE BOTTOM 🔥 */}
          <div id="player-section" className="pt-6 border-t border-white/10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ready for the Full Experience?</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <a
              href={mediaId ? `https://movies.xflix.ink/watch/${mediaType}/${mediaId}` : `https://movies.xflix.ink/watch/movie/969681`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-amber-400 text-white font-black text-sm sm:text-base shadow-2xl shadow-violet-600/50 border border-white/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-white fill-current translate-x-0.5" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="leading-tight drop-shadow-md">🍿 GO WATCH FULL MOVIE NOW</span>
                <span className="text-[10px] font-bold text-amber-200/90 tracking-wide">1080p Ultra HD • Instant Server • No Ads</span>
              </div>
            </a>
          </div>

          {/* Bottom Close Button */}
          <div className="pt-4 flex justify-center border-t border-white/8">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-5 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600 border border-violet-500/40 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shadow"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Minimize Storyline Box</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
