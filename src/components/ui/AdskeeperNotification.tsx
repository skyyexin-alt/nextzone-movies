"use client";

import { useEffect, useRef } from "react";

export default function AdskeeperNotification() {
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
    <div className="adskeeper-notification-wrapper">
      <div ref={widgetRef} data-type="_mgwidget" data-widget-id="2063785"></div>
    </div>
  );
}
