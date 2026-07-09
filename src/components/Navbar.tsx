"use client";

import Link from 'next/link';
import { useRegistrationModal } from "@/context/RegistrationModalContext";
export default function Navbar() {
  const { openModal } = useRegistrationModal();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-[1920px] bg-white/80 backdrop-blur-xl border border-black/[0.06] rounded-full shadow-[0_10px_40px_-12px_rgba(76,50,140,0.18)] transition-all duration-300">
      <div className="flex items-center justify-between w-full px-4 sm:px-6 py-3 relative">
        {/* Left: Logo */}
        <div className="flex items-center ml-1">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-7 xl:gap-9 whitespace-nowrap">
          {[
            { label: "One Platform", href: "#platform" },
            { label: "Surge Startups", href: "#startups" },
            { label: "Franchise", href: "#franchise" },
            { label: "Investor", href: "#investor" },
            { label: "Blog", href: "#blog" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="text-[15px] font-semibold text-zinc-600 hover:text-[#6d4df5] transition-colors">
              {item.label}
            </Link>
          ))}
          <Link href="#guide" className="text-[15px] font-semibold text-zinc-600 hover:text-[#6d4df5] transition-colors flex items-center gap-1">
            User Guide
            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>

        {/* Right: Log in + Book a Demo */}
        <div className="flex items-center gap-3 sm:gap-4 mr-1">
          <Link href="/login" className="hidden sm:inline text-[15px] font-semibold text-zinc-700 hover:text-zinc-900 transition-colors px-2">
            Log in
          </Link>
          <button type="button" onClick={openModal} className="text-[14px] font-semibold text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5b6ef7] via-[#7c5cff] to-[#a855f7] hover:shadow-[0_8px_24px_rgba(124,92,255,0.45)] hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(124,92,255,0.3)] flex items-center gap-2">
            Book a Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
