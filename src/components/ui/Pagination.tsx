"use client";

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // TMDB API limits pagination to 500 pages maximum
  const maxPages = Math.min(totalPages, 500);

  const createQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return params.toString();
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= maxPages) {
      router.push(`${pathname}?${createQueryString(page)}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (maxPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 my-10">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Prev
      </button>

      <span className="text-zinc-400 text-sm font-medium">
        Page {currentPage} of {maxPages}
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= maxPages}
        className="flex items-center gap-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
