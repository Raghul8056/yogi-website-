"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollerProps {
  children?: ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const pathname = usePathname();

  useEffect(() => {
    let locomotiveScroll: any;
    
    (async () => {
      // Import locomotive-scroll dynamically so it only runs on the client side
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      
      locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.1, // higher lerp = faster response
          duration: 1.2, // shorter duration = snappier stops
          smoothWheel: true,
          wheelMultiplier: 1.0,
        },
      });
    })();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
