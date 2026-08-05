"use client";

interface ExoClickBannerProps {
  zoneId?: string;
  width?: number;
  height?: number;
}

export default function ExoClickBanner({ zoneId = "5994968", width = 728, height = 90 }: ExoClickBannerProps) {
  if (!zoneId) return null;

  return (
    <div className="w-full flex justify-center items-center my-4 overflow-hidden min-h-[90px] bg-white/[0.03] border border-white/10 rounded-2xl p-2 backdrop-blur-md">
      <iframe
        src={`https://syndication.exoclick.com/ads-iframe-display.php?idzone=${zoneId}`}
        width={width}
        height={height}
        scrolling="no"
        frameBorder="0"
        className="max-w-full"
      ></iframe>
    </div>
  );
}
