"use client";

import { motion } from "framer-motion";

interface FadeZoomSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeZoomSection({ children, className = "", delay = 0.2 }: FadeZoomSectionProps) {
  return (
    <motion.div
      // Opacity + transform only: both run on the compositor, unlike filter
      // blur which repaints the whole (often screen-sized) section per frame.
      initial={{ opacity: 0, scale: 0.92, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
