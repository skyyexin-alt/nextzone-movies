"use client";

import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    
    // Check if script is already injected to avoid duplicates on re-renders
    if (bannerRef.current.querySelector('script')) {
      return;
    }

    // Set the global atOptions configuration
    const conf = document.createElement('script');
    conf.type = 'text/javascript';
    conf.innerHTML = `
      atOptions = {
        'key' : 'd092035ae89a38067d47dfdef5cf6b61',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    bannerRef.current.appendChild(conf);

    // Load the invoke script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.highperformanceformat.com/d092035ae89a38067d47dfdef5cf6b61/invoke.js';
    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center items-center my-6 min-h-[90px] overflow-hidden">
      <div ref={bannerRef} className="flex justify-center items-center text-center w-[728px] max-w-full">
        {/* The ad will be injected here by the invoke.js script */}
      </div>
    </div>
  );
}
