import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./Providers";
import InstallAppButton from "@/components/ui/InstallAppButton";
import StickySocialSidebar from "@/components/ui/StickySocialSidebar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "XFlix - Watch Free Movies & TV Shows Online in HD",
  description: "XFlix is a free online streaming platform offering thousands of movies and TV shows in HD and 4K quality. Watch instantly without registration or ads.",
  openGraph: {
    title: "XFlix",
    description: "XFlix - Watch unlimited movies and TV shows online free in HD, 1080p, 4K quality.",
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
      <body className={`${inter.className} bg-[#0f0f23] text-white antialiased`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <InstallAppButton />
          <StickySocialSidebar />
          <Footer />
          <Script id="_waul11" strategy="afterInteractive">
            {`var _wau = _wau || []; _wau.push(["dynamic", "wft2mup9o8", "l11", "c4302bffffff", "small"]);`}
          </Script>
          <Script src="//waust.at/d.js" strategy="afterInteractive" async />
        </Providers>
      </body>
    </html>
  );
}
