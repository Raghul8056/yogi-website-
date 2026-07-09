"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import FadeZoomSection from "./FadeZoomSection";

export default function BeforeAfterSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 mt-12 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* BEFORE CARD */}
        <FadeZoomSection delay={0.1}>
          <div className="relative h-full bg-white/70 backdrop-blur-2xl border border-red-500/15 shadow-[0_8px_30px_rgba(239,68,68,0.04)] rounded-[2rem] p-8 md:p-10 flex flex-col gap-6 overflow-hidden group">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-sm font-bold tracking-widest text-red-500 uppercase bg-red-500/10 px-4 py-1.5 rounded-full">
                Before Yogi
              </span>
            </div>

            <h3 className="relative z-10 text-2xl md:text-3xl font-semibold text-zinc-900 mt-2">
              The endless chase
            </h3>

            <ul className="relative z-10 flex flex-col gap-5 mt-4">
              {[
                "You chase people for updates",
                "Wasted hours on follow-ups",
                "No visibility until it's late",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-600 font-medium text-[15px] md:text-[17px] leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </FadeZoomSection>

        {/* AFTER CARD */}
        <FadeZoomSection delay={0.2}>
          <div className="relative h-full bg-white/70 backdrop-blur-2xl border border-violet-500/30 shadow-[0_8px_30px_rgba(139,92,246,0.08)] rounded-[2rem] p-8 md:p-10 flex flex-col gap-6 overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.08] to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-sm font-bold tracking-widest text-violet-600 uppercase bg-violet-500/10 px-4 py-1.5 rounded-full">
                After Yogi
              </span>
            </div>

            <h3 className="relative z-10 text-2xl md:text-3xl font-semibold text-zinc-900 mt-2">
              The autonomous team
            </h3>

            <ul className="relative z-10 flex flex-col gap-5 mt-4">
              {[
                "Yogi follows up automatically",
                "Work moves on time",
                "Hours saved every week",
                "Visibility when it's done",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-violet-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-700 font-medium text-[15px] md:text-[17px] leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </FadeZoomSection>
      </div>
    </section>
  );
}
