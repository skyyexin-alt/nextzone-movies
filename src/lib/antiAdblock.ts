/**
 * Helper utility to load ad scripts with automatic Anti-Adblock 2.0 fallback.
 * If direct script fetching is blocked by browser extensions, it automatically
 * retries fetching through the same-domain /api/ad-proxy endpoint.
 */
export function loadScriptWithAntiAdblock(url: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("SSR");

    const existingScript = document.querySelector(`script[data-ad-src="${url}"]`) as HTMLScriptElement;
    if (existingScript) {
      return resolve(existingScript);
    }

    const script = document.createElement("script");
    script.async = true;
    script.type = "application/javascript";
    script.setAttribute("data-ad-src", url);
    script.src = url;

    script.onload = () => resolve(script);

    script.onerror = () => {
      // Direct load was blocked by AdBlocker! Fallback to reverse proxy
      console.warn(`[Anti-Adblock 2.0] Direct load blocked for ${url}. Switching to reverse proxy fallback...`);
      script.remove();

      const proxyUrl = `/api/ad-proxy?url=${encodeURIComponent(url)}`;
      const fallbackScript = document.createElement("script");
      fallbackScript.async = true;
      fallbackScript.type = "application/javascript";
      fallbackScript.setAttribute("data-ad-src", url);
      fallbackScript.src = proxyUrl;

      fallbackScript.onload = () => resolve(fallbackScript);
      fallbackScript.onerror = (err) => reject(err);

      document.head.appendChild(fallbackScript);
    };

    document.head.appendChild(script);
  });
}
