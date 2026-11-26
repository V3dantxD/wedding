"use client";

import { MapPin, MessageCircle } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { useWeddingCountdown } from "@/hooks/useWeddingCountdown";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { LotusDivider, MandalaWatermark } from "@/components/ornaments/WeddingOrnaments";
import { ScratchHeartReveal } from "@/components/interactive/ScratchHeartReveal";

function CountdownUnit({
  value,
  label,
  isMounted,
}: {
  value: number;
  label: string;
  isMounted: boolean;
}) {
  const displayValue = isMounted ? String(value).padStart(2, "0") : "--";

  return (
    <div className="flex flex-col items-center border border-[#E8D6B5]/25 bg-[#3F131B]/55 px-4 py-5 sm:px-6 sm:py-7">
      <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.04em] text-[#F8F3E9] tabular-nums">
        {displayValue}
      </span>
      <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#E8D6B5]">
        {label}
      </span>
    </div>
  );
}

/**
 * Section 08 — Countdown and Final Links.
 * Closing deep maroon luxury invitation page with live countdown, venue directions,
 * and prefilled WhatsApp RSVP built purely from weddingConfig.
 */
export function CountdownSection() {
  const { days, hours, minutes, seconds, isPast, isMounted } =
    useWeddingCountdown(weddingConfig.weddingDate);

  const sanitizedPhone = weddingConfig.rsvpPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(
    weddingConfig.rsvpDefaultMessage
  )}`;

  return (
    <footer
      id="rsvp"
      aria-labelledby="rsvp-heading"
      className="relative z-[30] bg-[#5B1F2A] text-[#F8F3E9] pt-24 pb-16 sm:pt-32 sm:pb-20 px-5 sm:px-8 overflow-hidden"
    >
      {/* Subtle architectural watermark & radial warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[48rem] -translate-x-1/2 rounded-full bg-[#B99A62]/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E8D6B5]/[0.05]">
          <MandalaWatermark className="h-[38rem] w-[38rem] sm:h-[48rem] sm:w-[48rem]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <SectionReveal>
          <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#E8D6B5]">
            08 · Countdown &amp; RSVP
          </span>

          {/* Big Interactive Scratch-to-Reveal Wedding Date Heart */}
          <ScratchHeartReveal />

          <LotusDivider className="mx-auto my-12 w-48 text-[#E8D6B5]/75" />

          {/* Countdown Section below Scratch Heart */}
          <h2
            id="rsvp-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.02em] text-[#F8F3E9]"
          >
            {isPast
              ? weddingConfig.countdown.postWeddingTitle
              : weddingConfig.countdown.heading}
          </h2>
          <p className="mt-4 max-w-lg mx-auto font-serif-body text-sm sm:text-base leading-relaxed text-[#E8D6B5]/90">
            {isPast
              ? weddingConfig.countdown.postWeddingMessage
              : weddingConfig.countdown.subheading}
          </p>

          {/* Live Countdown */}
          {!isPast && (
            <div
              aria-live="polite"
              aria-label="Wedding countdown timer"
              className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 max-w-2xl mx-auto"
            >
              <CountdownUnit value={days} label="Days" isMounted={isMounted} />
              <CountdownUnit value={hours} label="Hours" isMounted={isMounted} />
              <CountdownUnit
                value={minutes}
                label="Minutes"
                isMounted={isMounted}
              />
              <CountdownUnit
                value={seconds}
                label="Seconds"
                isMounted={isMounted}
              />
            </div>
          )}

          <LotusDivider className="mx-auto my-12 w-48 text-[#E8D6B5]/75" />

          {/* Venue Details */}
          <div className="mx-auto max-w-xl space-y-2">
            <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#F8F3E9]">
              {weddingConfig.weddingLocation}
            </h3>
            <p className="font-serif-body text-sm sm:text-base leading-relaxed text-[#F8F3E9]/80">
              {weddingConfig.venueAddress}
            </p>
          </div>

          {/* Action Buttons: Google Maps & WhatsApp RSVP */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={weddingConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 border border-[#E8D6B5]/55 bg-transparent px-7 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-[#F8F3E9] transition-colors duration-300 hover:bg-[#E8D6B5]/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D6B5]"
            >
              <MapPin className="h-4 w-4 text-[#E8D6B5]" aria-hidden="true" />
              <span>View Venue on Google Maps</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 border border-[#E8D6B5] bg-[#E8D6B5] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#33251F] transition-colors duration-300 hover:bg-[#F8F3E9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F3E9]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>RSVP on WhatsApp</span>
            </a>
          </div>

          {/* Hospitality Contact & RSVP Deadline */}
          <div className="mt-8 space-y-1.5 text-xs text-[#E8D6B5]/80">
            <p>Kindly reply by {weddingConfig.rsvpDeadline}</p>
            <p>
              Hospitality Desk: {weddingConfig.rsvpContactName} ·{" "}
              {weddingConfig.rsvpDisplayPhone}
            </p>
          </div>

          <p className="mt-6 max-w-lg mx-auto font-serif-body text-xs sm:text-sm italic leading-relaxed text-[#F8F3E9]/70">
            {weddingConfig.countdown.finalNote}
          </p>

          {/* Closing Monogram Sign-off */}
          <div className="mt-14 border-t border-[#E8D6B5]/20 pt-8 flex flex-col items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8D6B5]/45 font-display text-sm tracking-[0.16em] text-[#E8D6B5]">
              {weddingConfig.monogram}
            </span>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#E8D6B5]/65">
              {weddingConfig.brideFirstName} &amp; {weddingConfig.groomFirstName} ·{" "}
              {weddingConfig.venueSubtitle}
            </p>
          </div>
        </SectionReveal>
      </div>
    </footer>
  );
}
