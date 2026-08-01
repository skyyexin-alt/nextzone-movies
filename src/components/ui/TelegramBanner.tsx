import { MessageCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function TelegramBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl my-6 p-4 sm:p-5 border border-[#1e88e5]/25 bg-gradient-to-br from-[#1a2f50]/60 via-[#1565c0]/15 to-[#0d47a1]/30">
      {/* Background glow elements */}
      <div className="absolute top-0 right-0 w-48 sm:w-64 h-full bg-gradient-to-l from-[#1e88e5]/15 to-transparent pointer-events-none" />
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1e88e5]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1e88e5] to-[#0d47a1] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base leading-tight">Join XFlix Telegram</h3>
            <p className="text-blue-300/80 text-xs sm:text-sm mt-0.5 leading-snug max-w-xs">
              Get notified if the site moves. First to know about updates & new links.
            </p>
          </div>
        </div>
        
        <Link 
          href="https://t.me/XFlixhd" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e88e5] hover:bg-[#1565c0] active:scale-95 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/25 whitespace-nowrap"
        >
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          Join Group
        </Link>
      </div>
    </div>
  );
}
