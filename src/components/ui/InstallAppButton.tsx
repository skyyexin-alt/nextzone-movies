"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Share } from "lucide-react";

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

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
      // iOS Safari fallback
      setShowIosInstructions(true);
    }
  };

  // Don't render anything if it's already installed or we know it can't be installed
  if (isInstalled || (!isInstallable && !showIosInstructions)) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="fixed bottom-20 lg:bottom-6 right-6 z-40 bg-gradient-to-r from-violet-600 to-fuchsia-600 p-2 pr-5 rounded-full shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 transition-transform flex items-center gap-3 text-white border border-white/20 animate-bounce"
        style={{ animationDuration: '3s' }}
        aria-label="Install App"
      >
        <div className="w-10 h-10 rounded-[10px] overflow-hidden shrink-0 shadow-md">
          <Image src="/icon-192.png" alt="XFlix App Icon" width={40} height={40} className="w-full h-full object-cover" />
        </div>
        <span className="font-extrabold text-sm tracking-wide whitespace-nowrap">Install Now</span>
      </button>

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
