"use client";

import { useEffect, useRef } from "react";

interface ExoClickAdProps {
  zoneId?: string;
}

export default function ExoClickAd({ zoneId = "5995032" }: ExoClickAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset container
    containerRef.current.innerHTML = "";

    // 1. Script tag: ad-provider.js
    const script = document.createElement("script");
    script.async = true;
    script.type = "application/javascript";
    script.src = "https://a.magsrv.com/ad-provider.js";

    // 2. Ins tag: eas6a97888e2
    const ins = document.createElement("ins");
    ins.className = "eas6a97888e2";
    ins.setAttribute("data-zoneid", zoneId);

    // 3. Script tag: serve push call
    const pushScript = document.createElement("script");
    pushScript.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';

    // Append all 3 elements directly to container
    containerRef.current.appendChild(script);
    containerRef.current.appendChild(ins);
    containerRef.current.appendChild(pushScript);
  }, [zoneId]);

  return (
    <div className="w-full flex justify-center items-center my-6 min-h-[90px] overflow-hidden bg-white/[0.02] border border-white/10 rounded-2xl p-2 backdrop-blur-md">
      <div ref={containerRef} className="max-w-full flex justify-center items-center overflow-hidden min-h-[90px]" />
    </div>
  );
}
