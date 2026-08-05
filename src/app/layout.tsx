import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./Providers";
import InPagePushAd from "@/components/ui/InPagePushAd";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://xflix.ink"),
  title: "XFlix - Watch Free Movies & TV Shows Online in HD",
  description: "XFlix is a free online streaming platform offering thousands of movies and TV shows in HD and 4K quality. Watch instantly without registration or ads.",
  openGraph: {
    title: "XFlix",
    description: "XFlix - Watch unlimited movies and TV shows online free in HD, 1080p, 4K quality.",
    url: "https://xflix.ink",
    type: "website",
    locale: "en_US",
    siteName: "XFlix",
  },
  appleWebApp: {
    capable: true,
    title: "XFlix",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f0f23",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Delegate-CH"
          content="Sec-CH-UA https://s.magsrv.com; Sec-CH-UA-Mobile https://s.magsrv.com; Sec-CH-UA-Arch https://s.magsrv.com; Sec-CH-UA-Model https://s.magsrv.com; Sec-CH-UA-Platform https://s.magsrv.com; Sec-CH-UA-Platform-Version https://s.magsrv.com; Sec-CH-UA-Bitness https://s.magsrv.com; Sec-CH-UA-Full-Version-List https://s.magsrv.com; Sec-CH-UA-Full-Version https://s.magsrv.com;"
        />
      </head>
      <body className={`${inter.className} bg-[#0f0f23] text-white antialiased`} suppressHydrationWarning>
        <Providers>
          <InPagePushAd zoneId="5995178" />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
