import { WeddingNavigation } from "@/components/navigation/WeddingNavigation";
import { FlowerPetals } from "@/components/animations/FlowerPetals";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CoupleMessageSection } from "@/components/sections/CoupleMessageSection";
import { FamilySection } from "@/components/sections/FamilySection";
import { CountdownSection } from "@/components/sections/CountdownSection";

export default function HomePage() {
  return (
    <>
      <WeddingNavigation />

      {/* Scroll-linked illustrated petals flowing across Section 01 through end of Section 02 */}
      <FlowerPetals />

      <main>
        {/* Section 01 — Opening / Hero */}
        <HeroSection />

        {/* Section 02 — Traditional Invitation */}
        <InvitationSection />

        {/* Section 03 — Wedding Events */}
        <EventsSection />

        {/* Section 04 — Meet the Bride & Groom */}
        <CoupleSection />

        {/* Section 05 — Photo Gallery */}
        <GallerySection />

        {/* Section 06 — A Message from the Couple */}
        <CoupleMessageSection />

        {/* Section 07 — Family Blessings */}
        <FamilySection />

        {/* Section 08 — Countdown & Final Links */}
        <CountdownSection />
      </main>
    </>
  );
}
