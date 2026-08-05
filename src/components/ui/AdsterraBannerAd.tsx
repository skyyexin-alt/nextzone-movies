"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerAdProps {
  adKey?: string;
}

export default function AdsterraBannerAd({ adKey = "282e852f5808b9dd01d12c1ed30bf5d2" }: AdsterraBannerAdProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
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
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
      </body>
    </html>
  `;

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
      className="w-full flex justify-center items-center my-4 min-h-[90px] overflow-hidden bg-transparent border-none p-0 relative transition-[height] duration-200"
    >
      <div
        ref={containerRef}
        className="w-[728px] h-[90px] shrink-0 flex justify-center items-center overflow-hidden bg-transparent mx-auto"
      >
        <iframe
          srcDoc={iframeContent}
          title="Advertisement"
          width={728}
          height={90}
          style={{ border: "none", overflow: "hidden", background: "transparent" }}
          scrolling="no"
        />
      </div>
    </div>
  );
}

