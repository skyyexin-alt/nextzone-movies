"use client";

interface ExoClickAdProps {
  zoneId?: string;
}

export default function ExoClickAd({ zoneId = "5995032" }: ExoClickAdProps) {
  return (
    <div className="w-full flex justify-center items-center my-6 min-h-[90px] overflow-hidden bg-white/[0.02] border border-white/10 rounded-2xl p-2 backdrop-blur-md">
      <iframe
        src={`https://a.magsrv.com/iframe.php?idzone=${zoneId}&size=728x90`}
        width="728"
        height="90"
        scrolling="no"
        marginWidth={0}
        marginHeight={0}
        frameBorder="0"
        className="max-w-full"
      ></iframe>
    </div>
  );
}
