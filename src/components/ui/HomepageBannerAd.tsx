"use client";

import { useEffect, useRef } from "react";

interface HomepageBannerAdProps {
  zoneId?: string;
}

export default function HomepageBannerAd({ zoneId = "5995032" }: HomepageBannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Client-side execution check
    if (typeof window === "undefined" || !containerRef.current) return;

    // Prevent duplicate insertion during rerenders or navigation
    if (isLoadedRef.current) return;
    isLoadedRef.current = true;

    containerRef.current.innerHTML = "";

    // Load async ad script safely on client side
    if (!document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.type = "application/javascript";
      script.src = "https://a.magsrv.com/ad-provider.js";
      document.head.appendChild(script);
    }

    // Create ExoClick ins element
    const ins = document.createElement("ins");
    ins.className = "eas6a97888e2";
    ins.setAttribute("data-zoneid", zoneId);

    // Create push script to serve ad
    const pushScript = document.createElement("script");
    pushScript.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';

    containerRef.current.appendChild(ins);
    containerRef.current.appendChild(pushScript);
  }, [zoneId]);

  return (
    <div className="w-full flex justify-center items-center mt-[20px] mb-[28px] min-h-[90px] overflow-hidden bg-transparent border-none p-0">
      <div
        ref={containerRef}
        className="w-full max-w-full flex justify-center items-center overflow-hidden min-h-[90px] bg-transparent"
      />
    </div>
  );
}
