import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function TelegramBanner() {
  return (
    <div className="bg-[#1e88e5]/10 border border-[#1e88e5]/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 my-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#1e88e5]/20 to-transparent pointer-events-none"></div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-[#1e88e5] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(30,136,229,0.5)]">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Join NextZone Telegram Group</h3>
          <p className="text-[#1e88e5] text-sm opacity-90 font-medium">
            If the site ever closes, this is where we'll post the new link. Be the first to know about news and updates.
          </p>
        </div>
      </div>
      
      <Link 
        href="https://t.me/+bsT00OZEZWpjZDA9" 
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 whitespace-nowrap bg-[#1e88e5] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1565c0] transition-colors shadow-lg"
      >
        Join Group
      </Link>
    </div>
  );
}
