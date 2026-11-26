"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { weddingEvents, type WeddingEvent } from "@/config/weddingEvents";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { LotusDivider } from "@/components/ornaments/WeddingOrnaments";

function EventMetaList({
  event,
  darkSurface = false,
}: {
  event: WeddingEvent;
  darkSurface?: boolean;
}) {
  const iconClass = darkSurface ? "text-[#E8D6B5]" : "text-[#967741]";
  const textClass = darkSurface ? "text-[#F8F3E9]/90" : "text-[#33251F]/85";

  return (
    <dl className={`mt-6 space-y-2.5 text-xs sm:text-sm ${textClass}`}>
      <div className="flex items-center gap-3">
        <Calendar className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden="true" />
        <dt className="sr-only">Date</dt>
        <dd className="tracking-[0.04em]">{event.date}</dd>
      </div>
      <div className="flex items-center gap-3">
        <Clock className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden="true" />
        <dt className="sr-only">Time</dt>
        <dd className="tracking-[0.04em]">{event.time}</dd>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden="true" />
        <dt className="sr-only">Venue</dt>
        <dd className="tracking-[0.04em]">{event.venue}</dd>
      </div>
      <div className="flex items-center gap-3">
        <Sparkles className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden="true" />
        <dt className="sr-only">Attire</dt>
        <dd className="italic font-serif-body opacity-90">Attire: {event.attire}</dd>
      </div>
    </dl>
  );
}

function SplitEventBlock({
  event,
  imageFirst,
}: {
  event: WeddingEvent;
  imageFirst: boolean;
}) {
  return (
    <SectionReveal yOffset={26} duration={0.85}>
      <article className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-14">
        {/* Photograph Column */}
        <div
          className={`lg:col-span-7 ${
            imageFirst ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-[#B99A62]/30 bg-[#E8D6B5]/30">
            <Image
              src={event.image}
              alt={event.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#241612]/35 via-transparent to-transparent"
            />
            <span className="absolute bottom-4 left-5 font-display text-xs uppercase tracking-[0.28em] text-[#F8F3E9]/90">
              Chapter {event.number}
            </span>
          </div>
        </div>

        {/* Editorial Details Column */}
        <div
          className={`lg:col-span-5 ${
            imageFirst ? "lg:order-2 lg:pl-4" : "lg:order-1 lg:pr-4"
          }`}
        >
          <div className="border-l border-[#B99A62]/45 pl-5 sm:pl-7">
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#967741]">
              Event {event.number} · {event.sanskritOrTraditionalTitle}
            </span>
            <h3 className="mt-2 font-display text-4xl sm:text-5xl font-normal tracking-[0.02em] text-[#5B1F2A]">
              {event.name}
            </h3>
            <p className="mt-4 font-serif-body text-sm sm:text-base leading-relaxed text-[#655046]">
              {event.description}
            </p>
            <EventMetaList event={event} />
          </div>
        </div>
      </article>
    </SectionReveal>
  );
}

function CinematicFullEventBlock({ event }: { event: WeddingEvent }) {
  return (
    <SectionReveal yOffset={26} duration={0.85}>
      <article className="relative min-h-[34rem] sm:min-h-[38rem] lg:min-h-[42rem] w-full overflow-hidden border border-[#B99A62]/35 flex items-end">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E110E]/92 via-[#1E110E]/55 to-[#1E110E]/20"
        />
        <div className="relative z-10 w-full p-6 sm:p-12 lg:p-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12 items-end gap-8">
            <div className="lg:col-span-7 text-[#F8F3E9]">
              <span className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.34em] text-[#E8D6B5]">
                <span className="h-[1px] w-7 bg-[#E8D6B5]/60" />
                Event {event.number} · {event.sanskritOrTraditionalTitle}
              </span>
              <h3 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.03em] text-[#F8F3E9]">
                {event.name}
              </h3>
              <p className="mt-4 max-w-xl font-serif-body text-sm sm:text-base leading-relaxed text-[#F8F3E9]/88">
                {event.description}
              </p>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-[#E8D6B5]/25 lg:pl-8">
              <EventMetaList event={event} darkSurface />
            </div>
          </div>
        </div>
      </article>
    </SectionReveal>
  );
}

function WeddingHighlightBlock({ event }: { event: WeddingEvent }) {
  return (
    <SectionReveal yOffset={26} duration={0.85}>
      <article className="relative overflow-hidden border border-[#B99A62]/45 bg-[#5B1F2A] text-[#F8F3E9] p-5 sm:p-10 lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-[#E8D6B5]/20"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#E8D6B5]/35">
              <Image
                src={event.image}
                alt={event.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#320F16]/45 via-transparent to-transparent"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#E8D6B5]">
              Event {event.number} · The Main Ceremony
            </span>
            <h3 className="mt-2 font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-normal leading-tight text-[#F8F3E9]">
              {event.name}
            </h3>
            <p className="mt-1 font-display text-lg italic text-[#E8D6B5]/90">
              {event.sanskritOrTraditionalTitle}
            </p>
            <p className="mt-4 font-serif-body text-sm sm:text-base leading-relaxed text-[#F8F3E9]/88">
              {event.description}
            </p>

            {event.timelineHighlights && (
              <div className="mt-6 border-y border-[#E8D6B5]/25 py-4 space-y-1.5">
                {event.timelineHighlights.map((item) => (
                  <p
                    key={item}
                    className="text-xs uppercase tracking-[0.2em] text-[#E8D6B5]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}

            <EventMetaList event={event} darkSurface />
          </div>
        </div>
      </article>
    </SectionReveal>
  );
}

/**
 * Section 03 — Wedding Events.
 * Presents Haldi, Grah Shanti, Sangeet, and Wedding as curated luxury editorial blocks.
 */
export function EventsSection() {
  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="relative z-[30] bg-[#F8F3E9] py-24 sm:py-32 px-5 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#967741]">
            03 · The Celebrations
          </span>
          <h2
            id="events-heading"
            className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.02em] text-[#33251F]"
          >
            Four Chapters of Joy
          </h2>
          <p className="mt-4 max-w-xl font-serif-body text-sm sm:text-base leading-relaxed text-[#655046]">
            Two sun-drenched days of rituals, music, and sacred vows along the shores of Sinquerim Beach.
          </p>
          <LotusDivider className="mt-7 w-44 text-[#B99A62]" />
        </SectionReveal>

        <div className="space-y-20 sm:space-y-28 lg:space-y-32">
          {weddingEvents.map((event) => {
            if (event.layout === "split-left") {
              return <SplitEventBlock key={event.id} event={event} imageFirst />;
            }
            if (event.layout === "split-right") {
              return (
                <SplitEventBlock key={event.id} event={event} imageFirst={false} />
              );
            }
            if (event.layout === "cinematic-full") {
              return <CinematicFullEventBlock key={event.id} event={event} />;
            }
            return <WeddingHighlightBlock key={event.id} event={event} />;
          })}
        </div>
      </div>
    </section>
  );
}
