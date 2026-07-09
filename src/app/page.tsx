import HeroHeadline from "@/components/HeroHeadline";
import BlurText from "@/components/BlurText";
import FadeZoomSection from "@/components/FadeZoomSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TextType from "@/components/TextType";
import WhatsAppMasonryGallery from "@/components/WhatsAppMasonryGallery";
import DomeGalleryLazy from "@/components/DomeGalleryLazy";
import TestimonialsSection from "@/components/TestimonialsSection";
import BenefitsBentoGrid from "@/components/BenefitsBentoGrid";
import YogiPeep from "@/components/YogiPeep";
import YogiPeepLeft from "@/components/YogiPeepLeft";
import YogiSwarmLazy from "@/components/YogiSwarmLazy";
import MetricsSection from "@/components/MetricsSection";
import StickyFooter from "@/components/StickyFooter";
import SectionTag from "@/components/SectionTag";
import YogiFlyby from "@/components/YogiFlyby";
import YogiScrollDrop from "@/components/YogiScrollDrop";

import Image from "next/image";
import yogiImageRight from "../../public/images/newyogi.png";

const steps = [
  { num: "01", title: "You Assign", desc: "Tell Yogi what needs to get done.", icon: "✍️" },
  { num: "02", title: "Yogi Follows Up", desc: "Sends reminders on WhatsApp or Email.", icon: "💬" },
  { num: "03", title: "Escalates", desc: "No reply? Yogi escalates automatically.", icon: "🚨" },
  { num: "04", title: "Gets Updates", desc: "Collects responses and keeps you in the loop.", icon: "🔄" },
  { num: "05", title: "Confirms", desc: "Verifies completion and closes the loop.", icon: "✅" },
  { num: "06", title: "Reports Back", desc: "You get visibility, clarity and peace of mind.", icon: "📊" }
];

const leftIndustries = [
  { 
    title: "Real Estate", 
    desc: "Follow up with leads before they go cold.", 
    color: "from-blue-500 to-indigo-600",
    textHover: "group-hover:text-blue-700",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    title: "Healthcare", 
    desc: "Remind patients and collect updates.", 
    color: "from-pink-500 to-rose-500",
    textHover: "group-hover:text-pink-600",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  },
  { 
    title: "Agencies", 
    desc: "Keep clients and projects moving.", 
    color: "from-rose-500 to-amber-500",
    textHover: "group-hover:text-rose-600",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  { 
    title: "Sales Team", 
    desc: "Never miss another follow-up.", 
    color: "from-emerald-400 to-teal-500",
    textHover: "group-hover:text-emerald-600",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

const rightIndustries = [
  { 
    title: "Recruiters", 
    desc: "Follow up with candidates automatically.", 
    color: "from-violet-500 to-purple-600",
    textHover: "group-hover:text-violet-700",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    )
  },
  { 
    title: "Construction", 
    desc: "Keep teams updated from the field.", 
    color: "from-amber-500 to-orange-500",
    textHover: "group-hover:text-amber-600",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    )
  },
  { 
    title: "E-commerce", 
    desc: "Follow up on orders and customer queries.", 
    color: "from-cyan-500 to-blue-500",
    textHover: "group-hover:text-cyan-600",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    )
  },
  { 
    title: "Property Management", 
    desc: "Follow up on maintenance and tenant request.", 
    color: "from-fuchsia-500 to-pink-500",
    textHover: "group-hover:text-fuchsia-600",
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m8.25-9.75h3.75m-3.75 0h-3.75m3.75 0v11.25m-15.75-9.75h3.75m-3.75 0h-3.75m3.75 0v11.25m-1.5-15h9.75c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125v-4.5c0-.621.504-1.125 1.125-1.125z" />
      </svg>
    )
  }
];

type Industry = (typeof leftIndustries)[number];

