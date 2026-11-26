"use client";

import Image from "next/image";
import { weddingConfig } from "@/config/weddingConfig";
import { SectionReveal } from "@/components/animations/SectionReveal";

/**
 * Section 06 — A Message from the Couple.
 * Quiet, letter-inspired editorial reading section with gentle serif typography.
 */
export function CoupleMessageSection() {
  const { heading, salutation, paragraphs, signOff, signature, image, imageAlt } =
    weddingConfig.coupleMessage;

  return (
    <section
      id="message"
      aria-labelledby="message-heading"
      className="relative z-[30] bg-[#F8F3E9] border-t border-[#B99A62]/20 py-24 sm:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#E9C8C4]/18 via-transparent to-[#E8D6B5]/15"
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Intimate Detail Photograph */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#B99A62]/35 p-2 bg-[#F3ECE0]">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 92vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Personal Letter */}
            <div className="lg:col-span-7 max-w-xl">
              <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#967741]">
                06 · {heading}
              </span>
              <h2
                id="message-heading"
                className="mt-3 font-display text-3xl sm:text-4xl font-normal italic text-[#5B1F2A]"
              >
                {salutation}
              </h2>

              <div className="mt-6 space-y-5 font-serif-body text-base sm:text-[1.06rem] leading-[1.9] text-[#33251F]/90">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 border-t border-[#B99A62]/25 pt-6">
                <p className="font-serif-body text-sm italic text-[#655046]">
                  {signOff}
                </p>
                <p className="mt-2 font-display text-3xl sm:text-4xl font-normal tracking-[0.03em] text-[#5B1F2A]">
                  {signature}
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
