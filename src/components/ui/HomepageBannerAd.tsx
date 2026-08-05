"use client";

import { useEffect, useRef } from "react";

interface HomepageBannerAdProps {
  zoneId?: string;
}

export default function HomepageBannerAd({ zoneId = "5995032" }: HomepageBannerAdProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Client-side execution check
    if (typeof window === "undefined" || !containerRef.current) return;

    const renderAd = () => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";

      const ins = document.createElement("ins");
      ins.className = "eas6a97888e2";
      ins.setAttribute("data-zoneid", zoneId);
      ins.style.display = "inline-block";

      const pushScript = document.createElement("script");
      pushScript.text = '(AdProvider = window.AdProvider || []).push({"serve": {}});';

      containerRef.current.appendChild(ins);
      containerRef.current.appendChild(pushScript);
    };

    let script = document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]') as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.type = "application/javascript";
      script.src = "https://a.magsrv.com/ad-provider.js";
      script.onload = () => renderAd();
      document.head.appendChild(script);
    } else {
      renderAd();
    }
  }, [zoneId]);

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
        className="w-[728px] shrink-0 flex justify-center items-center overflow-hidden min-h-[90px] bg-transparent mx-auto"
      />
    </div>
  );
}

