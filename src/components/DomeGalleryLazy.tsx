"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { useNearViewport } from "@/hooks/useNearViewport";

// The dome renders ~200 3D-transformed tiles; deferring it keeps that DOM
// and the gesture library out of the initial load entirely.
const DomeGallery = dynamic(() => import("./DomeGallery"), { ssr: false });

type DomeGalleryProps = ComponentProps<typeof DomeGallery>;

export default function DomeGalleryLazy(props: DomeGalleryProps) {
  const { ref, isNear } = useNearViewport<HTMLDivElement>();

  if (isNear) return <DomeGallery {...props} />;

  // Fills the parent's fixed-height container, so layout is identical.
  return <div ref={ref} className="w-full h-full" aria-hidden="true" />;
}
