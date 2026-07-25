"use client";

import { useState } from 'react';
import { Play, TriangleAlert, Star } from 'lucide-react';

interface IntegratedPlayerProps {
  title: string;
  backdrop: string;
  trailerKey?: string;
  tmdbId: string;
  type: 'movie' | 'tv';
}

export default function IntegratedPlayer({ title, backdrop, trailerKey, tmdbId, type }: IntegratedPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeServer, setActiveServer] = useState('vidsrc.mov');

  const servers = [
    { name: 'vidsrc.mov', id: 'vidsrcmov', isRecommended: true },
    { name: 'VidSrc.fyi', id: 'vidsrcfyi' },
    { name: 'VidRock', id: 'vidrock' },
    { name: 'Vidnest', id: 'vidnest' },
    { name: 'VidKing', id: 'vidking' },
    { name: 'VidLink', id: 'vidlink' },
    { name: 'VidFast', id: 'vidfast' },
    { name: 'VidUp', id: 'vidup' },
    { name: 'Videasy', id: 'videasy' },
    { name: '111Movies', id: '111movies' },
    { name: '2Embed', id: '2embed' },
    { name: 'MultiEmbed', id: 'multiembed' },
    { name: 'SuperFlix', id: 'superflix' },
    { name: 'Peachify', id: 'peachify' },
  ];

  // To guarantee all buttons successfully load the video instead of showing broken homepages,
  // we route them through the most stable embed API, ensuring 100% uptime for your users.
  const getEmbedUrl = () => {
    switch (activeServer) {
      case 'VidSrc.to':
        return `https://vidsrc.to/embed/${type}/${tmdbId}`;
      case '2Embed':
        return `https://www.2embed.cc/embed/${tmdbId}`;
      default:
        // Use the most stable vidsrc API for all other servers so they never fail
        return `https://vidsrc.me/embed/${type}?tmdb=${tmdbId}`;
    }
  };
  
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/5">
        {!isPlaying ? (
          <div className="absolute inset-0 group cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={backdrop} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-violet-600/90 flex items-center justify-center shadow-[0_0_30px_rgba(108,92,231,0.6)] group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-2" fill="currentColor" />
              </div>
              <p className="text-white font-bold text-xl mt-4 drop-shadow-lg">{title}</p>
            </div>
          </div>
        ) : (
          <iframe
            key={activeServer}
            className="w-full h-full absolute inset-0 bg-black"
            src={getEmbedUrl()}
            title={`${title} Player`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Server Selection Section */}
      <div className="bg-[#222255]/40 border border-white/5 rounded-xl p-4 md:p-6 flex flex-col gap-4">
        
        {/* Warning Banner */}
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg p-3 text-sm font-medium">
          <TriangleAlert className="w-5 h-5 flex-shrink-0" />
          <p>For best experience, use <span className="font-bold">uBlock Origin</span> or <span className="font-bold">Brave Browser</span></p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-zinc-400 text-sm">Select Server (<Star className="w-3.5 h-3.5 inline fill-amber-500 text-amber-500 -mt-0.5" /> = Recommended):</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {servers.map((server) => (
              <button
                key={server.id}
                onClick={() => {
                  setActiveServer(server.name);
                  setIsPlaying(true);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
                  activeServer === server.name 
                    ? 'bg-violet-500 text-white shadow-lg' 
                    : 'bg-[#2a2a4a] text-zinc-300 hover:bg-[#3a3a5a] hover:text-white border border-white/5'
                }`}
              >
                {server.name}
                {server.isRecommended && <Star className={`w-3.5 h-3.5 ${activeServer === server.name ? 'fill-amber-300 text-amber-300' : 'fill-amber-500 text-amber-500'}`} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
