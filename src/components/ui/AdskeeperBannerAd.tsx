"use client";

import { useEffect, useRef } from "react";
import { loadScriptWithAntiAdblock } from "@/lib/antiAdblock";

interface AdskeeperBannerAdProps {
  siteId?: string;
  widgetId?: string;
}

export default function AdskeeperBannerAd({ siteId = "1106781", widgetId = "2064406" }: AdskeeperBannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const scriptSrc = `https://jsc.adskeeper.com/site/${siteId}.js`;

    const triggerLoad = () => {
      try {
        // @ts-ignore
        (window._mgq = window._mgq || []).push(["_mgc.load"]);
      } catch (e) {
        // ignore
      }
    };

    loadScriptWithAntiAdblock(scriptSrc)
      .then(() => {
        triggerLoad();
      })
      .catch(() => {
        triggerLoad();
      });

    const timer = setTimeout(triggerLoad, 800);
    return () => clearTimeout(timer);
  }, [siteId, widgetId]);

  return (
    <div className="w-full flex justify-center items-center my-4 overflow-hidden min-h-[90px] bg-transparent">
      <div
        ref={containerRef}
        data-type="_mgwidget"
        data-widget-id={widgetId}
        className="w-full max-w-full flex justify-center items-center min-h-[90px]"
      />
    </div>
  );
}


