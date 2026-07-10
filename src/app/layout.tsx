import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Navbar from "@/components/Navbar";
import { RegistrationModalProvider } from "@/context/RegistrationModalContext";
import RegistrationModal from "@/components/RegistrationModal";
const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

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
      <body className={`${outfit.className} ${inter.variable} bg-white text-zinc-900 antialiased`}>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/Monk PNG Purple outfit/3.png" as="image" />
        <RegistrationModalProvider>
          <Navbar />
          <RegistrationModal />
          <SmoothScroller>
            {children}
          </SmoothScroller>
        </RegistrationModalProvider>
      </body>
    </html>
  );
}
