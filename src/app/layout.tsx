import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./Providers";
import InstallAppButton from "@/components/ui/InstallAppButton";
import StickySocialSidebar from "@/components/ui/StickySocialSidebar";
import Script from "next/script";
import AdskeeperNotification from "@/components/ui/AdskeeperNotification";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://xflix.ink"),
  title: {
    default: "XFlix - Watch Free Movies & TV Shows Online in HD",
    template: "%s | XFlix",
  },
  description: "XFlix is a free online streaming platform offering thousands of movies and TV shows in HD and 4K quality. Watch instantly without registration or ads.",
  keywords: ["XFlix", "xflix.ink", "free movies", "watch movies online", "TV shows", "HD streaming", "movie reviews", "K-Dramas", "drama list"],
  authors: [{ name: "XFlix" }],
  creator: "XFlix",
  publisher: "XFlix",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "XFlix - Watch Free Movies & TV Shows Online in HD",
    description: "XFlix is a free online streaming platform offering thousands of movies and TV shows in HD and 4K quality. Watch instantly without registration or ads.",
    url: "https://xflix.ink",
    siteName: "XFlix",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "XFlix Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XFlix - Watch Free Movies & TV Shows Online in HD",
    description: "XFlix is a free online streaming platform offering thousands of movies and TV shows in HD and 4K quality. Watch instantly without registration or ads.",
    images: ["/icon-512.png"],
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
        <script src="https://jsc.adskeeper.com/site/1106781.js" async />
      </head>
      <body className={`${inter.className} bg-[#0f0f23] text-white antialiased`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <InstallAppButton />
          <StickySocialSidebar />
          <AdskeeperNotification />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
