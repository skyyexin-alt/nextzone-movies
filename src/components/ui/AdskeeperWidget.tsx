"use client";

import { useEffect, useRef } from "react";

export default function AdskeeperWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if the window object exists (client-side)
    if (typeof window !== "undefined") {
      // Trigger the Adskeeper load function
      const w = window as any;
      const q = "_mgq";
      w[q] = w[q] || [];
      w[q].push(["_mgc.load"]);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto my-8 px-4 flex flex-col items-center overflow-hidden min-h-[100px]">
      <div className="text-xs text-white/30 text-center w-full mb-2">Advertisement</div>
      {/* The Ad Container */}
      <div ref={widgetRef} data-type="_mgwidget" data-widget-id="2064406"></div>
    </div>
  );
}
