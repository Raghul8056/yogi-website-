"use client";

/* eslint-disable react-hooks/purity, react-hooks/immutability --
   Generative WebGL component: instance positions are seeded with Math.random()
   once per mount, and the frame loop mutates instanced-mesh data directly.
   Both are intentional and never touch React state. */

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRegistrationModal } from "@/context/RegistrationModalContext";

const SPRITE_COUNT = 150; // Reduced to prevent clutter

// Reusable variables for performance in the frame loop
const dummy = new THREE.Object3D();
const mousePos = new THREE.Vector2();
const targetMousePos = new THREE.Vector2();

interface YogiInstance {
  basePosition: THREE.Vector3;
  spiralPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  baseScale: number;
  rotation: number;
  rotationSpeed: number;
  layer: "bg" | "mid" | "fg";
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
}

// Water drop effect removed.

// Start loading textures immediately upon script execution to prevent "late" pop-in
const preloadedTextures = typeof window !== 'undefined' ? [
  (() => {
    const tex = new THREE.TextureLoader().load("/images/yogi_monk_6.png");
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false; // Prevents blurry mipmapping artifacts on alpha edges
    return tex;
  })()
] : [];

function SwarmMesh({ scrollObj }: { scrollObj: { progress: number } }) {
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);
  const { camera } = useThree();

  // Use preloaded textures
  const textures = preloadedTextures;

  // Initialize instances data
  const textureGroups = useMemo<YogiInstance[][]>(() => {
    const groups: YogiInstance[][] = Array.from({ length: preloadedTextures.length }, () => []);
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians

    for (let i = 0; i < SPRITE_COUNT; i++) {
      // 1. Assign Layer
      const layerRand = Math.random();
      let layer: "bg" | "mid" | "fg" = "mid";
      let z = 0;
      let baseScale = 1;

      if (layerRand < 0.33) {
        layer = "bg";
        z = -15 + Math.random() * 5;
        baseScale = 0.5 + Math.random() * 0.3; 
      } else if (layerRand < 0.66) {
        layer = "mid";
        z = -5 + Math.random() * 5;
        baseScale = 0.8 + Math.random() * 0.4;
      } else {
        layer = "fg";
        z = 5 + Math.random() * 5;
        baseScale = 1.2 + Math.random() * 0.6; 
      }

      // 2. Base Position (Random scatter, leaving center mostly clear)
      const r = 5 + Math.random() * 15; // Distance from center
      const theta = Math.random() * Math.PI * 2; // Angle
      let x = r * Math.cos(theta);
      let y = r * Math.sin(theta);

      // Distribute across a wide area to fill the screen
      x += (Math.random() - 0.5) * 30;
      y += (Math.random() - 0.5) * 20;

      // 3. Spiral Position (Fibonacci spiral)
      const spiralY = 1 - (i / (SPRITE_COUNT - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - spiralY * spiralY);
      const spiralTheta = phi * i;
      const spiralScale = 8;
      
      const spX = Math.cos(spiralTheta) * radiusAtY * spiralScale;
      const spY = spiralY * spiralScale;
      const spZ = Math.sin(spiralTheta) * radiusAtY * spiralScale;

      const inst = {
        basePosition: new THREE.Vector3(x, y, z),
        spiralPosition: new THREE.Vector3(spX, spY, spZ),
        velocity: new THREE.Vector3(0, 0, 0),
        scale: baseScale,
        baseScale: baseScale,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        layer,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        speedX: 0.2 + Math.random() * 0.5,
        speedY: 0.2 + Math.random() * 0.5,
      };

      const texIdx = Math.floor(Math.random() * preloadedTextures.length);
      groups[texIdx].push(inst);
    }
    return groups;
  }, []);

  // Track Mouse in world space
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to +1
      targetMousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Frame Loop (Physics, Float, Interaction, Scroll Interpolation)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Lerp mouse for smoothness
    mousePos.lerp(targetMousePos, 0.1);

    // Unproject mouse to world coordinates (at z=0)
    const vec = new THREE.Vector3(mousePos.x, mousePos.y, 0.5);
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    const distance = -camera.position.z / vec.z;
    const worldMousePos = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(distance));

    const progress = scrollObj.progress; // 0 to 1

    for (let texIdx = 0; texIdx < textureGroups.length; texIdx++) {
      const mesh = meshRefs.current[texIdx];
      if (!mesh) continue;

      const groupInstances = textureGroups[texIdx];
      for (let i = 0; i < groupInstances.length; i++) {
        const inst = groupInstances[i];

        // 1. Calculate Floating Position (Simplex-like organic movement)
        const floatX = Math.sin(time * inst.speedX + inst.phaseX) * (inst.layer === "fg" ? 1.5 : 0.5);
        const floatY = Math.cos(time * inst.speedY + inst.phaseY) * (inst.layer === "fg" ? 1.5 : 0.5);
        
        const currentBaseX = inst.basePosition.x + floatX;
        const currentBaseY = inst.basePosition.y + floatY;
        const currentBaseZ = inst.basePosition.z;

        // 2. Interpolate between Floating position and Spiral position based on scroll progress
        const easeProgress = progress * progress * (3.0 - 2.0 * progress); // smoothstep
        const targetX = THREE.MathUtils.lerp(currentBaseX, inst.spiralPosition.x, easeProgress);
        const targetY = THREE.MathUtils.lerp(currentBaseY, inst.spiralPosition.y, easeProgress);
        const targetZ = THREE.MathUtils.lerp(currentBaseZ, inst.spiralPosition.z, easeProgress);

        // 3. Mouse Repulsion Logic (Aggressive dodge)
        const dx = (targetX + inst.velocity.x) - worldMousePos.x;
        const dy = (targetY + inst.velocity.y) - worldMousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 18; // Large radius for dramatic effect
        if (dist < interactionRadius && dist > 0.1) {
          const force = (interactionRadius - dist) / interactionRadius;
          // Add explosive velocity pushing away from mouse
          inst.velocity.x += (dx / dist) * force * 3.5;
          inst.velocity.y += (dy / dist) * force * 3.5;
        }

        // Apply friction and spring back to center (0,0) offset
        inst.velocity.multiplyScalar(0.85); // Friction
        inst.velocity.x += (0 - inst.velocity.x) * 0.08; // Spring back
        inst.velocity.y += (0 - inst.velocity.y) * 0.08;

        const finalX = targetX + inst.velocity.x;
        const finalY = targetY + inst.velocity.y;
        const finalZ = targetZ;

        // Rotation updates
        inst.rotation += inst.rotationSpeed;
        const finalRotation = THREE.MathUtils.lerp(inst.rotation, 0, easeProgress);

        // Scale updates (breathing effect)
        const breathing = Math.sin(time * 2 + inst.phaseX) * 0.05;
        const currentScale = inst.scale + breathing;
        const finalScale = THREE.MathUtils.lerp(currentScale, 0.5, easeProgress);

        // Update Dummy
        dummy.position.set(finalX, finalY, finalZ);
        dummy.rotation.z = finalRotation;
        dummy.scale.set(finalScale, finalScale, finalScale);
        
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {textureGroups.map((group, texIdx) => (
        <instancedMesh
          key={texIdx}
          ref={(el) => {
            if (el) meshRefs.current[texIdx] = el;
          }}
          args={[undefined, undefined, group.length]}
        >
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial 
            map={textures[texIdx]} 
            transparent={true} 
            depthWrite={false}
            opacity={0.9} 
          />
        </instancedMesh>
      ))}
    </>
  );
}

