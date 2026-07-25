import { Facebook, Twitter, MessageCircle, MessageSquare, Share2, Link2 } from 'lucide-react';

export default function ShareButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-10 w-full">
      <div className="text-zinc-400 font-bold text-sm mr-2 flex flex-col items-center border-r border-white/10 pr-4">
        <span className="text-white text-lg">1.2k</span>
        <span className="text-[10px] uppercase tracking-wider">Shares</span>
      </div>
      
      <button className="flex-1 min-w-[120px] bg-[#1877f2] hover:bg-[#1877f2]/90 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <Facebook className="w-4 h-4" />
        <span className="text-sm font-semibold">621</span>
      </button>

      <button className="flex-1 min-w-[120px] bg-black hover:bg-black/80 text-white py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
        <Twitter className="w-4 h-4 fill-current" />
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
