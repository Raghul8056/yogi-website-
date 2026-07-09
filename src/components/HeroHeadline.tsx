"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { useRegistrationModal } from "@/context/RegistrationModalContext";

const yogiImages = [
  "/Monk PNG Purple outfit/3.png",
  "/Monk PNG Purple outfit/14.png",
  "/Monk PNG Purple outfit/9.png",
  "/Monk PNG Purple outfit/5.png",
  "/Monk PNG Purple outfit/4.png"
];

/* ------------------------------------------------------------------ */
/*  Inline icon set (kept tiny & self-contained)                       */
/* ------------------------------------------------------------------ */

const IconWhatsApp = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#25D366" d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.976L2 22l5.242-1.372a9.968 9.968 0 0 0 4.77 1.214h.004c5.502 0 9.985-4.48 9.986-9.986A9.97 9.97 0 0 0 12.012 2z"/>
    <path fill="#ffffff" d="M17.476 14.372c-.298-.148-1.764-.868-2.038-.968-.274-.1-.473-.149-.672.15-.199.298-.77.967-.944 1.165-.174.198-.348.223-.646.074-.298-.149-1.26-.462-2.399-1.479-.886-.79-1.486-1.767-1.66-2.065-.174-.299-.019-.46.13-.608.134-.134.298-.348.448-.522.149-.174.199-.298.298-.498.1-.198.05-.372-.025-.521-.075-.149-.672-1.616-.92-2.213-.242-.582-.488-.503-.672-.512-.174-.01-.373-.01-.572-.01s-.522.074-.795.372c-.274.298-1.045 1.02-1.045 2.486s1.07 2.884 1.218 3.082c.15.2 2.105 3.21 5.097 4.5.711.307 1.267.491 1.701.628.714.228 1.365.195 1.879.118.574-.085 1.764-.721 2.013-1.418.25-.697.25-1.293.174-1.418-.075-.124-.274-.199-.572-.348z"/>
  </svg>
);

const IconDoc = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

const IconMail = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 7.625l9.75 6.75 9.75-6.75v-2.25L12 12 2.25 5.375z" fill="#ea4335"/>
    <path d="M21.75 5.375C21.75 4.547 21.078 3.875 20.25 3.875h-1.5v6l3 2.25z" fill="#c5221f"/>
    <path d="M2.25 5.375C2.25 4.547 2.922 3.875 3.75 3.875h1.5v6l-3 2.25z" fill="#fbbc04"/>
    <path d="M21.75 12.125v6.5c0 .828-.672 1.5-1.5 1.5h-3v-5.25L12 18.75 4.75 14.875v5.25h-3c-.828 0-1.5-.672-1.5-1.5v-6.5l8.25 6 3.75-2.625z" fill="#34a853"/>
    <path d="M12 18.75l7.25-5.25v5.25z" fill="#4285f4"/>
  </svg>
);

const IconCalendar = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IconUsers = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconChart = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <rect x="7" y="11" width="3" height="6" rx="1" />
    <rect x="12" y="7" width="3" height="10" rx="1" />
    <rect x="17" y="13" width="3" height="4" rx="1" />
  </svg>
);

const IconTrend = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l6-6 4 4 7-7" />
    <path d="M17 8h4v4" />
  </svg>
);

const IconClock = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IconCheckCircle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

const IconStar = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.57 1.1 6.48L12 17.9l-5.8 3.05 1.1-6.48L2.6 9.9l6.5-.95L12 2.5z" />
  </svg>
);

const IconCheck = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 5 5 9-10" />
  </svg>
);

const IconBolt = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2 4.5 13.2c-.4.5 0 1.3.6 1.3H11l-1 8 8.5-11.2c.4-.5 0-1.3-.6-1.3H12l1-8z" />
  </svg>
);

const IconShield = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3z" />
    <path d="m9 12 2 2 4-4.5" />
  </svg>
);

const IconSparkle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
    <path d="M19 14l.8 2.4L22 17l-2.2.6L19 20l-.8-2.4L16 17l2.2-.6L19 14z" />
  </svg>
);

const IconWave = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12h4l2-7 4 15 3-11 3 7 2-4h5l2-5 3 9 2-4h9" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

