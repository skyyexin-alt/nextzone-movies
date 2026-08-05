"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerAdProps {
  adKey?: string;
}

export default function AdsterraBannerAd({ adKey = "282e852f5808b9dd01d12c1ed30bf5d2" }: AdsterraBannerAdProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    const optsScript = document.createElement("script");
    optsScript.text = `atOptions = ${JSON.stringify({
      key: adKey,
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    })};`;

    const invokeScript = document.createElement("script");
    invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;

    containerRef.current.appendChild(optsScript);
    containerRef.current.appendChild(invokeScript);
  }, [adKey]);

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
