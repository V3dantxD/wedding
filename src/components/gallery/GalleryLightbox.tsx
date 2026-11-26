"use client";

import { TouchEvent, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLenis } from "lenis/react";
import type { GalleryImage } from "@/config/galleryImages";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GalleryLightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Full-screen editorial lightbox with keyboard navigation, mobile touch swipe,
 * smooth scroll locking, and focus management.
 */
export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  const isOpen = activeIndex !== null && images[activeIndex] !== undefined;
  const activeImage = isOpen ? images[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const previousFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    lenis?.stop();

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      previousFocused?.focus();
    };
  }, [isOpen, lenis, onClose, onNext, onPrev]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== "number") return;

    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (deltaX > 48) {
      onPrev();
    } else if (deltaX < -48) {
      onNext();
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && activeImage && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo gallery lightbox: ${activeImage.moment}`}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#1B110E]/95 text-[#F8F3E9] backdrop-blur-md p-4 sm:p-8"
        >
          {/* Backdrop click catcher */}
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 z-0"
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#E8D6B5]">
                {activeImage.plate}
              </span>
              <span className="text-xs text-[#E8D6B5]/45">·</span>
              <span className="text-xs tracking-[0.14em] uppercase text-[#F8F3E9]/75">
                {activeIndex + 1} / {images.length}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close photo gallery"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D6B5]/35 bg-[#1B110E]/60 text-[#F8F3E9] transition-colors hover:border-[#E8D6B5] hover:bg-[#5B1F2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D6B5]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Center Image Stage */}
          <div className="relative z-10 my-auto flex items-center justify-center gap-3 sm:gap-6 py-4">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous photograph"
              className="hidden sm:inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8D6B5]/30 bg-[#1B110E]/50 text-[#F8F3E9] transition-colors hover:border-[#E8D6B5] hover:bg-[#5B1F2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D6B5]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <motion.div
              key={activeImage.id}
              initial={
                prefersReducedMotion ? false : { opacity: 0.4, scale: 0.985 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[66dvh] sm:h-[74dvh] w-full max-w-5xl"
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="95vw"
                quality={95}
                priority
                className="object-contain select-none"
              />
            </motion.div>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next photograph"
              className="hidden sm:inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8D6B5]/30 bg-[#1B110E]/50 text-[#F8F3E9] transition-colors hover:border-[#E8D6B5] hover:bg-[#5B1F2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D6B5]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Caption & Mobile Navigation Controls */}
          <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center">
            <div>
              <p className="font-display text-xl sm:text-2xl text-[#E8D6B5]">
                {activeImage.moment}
              </p>
              <p className="mt-1 font-serif-body text-xs sm:text-sm text-[#F8F3E9]/80">
                {activeImage.caption}
              </p>
            </div>

            <div className="flex sm:hidden items-center gap-6">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D6B5]/35 text-[#F8F3E9] active:bg-[#5B1F2A]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#E8D6B5]/70">
                Swipe or tap
              </span>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D6B5]/35 text-[#F8F3E9] active:bg-[#5B1F2A]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
