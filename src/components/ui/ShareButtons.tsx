import { MessageCircle, MessageSquare, Share2, Link2 } from 'lucide-react';

export default function ShareButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-10 w-full">
      <div className="text-zinc-400 font-bold text-sm mr-2 flex flex-col items-center border-r border-white/10 pr-4">
        <span className="text-white text-lg">1.2k</span>
        <span className="text-[10px] uppercase tracking-wider">Shares</span>
      </div>
      
      <button className="flex-1 min-w-[120px] bg-[#1877f2] hover:bg-[#1877f2]/90 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        <span className="text-sm font-semibold">621</span>
      </button>

      <button className="flex-1 min-w-[120px] bg-black hover:bg-black/80 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"></path></svg>
        <span className="text-sm font-semibold">17</span>
      </button>

      <button className="flex-1 min-w-[120px] bg-[#ff4500] hover:bg-[#ff4500]/90 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm font-semibold">34</span>
      </button>

      <button className="flex-1 min-w-[120px] bg-[#25d366] hover:bg-[#25d366]/90 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-semibold">11</span>
      </button>

      <button className="flex-1 min-w-[120px] bg-[#0088cc] hover:bg-[#0088cc]/90 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-semibold">22</span>
      </button>

      <button className="flex-1 min-w-[120px] bg-[#1da1f2] hover:bg-[#1da1f2]/90 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <Link2 className="w-4 h-4" />
        <span className="text-sm font-semibold">Copy</span>
      </button>
    </div>
  );
}
