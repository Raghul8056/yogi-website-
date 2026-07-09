"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "@/hooks/useNearViewport";

// three.js + react-three-fiber only load when the user scrolls near this
// section — they never block first paint of the page.
const YogiSwarm = dynamic(() => import("./YogiSwarm"), { ssr: false });

export default function YogiSwarmLazy() {
  return <YogiSwarm />;
}
