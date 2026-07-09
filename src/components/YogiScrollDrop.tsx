'use client';
import { useRef, useEffect } from 'react';

export default function YogiScrollDrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let sectionTop = 0;
    let sectionHeight = 0;

    const updateMetrics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      sectionHeight = rect.height;
    };

    updateMetrics();
    const timer = setTimeout(updateMetrics, 100);

    const handleScroll = () => {
      const img = imgRef.current;
      if (!img) return;
      
      const currentScrollY = window.scrollY;
      const rectTop = sectionTop - currentScrollY;
      const windowH = window.innerHeight;
      
      // How far through the viewport the container has traveled
      const progress = Math.max(0, Math.min(1, (windowH - rectTop) / (windowH + sectionHeight)));
      
      // We want Yogi to wait at the top until the section is coming into view
      const activeProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.85));
      
      // Drop straight down only
      const yPos = -150 + (activeProgress * (sectionHeight + 150));
      
      // Visible between 10% and 90% of scroll
      let opacity = 1;
      if (progress < 0.1) opacity = progress / 0.1;
      else if (progress > 0.9) opacity = (1 - progress) / 0.1;
      
      img.style.transform = `translate(-50%, ${yPos}px)`;
      img.style.opacity = `${opacity}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateMetrics, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMetrics);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      <img
        ref={imgRef}
        src="/images/yogijump1.png"
        alt="Yogi dropping"
        loading="lazy"
        decoding="async"
        className="absolute left-1/2 top-0 w-[400px] h-auto object-contain will-change-transform"
        style={{
          transform: `translate(-50%, -150px)`,
          opacity: 0,
        }}
      />
    </div>
  );
}
