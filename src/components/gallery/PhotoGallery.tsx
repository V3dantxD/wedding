"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { galleryImages } from "@/config/galleryImages";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

/**
 * Editorial asymmetrical photo gallery grid with interactive lightbox view.
 */
export function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryImages.length
    );
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
        {galleryImages.map((item, index) => (
          <SectionReveal
            key={item.id}
            delay={index * 0.08}
            className={item.gridSpanClass}
          >
            <figure className="group flex flex-col">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View larger photograph: ${item.moment}`}
                className={`relative w-full ${item.aspectClass} overflow-hidden border border-[#B99A62]/35 bg-[#E8D6B5]/25 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B1F2A]`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 94vw, 55vw"
                  className={`object-cover ${item.objectPosition} transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[#241612]/0 transition-colors duration-500 group-hover:bg-[#241612]/15"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#F8F3E9]/50 bg-[#241612]/45 text-[#F8F3E9] opacity-90 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]"
                >
                  <Expand className="h-3.5 w-3.5" />
                </span>
              </button>

              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-b border-[#B99A62]/20 pb-3">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#967741]">
                    {item.plate} · {item.moment}
                  </span>
                  <p className="mt-1 font-serif-body text-sm text-[#655046]">
                    {item.caption}
                  </p>
                </div>
              </figcaption>
            </figure>
          </SectionReveal>
        ))}
      </div>

      <GalleryLightbox
        images={galleryImages}
        activeIndex={activeIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