/** Desktop side-panel card flanking the dome gallery. */
function IndustryCard({ item }: { item: Industry }) {
  return (
    <div
      className="bg-white/95 hover:bg-white border border-white/80 hover:border-violet-300/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] rounded-[2rem] p-5 md:p-6 flex flex-col gap-3 hover:-translate-y-2 transition-transform duration-500 transform-gpu group relative overflow-hidden select-none"
    >
      {/* Premium diagonal shine sweep */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      {/* Subtle color highlight bar */}
      <div className={`absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 scale-x-0 group-hover:scale-x-100 origin-left`} />

      <div className="flex items-center gap-4 relative z-10">
         <span className={`w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg relative overflow-hidden group-hover:scale-110 group-hover:rotate-[8deg] transition-all duration-500`}>
           {item.icon}
         </span>
         <h4 className={`font-bold text-zinc-900 text-[15px] md:text-[17px] ${item.textHover} transition-colors duration-300`}>{item.title}</h4>
      </div>
      <p className="text-[13px] md:text-[14px] text-zinc-500 font-medium leading-relaxed pl-[3.25rem] md:pl-[3.75rem] relative z-10 group-hover:text-zinc-700 transition-colors duration-300">
         {item.desc}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#f3f0ff] to-white text-zinc-900 pt-28 pb-16">
        {/* Hero Content */}
        <div className="w-full z-10">
          <HeroHeadline />
        </div>
      </section>

      {/* Lusion-Inspired Asymmetrical Grid Section */}
      <section className="w-full relative z-10 bg-[#f5f5f7] px-6 md:px-12 lg:px-24 overflow-hidden pt-8 pb-8 md:pt-10 md:pb-10">
        
        {/* Premium Ambient Background (Noise + Animated Mesh Glows) */}
        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none z-0 bg-noise" />
        
        {/* Pre-faded radial gradients stand in for blurred blobs: same soft look,
            but no live blur filter burning GPU on every frame of the spin. */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,rgba(237,233,254,0.45)_0%,rgba(237,233,254,0.15)_45%,transparent_72%)] rounded-full animate-[spin_40s_linear_infinite] will-change-transform" style={{ transformOrigin: 'center right' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(228,228,231,0.55)_0%,rgba(228,228,231,0.2)_45%,transparent_72%)] rounded-full animate-[spin_30s_linear_infinite_reverse] will-change-transform" style={{ transformOrigin: 'center left' }} />
        </div>

        <div className="relative z-10 w-full max-w-[1300px] mx-auto">
          
          {/* Top Left: Massive Two-Line Heading (Lusion Style) */}
          <div className="flex flex-col items-center text-center w-full mt-0">
            <div className="relative w-full flex flex-col items-center gap-1 md:gap-2">
              {/* Stable height container to prevent layout shifting/shaking when text erases and loops */}
              <div className="h-[42px] md:h-[54px] lg:h-[66px] flex items-center justify-center w-full relative z-10">
                <TextType
                  text="Introducing"
                  startOnVisible={true}
                  loop={true}
                  typingSpeed={60}
                  className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.9] flex justify-center text-black"
                  contentClassName="drop-shadow-[0_10px_40px_rgba(139,92,246,0.2)] pb-1"
                  textColors={['#000000']}
                  cursorClassName="text-violet-500"
                />
              </div>
              <BlurText 
                text="Yogi AI"
                delay={150}
                animateBy="words"
                direction="bottom"
                className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.9] pb-1 flex justify-center z-10 relative"
                spanClassName="bg-clip-text text-transparent bg-gradient-to-br from-violet-600 via-violet-500 to-[#4c1d95] drop-shadow-[0_20px_50px_rgba(139,92,246,0.2)] pb-2 pt-1"
              />
            </div>
          </div>
          
          {/* Bottom Row: Description (Left) & Yogi Image (Center) & Description (Right) */}
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 xl:gap-16 mt-4 lg:mt-6">

            {/* Connecting horizontal thread across the row (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-y-1/2 z-0" />

            {/* Left: Description */}
            <div className="lg:w-72 xl:w-80 lg:shrink-0 lg:order-1 z-20 flex flex-col items-center lg:items-end text-center lg:text-right">
              <FadeZoomSection delay={0.1} className="flex flex-col items-center lg:items-end gap-3 max-w-md">
                <span className="text-[10px] font-semibold tracking-[0.35em] text-violet-600/80 uppercase">
                  ( 01 ) Never Miss A Beat
                </span>
                <h3 className="text-black text-2xl md:text-3xl lg:text-[2.25rem] font-medium leading-[1.15] tracking-tight">
                  <span className="block whitespace-nowrap">Follows up.</span>
                  <span className="block whitespace-nowrap">Sends reminders.</span>
                </h3>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                  Yogi checks in automatically until people respond — no task ever goes stale waiting on someone.
                </p>
                <span className="hidden lg:block w-12 h-px bg-gradient-to-l from-violet-500/70 to-transparent" />
              </FadeZoomSection>
            </div>

            {/* Center: Yogi Image without background */}
            <div className="flex-1 lg:order-2 relative z-20 flex items-center justify-center min-h-[160px] md:min-h-[220px] lg:min-h-[280px]">

              {/* Invisible Image Container */}
              <div className="relative w-full flex items-center justify-center overflow-visible">
                {/* Fluid, Organic Energy Nebula (Behind Yogi) */}
                {/* Radial gradients instead of live blur filters — identical soft
                    nebula look without repainting huge blurred layers every frame. */}
                <div className="absolute inset-0 z-[-1] flex items-center justify-center -translate-y-4 pointer-events-none mix-blend-screen scale-[0.75]">

                  {/* Core Base Glow */}
                  <div className="absolute w-[75%] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22)_0%,rgba(139,92,246,0.08)_50%,transparent_75%)]" />

                  {/* Orbiting Blob 1 (Deep Violet) */}
                  <div className="absolute w-[65%] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.22)_0%,rgba(124,58,237,0.08)_50%,transparent_75%)] animate-[spin_10s_linear_infinite] will-change-transform" style={{ transformOrigin: '30% 70%' }} />

                  {/* Orbiting Blob 2 (Rich Purple) */}
                  <div className="absolute w-[70%] aspect-square rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.22)_0%,rgba(168,85,247,0.08)_50%,transparent_75%)] animate-[spin_14s_linear_infinite_reverse] will-change-transform" style={{ transformOrigin: '70% 30%' }} />

                  {/* Orbiting Blob 3 (Bright Fuchsia/Violet) */}
                  <div className="absolute w-[55%] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.18)_0%,rgba(217,70,239,0.06)_50%,transparent_75%)] animate-[spin_18s_linear_infinite] will-change-transform" style={{ transformOrigin: '50% 20%' }} />

                </div>

                {/* Lightweight Energy Rings — no box-shadow on animated elements */}
                <div className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none scale-[0.45] md:scale-[0.55] lg:scale-[0.65]">
                  {/* Core Energy Pulse — opacity animation only, no shadow */}
                  <div className="absolute w-[60%] aspect-square rounded-full border-4 border-violet-400/30 animate-pulse will-change-[opacity]" />
                  
                  {/* Outer Spark Ring */}
                  <div className="absolute w-[90%] aspect-square rounded-full border-[3px] border-dashed border-violet-500/50 animate-[spin_12s_linear_infinite] will-change-transform" />
                  
                  {/* Middle Energy Ring */}
                  <div className="absolute w-[75%] aspect-square rounded-full border-[2px] border-dotted border-purple-500/60 animate-[spin_8s_linear_infinite_reverse] will-change-transform" />
                  
                  {/* Inner Accelerator Ring */}
                  <div className="absolute w-[50%] aspect-square rounded-full border-t-4 border-l-4 border-transparent border-t-fuchsia-400/70 border-l-fuchsia-400/70 animate-[spin_3s_linear_infinite] will-change-transform" />
                  
                  {/* Spark Particles — static glow via background-color, no shadow */}
                  <div className="absolute w-[95%] aspect-square animate-[spin_20s_linear_infinite] will-change-transform">
                    <div className="absolute top-[10%] left-[50%] w-2.5 h-2.5 bg-fuchsia-300 rounded-full" />
                    <div className="absolute bottom-[20%] right-[20%] w-3.5 h-3.5 bg-violet-400 rounded-full animate-pulse" />
                    <div className="absolute top-[40%] left-[10%] w-2 h-2 bg-purple-400 rounded-full" />
                  </div>
                </div>

                {/* Yogi Image floating and properly scaled */}
                <Image
                  src={yogiImageRight}
                  alt="Yogi AI Character"
                  className="relative z-10 w-full max-w-[350px] h-auto object-contain scale-[0.95] md:scale-[1.05] origin-center hover:scale-[1.0] md:hover:scale-[1.1] hover:-translate-y-1 transition-transform duration-700 ease-out cursor-pointer will-change-transform"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>
            </div>

            {/* Right: Description & CTA */}
            <div className="lg:w-72 xl:w-80 lg:shrink-0 lg:order-3 z-20 flex flex-col items-center lg:items-start text-center lg:text-left">
              <FadeZoomSection delay={0.3} className="flex flex-col items-center lg:items-start gap-3 max-w-md">
                <span className="text-[10px] font-semibold tracking-[0.35em] text-violet-600/80 uppercase">
                  ( 02 ) Nothing Falls Through
                </span>
                <h3 className="text-black text-2xl md:text-3xl lg:text-[2.25rem] font-medium leading-[1.15] tracking-tight">
                  <span className="block whitespace-nowrap">Escalates. Verifies.</span>
                  <span className="block whitespace-nowrap">Gets it done.</span>
                </h3>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                  Missed deadlines get routed to the right person, and every task is confirmed complete — never just assumed.
                </p>
                <span className="hidden lg:block w-12 h-px bg-gradient-to-r from-violet-500/70 to-transparent" />
              </FadeZoomSection>
            </div>

          </div>


        </div>
      </section>

      {/* Clean White Spacer Gap */}
      <div className="w-full h-12 md:h-20 bg-white" />

      {/* Section 3: How It Works - Compact Row Grid */}
      <section className="w-full relative z-10 bg-[#fafafa] px-6 md:px-12 lg:px-16 py-20 md:py-24 flex flex-col justify-center overflow-hidden border-t border-black/5">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none bg-noise" />

        <div className="max-w-[1600px] w-full mx-auto relative z-10 flex flex-col gap-10 md:gap-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center w-full mx-auto gap-4 max-w-4xl">
            <FadeZoomSection className="w-full flex justify-center pb-2">
              <BlurText
                text="How Yogi Gets Work Done"
                delay={60}
                animateBy="words"
                direction="bottom"
                className="flex justify-center !flex-wrap text-center"
                spanClassName="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-600 pb-1"
                highlightWords={["Yogi", "Work"]}
                highlightClass="!bg-gradient-to-br !from-violet-500 !via-violet-600 !to-[#4c1d95]"
              />
            </FadeZoomSection>
            <FadeZoomSection className="w-full flex justify-center">
              <p className="text-zinc-500 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-[850px]">
                Six simple steps from assignment to confirmation. Yogi handles all the chasing, follow-ups, and coordination automatically.
              </p>
            </FadeZoomSection>
          </div>

          {/* Cards Grid - 1 Row on Desktop, 2 Rows on Tablet, 3 Rows on Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 pb-12 pt-16">
            {steps.map((step, idx) => (
              <FadeZoomSection 
                key={idx} 
                delay={idx * 0.1} 
                className="h-full relative group/card-holder pt-20"
              >
                {/* Peeking Yogi Mascot Illustration behind the card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56 z-0 pointer-events-none transition-all duration-500 ease-out transform translate-y-24 opacity-0 group-hover/card-holder:-translate-y-16 group-hover/card-holder:opacity-100">
                  <Image 
                    src={`/images/card_swap/step${idx + 1}_2.png`}
                    alt={`Step ${idx + 1} mascot`}
                    fill
                    className="object-contain"
                    sizes="224px"
                  />
                </div>

                {/* The Step Card */}
                <div className="group relative h-full min-h-[230px] lg:min-h-[265px] bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/60 p-6 md:p-7 flex flex-col transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.08)] hover:-translate-y-1.5 overflow-hidden select-none z-10">
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Bottom animated border glow */}
                  <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-violet-400 via-fuchsia-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-x-0 group-hover:scale-x-100 origin-center rounded-b-full" />

                  <div className="flex-1 flex flex-col relative z-10">
                    {/* Header: Step Pill + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-violet-50/80 border border-violet-100/50 text-violet-600 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] shadow-sm backdrop-blur-sm group-hover:bg-violet-600 group-hover:text-white transition-colors duration-500">
                        STEP 0{step.num}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(139,92,246,0.1)] border border-violet-50/50 flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500 group-hover:shadow-[0_8px_24px_rgba(139,92,246,0.2)]">
                        {step.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 group-hover:text-violet-700 transition-colors duration-500 mb-1.5 tracking-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-500 leading-normal font-light text-sm group-hover:text-zinc-700 transition-colors duration-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeZoomSection>
            ))}
          </div>
        </div>
      </section>

      {/* Clean White Spacer Gap */}
      <div className="w-full h-12 md:h-20 bg-white" />

      {/* Section 4: AI-Powered WhatsApp Automation */}
      <section className="w-full relative z-10 bg-zinc-100 pt-10 md:pt-14 pb-0 flex flex-col items-center justify-center border-t border-black/5 overflow-hidden">
        {/* Soft centered violet glow to match the theme */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.10)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Yogi jumping by after the 4th card arrives (1.5s delay) */}
        <YogiFlyby delay={1.5} />

        <div className="relative z-10 flex flex-col items-center text-center w-full mx-auto gap-4 px-6 md:px-12 lg:px-24">
          <FadeZoomSection className="w-full flex justify-center pb-2">
            <BlurText
              text="AI-Powered WhatsApp Automation"
              delay={60}
              animateBy="words"
              direction="bottom"
              className="flex justify-center !flex-wrap text-center"
              spanClassName="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 pb-2"
              highlightWords={["WhatsApp", "Automation"]}
              highlightClass="!bg-gradient-to-br !from-violet-500 !via-violet-600 !to-[#4c1d95]"
            />
          </FadeZoomSection>
          
          <FadeZoomSection className="text-zinc-500 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-[850px] mx-auto mt-2">
            Yogi seamlessly integrates with WhatsApp to automate your conversations, schedule follow-ups, and manage tasks directly from your chats.
          </FadeZoomSection>
        </div>

        {/* The Masonry WhatsApp Cards */}
        <div className="relative w-full z-20 mt-8 md:mt-10 flex-1 h-[400px] md:h-[450px]">
          <WhatsAppMasonryGallery />
        </div>
      </section>

      {/* Clean White Spacer Gap */}
      <div className="w-full h-12 md:h-20 bg-white" />

      {/* Section 5: Used by Teams in Every Industry — Unified Dark Section */}
      <section className="w-full relative z-10 bg-[#f5f5f7] overflow-hidden">

        {/* Heading — sits above the gallery, same background */}
        <div className="relative z-10 flex flex-col items-center text-center w-full mx-auto gap-6 md:gap-8 px-6 md:px-12 lg:px-24 pt-20 pb-8">


          <FadeZoomSection className="w-full flex justify-center pb-4 max-w-[1200px] mx-auto">
            <BlurText
              text="Perfect for growing businesses across industries."
              delay={80}
              animateBy="words"
              direction="bottom"
              className="flex justify-center !flex-wrap text-center"
              spanClassName="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 pb-2"
              highlightWords={["across", "industries."]}
              highlightClass="!bg-gradient-to-br !from-violet-500 !via-violet-600 !to-[#4c1d95]"
            />
          </FadeZoomSection>

          <FadeZoomSection className="text-base md:text-xl lg:text-2xl font-light leading-[1.5] tracking-tight text-zinc-600 w-full max-w-[850px] mx-auto">
            From SaaS to Healthcare, Yogi keeps the follow-ups flowing <br className="hidden md:block" />
            wherever work happens. Fly through the industries below.
          </FadeZoomSection>
        </div>

        {/* Center Layout: Cards pushed far to the sides of the central dome */}
        <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mb-6 md:mb-12">
          
          {/* Desktop/Tablet Cards Panel (Framing both sides, pushed out) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex md:justify-between items-center px-4 md:px-6 lg:px-8 pointer-events-none">
            {/* Left Side Cards - SaaS, Agencies, IT Services */}
            <div className="relative flex flex-col gap-4 w-[280px] lg:w-[320px] pointer-events-auto">

              {leftIndustries.map((item, idx) => (
                <FadeZoomSection key={idx} delay={0.05 + idx * 0.08}>
                  <IndustryCard item={item} />
                </FadeZoomSection>
              ))}
            </div>

            {/* Right Side Cards - Manufacturing, Healthcare, Construction */}
            <div className="relative flex flex-col gap-4 w-[280px] lg:w-[320px] pointer-events-auto">

              {rightIndustries.map((item, idx) => (
                <FadeZoomSection key={idx} delay={0.05 + idx * 0.08}>
                  <IndustryCard item={item} />
                </FadeZoomSection>
              ))}
            </div>
          </div>

          {/* Central Dome Container (No borders or shadows, completely transparent) */}
          <div className="relative z-10 w-full h-[350px] sm:h-[450px] md:h-[65vh] md:min-h-[580px] md:max-h-[750px] overflow-hidden max-w-[650px] lg:max-w-[720px] mx-auto">
            {/* Yogi scroll-linked drop behind the dome */}
            <YogiScrollDrop />

            {/* Dome Gallery */}
            <div className="absolute inset-0 z-0">
              <DomeGalleryLazy
                overlayBlurColor="#f5f5f7"
                fitBasis="height"
                fit={0.45}
                minRadius={500}
                maxRadius={900}
                grayscale={false}
                autoRotate={true}
              />
            </div>
          </div>
        </div>

        {/* Mobile Cards Grid (Rendered below the Dome Gallery) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-6 pb-16 md:hidden">
          {[...leftIndustries, ...rightIndustries].map((item, idx) => (
            <FadeZoomSection key={idx} delay={0.05 + idx * 0.05}>
              <div 
                className="bg-white/95 border border-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.02)] rounded-2xl p-4 flex flex-col gap-1.5 transition-transform duration-300 transform-gpu select-none"
              >
                <div className="flex items-center gap-2.5">
                   <span className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-sm text-xs`}>
                     {item.icon}
                   </span>
                   <h4 className="font-bold text-zinc-800 text-[13px]">{item.title}</h4>
                </div>
                <p className="text-[11px] text-zinc-500 font-medium leading-normal pl-9.5">
                   {item.desc}
                </p>
              </div>
            </FadeZoomSection>
          ))}
        </div>
      </section>

      {/* Spacer Gap between Dome and Metrics */}
      <div className="w-full h-24 md:h-32 bg-white relative z-10 border-t border-black/5" />

      {/* Section 6: Real Impact Metrics — Sticky so footer reveals behind it */}
      <div className="relative z-10">
        <div className="sticky top-0">
          <section id="real-impact" className="w-full relative bg-[#fafafa] pt-20 pb-20 overflow-hidden border-t border-black/5">
            {/* Subtle noise overlay */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none bg-noise" />
            
            {/* Ambient violet glow at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12)_0%,transparent_65%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center w-full mx-auto gap-8 md:gap-10 px-6 md:px-12 lg:px-24 mb-16 md:mb-20">


              <FadeZoomSection className="w-full flex justify-center pb-4">
                <BlurText
                  text="Every second, Yogi works."
                  delay={80}
                  animateBy="words"
                  direction="bottom"
                  className="flex justify-center !flex-wrap text-center"
                  spanClassName="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 pb-2"
                  highlightWords={["Yogi", "works."]}
                  highlightClass="!bg-gradient-to-br !from-violet-500 !via-violet-600 !to-[#6d28d9]"
                />
              </FadeZoomSection>

              <FadeZoomSection className="text-lg md:text-2xl lg:text-3xl font-light leading-[1.5] tracking-tight text-zinc-600 w-full max-w-[1000px] mx-auto">
                While your team focuses on the work that matters, <br className="hidden md:block" />
                Yogi seamlessly coordinates, follows up, and closes the loops.
              </FadeZoomSection>
            </div>

            <div className="relative z-10 w-full mb-16">
              <BeforeAfterSection />
            </div>

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
              <MetricsSection />
            </div>
          </section>
        </div>
      </div>

      {/* Spacer Gap between Metrics and Testimonials */}
      <div className="w-full h-24 md:h-32 bg-white relative z-10 border-t border-b border-black/5">
        <YogiPeep />
      </div>
      {/* Testimonials Integration */}
      <div id="testimonials-section" className="relative z-10 bg-[#fafafa] border-t border-black/5 overflow-hidden">
        {/* Header Section */}
        <section className="relative z-10 pt-16 pb-8 px-6 md:px-12 lg:px-24">
          <div className="flex flex-col items-center text-center w-full mx-auto gap-4 md:gap-6">
            <FadeZoomSection className="w-full flex justify-center pb-2">
              <BlurText
                text="Don't take our word for it."
                delay={80}
                animateBy="words"
                direction="bottom"
                className="flex justify-center !flex-wrap text-center"
                spanClassName="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 pb-2"
                highlightWords={["word"]}
                highlightClass="!bg-gradient-to-br !from-violet-500 !via-purple-500 !to-violet-700"
              />
            </FadeZoomSection>

            <FadeZoomSection className="text-lg md:text-2xl lg:text-3xl font-light leading-[1.5] tracking-tight text-zinc-600 w-full max-w-[900px] mx-auto">
              Hear from real teams who let Yogi handle the chasing,{" "}
              <br className="hidden md:block" />
              so they could focus on closing.
            </FadeZoomSection>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section id="testimonials-grid-section" className="relative z-10 pb-16 px-6 md:px-12 lg:px-24">
          <TestimonialsSection />
        </section>
      </div>

      {/* Spacer Gap between Testimonials and Benefits */}
      <div className="w-full h-24 md:h-32 bg-white relative z-10 border-t border-b border-black/5">
        <YogiPeepLeft />
      </div>

      {/* Benefits Section - Light & Airy Minimalist */}
      <section id="why-yogi-section" className="relative z-10 py-32 overflow-hidden bg-[#fafafa]">
          <div className="flex flex-col items-center text-center w-full mx-auto gap-8 md:gap-10 mb-20 px-6 md:px-12 lg:px-24">


            <FadeZoomSection className="w-full flex justify-center pb-4">
              <BlurText
                text="Perfect for Every Founder and Team"
                delay={80}
                animateBy="words"
                direction="bottom"
                className="flex justify-center !flex-wrap text-center"
                spanClassName="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 pb-2"
                highlightWords={["Perfect", "Every"]}
                highlightClass="!bg-gradient-to-br !from-violet-500 !via-purple-500 !to-violet-700"
              />
            </FadeZoomSection>

            <FadeZoomSection className="text-lg md:text-2xl lg:text-3xl font-light leading-[1.5] tracking-tight text-zinc-600 w-full max-w-[900px] mx-auto">
              Yogi is built to adapt seamlessly to your daily operations, <br className="hidden md:block" />
              helping you reclaim time, get visibility, and grow without the stress.
            </FadeZoomSection>
          </div>
          <BenefitsBentoGrid />
        </section>
        
        {/* Interactive WebGL Hero (Swarm) */}
        <YogiSwarmLazy />

      {/* Footer slides up from behind the sticky Testimonials/Swarm section */}
      <StickyFooter />
    </main>
  );
}

