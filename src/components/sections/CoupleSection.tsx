"use client";

import Image from "next/image";
import { weddingConfig } from "@/config/weddingConfig";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { LotusDivider } from "@/components/ornaments/WeddingOrnaments";

/**
 * Section 04 — Meet the Bride & Groom.
 * Editorial side-by-side portraits on desktop, vertical stack on mobile,
 * accompanied by personal introductions and their shared journey.
 */
export function CoupleSection() {
  const { bride, groom, sectionLabel, sectionTitle, storyHeading, story } =
    weddingConfig.couple;

  return (
    <section
      id="couple"
      aria-labelledby="couple-heading"
      className="relative z-[30] bg-[#F3ECE0] py-24 sm:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Subtle warm radial glow behind portraits */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#E9C8C4]/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionReveal className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#967741]">
            04 · {sectionLabel}
          </span>
          <h2
            id="couple-heading"
            className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.02em] text-[#33251F]"
          >
            {sectionTitle}
          </h2>
          <LotusDivider className="mt-7 w-44 text-[#B99A62]" />
        </SectionReveal>

        {/* Side-by-side portraits on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-12 lg:gap-20 items-start">
          {/* Bride */}
          <SectionReveal delay={0.05} className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden border border-[#B99A62]/40 p-2 bg-[#F8F3E9]">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={bride.portrait}
                  alt={bride.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 42vw"
                  className="object-cover object-top transition-transform duration-1000 ease-out hover:scale-[1.02]"
                />
              </div>
            </div>
            <span className="mt-7 text-[10px] uppercase tracking-[0.3em] text-[#967741]">
              The Bride
            </span>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-[#5B1F2A]">
              {bride.name}
            </h3>
            <p className="mt-1.5 text-xs tracking-[0.14em] uppercase text-[#655046]/85">
              {bride.lineage}
            </p>
            <p className="mt-4 max-w-md font-serif-body text-sm sm:text-base leading-relaxed text-[#655046]">
              {bride.bio}
            </p>
          </SectionReveal>

          {/* Groom */}
          <SectionReveal delay={0.16} className="flex flex-col items-center text-center md:mt-14">
            <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden border border-[#B99A62]/40 p-2 bg-[#F8F3E9]">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={groom.portrait}
                  alt={groom.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 42vw"
                  className="object-cover object-top transition-transform duration-1000 ease-out hover:scale-[1.02]"
                />
              </div>
            </div>
            <span className="mt-7 text-[10px] uppercase tracking-[0.3em] text-[#967741]">
              The Groom
            </span>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-[#5B1F2A]">
              {groom.name}
            </h3>
            <p className="mt-1.5 text-xs tracking-[0.14em] uppercase text-[#655046]/85">
              {groom.lineage}
            </p>
            <p className="mt-4 max-w-md font-serif-body text-sm sm:text-base leading-relaxed text-[#655046]">
              {groom.bio}
            </p>
          </SectionReveal>
        </div>

        {/* Relationship Story */}
        <SectionReveal delay={0.1} className="mt-20 sm:mt-24 mx-auto max-w-2xl text-center">
          <div className="border-t border-[#B99A62]/30 pt-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#967741]">
              {storyHeading}
            </span>
            <p className="mt-4 font-serif-body text-base sm:text-lg italic leading-loose text-[#33251F]/90">
              “{story}”
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
