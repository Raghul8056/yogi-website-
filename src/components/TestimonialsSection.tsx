"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Play, VolumeX } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  quote: string;
  avatar: string;
  rating: number;
  isVideo?: boolean;
  videoPoster?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Vishnu Kumar M.",
    role: "Managing Director",
    company: "Capture Design",
    quote: "I worked with Yogi AI to develop our internal CRM, and I have to say that I am very pleased with the results. The team was very professional, knew exactly what I needed, and worked hard to ensure that the AI met all of my requirements.",
    avatar: "/images/testimonials/image (6).png",
    rating: 5,
  },
  {
    name: "Vikram",
    role: "Operations Manager",
    company: "TechFlow India",
    quote: "I have been working with Yogi AI for the past 6 months and they have become a fantastic and trusted partner in that time. Everything they do is well thought through and meticulous. From initial design, to implementation, to communication, everything is top-class.",
    avatar: "/images/testimonials/image (7).png",
    rating: 5,
  },
  {
    name: "Ciranjeevan",
    role: "Agency Owner",
    company: "Agora",
    quote: "I've had the pleasure of working with Yogi AI spanning across six different campaigns. From day one, they've consistently proven themselves to be a top-tier automation partner. Their expertise is outstanding, and no matter the complexity, they've always delivered with precision and quality.",
    avatar: "/images/testimonials/image (8).png",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "HR Director",
    company: "GlobalTalent",
    quote: "Yogi AI delivered a well-functioning recruitment bot and a polished dashboard on time, exceeding expectations. The team demonstrated exceptional project management skills and communicated clearly via email. They were responsive and proactive.",
    avatar: "/images/testimonials/image (9).png",
    rating: 5,
  },
  {
    name: "Karan Singh",
    role: "Digital Agency",
    company: "DigitalCore",
    quote: "Team at Yogi did a great job. Their friendly and efficient approach made the integration a pleasure. I look forward to working with them again and again!",
    avatar: "/images/testimonials/IMG_3165.jpg",
    rating: 5,
    isVideo: true,
    videoPoster: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Aarti Sharma",
    role: "Founder",
    company: "Golden Goose",
    quote: "Project with Yogi AI went superbly. Very happy with their work and have already engaged them again for another automation project. Highly recommend it!",
    avatar: "/images/testimonials/image (11).png",
    rating: 5,
  },
  {
    name: "Vikram Malhotra",
    role: "VP of Sales",
    company: "ScaleUp",
    quote: "Yogi and the team are nothing short of world class. They understand exactly what you want and deliver on time, every time. We never consider anyone else for AI development and hope to work with them for many years to come.",
    avatar: "/images/testimonials/image (13).png",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Product Manager",
    company: "InnovateTech",
    quote: "The best AI partner ever!! Yogi AI brings a calm, solution-focused approach to any challenge and works tirelessly to ensure success. Whether it's meeting tight deadlines or handling unexpected issues, they always go above and beyond.",
    avatar: "/images/testimonials/IMG_20260709_154553.png",
    rating: 5,
  }
];

const localAvatars = [
  "/images/testimonials/IMG_20260709_103231_935.png",
  "/images/testimonials/IMG_20260709_154553.png",
  "/images/testimonials/Image_2026-07-09T10_12_44.029Z.png",
  "/images/testimonials/IMG_3165.jpg",
  "/images/testimonials/image (10).png",
  "/images/testimonials/image (11).png",
  "/images/testimonials/image (13).png",
  "/images/testimonials/image (6).png",
  "/images/testimonials/image (7).png",
  "/images/testimonials/image (8).png",
  "/images/testimonials/image (9).png"
];

// 30 random avatars for the infinite marquee
const marqueeAvatars = Array.from({ length: 30 }).map((_, i) => 
  localAvatars[i % localAvatars.length]
);

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full"
    >
      <div className="flex-1 bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] flex flex-col gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
        
        {/* Top Header: Logo / Company Name & Stars */}
        <div className="flex items-center justify-between">
          <div className="font-bold text-xs tracking-tight text-zinc-800 flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-600">
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm rounded-tr-xl" />
            </div>
            {testimonial.company || "Company"}
          </div>
          <div className="flex gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Video Block if applicable */}
        {testimonial.isVideo && testimonial.videoPoster && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-100 group cursor-pointer mt-2">
            <img src={testimonial.videoPoster} alt="Video testimonial" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            {/* Custom Video Controls overlay */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
               <div className="w-6 h-6 rounded-full bg-[#5b52f6] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <VolumeX className="w-3 h-3" />
               </div>
               <div className="w-6 h-6 rounded-full bg-[#5b52f6] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform pl-0.5">
                  <Play className="w-3 h-3" fill="currentColor" />
               </div>
            </div>
          </div>
        )}

        {/* Text Body */}
        <blockquote className="text-zinc-700 text-sm leading-relaxed relative">
          <span className="text-amber-500 font-serif text-2xl absolute -left-1.5 -top-2 leading-none opacity-50">&ldquo;</span>
          <span className="relative z-10 pl-2.5 block">
            {testimonial.quote}
          </span>
        </blockquote>

        {/* Author Footer */}
        <div className="flex items-center gap-2.5 pt-2 mt-auto">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-200 shrink-0">
            <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-zinc-900">{testimonial.name}</span>
            <span className="text-[10px] text-zinc-500 font-medium">{testimonial.role}</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* WHAT OUR CLIENTS SAY Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 mb-12 uppercase">
        What Our Clients Say
      </h2>

      {/* Infinite Avatar Marquee */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden mb-20 py-4 flex flex-col gap-6">
         {/* Marquee row 1 */}
         <div className="flex gap-4 w-max animate-marquee whitespace-nowrap">
            {[...marqueeAvatars, ...marqueeAvatars].map((avatar, i) => (
              <div key={`row1-${i}`} className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-zinc-200 border-2 border-white shadow-sm shrink-0 transition-all duration-300">
                <img src={avatar} alt="Client Avatar" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
            ))}
         </div>
      </div>

      {/* Testimonials Row */}
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((t, i) => (
          <TestimonialCard key={i} testimonial={t} index={i} />
        ))}
      </div>
    </div>
  );
}
