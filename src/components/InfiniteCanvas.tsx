'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DraggableGallery from './DraggableGallery';

interface InfiniteCanvasProps {
  features: any[];
}

export default function InfiniteCanvas({ features }: InfiniteCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const winW = containerRef.current.clientWidth;
      const winH = containerRef.current.clientHeight;
      const maxX = (4000 - winW) / 2;
      const maxY = (3000 - winH) / 2;
      setConstraints({
        top: -maxY,
        bottom: maxY,
        left: -maxX,
        right: maxX
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[90vh] min-h-[800px] overflow-hidden bg-[#050505] rounded-[3rem] border border-white/10 my-12"
    >
      {/* Immersive background glow & noise */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,rgba(251, 191, 36,0.03)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      {/* The Draggable Canvas Surface via Framer Motion */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -ml-[2000px] -mt-[1500px] w-[4000px] h-[3000px] z-10 cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={constraints}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 20, power: 0.2 }}
        whileTap={{ cursor: "grabbing" }}
      >
        <DraggableGallery features={features} />
      </motion.div>
      
      {/* UI Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md z-50 pointer-events-none shadow-2xl">
        <p className="text-white/80 text-sm font-medium tracking-widest uppercase">Click & Drag Canvas</p>
      </div>
    </div>
  );
}
