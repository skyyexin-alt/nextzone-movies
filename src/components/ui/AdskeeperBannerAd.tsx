"use client";

import { useEffect, useRef } from "react";

interface AdskeeperBannerAdProps {
  widgetId?: string;
}

export default function AdskeeperBannerAd({ widgetId = "2064406" }: AdskeeperBannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.setAttribute("data-type", "_mgwidget");
    widgetDiv.setAttribute("data-widget-id", widgetId);

    const pushScript = document.createElement("script");
    pushScript.text = '(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");';

    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(pushScript);
  }, [widgetId]);

  return (
    <div className="w-full flex justify-center items-center my-4 overflow-hidden min-h-[90px] bg-transparent">
      <div ref={containerRef} className="w-full max-w-full flex justify-center items-center min-h-[90px]" />
    </div>
  );
}