// Feature bubbles orbiting the monk
const orbitNodes = [
  { title: "CEO Brief",  sub: "Daily update ready", tile: "bg-white",       glyph: "text-[#7c5cff]", icon: IconDoc,      pos: "top-[-4%] left-1/2 -translate-x-1/2",  delay: "0s"   },
  { title: "WhatsApp",   sub: "Follow-ups",          tile: "bg-white",  glyph: "",     icon: IconWhatsApp, pos: "top-[15%] left-[-2%]",                 delay: "0.6s" },
  { title: "Invoices",   sub: "Collected",           tile: "bg-white",       glyph: "text-[#f59e0b]", icon: IconDoc,      pos: "top-[15%] right-[-2%]",                delay: "1.2s" },
  { title: "Emails",     sub: "Handled",             tile: "bg-white",       glyph: "", icon: IconMail,     pos: "top-[43%] left-[-9%]",                 delay: "1.8s" },
  { title: "Meetings",   sub: "Scheduled",           tile: "bg-white",       glyph: "text-[#3b82f6]", icon: IconCalendar, pos: "top-[43%] right-[-9%]",                delay: "2.4s" },
  { title: "Team",       sub: "Updates",             tile: "bg-[#7c5cff]",  glyph: "text-white",     icon: IconUsers,    pos: "bottom-[14%] left-[4%]",               delay: "3.0s" },
  { title: "Reports",    sub: "Generated",           tile: "bg-white",       glyph: "text-[#0ea5e9]", icon: IconChart,    pos: "bottom-[14%] right-[4%]",              delay: "3.6s" },
];

// Live activity feed
const activity = [
  { title: "WhatsApp Follow-up", sub: "23 new conversations", time: "09:41 AM", tile: "bg-white", glyph: "",     icon: IconWhatsApp },
  { title: "Invoice Collected",  sub: "₹4,20,000 received", time: "09:35 AM", tile: "bg-[#f59e0b]", glyph: "text-white",     icon: IconDoc },
  { title: "Team Updated",       sub: "5 members notified",    time: "09:28 AM", tile: "bg-[#7c5cff]", glyph: "text-white",     icon: IconUsers },
  { title: "CEO Brief Ready",    sub: "Daily brief is ready",  time: "09:15 AM", tile: "bg-[#3b82f6]", glyph: "text-white",     icon: IconDoc },
];

