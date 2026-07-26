"use client";

import { useEffect, useRef, useState } from 'react';

const AD_KEY = 'd092035ae89a38067d47dfdef5cf6b61';
const AD_WIDTH = 728;
const AD_HEIGHT = 90;

export default function AdBanner() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const loaded = useRef(false);

  // Responsive scale — shrinks the 728×90 to fit any screen
  useEffect(() => {
    const calcScale = () => {
      const available = window.innerWidth - 32;
      setScale(available < AD_WIDTH ? available / AD_WIDTH : 1);
    };
    calcScale();
    window.addEventListener('resize', calcScale, { passive: true });
    return () => window.removeEventListener('resize', calcScale);
  }, []);

  // Load ad inside an iframe so document.write() works safely in React
  useEffect(() => {
    if (loaded.current || !iframeRef.current) return;
    loaded.current = true;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`<!DOCTYPE html>
<html>
  <head>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { overflow: hidden; background: transparent; }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key'    : '${AD_KEY}',
        'format' : 'iframe',
        'height' : ${AD_HEIGHT},
        'width'  : ${AD_WIDTH},
        'params' : {}
      };
    <\/script>
    <script type="text/javascript"
      src="https://www.highperformanceformat.com/${AD_KEY}/invoke.js">
    <\/script>
  </body>
</html>`);
    doc.close();
  }, []);

  const containerHeight = Math.round(AD_HEIGHT * scale);

  return (
    <div
      aria-label="Advertisement"
      className="w-full flex justify-center items-start my-4 overflow-hidden"
      style={{ height: containerHeight }}
    >
      {/* Inner div is always the real ad dimensions, scaled down via CSS */}
      <div
        style={{
          width: AD_WIDTH,
          height: AD_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          flexShrink: 0,
        }}
      >
        <iframe
          ref={iframeRef}
          title="Advertisement"
          width={AD_WIDTH}
          height={AD_HEIGHT}
          frameBorder={0}
          scrolling="no"
          style={{ display: 'block', border: 'none', background: 'transparent' }}
        />
      </div>
    </div>
  );
}
