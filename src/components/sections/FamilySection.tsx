"use client";

import { weddingConfig, type FamilySide } from "@/config/weddingConfig";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CornerFiligree, LotusDivider } from "@/components/ornaments/WeddingOrnaments";

function FamilyColumn({ side }: { side: FamilySide }) {
  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-8">
      <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#967741]">
        {side.city}
      </span>
      <h3 className="mt-2 font-display text-3xl sm:text-4xl font-normal text-[#5B1F2A]">
        {side.heading}
      </h3>

      <div className="mt-7 space-y-5 font-serif-body">
        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.26em] text-[#655046]/75">
            With Blessings of Elders
          </p>
          {side.elders.map((elder) => (
            <p
              key={elder}
              className="mt-1.5 text-sm sm:text-base text-[#33251F]/90"
            >
              {elder}
            </p>
          ))}
        </div>

        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.26em] text-[#655046]/75">
            Hosts
          </p>
          <p className="mt-1.5 text-base sm:text-lg font-medium text-[#33251F]">
            {side.parents}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.26em] text-[#655046]/75">
            Warmly Welcoming You
          </p>
          <ul className="mt-1.5 space-y-1 text-sm text-[#655046]">
            {side.welcoming.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Section 07 — Family Blessings.
 * Respectful, traditional invitation layout honoring both families cleanly.
 */
export function FamilySection() {
  const { heading, subheading, blessingVerse, brideSide, groomSide, closingNote } =
    weddingConfig.familyBlessings;

  return (
    <section
      id="family"
      aria-labelledby="family-heading"
      className="relative z-[30] bg-[#F3ECE0] py-24 sm:py-32 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal duration={0.7}>
          <div className="relative border border-[#B99A62]/45 bg-[#F8F3E9] px-6 py-14 sm:px-12 sm:py-20 shadow-[0_20px_50px_-30px_rgba(51,37,31,0.14)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 border border-[#B99A62]/25"
            />
            <CornerFiligree className="pointer-events-none absolute top-4 left-4 h-8 w-8 text-[#B99A62]/60" />
            <CornerFiligree className="pointer-events-none absolute top-4 right-4 h-8 w-8 rotate-90 text-[#B99A62]/60" />
            <CornerFiligree className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 rotate-180 text-[#B99A62]/60" />
            <CornerFiligree className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 -rotate-90 text-[#B99A62]/60" />

            <div className="relative flex flex-col items-center text-center">
              <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#967741]">
                07 · {subheading}
              </span>
              <h2
                id="family-heading"
                className="mt-3 font-display text-4xl sm:text-5xl font-normal text-[#33251F]"
              >
                {heading}
              </h2>
              <p className="mt-2 font-serif-body text-sm text-[#5B1F2A]">
                {blessingVerse}
              </p>
              <LotusDivider className="my-8 w-44 text-[#B99A62]" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 md:divide-x md:divide-[#B99A62]/30">
              <FamilyColumn side={brideSide} />
              <FamilyColumn side={groomSide} />
            </div>

            <p className="relative mt-12 border-t border-[#B99A62]/25 pt-8 text-center font-serif-body text-sm italic text-[#655046]">
              {closingNote}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
