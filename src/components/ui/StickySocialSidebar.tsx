"use client";

import { Facebook, Twitter, Linkedin, MessageCircle, MessageSquare, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StickySocialSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down slightly to prevent overlapping with top nav
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center transition-transform duration-500 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="bg-zinc-800 text-white text-xs font-bold py-1 px-2 w-full text-center border-b border-white/10 rounded-tl-md">
        1.2k<br/><span className="text-[10px] font-normal">SHARES</span>
      </div>
      
      <button className="w-10 h-10 bg-[#1877f2] hover:bg-[#1877f2]/90 flex items-center justify-center text-white transition-colors">
        <Facebook className="w-4 h-4" />
      </button>

      <button className="w-10 h-10 bg-black hover:bg-black/80 flex items-center justify-center text-white transition-colors">
        <Twitter className="w-4 h-4 fill-current" />
      </button>

      <button className="w-10 h-10 bg-[#0077b5] hover:bg-[#0077b5]/90 flex items-center justify-center text-white transition-colors">
        <Linkedin className="w-4 h-4 fill-current" />
      </button>
      
      <button className="w-10 h-10 bg-[#ff4500] hover:bg-[#ff4500]/90 flex items-center justify-center text-white transition-colors">
        <MessageSquare className="w-4 h-4" />
      </button>

      <button className="w-10 h-10 bg-[#25d366] hover:bg-[#25d366]/90 flex items-center justify-center text-white transition-colors">
        <MessageCircle className="w-4 h-4" />
      </button>

      <button className="w-10 h-10 bg-[#bd081c] hover:bg-[#bd081c]/90 flex items-center justify-center text-white transition-colors rounded-bl-md">
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}
