"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PetalSpec {
  id: number;
  leftPercent: number;
  startTopVh: number;
  sizePx: number;
  fallVh: number;
  driftVw: number;
  swayFreq: number;
  startRotate: number;
  endRotate: number;
  scaleStart: number;
  scaleEnd: number;
  peakOpacity: number;
  variant: 0 | 1 | 2 | 3;
  mobileIncluded: boolean;
}

const PETAL_PALETTES = [
  { fill: "#E7BDB8", shade: "#CF9690" }, // Soft dusty blush rose
  { fill: "#E5C07B", shade: "#C8984B" }, // Warm marigold champagne
  { fill: "#FBF5E9", shade: "#E6D5B8" }, // Ivory mogra jasmine
  { fill: "#C89EB9", shade: "#9E6E8E" }, // Royal mandap lavender
] as const;

const PETAL_SPECS: PetalSpec[] = [
  { id: 0, leftPercent: 6, startTopVh: -12, sizePx: 22, fallVh: 122, driftVw: 6, swayFreq: 1.8, startRotate: -25, endRotate: 210, scaleStart: 0.9, scaleEnd: 1.05, peakOpacity: 0.72, variant: 0, mobileIncluded: true },
  { id: 1, leftPercent: 14, startTopVh: -18, sizePx: 18, fallVh: 132, driftVw: -5, swayFreq: 2.2, startRotate: 40, endRotate: -195, scaleStart: 0.8, scaleEnd: 0.95, peakOpacity: 0.65, variant: 1, mobileIncluded: false },
  { id: 2, leftPercent: 21, startTopVh: -8, sizePx: 26, fallVh: 118, driftVw: 8, swayFreq: 1.5, startRotate: 12, endRotate: 265, scaleStart: 0.95, scaleEnd: 1.1, peakOpacity: 0.75, variant: 2, mobileIncluded: true },
  { id: 3, leftPercent: 29, startTopVh: -22, sizePx: 20, fallVh: 138, driftVw: -7, swayFreq: 2.0, startRotate: -60, endRotate: 170, scaleStart: 0.85, scaleEnd: 1.0, peakOpacity: 0.68, variant: 3, mobileIncluded: false },
  { id: 4, leftPercent: 37, startTopVh: -14, sizePx: 24, fallVh: 126, driftVw: 5, swayFreq: 1.6, startRotate: 85, endRotate: -140, scaleStart: 0.9, scaleEnd: 1.05, peakOpacity: 0.7, variant: 0, mobileIncluded: true },
  { id: 5, leftPercent: 45, startTopVh: -26, sizePx: 17, fallVh: 142, driftVw: 9, swayFreq: 2.4, startRotate: -15, endRotate: 290, scaleStart: 0.8, scaleEnd: 0.95, peakOpacity: 0.62, variant: 1, mobileIncluded: false },
  { id: 6, leftPercent: 53, startTopVh: -10, sizePx: 28, fallVh: 120, driftVw: -6, swayFreq: 1.7, startRotate: 30, endRotate: -220, scaleStart: 1.0, scaleEnd: 1.12, peakOpacity: 0.74, variant: 2, mobileIncluded: true },
  { id: 7, leftPercent: 61, startTopVh: -19, sizePx: 21, fallVh: 135, driftVw: 7, swayFreq: 2.1, startRotate: -40, endRotate: 195, scaleStart: 0.88, scaleEnd: 1.02, peakOpacity: 0.66, variant: 0, mobileIncluded: false },
  { id: 8, leftPercent: 69, startTopVh: -15, sizePx: 25, fallVh: 128, driftVw: -8, swayFreq: 1.9, startRotate: 65, endRotate: 310, scaleStart: 0.92, scaleEnd: 1.08, peakOpacity: 0.72, variant: 3, mobileIncluded: true },
  { id: 9, leftPercent: 77, startTopVh: -24, sizePx: 19, fallVh: 140, driftVw: 5, swayFreq: 2.3, startRotate: -80, endRotate: 150, scaleStart: 0.85, scaleEnd: 1.0, peakOpacity: 0.64, variant: 1, mobileIncluded: false },
  { id: 10, leftPercent: 84, startTopVh: -11, sizePx: 24, fallVh: 124, driftVw: -5, swayFreq: 1.6, startRotate: 22, endRotate: -240, scaleStart: 0.9, scaleEnd: 1.06, peakOpacity: 0.73, variant: 2, mobileIncluded: true },
  { id: 11, leftPercent: 92, startTopVh: -20, sizePx: 20, fallVh: 136, driftVw: -7, swayFreq: 2.0, startRotate: -30, endRotate: 205, scaleStart: 0.86, scaleEnd: 1.0, peakOpacity: 0.68, variant: 0, mobileIncluded: true },
  { id: 12, leftPercent: 10, startTopVh: -30, sizePx: 27, fallVh: 146, driftVw: 7, swayFreq: 1.8, startRotate: 50, endRotate: -180, scaleStart: 0.95, scaleEnd: 1.08, peakOpacity: 0.7, variant: 3, mobileIncluded: false },
  { id: 13, leftPercent: 25, startTopVh: -34, sizePx: 22, fallVh: 148, driftVw: -6, swayFreq: 2.2, startRotate: -10, endRotate: 245, scaleStart: 0.88, scaleEnd: 1.0, peakOpacity: 0.66, variant: 1, mobileIncluded: true },
  { id: 14, leftPercent: 40, startTopVh: -28, sizePx: 23, fallVh: 144, driftVw: 8, swayFreq: 1.7, startRotate: 75, endRotate: -210, scaleStart: 0.9, scaleEnd: 1.04, peakOpacity: 0.68, variant: 2, mobileIncluded: false },
  { id: 15, leftPercent: 56, startTopVh: -36, sizePx: 19, fallVh: 150, driftVw: -7, swayFreq: 2.5, startRotate: -55, endRotate: 260, scaleStart: 0.82, scaleEnd: 0.98, peakOpacity: 0.64, variant: 0, mobileIncluded: true },
  { id: 16, leftPercent: 72, startTopVh: -32, sizePx: 26, fallVh: 145, driftVw: 6, swayFreq: 1.9, startRotate: 18, endRotate: -255, scaleStart: 0.94, scaleEnd: 1.1, peakOpacity: 0.72, variant: 1, mobileIncluded: false },
  { id: 17, leftPercent: 88, startTopVh: -29, sizePx: 21, fallVh: 143, driftVw: -8, swayFreq: 2.1, startRotate: -45, endRotate: 185, scaleStart: 0.85, scaleEnd: 1.02, peakOpacity: 0.67, variant: 3, mobileIncluded: true },
  { id: 18, leftPercent: 18, startTopVh: -42, sizePx: 24, fallVh: 156, driftVw: 6, swayFreq: 1.6, startRotate: 35, endRotate: -190, scaleStart: 0.9, scaleEnd: 1.05, peakOpacity: 0.65, variant: 2, mobileIncluded: false },
  { id: 19, leftPercent: 48, startTopVh: -46, sizePx: 22, fallVh: 158, driftVw: -5, swayFreq: 2.0, startRotate: -20, endRotate: 230, scaleStart: 0.88, scaleEnd: 1.0, peakOpacity: 0.62, variant: 0, mobileIncluded: true },
  { id: 20, leftPercent: 65, startTopVh: -40, sizePx: 25, fallVh: 152, driftVw: 7, swayFreq: 1.8, startRotate: 60, endRotate: -225, scaleStart: 0.92, scaleEnd: 1.08, peakOpacity: 0.69, variant: 1, mobileIncluded: false },
  { id: 21, leftPercent: 80, startTopVh: -44, sizePx: 20, fallVh: 155, driftVw: -6, swayFreq: 2.3, startRotate: -70, endRotate: 175, scaleStart: 0.84, scaleEnd: 1.0, peakOpacity: 0.64, variant: 2, mobileIncluded: false },
  { id: 22, leftPercent: 33, startTopVh: -38, sizePx: 23, fallVh: 150, driftVw: 5, swayFreq: 1.9, startRotate: 28, endRotate: -205, scaleStart: 0.9, scaleEnd: 1.04, peakOpacity: 0.66, variant: 3, mobileIncluded: false },
  { id: 23, leftPercent: 94, startTopVh: -35, sizePx: 18, fallVh: 147, driftVw: -7, swayFreq: 2.1, startRotate: -38, endRotate: 215, scaleStart: 0.84, scaleEnd: 0.98, peakOpacity: 0.62, variant: 0, mobileIncluded: false },
];

