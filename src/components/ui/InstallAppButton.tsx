"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Share, Download } from "lucide-react";

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (installed)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If it's iOS Safari, beforeinstallprompt won't fire, but we still want to show the button
    const isIos = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase());
    if (isIos && !(window.navigator as any).standalone) {
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Chrome / Edge / Android
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      // Show iOS fallback or instructions if native prompt isn't available
      setShowIosInstructions(true);
    }
  };

  // Don't render anything if it's already installed or explicitly dismissed
  if (isInstalled || isDismissed) return null;

  return (
    <>
      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 animate-in slide-in-from-bottom-5 fade-in duration-500">
        <div className="relative overflow-hidden rounded-2xl p-4 w-[320px] max-w-[calc(100vw-2rem)] border border-violet-500/30 bg-[#0f0f23]/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(139,92,246,0.3)]">
          {/* Background glow elements */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-violet-600/20 to-transparent pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-fuchsia-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-20"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[12px] overflow-hidden shrink-0 shadow-lg border border-white/10 relative">
                <Image src="/icon-192.png" alt="XFlix App Icon" width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div className="pr-6">
                <h3 className="font-bold text-white text-[15px] leading-tight">Install XFlix App Now</h3>
                <p className="text-zinc-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                  Watch movies smoothly in full screen without interruptions.
                </p>
              </div>
            </div>
            <button
              onClick={handleInstallClick}
              className="w-full mt-1 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all text-white font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIosInstructions && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1a1a3e] border border-white/10 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-center">
            <button 
              onClick={() => setShowIosInstructions(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg mb-6">
              <Image src="/icon-192.png" alt="XFlix App Icon" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Install XFlix App</h3>
            <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
              Install this app on your device for the best, full-screen movie streaming experience.
            </p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left">
              <ol className="text-sm text-zinc-300 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-violet-600/30 text-violet-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</span>
                  <span>Tap the <strong>Share</strong> button <Share className="inline-w-4 h-4 mx-1" /> at the bottom of your screen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-violet-600/30 text-violet-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</span>
                  <span>Scroll down and select <strong>"Add to Home Screen"</strong>.</span>
                </li>
              </ol>
            </div>
            <button 
              onClick={() => setShowIosInstructions(false)}
              className="w-full mt-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
