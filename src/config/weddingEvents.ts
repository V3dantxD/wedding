export type EventLayoutVariant =
  | "split-left"
  | "split-right"
  | "cinematic-full"
  | "wedding-highlight";

export interface WeddingEvent {
  id: string;
  number: string;
  name: string;
  sanskritOrTraditionalTitle: string;
  date: string;
  time: string;
  venue: string;
  attire: string;
  description: string;
  timelineHighlights?: string[];
  image: string;
  imageAlt: string;
  layout: EventLayoutVariant;
}

export const weddingEvents: WeddingEvent[] = [
  {
    id: "haldi",
    number: "01",
    name: "Haldi",
    sanskritOrTraditionalTitle: "Phoolon Ki Haldi",
    date: "Thursday, February 18, 2027",
    time: "10:30 AM Onwards",
    venue: "Sea-Facing Sandstone Courtyard",
    attire: "Sunlit Ivory, Marigold & Ochre Linen",
    description:
      "Beneath billowing ivory drapes and the warm coastal breeze, join us for a morning steeped in golden turmeric, crushed sandalwood, and showers of marigold and jasmine petals.",
    image: "/images/events/haldi.jpg",
    imageAlt:
      "Ananya and Vikramaditya laughing during their sunlit coastal Haldi ceremony surrounded by brass marigold bowls and family",
    layout: "split-left",
  },
  {
    id: "grah-shanti",
    number: "02",
    name: "Grah Shanti",
    sanskritOrTraditionalTitle: "Sacred Puja & Mandap Muhurat",
    date: "Thursday, February 18, 2027",
    time: "4:00 PM – 5:45 PM",
    venue: "Heritage Ivory Pavilion",
    attire: "Traditional Silks in Cream, Sage & Pastels",
    description:
      "An intimate afternoon of Vedic chants, glowing brass diyas, and fragrant mogra garlands invoking harmony, ancestral blessings, and serenity before the wedding evening unfolds.",
    image: "/images/events/grah-shanti.jpg",
    imageAlt:
      "Serene sandstone pavilion adorned with mogra jasmine garlands, brass diyas, and sacred havan fire for the Grah Shanti puja",
    layout: "split-right",
  },
  {
    id: "sangeet",
    number: "03",
    name: "Sangeet",
    sanskritOrTraditionalTitle: "An Evening Under the Stars",
    date: "Thursday, February 18, 2027",
    time: "8:00 PM Until Midnight",
    venue: "Oceanfront Palace Terrace",
    attire: "Indigo, Deep Maroon, Jewel Tones & Festive Glam",
    description:
      "As twilight settles over the Arabian Sea, crystal chandeliers and amber fairy lights awaken an unforgettable night of family choreography, soulful music, and joyous celebration.",
    image: "/images/events/sangeet.jpg",
    imageAlt:
      "Evening Sangeet celebration under amber fairy lights and crystal chandeliers overlooking the ocean terrace",
    layout: "cinematic-full",
  },
  {
    id: "wedding",
    number: "04",
    name: "The Wedding",
    sanskritOrTraditionalTitle: "Sunset Baraat, Varmala & Pheras",
    date: "Friday, February 19, 2027",
    time: "4:30 PM – 8:00 PM",
    venue: "Shoreline Floral Mandap, Sinquerim Beach",
    attire: "Indian Heritage Couture · Royal Plum, Champagne & Gold",
    description:
      "At the golden hour when the horizon turns coral and amber, witness the joyous Baraat arrival, the floral Varmala exchange, and the sacred seven pheras by the tide.",
    timelineHighlights: [
      "4:30 PM · Baraat Procession",
      "5:30 PM · Sunset Varmala",
      "6:15 PM · Sacred Pheras & Dinner",
    ],
    image: "/images/events/wedding.jpg",
    imageAlt:
      "Ananya and Vikramaditya seated around the sacred fire inside a floral beach mandap as the sun sets over the ocean",
    layout: "wedding-highlight",
  },
];
