"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { weddingConfig } from "@/config/weddingConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_ITEMS = [
  { label: "Invitation", href: "#invitation", num: "02" },
  { label: "Events", href: "#events", num: "03" },
  { label: "The Couple", href: "#couple", num: "04" },
  { label: "Gallery", href: "#gallery", num: "05" },
  { label: "Blessings", href: "#family", num: "07" },
  { label: "RSVP", href: "#rsvp", num: "08" },
] as const;

/**
 * Minimal floating luxury wedding navigation.
 * Transparent over the opening hero photography, shifting seamlessly to warm frosted
 * ivory upon reaching light editorial sections.
 */
export function WeddingNavigation() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateScrollState = () => {
      const invitationEl = document.getElementById("invitation");
      if (!invitationEl) {
        setIsScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
        return;
      }
      const rect = invitationEl.getBoundingClientRect();
      setIsScrolledPastHero(rect.top <= 88);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;

    if (lenis && !prefersReducedMotion) {
      lenis.scrollTo(target as HTMLElement, {
        duration: 1.25,
        offset: -12,
      });
    } else {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolledPastHero || mobileMenuOpen
            ? "bg-[#F8F3E9]/95 backdrop-blur-md border-b border-[#B99A62]/25 text-[#33251F] shadow-[0_6px_30px_-18px_rgba(51,37,31,0.2)]"
            : "bg-gradient-to-b from-[#1D110E]/45 to-transparent text-[#F8F3E9]"
        }`}
      >
        <nav
          aria-label="Primary wedding navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12"
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("#hero");
            }}
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B99A62]"
            aria-label={`${weddingConfig.brideFirstName} and ${weddingConfig.groomFirstName} — Return to top`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border whitespace-nowrap text-[10px] tracking-[0.06em] font-display transition-colors duration-300 ${
                isScrolledPastHero || mobileMenuOpen
                  ? "border-[#B99A62]/60 text-[#5B1F2A] group-hover:bg-[#5B1F2A] group-hover:text-[#F8F3E9]"
                  : "border-[#E8D6B5]/55 text-[#F8F3E9] group-hover:bg-[#E8D6B5]/15"
              }`}
            >
              {weddingConfig.monogram}
            </span>
            <span className="hidden sm:inline-block font-display text-base tracking-[0.06em] opacity-90">
              {weddingConfig.brideFirstName} &amp; {weddingConfig.groomFirstName}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.href);
                  }}
                  className={`relative py-1 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B99A62] ${
                    isScrolledPastHero
                      ? "text-[#33251F]/80 hover:text-[#5B1F2A] after:bg-[#5B1F2A]"
                      : "text-[#F8F3E9]/85 hover:text-[#E8D6B5] after:bg-[#E8D6B5]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile compact menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-wedding-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className={`md:hidden inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              isScrolledPastHero || mobileMenuOpen
                ? "border-[#B99A62]/45 bg-[#F8F3E9] text-[#33251F]"
                : "border-[#E8D6B5]/45 bg-[#1D110E]/25 text-[#F8F3E9]"
            }`}
          >
            <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
            {mobileMenuOpen ? (
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Menu className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Full-Width Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-wedding-nav"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-40 border-b border-[#B99A62]/25 bg-[#F8F3E9]/98 pt-20 pb-8 px-6 shadow-xl backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col divide-y divide-[#B99A62]/20">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.href);
                    }}
                    className="flex items-center justify-between py-3.5 font-display text-2xl text-[#33251F] transition-colors hover:text-[#5B1F2A]"
                  >
                    <span>{item.label}</span>
                    <span className="font-sans text-[10px] tracking-[0.25em] text-[#B99A62]">
                      {item.num}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-[11px] uppercase tracking-[0.22em] text-[#655046]">
              {weddingConfig.weddingLocation} · {weddingConfig.venueSubtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
