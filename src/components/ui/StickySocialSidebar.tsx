"use client";

import { MessageCircle, MessageSquare, Share2 } from 'lucide-react';
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
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      </button>

      <button className="w-10 h-10 bg-black hover:bg-black/80 flex items-center justify-center text-white transition-colors">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path></svg>
      </button>

      <button className="w-10 h-10 bg-[#0077b5] hover:bg-[#0077b5]/90 flex items-center justify-center text-white transition-colors">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
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
