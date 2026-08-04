"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdskeeperNotification() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const w = window as any;
        const q = "_mgq";
        w[q] = w[q] || [];
        w[q].push(["_mgc.load"]);
      } catch (e) {
        console.error("Adskeeper load error:", e);
      }
    }
  }, [pathname]);

  return (
    <div className="adskeeper-notification-container">
      <div data-type="_mgwidget" data-widget-id="2063785"></div>
    </div>
  );
}
