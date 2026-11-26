"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Coordinates React Lenis smooth scrolling with GSAP ScrollTrigger.
 * Falls back cleanly to native scrolling when the user prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let frameId = 0;
    let boundLenis: NonNullable<LenisRef["lenis"]> | null = null;

    const handleTicker = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    const bindScrollTrigger = () => {
      const instance = lenisRef.current?.lenis;
      if (!instance) {
        frameId = window.requestAnimationFrame(bindScrollTrigger);
        return;
      }
      boundLenis = instance;
      boundLenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();
    };

    bindScrollTrigger();

    return () => {
      window.cancelAnimationFrame(frameId);
      gsap.ticker.remove(handleTicker);
      if (boundLenis) {
        boundLenis.off("scroll", ScrollTrigger.update);
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.085,
        wheelMultiplier: 0.92,
        smoothWheel: true,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
