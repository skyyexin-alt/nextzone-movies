"use client";

import { useEffect, useRef } from "react";

interface InPagePushAdProps {
  zoneId?: string;
}

export default function InPagePushAd({ zoneId = "5995178" }: InPagePushAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const renderAd = () => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";

      const ins = document.createElement("ins");
      ins.className = "eas6a97888e42";
      ins.setAttribute("data-zoneid", zoneId);

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
    } else if ((window as any).AdProvider) {
      renderAd();
    } else {
      script.addEventListener("load", renderAd);
    }

    return () => {
      if (script) {
        script.removeEventListener("load", renderAd);
      }
    };
  }, [zoneId]);

  return <div ref={containerRef} className="fixed z-50 pointer-events-auto" />;
}
