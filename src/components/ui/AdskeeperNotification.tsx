"use client";

import { useEffect } from "react";

export default function AdskeeperNotification() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window as any;
      const q = "_mgq";
      w[q] = w[q] || [];
      w[q].push(["_mgc.load"]);
    }
  }, []);

  return (
    <div className="adskeeper-notification-wrapper">
      {/* Adskeeper In-site Notification Widget */}
      <div data-type="_mgwidget" data-widget-id="2063785"></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`,
        }}
      />
    </div>
  );
}
