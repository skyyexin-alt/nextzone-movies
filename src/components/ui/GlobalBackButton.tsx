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
      className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all active:scale-90 group mr-2"
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
    </button>
  );
}
