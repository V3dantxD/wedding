export interface GalleryImage {
  id: string;
  plate: string;
  src: string;
  alt: string;
  caption: string;
  moment: string;
  width: number;
  height: number;
  aspectClass: string;
  gridSpanClass: string;
  objectPosition: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "twilight-shore",
    plate: "Plate I",
    src: "/images/gallery/gallery-1.jpg",
    alt: "Ananya and Vikramaditya walking barefoot along the golden twilight beach with her lavender veil catching the sea breeze",
    caption: "Barefoot along the golden shore as twilight paints the sky in rose and amber.",
    moment: "After the Sunset Vows",
    width: 896,
    height: 1200,
    aspectClass: "aspect-[3/4]",
    gridSpanClass: "md:col-span-5",
    objectPosition: "object-[50%_28%]",
  },
  {
    id: "heirloom-suite",
    plate: "Plate II",
    src: "/images/gallery/gallery-2.jpg",
    alt: "Heirloom kundan bridal jewellery beside fresh white mogra jasmine, blush garden roses, plum embroidered silk, and a wax-sealed invitation",
    caption: "Heirloom kundan, fresh mogra blossoms, and handmade parchment sealed in muted gold.",
    moment: "The Morning Details",
    width: 1264,
    height: 848,
    aspectClass: "aspect-[3/2]",
    gridSpanClass: "md:col-span-7 md:mt-14",
    objectPosition: "object-center",
  },
  {
    id: "palace-colonnade",
    plate: "Plate III",
    src: "/images/gallery/gallery-4.jpg",
    alt: "Carved sandstone arches draped with jasmine and blush roses overlooking swaying palms and the golden ocean horizon",
    caption: "Carved sandstone arches lined with cascading mogra and warm brass lanterns overlooking the sea.",
    moment: "The Coastal Sanctuary",
    width: 1200,
    height: 896,
    aspectClass: "aspect-[4/3]",
    gridSpanClass: "md:col-span-7",
    objectPosition: "object-center",
  },
  {
    id: "sparklers-sangeet",
    plate: "Plate IV",
    src: "/images/gallery/gallery-3.jpg",
    alt: "Couple laughing joyfully amidst golden sparklers and falling blush rose petals under coastal palace arches at dusk",
    caption: "Laughter beneath amber sparklers and falling rose petals on the palace terrace.",
    moment: "Sangeet Dusk",
    width: 896,
    height: 1200,
    aspectClass: "aspect-[3/4]",
    gridSpanClass: "md:col-span-5 md:-mt-10",
    objectPosition: "object-[50%_22%]",
  },
];
