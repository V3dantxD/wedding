"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { weddingConfig } from "@/config/weddingConfig";
import { HeroScrollAnimation } from "@/components/animations/HeroScrollAnimation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Section 01 — Opening / Hero.
 * Combines GSAP ScrollTrigger pinned photograph reveal with timed Framer Motion
 * editorial typography entrance.
 */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  const handleScrollDown = () => {
    const target = document.getElementById("invitation");
    if (!target) return;
    if (lenis && !prefersReducedMotion) {
      lenis.scrollTo(target, { duration: 1.5 });
    } else {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <HeroScrollAnimation>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-12 sm:px-6 sm:pb-16 lg:pb-20 text-center text-[#F8F3E9]">
        {/* Small Wedding Invitation Label */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-3.5"
        >
          <span className="h-[1px] w-6 sm:w-10 bg-[#E8D6B5]/65" />
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.34em] text-[#E8D6B5]">
            {weddingConfig.weddingLabel}
          </span>
          <span className="h-[1px] w-6 sm:w-10 bg-[#E8D6B5]/65" />
        </motion.div>

        {/* Couple's Names — Fade in first */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center font-display font-light tracking-[0.04em] text-[#F8F3E9] drop-shadow-[0_2px_22px_rgba(18,10,8,0.65)] text-[2.65rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          <span>{weddingConfig.brideFirstName}</span>
          <span className="my-0.5 sm:my-0 sm:mx-4 md:mx-5 font-display italic font-light text-[#E8D6B5] text-[0.72em] sm:text-[0.78em]">
            &amp;
          </span>
          <span>{weddingConfig.groomFirstName}</span>
        </motion.h1>

        {/* Destination Subtitle — Appears after names (marriage date removed from hero) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-5 flex flex-col items-center gap-1.5"
        >
          <p className="text-[11px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#E8D6B5]/90 drop-shadow-[0_1px_12px_rgba(18,10,8,0.6)]">
            {weddingConfig.weddingLocation} · {weddingConfig.venueSubtitle}
          </p>
        </motion.div>

        {/* Scroll Indicator — Appears last */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-9 pointer-events-auto"
        >
          <button
            type="button"
            onClick={handleScrollDown}
            aria-label="Scroll to read the wedding invitation"
            className="group flex flex-col items-center gap-2 text-[#E8D6B5]/90 transition-colors hover:text-[#F8F3E9] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E8D6B5] rounded-md px-3 py-1"
          >
            <span className="text-[10px] uppercase tracking-[0.28em]">
              Scroll to Unveil
            </span>
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
              }
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E8D6B5]/45 bg-[#1D110E]/30 backdrop-blur-[2px] group-hover:border-[#E8D6B5]"
            >
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
          </button>
        </motion.div>
      </div>
    </HeroScrollAnimation>
  );
}
