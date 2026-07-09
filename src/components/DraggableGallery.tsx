'use client';

import React from 'react';

interface DraggableGalleryProps {
  features?: any[];
}

export default function DraggableGallery({ features }: DraggableGalleryProps) {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-[40%] left-[40%] bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center pointer-events-none">
        <h2 className="text-3xl font-bold text-white tracking-tighter mb-2">Infinite Space</h2>
        <p className="text-zinc-400">Drag around to explore the canvas.</p>
      </div>

      <div className="absolute top-[20%] left-[30%] w-64 h-64 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_50px_rgba(251, 191, 36,0.1)] flex items-center justify-center text-amber-500/50 font-mono pointer-events-none">
        NODE.ALPHA
      </div>

      <div className="absolute top-[60%] left-[60%] w-80 h-48 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_50px_rgba(245, 158, 11,0.1)] flex items-center justify-center text-amber-500/50 font-mono pointer-events-none">
        NODE.BETA
      </div>
      
      <div className="absolute top-[30%] left-[70%] w-48 h-72 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex items-center justify-center text-blue-500/50 font-mono pointer-events-none">
        NODE.GAMMA
      </div>
    </div>
  );
}
