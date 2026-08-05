import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./Providers";

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
        {/* Popunder Ad Script */}
        <script src="https://racketgutter.com/6b/83/51/6b8351b07c0a5c280f7eb94ae34e2563.js"></script>
        {/* Social Bar Ad Script */}
        <script src="https://racketgutter.com/88/6f/14/886f113GmLkaZvKbncgXkNj9hL8cQJCSCjXscK.js"></script>
      </head>
      <body className={`${inter.className} bg-[#0f0f23] text-white antialiased`} suppressHydrationWarning>
        <Providers>
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



