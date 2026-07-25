import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "./Providers";
import RandomPick from "@/components/ui/RandomPick";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextZone - Watch Free Movies & TV Shows Online in HD",
  description: "NextZone is a free online streaming platform offering thousands of movies and TV shows in HD and 4K quality. Watch instantly without registration or ads.",
  openGraph: {
    title: "NextZone",
    description: "NextZone - Watch unlimited movies and TV shows online free in HD, 1080p, 4K quality.",
    type: "website",
    locale: "en_US",
    siteName: "NextZone",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#1a1a3e] text-white antialiased`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <RandomPick />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
