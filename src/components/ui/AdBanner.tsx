"use client";

import { useEffect, useRef, useState } from 'react';

const AD_KEY = 'd092035ae89a38067d47dfdef5cf6b61';
const AD_WIDTH = 728;
const AD_HEIGHT = 90;

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const injected = useRef(false);

  // Responsive scale: shrink the 728×90 to fit any screen width
  useEffect(() => {
    const calcScale = () => {
      const available = window.innerWidth - 32; // 16px padding each side
      setScale(available < AD_WIDTH ? available / AD_WIDTH : 1);
    };
    calcScale();
    window.addEventListener('resize', calcScale, { passive: true });
    return () => window.removeEventListener('resize', calcScale);
  }, []);

  // Inject ad scripts once, reliably
  useEffect(() => {
    if (injected.current || !bannerRef.current) return;
    injected.current = true;

    // Config script
    const conf = document.createElement('script');
    conf.type = 'text/javascript';
    conf.text = `
      atOptions = {
        'key'    : '${AD_KEY}',
        'format' : 'iframe',
        'height' : ${AD_HEIGHT},
        'width'  : ${AD_WIDTH},
        'params' : {}
      };
    `;
    bannerRef.current.appendChild(conf);

    // Invoke script
    const invoke = document.createElement('script');
    invoke.type = 'text/javascript';
    invoke.src = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;
    invoke.async = true;
    bannerRef.current.appendChild(invoke);
  }, []);

  // Keep the outer container height in sync with the scaled ad height
  const containerHeight = Math.round(AD_HEIGHT * scale);

  return (
    <div
      aria-label="Advertisement"
      className="w-full flex justify-center items-start my-4 overflow-hidden"
      style={{ height: containerHeight }}
    >
      {/* Inner wrapper is always the real ad size, then we scale it down */}
      <div
        style={{
          width: AD_WIDTH,
          height: AD_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          flexShrink: 0,
        }}
      >
        <div ref={bannerRef} />
      </div>
    </div>
  );
}
