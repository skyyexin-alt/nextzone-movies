"use client";

import { useEffect, useRef, useState } from 'react';

const AD_KEY = 'd092035ae89a38067d47dfdef5cf6b61';
const AD_WIDTH = 728;
const AD_HEIGHT = 90;

export default function AdBanner() {
  const [scale, setScale] = useState(1);

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
          title="Advertisement"
          src="/adbanner.html"
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
