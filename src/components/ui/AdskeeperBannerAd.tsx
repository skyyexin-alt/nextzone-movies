"use client";

import { useEffect, useRef } from "react";

interface AdskeeperBannerAdProps {
  siteId?: string;
  widgetId?: string;
}

export default function AdskeeperBannerAd({ siteId = "1106781", widgetId = "2064406" }: AdskeeperBannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Load widget script specifically if needed
    const scriptSrc = `https://jsc.adskeeper.com/site/${widgetId}.js`;
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.head.appendChild(script);
    }

    const triggerLoad = () => {
      try {
        // @ts-ignore
        (window._mgq = window._mgq || []).push(["_mgc.load"]);
      } catch (e) {
        // ignore
      }
    };

    triggerLoad();
    const timer = setTimeout(triggerLoad, 800);
    return () => clearTimeout(timer);
  }, [siteId, widgetId]);

  const targetId = `M${siteId}ScriptRootC${widgetId}`;

  return (
    <div className="w-full flex justify-center items-center my-4 overflow-hidden min-h-[90px] bg-transparent">
      <div
        ref={containerRef}
        id={targetId}
        data-type="_mgwidget"
        data-widget-id={widgetId}
        className="w-full max-w-full flex justify-center items-center min-h-[90px]"
      />
    </div>
  );
}


