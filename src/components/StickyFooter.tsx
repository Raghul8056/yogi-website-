import Link from "next/link";

const insights = [
  "Slack Alternative",
  "Task management",
  "Better than todoist",
  "Time and focus",
  "Better than WhatsApp",
];

const compare = [
  "vs Monday",
  "vs Asana",
  "vs Slack",
  "vs Trello",
  "vs Notion",
  "vs Basecamp",
  "vs Todoist",
  "vs Smartsheet",
  "vs Jira",
];

const blog = [
  "Beginner's Guide to Product Management",
  "Breaking Barriers in Communication and Collaboration",
  "Top 7 ways Workfast.ai can Revolutionise your Project Management",
  "Looking for a new platform for Project Management? Discover Workfast.ai",
  "Top 10 Project Management Tools (2025 Edition)",
  "Top 10 Project Management Tools for Fintech Startups (2025 Edition)",
  "Top 10 Project Management Tools for Healthcare Industry (2025 Edition)",
  "Top 10 Project Management Tools for IT and Software Teams (2025 Edition)",
];

const legal = ["Privacy", "Terms", "About", "Contact", "Refund"];

export default function StickyFooter() {
  return (
    <footer className="relative z-[20] bg-black text-white pt-24">
      {/* Top Notch — single SVG path so the concave shoulders and the tab's
          rounded corners are one continuous, self-aligning curve. */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] z-10 pointer-events-none leading-[0]">
        <svg
          viewBox="0 0 924 72"
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path
            fill="#FAFAFC"
            d="M0 0 Q28 0 28 28 L28 40 Q28 72 60 72 L864 72 Q896 72 896 40 L896 28 Q896 0 924 0 Z"
          />
        </svg>

        {/* Peeping Monk in the center of the notch */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
          <img
            src="/images/footer_monk.png"
            alt="Mascot in footer notch"
            loading="lazy"
            decoding="async"
            className="w-24 h-24 md:w-36 md:h-36 object-contain select-none"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-24">
        {/* Main Footer Content */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-16 lg:gap-20">
          {/* Left: Brand Identity & Download */}
          <div className="flex flex-col gap-6 max-w-sm shrink-0">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" loading="lazy" decoding="async" className="h-10 w-auto object-contain" />
            </div>

            {/* Editorial tagline */}
            <h2 className="text-[2.75rem] lg:text-[3.5rem] font-medium tracking-[-0.03em] leading-[1.05] text-white mt-2">
              Work smart.<br />
              <span className="font-normal text-violet-500">Scale anywhere.</span>
            </h2>

            <p className="text-[13px] text-zinc-400 leading-relaxed max-w-[280px] mt-1">
              Yogi automates your follow-ups, organises tasks, and surfaces AI insights
              across your entire workflow — so you can search, assign, and close the loop
              in seconds.
            </p>


            {/* Copyright + built-by */}
            <div className="flex flex-col gap-2 mt-8">
              <p className="text-[11px] text-zinc-600">
                © 2026 Pepul Tech Private Limited. All rights reserved.
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-zinc-600">
                Built with <span className="text-violet-500">💙</span> by
                <span className="text-zinc-400 font-medium hover:text-violet-500 transition-colors cursor-pointer">the Pepul team</span>
              </p>
            </div>
          </div>

          {/* Right: Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16 lg:gap-24 w-full xl:w-auto pt-2">
            {/* Insights */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[13px] text-zinc-600">Insights</h4>
              <div className="flex flex-col gap-3.5">
                {insights.map((link) => (
                  <Link key={link} href="#" className="text-[13px] font-medium text-zinc-300 hover:text-violet-500 transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Compare */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[13px] text-zinc-600">Compare</h4>
              <div className="flex flex-col gap-3.5">
                {compare.map((link) => (
                  <Link key={link} href="#" className="text-[13px] font-medium text-zinc-300 hover:text-violet-500 transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            {/* Blog */}
            <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
              <h4 className="text-[13px] text-zinc-600">Blog</h4>
              <div className="flex flex-col gap-3.5 max-w-[260px]">
                {blog.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    title={link}
                    className="text-[13px] font-medium text-zinc-300 hover:text-violet-500 transition-colors leading-[1.4] line-clamp-2"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 mt-16 border-t border-white/10 text-[13px] text-zinc-500">
          {legal.map((link) => (
            <Link key={link} href="#" className="hover:text-violet-500 transition-colors">
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* Giant brand watermark, clipped at the bottom */}
      <div
        className="relative w-full overflow-hidden mt-10 md:mt-14"
        style={{ height: "clamp(4.5rem, 15vw, 15rem)" }}
        aria-hidden="true"
      >
        <span
          className="absolute left-1/2 -translate-x-1/2 top-0 font-bold tracking-[-0.04em] leading-[0.78] text-white/[0.1] select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: "clamp(7rem, 26vw, 24rem)" }}
        >
          Yogi AI
        </span>
      </div>
    </footer>
  );
}
