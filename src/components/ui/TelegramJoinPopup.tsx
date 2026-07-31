"use client";
import { useState, useEffect } from "react";
import { X, MessageCircle, ExternalLink } from "lucide-react";

export default function TelegramJoinPopup() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isDismissed) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:right-auto lg:left-6 z-40 animate-in slide-in-from-bottom-5 fade-in duration-500 flex justify-center lg:block pointer-events-none">
      <div className="relative overflow-hidden rounded-2xl p-4 w-full max-w-[320px] border border-[#2AABEE]/30 bg-[#0f0f23]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(42,171,238,0.2)] pointer-events-auto">
        {/* Background glow elements */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#2AABEE]/20 to-transparent pointer-events-none" />
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#229ED9]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-20"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#1E88E5] to-[#1565C0] flex items-center justify-center shrink-0 shadow-lg border border-white/10 relative">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="pr-6">
              <h3 className="font-bold text-white text-[15px] leading-tight">Join XFlix Telegram</h3>
              <p className="text-zinc-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                Get notified if the site moves. First to know about updates & new links.
              </p>
            </div>
          </div>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-1 py-2.5 bg-[#1E88E5] hover:bg-[#1976D2] active:scale-[0.98] transition-all text-white font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(30,136,229,0.3)] flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Join Group
          </a>
        </div>
      </div>
    </div>
  );
}
