"use client";

import Script from "next/script";

interface ExoClickPopunderProps {
  zoneId?: string;
}

export default function ExoClickPopunder({ zoneId = "5994976" }: ExoClickPopunderProps) {
  if (!zoneId) return null;

  return (
    <Script
      id="exoclick-popunder"
      src="https://a.exoclick.com/tag_settings.js"
      data-sub={zoneId}
      strategy="afterInteractive"
    />
  );
}
