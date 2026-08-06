"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface XFlixTrailerPlayerProps {
  videoKey: string;
  title: string;
  autoPlay?: boolean;
}

export default function XFlixTrailerPlayer({ videoKey, title, autoPlay = false }: XFlixTrailerPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Send command to YouTube iframe via postMessage (YouTube Iframe API)
  const sendCommand = (func: string, args: any = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand('unMute');
      setIsMuted(false);
    } else {
      sendCommand('mute');
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video rounded-2xl overflow-hidden border border-violet-500/40 shadow-2xl bg-black group select-none"
    >
      {/* 🎬 Chromeless YouTube Stream (Zero YouTube Controls, Zero Logos, Zero Popup Thumbnails!) */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoKey}?enablejsapi=1&autoplay=${autoPlay ? '1' : '0'}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1&fs=0`}
        title={`XFlix Video Stream: ${title}`}
        className="w-full h-full border-0 pointer-events-none scale-[1.02]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />

      {/* Click Shield to Play/Pause */}
      <div 
        onClick={togglePlay}
        className="absolute inset-0 cursor-pointer z-10"
      />

      {/* Big Center XFlix Play/Pause Button Overlay */}
      {(!isPlaying || showControls) && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto cursor-pointer bg-black/20 backdrop-blur-[2px] transition-all duration-300"
        >
          <button 
            type="button"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-violet-600/90 hover:bg-violet-500 text-white border border-white/20 shadow-2xl shadow-violet-600/60 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current text-white" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current text-white translate-x-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <div className={`absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-black text-white drop-shadow truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-black text-amber-400 bg-black/80 border border-amber-500/30 px-2.5 py-1 rounded-lg uppercase tracking-wider backdrop-blur-md whitespace-nowrap">
            XFlix Movies Player Frame
          </span>
        </div>
      </div>

      {/* Bottom Custom XFlix Control Bar */}
      <div className={`absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between gap-3 transition-opacity duration-300 pointer-events-auto ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-xl bg-white/10 hover:bg-violet-600 text-white border border-white/10 transition-all active:scale-95 cursor-pointer"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        {/* Volume Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-xl bg-white/10 hover:bg-violet-600 text-white border border-white/10 transition-all active:scale-95 cursor-pointer"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Center XFlix Progress Bar Graphic */}
        <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
          <div 
            className={`h-full bg-gradient-to-r from-violet-600 via-violet-400 to-amber-400 rounded-full transition-all duration-300 ${isPlaying ? 'w-full animate-pulse' : 'w-1/4'}`}
          />
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-white/10 hover:bg-violet-600 text-white border border-white/10 transition-all active:scale-95 cursor-pointer"
          aria-label="Fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
