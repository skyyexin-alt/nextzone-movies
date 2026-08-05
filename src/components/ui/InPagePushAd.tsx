"use client";

import { useEffect, useRef } from "react";
import { loadScriptWithAntiAdblock } from "@/lib/antiAdblock";

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

    loadScriptWithAntiAdblock("https://a.magsrv.com/ad-provider.js")
      .then(() => {
        renderAd();
      })
      .catch(() => {
        renderAd();
      });
  }, [zoneId]);

  return <div ref={containerRef} className="fixed z-50 pointer-events-auto" />;
}
