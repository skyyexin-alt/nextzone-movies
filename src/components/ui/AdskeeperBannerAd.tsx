"use client";

import { useEffect } from "react";

interface AdskeeperBannerAdProps {
  widgetId?: string;
}

export default function AdskeeperBannerAd({ widgetId = "2064406" }: AdskeeperBannerAdProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      // @ts-ignore
      (window._mgq = window._mgq || []).push(["_mgc.load"]);
    } catch (e) {
      // ignore
    }
  }, [widgetId]);

  return (
    <div className="w-full flex justify-center items-center my-4 overflow-hidden min-h-[90px] bg-transparent">
      <div
        data-type="_mgwidget"
        data-widget-id={widgetId}
        className="w-full max-w-full flex justify-center items-center min-h-[90px]"
      />
    </div>
  );
}