export default function YogiSwarm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useRegistrationModal();
  
  // Reactive object to pass scroll progress to the canvas loop without re-rendering React
  const scrollObj = useMemo(() => ({ progress: 0 }), []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom", // Start when top of section hits bottom of viewport
        end: "bottom top",   // End when bottom of section hits top of viewport
        scrub: 1,            // Smooth scrubbing
        onUpdate: (self) => {
          scrollObj.progress = self.progress;
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [scrollObj]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[75vh] min-h-[500px] max-h-[800px] bg-[#FAFAFC] overflow-hidden flex items-center justify-center"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas 
          camera={{ position: [0, 0, 20], fov: 45 }} 
          dpr={[1, 1.5]} 
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: "high-performance", 
            precision: "mediump" 
          }}
        >
          <SwarmMesh scrollObj={scrollObj} />
        </Canvas>
      </div>

      {/* Foreground Hero Content (Center mostly empty, text overlays) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-6 pointer-events-none">
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter text-zinc-900 drop-shadow-[0_0_20px_rgba(255,255,255,1)]">
          Just enroll me now. Do nothing.
        </h2>
        <p className="mt-8 text-xl md:text-2xl text-zinc-600 max-w-2xl mx-auto drop-shadow-[0_0_10px_rgba(255,255,255,1)] font-medium">
          The autonomous workforce is already here. Don&apos;t get left behind.
        </p>
        <div className="mt-10 pointer-events-auto">
          <button
            type="button"
            onClick={openModal}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-[16px] bg-gradient-to-r from-[#5b6ef7] via-[#7c5cff] to-[#a855f7] shadow-[0_10px_30px_rgba(124,92,255,0.35)] hover:shadow-[0_14px_40px_rgba(124,92,255,0.45)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            Get Me
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.4}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient fades at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
