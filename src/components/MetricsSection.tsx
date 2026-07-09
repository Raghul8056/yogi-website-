"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, MessagesSquare, Timer, TrendingUp, Wallet } from "lucide-react";

interface Stat {
  icon: typeof BadgeCheck;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: BadgeCheck,
    value: 12482,
    suffix: "+",
    label: "Task Completed",
  },
  {
    icon: MessagesSquare,
    value: 98651,
    suffix: "+",
    label: "Follow-ups handled",
  },
  {
    icon: Timer,
    value: 4230,
    suffix: "+",
    label: "Hours saved",
  },
  {
    icon: TrendingUp,
    value: 92,
    suffix: "%",
    label: "Response rate",
  },
  {
    icon: Wallet,
    prefix: "$",
    value: 4.2,
    decimals: 1,
    suffix: "L+",
    label: "Operational saved",
  },
];

function formatNumber(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function CountUp({
  prefix = "",
  value,
  decimals = 0,
  suffix,
}: Omit<Stat, "icon" | "label">) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => formatNumber(0, decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();

        const duration = 2200;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(2, -10 * t);
          setDisplay(formatNumber(value * (t === 1 ? 1 : eased), decimals));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative bg-white/70 backdrop-blur-xl rounded-[1.5rem] border border-black/[0.06] p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Rich hover glow behind card content */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Elegant top accent edge */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-300 via-violet-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-violet-50 border border-violet-100 text-violet-600 flex items-center justify-center group-hover:bg-violet-500 group-hover:text-white group-hover:shadow-[0_4px_15px_rgba(139,92,246,0.4)] transition-all duration-500">
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                
                <h4 className="text-3xl md:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-600 mb-2 group-hover:from-violet-600 group-hover:to-purple-500 transition-all duration-500">
                  <CountUp
                    prefix={stat.prefix}
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </h4>
                
                <p className="text-sm md:text-base font-medium text-zinc-500 tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
