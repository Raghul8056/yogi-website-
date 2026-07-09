"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const benefits = [
  {
    title: "More Time",
    desc: "Save 10+ hours every week.",
    icon: "⏱️",
  },
  {
    title: "Better Visibility",
    desc: "Know what's happening in real time.",
    icon: "👁️",
  },
  {
    title: "Better Decisions",
    desc: "Get AI insights and recommendations.",
    icon: "🧠",
  },
  {
    title: "Less Stress",
    desc: "No more chasing. No more chaos.",
    icon: "🧘",
  },
  {
    title: "Faster Growth",
    desc: "Scale your business with confidence.",
    icon: "🚀",
  },
  {
    title: "Work-Life Balance",
    desc: "Go home earlier. Live a better life.",
    icon: "⚖️",
  }
];

// Map of card index hovered -> card index where mascot should appear
const hoverTargetMap: Record<number, number> = {
  0: 5, // Hover Card 1 (More Time) -> triggers Card 6 (Work-Life Balance)
  1: 3, // Hover Card 2 (Better Visibility) -> triggers Card 4 (Less Stress)
  2: 4, // Hover Card 3 (Better Decisions) -> triggers Card 5 (Faster Growth)
  3: 1, // Hover Card 4 (Less Stress) -> triggers Card 2 (Better Visibility)
  4: 2, // Hover Card 5 (Faster Growth) -> triggers Card 3 (Better Decisions)
  5: 0, // Hover Card 6 (Work-Life Balance) -> triggers Card 1 (More Time)
};

export default function BenefitsBentoGrid() {
  const [activeMascotIndex, setActiveMascotIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pb-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
        {benefits.map((benefit, idx) => (
          <div 
            key={idx} 
            className="h-full relative group/card-holder pt-20"
            onMouseEnter={() => {
              const target = hoverTargetMap[idx];
              if (target !== undefined) {
                setActiveMascotIndex(target);
              }
            }}
            onMouseLeave={() => {
              setActiveMascotIndex(null);
            }}
          >
            {/* Peeking Yogi Mascot Illustration behind the card */}
            <div 
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 z-0 pointer-events-none transition-all duration-500 ease-out transform ${
                activeMascotIndex === idx 
                  ? "-translate-y-12 opacity-100" 
                  : "translate-y-20 opacity-0"
              }`}
            >
              <img
                src={`/images/benefits/step${idx + 1}_2.png`}
                alt={`${benefit.title} mascot`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative h-full min-h-[230px] lg:min-h-[265px] bg-white/90 backdrop-blur-xl rounded-[2rem] border border-black/5 p-6 md:p-7 flex flex-col transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.08)] hover:-translate-y-1.5 overflow-hidden select-none z-10"
            >
              {/* Animated Bottom Border Glow */}
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-violet-400 via-fuchsia-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-x-0 group-hover:scale-x-100 origin-center rounded-b-full" />

              <div className="flex-1 flex flex-col relative z-10">
                {/* Header Icon */}
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500">
                     {benefit.icon}
                   </div>
                </div>

                {/* Title & Description */}
                <div className="mt-auto">
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 group-hover:text-violet-700 transition-colors duration-500 mb-1.5 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-500 leading-normal font-light text-sm group-hover:text-zinc-700 transition-colors duration-500">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
