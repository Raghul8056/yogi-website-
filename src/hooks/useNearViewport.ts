"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns true once the referenced element approaches the viewport
 * (within `margin`). Used to defer mounting heavy below-fold components
 * so their JS never blocks initial page load.
 */
export function useNearViewport<T extends HTMLElement>(margin = "1200px") {
  const ref = useRef<T>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, isNear };
}
