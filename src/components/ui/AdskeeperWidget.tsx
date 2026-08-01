"use client";

import Script from "next/script";

export default function AdskeeperWidget() {
  return (
    <div className="w-full max-w-7xl mx-auto my-8 px-4 flex justify-center overflow-hidden min-h-[100px]">
      <div className="text-xs text-white/30 text-center w-full mb-2">Advertisement</div>
      {/* The Ad Container */}
      <div data-type="_mgwidget" data-widget-id="1989143"></div>
      
      {/* The Ad Initialization Script */}
      <Script id="adskeeper-init" strategy="afterInteractive">
        {`(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");`}
      </Script>
    </div>
  );
}
