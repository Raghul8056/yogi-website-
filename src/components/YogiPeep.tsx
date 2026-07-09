"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function YogiPeep() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
      const parent = containerRef.current?.parentElement;
      if (!parent) return;

      gsap.fromTo(imgRef.current, 
        { yPercent: 100 },
        {
          yPercent: 20, // pops up leaving 20% hidden
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom 35%",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute bottom-0 right-[2%] md:right-[5%] w-[250px] md:w-[400px] h-[350px] md:h-[500px] z-20 pointer-events-none overflow-hidden"
    >
      <img
        ref={imgRef}
        src="/images/purple_monks/11.png"
        alt="Yogi peeping"
        loading="lazy"
        decoding="async"
        className="absolute bottom-0 left-0 right-0 mx-auto w-full h-auto object-contain"
      />
    </div>
  );
}
