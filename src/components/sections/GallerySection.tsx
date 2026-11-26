"use client";

import { SectionReveal } from "@/components/animations/SectionReveal";
import { LotusDivider } from "@/components/ornaments/WeddingOrnaments";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";

/**
 * Section 05 — Photo Gallery.
 * Editorial spread of varied aspect ratios with subtle hover states and interactive lightbox.
 */
export function GallerySection() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative z-[30] bg-[#F8F3E9] py-24 sm:py-32 px-5 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#967741]">
            05 · The Album
          </span>
          <h2
            id="gallery-heading"
            className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.02em] text-[#33251F]"
          >
            Moments Along the Shore
          </h2>
          <p className="mt-4 max-w-lg font-serif-body text-sm sm:text-base leading-relaxed text-[#655046]">
            Select any frame to open the full editorial view.
          </p>
          <LotusDivider className="mt-7 w-44 text-[#B99A62]" />
        </SectionReveal>

        <PhotoGallery />
      </div>
    </section>
  );
}
