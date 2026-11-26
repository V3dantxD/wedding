"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "@/config/weddingConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface HeroScrollAnimationProps {
  children: ReactNode;
}

/**
 * Pinned GSAP ScrollTrigger hero choreography.
 * Starts at the top of the tall portrait hero photograph (sunset ocean & floral mandap)
 * and progressively reveals downward toward the bride's aisle procession and veil
 * while maintaining exact natural aspect ratio on all screen sizes.
 */
export function HeroScrollAnimation({ children }: HeroScrollAnimationProps) {
  const pinStageRef = useRef<HTMLDivElement>(null);
  const imageCanvasRef = useRef<HTMLDivElement>(null);
  const overlayWrapperRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const pinStage = pinStageRef.current;
    const imageCanvas = imageCanvasRef.current;
    if (!pinStage || !imageCanvas) return;

    if (prefersReducedMotion) {
      gsap.set(imageCanvas, { clearProps: "all" });
      if (overlayWrapperRef.current) {
        gsap.set(overlayWrapperRef.current, { clearProps: "all" });
      }
      return;
    }

    const imageRatio =
      weddingConfig.heroImage.width / weddingConfig.heroImage.height;

    const computeStageGeometry = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isCompact = vw < 1024;

      // Ensure the image wrapper has generous vertical headroom for continuous downward movement
      // without exposing empty background on either desktop or mobile.
      const minHeight = vh * (isCompact ? 1.7 : 1.75);
      const width = Math.max(vw, minHeight * imageRatio);
      const height = width / imageRatio;

      const maxTravelY = Math.max(0, height - vh);
      // Reveal from top of photograph (sunset, ocean, floral mandap) down to the bottom (bride & aisle veil)
      const startY = 0;
      const endY = -maxTravelY;

      // On narrower viewports where image width exceeds vw, track smoothly from the mandap/sun to the bride
      const minX = Math.min(0, -(width - vw));
      const clampX = (val: number) => Math.max(minX, Math.min(0, val));
      const startX = width > vw ? clampX(vw * 0.5 - width * 0.67) : 0;
      const endX = width > vw ? clampX(vw * 0.5 - width * 0.46) : 0;

      const scrollDistance = Math.round(Math.max(vh * 2.15, 1650));

      return { width, height, startX, endX, startY, endY, scrollDistance };
    };

    const ctx = gsap.context(() => {
      let geometry = computeStageGeometry();

      const applyInitialPosition = () => {
        geometry = computeStageGeometry();
        gsap.set(imageCanvas, {
          width: geometry.width,
          height: geometry.height,
          x: geometry.startX,
          y: geometry.startY,
        });
      };

      applyInitialPosition();

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinStage,
          start: "top top",
          end: () => `+=${computeStageGeometry().scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 10,
          onRefresh: () => {
            applyInitialPosition();
          },
        },
      });

      // Continuous, easing-free scrubbed downward progression through the photograph
      timeline.fromTo(
        imageCanvas,
        {
          x: () => computeStageGeometry().startX,
          y: () => computeStageGeometry().startY,
        },
        {
          x: () => computeStageGeometry().endX,
          y: () => computeStageGeometry().endY,
          ease: "none",
          duration: 1,
        },
        0
      );

      // Softly clear the hero title overlay once the user begins exploring the full photograph,
      // letting the groom, floral mandap, and sunset waves breathe cleanly.
      if (overlayWrapperRef.current) {
        timeline.fromTo(
          overlayWrapperRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -28, ease: "none", duration: 0.34 },
          0.08
        );
      }

      if (progressFillRef.current) {
        timeline.fromTo(
          progressFillRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 1 },
          0
        );
      }
    }, pinStageRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      aria-label="Wedding Invitation Opening"
      className="relative w-full bg-[#241612]"
    >
      {/* Layer 1 (z-[1]): Pinned photographic canvas */}
      <div
        ref={pinStageRef}
        className="relative h-dvh w-full overflow-hidden z-[1] bg-[#241612]"
      >
        <div
          ref={imageCanvasRef}
          className={
            prefersReducedMotion
              ? "relative h-full w-full"
              : "absolute top-0 left-0 will-change-transform"
          }
          style={
            prefersReducedMotion
              ? undefined
              : {
                  width: "100%",
                  height: "100%",
                }
          }
        >
          <Image
            src={weddingConfig.heroImage.src}
            alt={weddingConfig.heroImage.alt}
            fill
            priority
            fetchPriority="high"
            quality={95}
            sizes="(max-width: 1024px) 185vw, 100vw"
            className={
              prefersReducedMotion
                ? "object-cover object-[58%_48%]"
                : "object-cover object-center select-none pointer-events-none"
            }
          />
        </div>

        {/* Atmospheric contrast veil for crisp serif legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#1D110E]/55 via-[#1D110E]/18 to-[#1D110E]/72"
        />

        {/* Subtle warm ivory dissolve edge along the very bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-[3] bg-gradient-to-t from-[#1D110E]/50 to-transparent"
        />

        {/* Delicate scroll reveal hairline cue */}
        {!prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-6 sm:left-10 z-[4] flex items-center gap-3 text-[10px] tracking-[0.26em] uppercase text-[#E8D6B5]/80"
          >
            <span>01</span>
            <span className="relative h-[1px] w-16 sm:w-24 bg-[#E8D6B5]/30 overflow-hidden">
              <span
                ref={progressFillRef}
                className="absolute inset-0 origin-left bg-[#E8D6B5] scale-x-0"
              />
            </span>
          </div>
        )}
      </div>

      {/* Layer 3 (z-[25]): Sticky typography overlay above pinned photo (z-1) and flower petals (z-15) */}
      <div className="pointer-events-none absolute inset-0 z-[25]">
        <div className="sticky top-0 h-dvh w-full flex flex-col justify-end">
          <div
            ref={overlayWrapperRef}
            className="w-full will-change-[opacity,transform]"
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
