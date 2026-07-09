import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Yogi AI | Advanced Intelligence",
  description: "Next Generation AI solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-white text-zinc-900 antialiased`}>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/images/yogi_monk_6.png" as="image" />
        <Navbar />
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
