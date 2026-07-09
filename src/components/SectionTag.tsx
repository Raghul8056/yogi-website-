import { ReactNode } from "react";

/** Pill-style eyebrow badge shown above every section heading. */
export default function SectionTag({ children, color = "amber" }: { children: ReactNode, color?: "amber" | "violet" }) {
  const isViolet = color === "violet";
  
  return (
    <span className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border ${isViolet ? 'border-violet-500/25 shadow-[0_8px_30px_rgba(139,92,246,0.18)]' : 'border-amber-500/25 shadow-[0_8px_30px_rgba(251,191,36,0.18)]'}`}>
      <span className="relative flex w-2 h-2">
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping ${isViolet ? 'bg-violet-500' : 'bg-amber-500'}`} />
        <span className={`relative inline-flex w-2 h-2 rounded-full ${isViolet ? 'bg-violet-500' : 'bg-amber-500'}`} />
      </span>
      <span className={`text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase ${isViolet ? 'text-violet-700' : 'text-amber-700'}`}>{children}</span>
    </span>
  );
}
