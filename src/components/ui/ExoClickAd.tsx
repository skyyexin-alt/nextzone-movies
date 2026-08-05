"use client";

import { useEffect, useRef } from "react";

interface ExoClickAdProps {
  zoneId?: string;
}

export default function ExoClickAd({ zoneId = "5995032" }: ExoClickAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous elements inside container
    containerRef.current.innerHTML = "";

    // 1. Add ad-provider.js to head if not already loaded
    if (!document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.type = "application/javascript";
      script.src = "https://a.magsrv.com/ad-provider.js";
      document.head.appendChild(script);
    }

    // 2. Create the ins tag for ExoClick
    const ins = document.createElement("ins");
    ins.className = "eas6a97888e2";
    ins.setAttribute("data-zoneid", zoneId);
    containerRef.current.appendChild(ins);

    // 3. Create the push script to serve the ad
    const pushScript = document.createElement("script");
    pushScript.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    containerRef.current.appendChild(pushScript);
  }, [zoneId]);

  return (
    <div className="w-full flex justify-center items-center my-4 min-h-[90px] overflow-hidden bg-white/[0.02] border border-white/10 rounded-2xl p-2 backdrop-blur-md">
      <div ref={containerRef} className="max-w-full flex justify-center items-center overflow-hidden min-h-[90px]" />
    </div>
  );
}
