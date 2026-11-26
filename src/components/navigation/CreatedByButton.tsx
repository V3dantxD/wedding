"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Phone, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { weddingConfig } from "@/config/weddingConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  CornerFiligree,
  LotusDivider,
} from "@/components/ornaments/WeddingOrnaments";

/**
 * Refined side bookmark button ("Created By") and accessible stationery pop-up
 * displaying the studio creators' contact details without disturbing page aesthetics.
 */
export function CreatedByButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const triggerEl = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      triggerEl?.focus();
    };
  }, [isOpen, lenis]);

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      window.setTimeout(() => {
        setCopiedIndex((curr) => (curr === index ? null : curr));
      }, 1800);
    } catch {
      // Fallback safely ignored if clipboard API unavailable
    }
  };

  const { buttonLabel, eyebrow, heading, subheading, creators } =
    weddingConfig.studioCredits;

  return (
    <>
      {/* Discreet right-edge luxury bookmark tab */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="View website creators contact details"
        className="group fixed right-0 top-[44%] sm:top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 rounded-l-md border border-r-0 border-[#B99A62]/55 bg-[#F8F3E9]/92 py-3.5 pl-2 pr-1.5 sm:py-4 sm:pl-2.5 sm:pr-2 text-[#5B1F2A] shadow-[0_10px_28px_-10px_rgba(30,17,14,0.35)] backdrop-blur-md transition-all duration-300 hover:pl-3 hover:bg-[#5B1F2A] hover:text-[#F8F3E9] hover:border-[#E8D6B5]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A62]"
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rotate-45 bg-[#B99A62] transition-colors duration-300 group-hover:bg-[#E8D6B5]"
        />
        <span
          style={{ writingMode: "vertical-rl" }}
          className="rotate-180 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
        >
          {buttonLabel}
        </span>
      </button>

      {/* Pop-up Card Portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="created-by-title"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-[#1B110E]/75 backdrop-blur-sm"
              >
                {/* Backdrop */}
                <div
                  aria-hidden="true"
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0"
                />

                {/* Editorial Stationery Card */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 14, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8, scale: 0.985 }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-md border border-[#B99A62]/60 bg-[#F8F3E9] px-7 py-10 sm:px-10 sm:py-12 text-[#33251F] shadow-[0_28px_72px_-20px_rgba(12,6,4,0.65)]"
                >
                  {/* Inner fine hairline & corner filigrees */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 border border-[#B99A62]/25"
                  />
                  <CornerFiligree className="pointer-events-none absolute top-4 left-4 h-7 w-7 text-[#B99A62]/65" />
                  <CornerFiligree className="pointer-events-none absolute top-4 right-4 h-7 w-7 rotate-90 text-[#B99A62]/65" />
                  <CornerFiligree className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 rotate-180 text-[#B99A62]/65" />
                  <CornerFiligree className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 -rotate-90 text-[#B99A62]/65" />

                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close creator contact pop-up"
                    className="absolute top-5 right-5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#B99A62]/40 bg-[#F8F3E9] text-[#33251F] transition-colors hover:border-[#5B1F2A] hover:bg-[#5B1F2A] hover:text-[#F8F3E9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B1F2A]"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <div className="relative flex flex-col items-center text-center">
                    <span className="text-[9.5px] font-medium uppercase tracking-[0.32em] text-[#967741]">
                      {eyebrow}
                    </span>
                    <h2
                      id="created-by-title"
                      className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-[0.02em] text-[#5B1F2A]"
                    >
                      {heading}
                    </h2>
                    <p className="mt-2 max-w-xs font-serif-body text-xs sm:text-sm leading-relaxed text-[#655046]">
                      {subheading}
                    </p>

                    <LotusDivider className="my-6 w-36 text-[#B99A62]" />

                    <ul className="w-full space-y-3.5 text-left">
                      {creators.map((creator, index) => (
                        <li
                          key={creator.name}
                          className="flex items-center justify-between gap-3 border border-[#B99A62]/30 bg-[#F3ECE0]/65 px-4 py-3.5 transition-colors hover:border-[#B99A62]/65"
                        >
                          <div>
                            <p className="font-display text-xl font-medium text-[#33251F]">
                              {creator.name}
                            </p>
                            <a
                              href={creator.phoneHref}
                              className="mt-0.5 inline-flex items-center gap-1.5 text-xs sm:text-sm tracking-[0.06em] text-[#5B1F2A] hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5B1F2A]"
                            >
                              <Phone
                                className="h-3.5 w-3.5 text-[#967741]"
                                aria-hidden="true"
                              />
                              <span>{creator.phoneDisplay}</span>
                            </a>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(creator.phoneDisplay, index)
                            }
                            aria-label={`Copy phone number for ${creator.name}`}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B99A62]/35 bg-[#F8F3E9] text-[#655046] transition-colors hover:border-[#5B1F2A] hover:text-[#5B1F2A] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5B1F2A]"
                          >
                            {copiedIndex === index ? (
                              <Check
                                className="h-3.5 w-3.5 text-[#5B1F2A]"
                                aria-hidden="true"
                              />
                            ) : (
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
