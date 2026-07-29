"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function GlobalBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5 w-fit"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      Back
    </button>
  );
}
