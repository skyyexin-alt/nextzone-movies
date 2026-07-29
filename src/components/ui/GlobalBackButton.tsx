"use client";

import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function GlobalBackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show on the homepage
  if (!mounted || pathname === '/') return null;

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-20 left-4 md:top-24 md:left-6 lg:left-8 z-[45] flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-black/40 hover:bg-white/15 backdrop-blur-xl border border-white/10 text-zinc-300 hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all active:scale-90 group"
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft className="w-5 h-5 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
    </button>
  );
}