function PetalSvg({ variant, size }: { variant: 0 | 1 | 2 | 3; size: number }) {
  const palette = PETAL_PALETTES[variant];

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`petal-grad-${variant}`} x1="6" y1="2" x2="26" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={palette.fill} />
          <stop offset="100%" stopColor={palette.shade} />
        </linearGradient>
      </defs>
      {variant % 2 === 0 ? (
        <path
          d="M16 2C24 6 29 15 27 25C25.5 32 20.5 37 16 38C11.5 37 6.5 32 5 25C3 15 8 6 16 2Z"
          fill={`url(#petal-grad-${variant})`}
        />
      ) : (
        <path
          d="M15.5 3C23 5.5 28.5 13 26.5 22.5C24.8 30.5 19.5 36.5 14 37.5C9 36 5.5 30 5 21.5C4.5 12 9 5.5 15.5 3Z"
          fill={`url(#petal-grad-${variant})`}
        />
      )}
      <path
        d="M16 6C15.5 16 15.8 25 16 34"
        stroke="#7A5248"
        strokeWidth="0.6"
        strokeOpacity="0.22"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Scroll-synchronized illustrated flower petals flowing behind typography
 * from Section 01 (Hero) through the end of Section 02 (Traditional Invitation).
 */
export function FlowerPetals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const [isCompactScreen, setIsCompactScreen] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsCompactScreen(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const visiblePetals = useMemo(
    () =>
      isCompactScreen
        ? PETAL_SPECS.filter((petal) => petal.mobileIncluded)
        : PETAL_SPECS,
    [isCompactScreen]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const heroEl = document.getElementById("hero");
    const invitationEl = document.getElementById("invitation");
    if (!heroEl || !invitationEl) return;

    const ctx = gsap.context(() => {
      // Initial resting state above viewport
      visiblePetals.forEach((petal, index) => {
        const el = petalRefs.current[index];
        if (!el) return;
        gsap.set(el, {
          opacity: 0,
          x: 0,
          y: 0,
          rotation: petal.startRotate,
          scale: petal.scaleStart,
        });
      });

      const trigger = ScrollTrigger.create({
        trigger: heroEl,
        start: "top top",
        endTrigger: invitationEl,
        end: "bottom 75%",
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: 5,
        onUpdate: (self) => {
          const p = self.progress;
          const vh = window.innerHeight;
          const vw = window.innerWidth;

          visiblePetals.forEach((petal, index) => {
            const el = petalRefs.current[index];
            if (!el) return;

            // Gentle staggered start so petals enter organically rather than all at once
            const staggerStart = (index % 5) * 0.035;
            const localP = Math.max(0, Math.min(1, (p - staggerStart) / (1 - staggerStart)));

            // Smooth romantic fade-in during Hero scroll and gradual disappearance toward end of Section 02
            let opacityFactor = 0;
            if (localP > 0.01 && localP < 0.16) {
              opacityFactor = (localP - 0.01) / 0.15;
            } else if (localP >= 0.16 && localP <= 0.78) {
              opacityFactor = 1;
            } else if (localP > 0.78 && localP < 1) {
              opacityFactor = 1 - (localP - 0.78) / 0.22;
            }

            const translateY = (localP * petal.fallVh * vh) / 100;
            const horizontalWave =
              Math.sin(localP * Math.PI * petal.swayFreq + index) *
              ((petal.driftVw * vw) / 100);
            const translateX =
              horizontalWave + localP * ((petal.driftVw * 0.45 * vw) / 100);
            const rotation =
              petal.startRotate + (petal.endRotate - petal.startRotate) * localP;
            const scale =
              petal.scaleStart + (petal.scaleEnd - petal.scaleStart) * localP;

            el.style.opacity = (petal.peakOpacity * opacityFactor).toFixed(3);
            el.style.transform = `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px, 0) rotate(${rotation.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
          });
        },
      });

      // Ensure trigger positions account for the pinned hero spacer
      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion, visiblePetals]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-flower-petals="true"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[15] overflow-hidden"
    >
      {visiblePetals.map((petal, index) => (
        <div
          key={petal.id}
          ref={(el) => {
            petalRefs.current[index] = el;
          }}
          className="absolute will-change-transform opacity-0"
          style={{
            left: `${petal.leftPercent}%`,
            top: `${petal.startTopVh}vh`,
          }}
        >
          <PetalSvg variant={petal.variant} size={petal.sizePx} />
        </div>
      ))}
    </div>
  );
}
