"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerAdProps {
  adKey?: string;
  scriptHost?: string;
}

export default function AdsterraBannerAd({
  adKey = "d092035ae89a38067d47dfdef5cf6b61",
  scriptHost = "yearlybeak.com",
}: AdsterraBannerAdProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.width = "728";
    iframe.height = "90";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.background = "transparent";
    iframe.scrolling = "no";

    containerRef.current.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key': '${adKey}',
                'format': 'iframe',
                'height': 90,
                'width': 728,
                'params': {}
              };
              var s = document.createElement("script");
              s.type = "text/javascript";
              s.src = "https://${scriptHost}/${adKey}/invoke.js";
              s.onerror = function() {
                var ps = document.createElement("script");
                ps.type = "text/javascript";
                ps.src = "/api/ad-proxy?url=" + encodeURIComponent("https://${scriptHost}/${adKey}/invoke.js");
                document.body.appendChild(ps);
              };
              document.body.appendChild(s);
            </script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [adKey, scriptHost]);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current || !containerRef.current) return;
      const availableWidth = wrapperRef.current.clientWidth;
      const adWidth = 728;
      const adHeight = 90;

      if (availableWidth > 0 && availableWidth < adWidth) {
        const scale = availableWidth / adWidth;
        containerRef.current.style.transform = `scale(${scale})`;
        containerRef.current.style.transformOrigin = "center center";
        wrapperRef.current.style.height = `${adHeight * scale}px`;
      } else {
        containerRef.current.style.transform = "none";
        wrapperRef.current.style.height = "90px";
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full flex justify-center items-center mt-1 mb-2 min-h-[90px] overflow-hidden bg-transparent border-none p-0 relative transition-[height] duration-200"
    >
      <div
        ref={containerRef}
        className="w-[728px] h-[90px] shrink-0 flex justify-center items-center overflow-hidden bg-transparent mx-auto"
      />
    </div>
  );
}


