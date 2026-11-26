"use client";

import { weddingConfig } from "@/config/weddingConfig";
import { SectionReveal } from "@/components/animations/SectionReveal";
import {
  CornerFiligree,
  GaneshCrest,
  LotusDivider,
  MandalaWatermark,
} from "@/components/ornaments/WeddingOrnaments";

/**
 * Section 02 — Traditional Invitation.
 * Warm parchment aesthetic with subtle architectural borders, Ganesh invocation,
 * and layered z-indices so scroll-linked flower petals drift behind typography.
 */
export function InvitationSection() {
  return (
    <section
      id="invitation"
      aria-labelledby="invitation-heading"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-8"
    >
      {/* Background Parchment Layer (z-[1]) sits below FlowerPetals (z-[15]) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[#F8F3E9] paper-texture overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#B99A62]/[0.06]">
          <MandalaWatermark className="h-[34rem] w-[34rem] sm:h-[46rem] sm:w-[46rem]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#E8D6B5]/25 to-transparent" />
      </div>

      {/* Foreground Invitation Card Content (z-[25]) sits cleanly above FlowerPetals (z-[15]) */}
      <div className="relative z-[25] mx-auto max-w-4xl">
        <SectionReveal>
          <div className="relative border border-[#B99A62]/45 bg-[#F8F3E9]/82 px-6 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24 shadow-[0_24px_64px_-32px_rgba(51,37,31,0.16)] backdrop-blur-[1px]">
            {/* Inner subtle hairline frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 sm:inset-4 border border-[#B99A62]/25"
            />

            {/* Four Ornamental Corners */}
            <CornerFiligree className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 h-8 w-8 sm:h-10 sm:w-10 text-[#B99A62]/65" />
            <CornerFiligree className="pointer-events-none absolute top-4 right-4 sm:top-6 sm:right-6 h-8 w-8 sm:h-10 sm:w-10 rotate-90 text-[#B99A62]/65" />
            <CornerFiligree className="pointer-events-none absolute bottom-4 right-4 sm:bottom-6 sm:right-6 h-8 w-8 sm:h-10 sm:w-10 rotate-180 text-[#B99A62]/65" />
            <CornerFiligree className="pointer-events-none absolute bottom-4 left-4 sm:bottom-6 sm:left-6 h-8 w-8 sm:h-10 sm:w-10 -rotate-90 text-[#B99A62]/65" />

            <div className="relative flex flex-col items-center text-center">
              <span className="mb-6 text-[10px] font-medium uppercase tracking-[0.34em] text-[#967741]">
                02 · Sacred Invitation
              </span>

              {/* Ganesh Invocation */}
              <GaneshCrest className="mb-4 h-14 w-14 sm:h-16 sm:w-16 text-[#5B1F2A]" />

              <p className="font-serif-body text-sm sm:text-base tracking-[0.06em] text-[#5B1F2A]">
                {weddingConfig.invitation.sanskritInvocation}
              </p>
              <p className="mt-2 max-w-md font-serif-body text-xs sm:text-sm italic leading-relaxed text-[#655046]">
                {weddingConfig.invitation.sanskritMantra}
              </p>
              <p className="mt-1.5 max-w-md text-[11px] leading-relaxed text-[#655046]/80">
                {weddingConfig.invitation.englishMantra}
              </p>

              <LotusDivider className="my-8 sm:my-10 w-44 sm:w-52 text-[#B99A62]" />

              {/* Traditional Heading */}
              <h2
                id="invitation-heading"
                className="max-w-xl font-display text-2xl sm:text-3xl md:text-[2.1rem] font-normal leading-snug tracking-[0.02em] text-[#33251F]"
              >
                {weddingConfig.invitation.heading}
              </h2>

              {/* Family Invitation Message */}
              <p className="mt-6 max-w-2xl font-serif-body text-base sm:text-lg leading-relaxed text-[#33251F]/90">
                {weddingConfig.invitation.hostLine}
              </p>
              <p className="mt-3 max-w-xl font-serif-body text-sm sm:text-base leading-relaxed text-[#655046]">
                {weddingConfig.invitation.bodyLine}
              </p>

              {/* Couple Names */}
              <div className="my-9 sm:my-11 flex flex-col items-center">
                <p className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.03em] text-[#5B1F2A]">
                  {weddingConfig.brideFirstName}
                  <span className="mx-3 sm:mx-4 italic font-light text-[#B99A62] text-[0.8em]">
                    &amp;
                  </span>
                  {weddingConfig.groomFirstName}
                </p>
                <span className="mt-2 text-[11px] uppercase tracking-[0.3em] text-[#967741]">
                  {weddingConfig.brideLastName} · {weddingConfig.groomLastName}
                </span>
              </div>

              {/* Venue Block */}
              <div className="w-full max-w-lg border-y border-[#B99A62]/30 py-6">
                <p className="font-display text-xl sm:text-2xl tracking-[0.04em] text-[#33251F]">
                  {weddingConfig.weddingLocation}
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.26em] text-[#967741]">
                  {weddingConfig.venueSubtitle}
                </p>
              </div>

              <p className="mt-7 max-w-md font-serif-body text-sm italic leading-relaxed text-[#655046]">
                {weddingConfig.invitation.closingLine}
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
