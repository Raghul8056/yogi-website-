'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function YogiFlyby({ delay = 1.5 }: { delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        initial={{ x: '-20vw', opacity: 0 }}
        animate={
          isInView 
            ? { x: '110vw', opacity: [0, 1, 1, 1, 0] } 
            : { x: '-20vw', opacity: 0 }
        }
        transition={{
          delay: delay,
          duration: 1.4,
          ease: "easeInOut",
          opacity: { delay: delay, duration: 1.4, times: [0, 0.05, 0.5, 0.85, 1] }
        }}
        className="absolute bottom-[10%] left-0 w-64 h-64 md:w-[380px] md:h-[380px]"
      >
        <Image 
          src="/images/right-Picsart-BackgroundRemover.png"
          alt="Yogi Flying By"
          fill
          className="object-contain"
          sizes="280px"
        />
      </motion.div>
    </div>
  );
}