// Bottom stat strip
const stats = [
  { value: "2,000+",  label: "Founders Trust Yogi",   glyph: "text-[#7c5cff]", icon: IconUsers },
  { value: "98%",     label: "Faster Follow-ups",     glyph: "text-[#22c55e]", icon: IconTrend },
  { value: "12,000+", label: "Tasks Completed Daily", glyph: "text-[#f59e0b]", icon: IconCheckCircle },
  { value: "10+ hrs", label: "Saved Every Week",      glyph: "text-[#3b82f6]", icon: IconClock },
  { value: "4.9/5",   label: "Founder Rating",        glyph: "text-[#f5b400]", icon: IconStar },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeroHeadline() {
  const { openModal } = useRegistrationModal();

  // Use framer-motion values to prevent React re-renders on every mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 75, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 75, damping: 15 });

  const [currentYogi, setCurrentYogi] = useState(0);

  useEffect(() => {
    // Preload all monk images on mount so they are cached and render instantly
    yogiImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentYogi((prev) => (prev + 1) % yogiImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use window dimensions to avoid expensive layout recalculations (getBoundingClientRect)
      // which can cause severe stuttering on high-frequency events.
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(x * 12);
      mouseY.set(y * 12);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative w-full flex flex-col items-center px-4 sm:px-6 lg:px-10 pt-10 pb-6 text-zinc-900"
    >
      {/* Ambient background: soft light grid + lavender glows */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8b5cf608_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf608_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_75%)]" />
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[720px] h-[520px] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.14)_0%,transparent_70%)]" />
      <div className="absolute top-[10%] left-[6%] w-[420px] h-[420px] -z-10 rounded-full bg-violet-400/10 blur-[120px]" />
      <div className="absolute top-[14%] right-[6%] w-[420px] h-[420px] -z-10 rounded-full bg-indigo-400/10 blur-[120px]" />

      {/* ============================ HERO GRID ============================ */}
      <div className="w-full max-w-[1920px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

        {/* ---------- LEFT: copy ---------- */}
        <motion.div variants={fadeUp} className="lg:col-span-4 flex flex-col items-start text-left gap-6 order-2 lg:order-1">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#efeafe] border border-[#7c5cff]/20 pl-3 pr-4 py-1.5 shadow-[0_2px_10px_rgba(124,92,255,0.08)]">
            <IconSparkle className="w-4 h-4 text-[#7c5cff]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#5b45d6]">Your AI Chief of Staff</span>
          </div>

          {/* Headline */}
          <h1 className="text-[3rem] sm:text-[3.6rem] lg:text-[4.4rem] font-extrabold tracking-[-0.02em] leading-[0.98] text-[#111114] select-none">
            Run Your <br />
            <span className="text-[#6d4df5]">Business.</span> <br />
            Not Your Team.
          </h1>

          {/* Subheadline */}
          <p className="text-zinc-500 text-base md:text-lg max-w-md leading-relaxed">
            Yogi is your AI Chief of Staff that plans, coordinates, and gets things done—while you focus on growth.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button onClick={openModal} className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-[15px] bg-gradient-to-r from-[#7c5cff] to-[#6d3bf0] shadow-[0_10px_28px_rgba(109,59,240,0.35)] hover:shadow-[0_14px_34px_rgba(109,59,240,0.45)] hover:-translate-y-0.5 transition-all duration-300">
              Start Free - No Card Required
              <svg className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Feature bullets */}
          <div className="flex flex-wrap gap-x-7 gap-y-3 mt-1">
            {[
              { icon: IconBolt,   glyph: "text-[#7c5cff]", tint: "bg-[#efeafe]", top: "No more", bottom: "manual follow-ups" },
              { icon: IconClock,  glyph: "text-[#f59e0b]", tint: "bg-[#fdf1e2]", top: "No more", bottom: "delays" },
              { icon: IconShield, glyph: "text-[#22c55e]", tint: "bg-[#e6f8ee]", top: "No more", bottom: "stress" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <span className={`flex items-center justify-center w-9 h-9 rounded-xl ${f.tint} ${f.glyph}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-[13px] font-semibold leading-tight text-zinc-800">
                    {f.top}<br />
                    <span className="text-zinc-500 font-medium">{f.bottom}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3.5 mt-2">
            <div className="flex -space-x-2.5">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
              ].map((src, i) => (
                <img key={i} src={src} alt="Founder" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <p className="text-[13px] font-medium text-zinc-500 leading-tight">
              Trusted by <span className="font-bold text-[#6d4df5]">2,000+</span> founders<br />and growing teams
            </p>
          </div>
        </motion.div>

        {/* ---------- CENTER: monk + orbiting bubbles ---------- */}
        <motion.div variants={fadeUp} className="lg:col-span-4 relative flex items-center justify-center order-1 lg:order-2 min-h-[420px] lg:min-h-[560px]">
          {/* Animated Data Wires (Proportional scaling for GPU acceleration) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="wire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="highlight-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c5cff" stopOpacity="1" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
              </linearGradient>
            </defs>
            <style>{`
              @keyframes flow-wire {
                0% { stroke-dashoffset: 100; }
                100% { stroke-dashoffset: -100; }
              }
            `}</style>
            {[
              { x2: 50, y2: 2 },    // CEO Brief
              { x2: 4, y2: 21 },    // WhatsApp
              { x2: 96, y2: 21 },   // Invoices
              { x2: -3, y2: 49 },   // Emails
              { x2: 103, y2: 49 },  // Meetings
              { x2: 10, y2: 78 },   // Team
              { x2: 90, y2: 78 },   // Reports
            ].map((pt, i) => {
              // Elegant S-curve starting horizontally and ending horizontally
              // For CEO Brief (index 0), we curve it out to the left (X=33) so it loops around Yogi and stays visible.
              const d = i === 0
                ? `M 50 50 C 33 45, 33 15, ${pt.x2} ${pt.y2}`
                : `M 50 50 C ${(50 + pt.x2) / 2} 50, ${(50 + pt.x2) / 2} ${pt.y2}, ${pt.x2} ${pt.y2}`;
              return (
                <g key={i}>
                  {/* Neon Track Glow (Thicker, low opacity base glow) */}
                  <path d={d} fill="none" stroke="url(#wire-grad)" strokeWidth="4.5" strokeOpacity="0.15" vectorEffect="non-scaling-stroke" />
                  {/* Neon Track Core (Sharp, thin gradient track) */}
                  <path d={d} fill="none" stroke="url(#wire-grad)" strokeWidth="1.5" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
                  
                  {/* Glowing animated data pulse - Outer neon halo */}
                  <path 
                    d={d}
                    fill="none"
                    stroke="url(#highlight-grad)" 
                    strokeWidth="6.5" 
                    strokeOpacity="0.25"
                    vectorEffect="non-scaling-stroke" 
                    pathLength="100"
                    strokeDasharray="16 84"
                    style={{
                      animation: `flow-wire ${3.5 + (i % 3)}s linear infinite`,
                      animationDirection: i % 2 === 0 ? "normal" : "reverse",
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                  {/* Glowing animated data pulse - Core sharp neon line */}
                  <path 
                    d={d}
                    fill="none"
                    stroke="url(#highlight-grad)" 
                    strokeWidth="2.5" 
                    vectorEffect="non-scaling-stroke" 
                    pathLength="100"
                    strokeDasharray="16 84"
                    style={{
                      animation: `flow-wire ${3.5 + (i % 3)}s linear infinite`,
                      animationDirection: i % 2 === 0 ? "normal" : "reverse",
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Monk + pedestal */}
          <motion.div
            className="relative z-10 w-[78%] max-w-[400px] flex flex-col items-center"
            style={{ x: smoothX, y: smoothY }}
          >
            {/* Square stage; the invisible placeholder locks the size to the image so
                the rings, burst and Yogi all share one center point. */}
            <div className="relative z-10 w-full aspect-square animate-[float_6s_ease-in-out_infinite]">
              <img src={yogiImages[0]} className="w-full h-auto invisible pointer-events-none" alt="" />
              
              {/* Concentric aura + rings — centered on the stage = centered on Yogi */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                {/* Core energy glow (Pre-faded gradient, no blur filter or mix-blend for maximum performance) */}
                <div className="absolute w-[135%] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.12)_0%,transparent_65%)] animate-[pulse_4s_ease-in-out_infinite]" />
                {/* Sweeping conic light (Clean soft gradient stops instead of expensive blur-3xl filter) */}
                <div className="absolute w-[118%] aspect-square rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(124,92,255,0.08)_20%,transparent_40%,rgba(14,165,233,0.08)_70%,transparent_90%)] animate-[spin_16s_linear_infinite]" />
                {/* Clean rings */}
                <div className="absolute w-[112%] aspect-square rounded-full border-[0.5px] border-[#7c5cff]/10" />
                <div className="absolute w-[88%] aspect-square rounded-full border-[0.5px] border-[#7c5cff]/30 shadow-[0_0_20px_rgba(124,92,255,0.1)]" />
                {/* Soft ripple */}
                <div className="absolute w-[66%] aspect-square rounded-full border border-[#7c5cff]/40 animate-[ping_4s_ease-out_infinite]" />
              </div>

              {/* Energy burst — replays on every Yogi swap thanks to the keyed remount */}
              <div key={`burst-${currentYogi}`} className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                <motion.span
                  className="absolute w-[70%] aspect-square rounded-full border-2 border-[#7c5cff]/40"
                  initial={{ scale: 0.55, opacity: 0.7 }}
                  animate={{ scale: 1.55, opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.28)_0%,transparent_70%)]"
                  initial={{ scale: 0.7, opacity: 0.6 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>

              {/* Yogi crossfade — absolute-filled so every frame stays perfectly centered */}
              <AnimatePresence>
                <motion.img
                  key={currentYogi}
                  src={yogiImages[currentYogi]}
                  alt="Yogi — your AI Chief of Staff"
                  fetchPriority={currentYogi === 0 ? "high" : "auto"}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.06, y: -15 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 z-10 w-full h-full object-contain origin-center"
                />
              </AnimatePresence>
            </div>
            {/* Glossy pedestal */}
            <div className="relative w-[92%] -mt-6 z-0">
              <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-[70%] h-10 bg-[#7c5cff]/40 blur-2xl rounded-full" />
              <div className="relative h-8 rounded-[100%] bg-gradient-to-b from-white to-[#ece7fb] border border-white shadow-[0_18px_40px_rgba(124,92,255,0.25),inset_0_2px_6px_rgba(255,255,255,0.9)]" />
              <div className="absolute left-1/2 -translate-x-1/2 top-1 w-[86%] h-2 rounded-[100%] bg-[#8b5cf6]/50 blur-[3px]" />
            </div>
          </motion.div>

          {/* Orbiting feature bubbles */}
          <div className="absolute inset-0 hidden md:block pointer-events-none">
            {orbitNodes.map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={i}
                  className={`absolute ${n.pos} flex flex-col items-center gap-1.5 will-change-transform`}
                  style={{ animation: "float-bubble 5.5s ease-in-out infinite", animationDelay: n.delay }}
                >
                  <span className={`flex items-center justify-center w-14 h-14 rounded-2xl ${n.tile} border border-black/5 shadow-[0_8px_22px_rgba(17,17,20,0.12)]`}>
                    <Icon className={`w-7 h-7 ${n.glyph}`} />
                  </span>
                  <span className="text-center leading-tight mt-1">
                    <span className="block text-[13px] font-bold text-zinc-800">{n.title}</span>
                    <span className="block text-[11px] font-medium text-zinc-400">{n.sub}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ---------- RIGHT: live activity card ---------- */}
        <motion.div variants={fadeUp} className="lg:col-span-4 order-3 flex justify-center lg:justify-end">
          <div className="w-full max-w-[380px] rounded-[26px] bg-white/90 backdrop-blur-xl border border-black/[0.06] shadow-[0_30px_70px_-20px_rgba(76,50,140,0.25)] p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#7c5cff] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7c5cff]" />
                </span>
                <span className="text-[12px] font-bold tracking-[0.14em] text-zinc-800 uppercase">Live Activity</span>
              </div>
              <IconWave className="w-11 h-5 text-[#7c5cff]" />
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-[#7c5cff]/30 via-[#7c5cff]/15 to-transparent" />
              <div className="flex flex-col gap-3.5">
                {activity.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="relative flex items-center gap-3">
                      <span className="relative z-10 shrink-0">
                        <span className={`flex items-center justify-center w-10 h-10 rounded-xl ${a.tile} ${a.glyph} shadow-[0_6px_16px_rgba(17,17,20,0.12)]`}>
                          <Icon className="w-5 h-5" />
                        </span>
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-semibold text-zinc-900 truncate">{a.title}</p>
                        <p className="text-[12px] text-zinc-400 truncate">{a.sub}</p>
                      </div>
                      <span className="text-[11px] text-zinc-400 whitespace-nowrap">{a.time}</span>
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#22c55e] text-white shrink-0">
                        <IconCheck className="w-3 h-3" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <button className="mt-5 w-full flex items-center justify-between rounded-2xl bg-[#efeafe] hover:bg-[#e6dffd] transition-colors px-4 py-3">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#6d4df5]">
                <IconBolt className="w-4 h-4" />
                All tasks running smoothly
              </span>
              <svg className="w-4 h-4 text-[#6d4df5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ============================ STATS STRIP ============================ */}
      <motion.div variants={fadeUp} className="w-full max-w-[1920px] mt-12 lg:mt-16">
        <div className="rounded-[28px] bg-white border border-black/[0.05] shadow-[0_20px_50px_-24px_rgba(76,50,140,0.2)] px-4 sm:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-3 sm:px-5 py-4 md:py-2">
                  <Icon className={`w-8 h-8 shrink-0 ${s.glyph}`} />
                  <div className="leading-tight">
                    <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">{s.value}</div>
                    <div className="text-[12px] font-medium text-zinc-500">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>


      {/* Local keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-bubble {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(1.5deg); }
        }
      `}</style>
    </motion.div>
  );
}
