export interface FamilySide {
  heading: string;
  city: string;
  elders: string[];
  parents: string;
  welcoming: string[];
}

export interface WeddingConfig {
  brideFirstName: string;
  brideLastName: string;
  brideFullName: string;
  groomFirstName: string;
  groomLastName: string;
  groomFullName: string;
  monogram: string;
  weddingLabel: string;
  weddingDate: string;
  weddingDateDisplay: string;
  weddingDayDisplay: string;
  weddingTimeDisplay: string;
  weddingLocation: string;
  venueSubtitle: string;
  venueAddress: string;
  mapsUrl: string;
  rsvpPhone: string;
  rsvpDisplayPhone: string;
  rsvpContactName: string;
  rsvpDeadline: string;
  rsvpDefaultMessage: string;
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  invitation: {
    sanskritInvocation: string;
    sanskritMantra: string;
    englishMantra: string;
    heading: string;
    hostLine: string;
    bodyLine: string;
    closingLine: string;
  };
  couple: {
    sectionLabel: string;
    sectionTitle: string;
    bride: {
      name: string;
      lineage: string;
      bio: string;
      portrait: string;
      alt: string;
    };
    groom: {
      name: string;
      lineage: string;
      bio: string;
      portrait: string;
      alt: string;
    };
    storyHeading: string;
    story: string;
  };
  coupleMessage: {
    heading: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
    image: string;
    imageAlt: string;
  };
  familyBlessings: {
    heading: string;
    subheading: string;
    blessingVerse: string;
    brideSide: FamilySide;
    groomSide: FamilySide;
    closingNote: string;
  };
  countdown: {
    heading: string;
    subheading: string;
    postWeddingTitle: string;
    postWeddingMessage: string;
    finalNote: string;
  };
  scratchReveal: {
    eyebrow: string;
    heading: string;
    instruction: string;
    revealedTimeLabel: string;
    revealedNumericDate: string;
    revealedCelebrationNote: string;
  };
}

export const weddingConfig: WeddingConfig = {
  brideFirstName: "Ananya",
  brideLastName: "Sharma",
  brideFullName: "Ananya Sharma",
  groomFirstName: "Vikramaditya",
  groomLastName: "Mehta",
  groomFullName: "Vikramaditya Mehta",
  monogram: "A & V",
  weddingLabel: "The Wedding Celebration",
  weddingDate: "2027-02-19T17:30:00+05:30",
  weddingDateDisplay: "February 19, 2027",
  weddingDayDisplay: "Friday, Nineteenth of February, Two Thousand Twenty-Seven",
  weddingTimeDisplay: "Five Thirty in the Evening",
  weddingLocation: "Taj Fort Aguada Coastal Sands",
  venueSubtitle: "Sinquerim Beach, Goa",
  venueAddress:
    "Taj Fort Aguada Resort & Spa, Sinquerim Beach, Candolim, Bardez, Goa 403515, India",
  mapsUrl: "https://maps.google.com/?q=Taj+Fort+Aguada+Resort+%26+Spa+Goa",
  rsvpPhone: "919820012345",
  rsvpDisplayPhone: "+91 98200 12345",
  rsvpContactName: "Rohan Sharma & Aashna Mehta (Family Hospitality Desk)",
  rsvpDeadline: "January 15, 2027",
  rsvpDefaultMessage:
    "Namaste! We are delighted to RSVP for Ananya & Vikramaditya's wedding celebrations in Goa (Feb 18–19, 2027). Guest Name(s): ",
  heroImage: {
    src: "/images/hero/wedding-hero.jpg",
    alt: "Ananya walking down the purple aisle toward Vikramaditya beneath a floral beach mandap at golden sunset",
    width: 571,
    height: 1024,
  },
  invitation: {
    sanskritInvocation: "॥ श्री गणेशाय नमः ॥",
    sanskritMantra:
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    englishMantra:
      "May Lord Ganesha remove all obstacles and shower eternal grace upon this sacred union.",
    heading: "With the Blessings of the Almighty & Our Beloved Elders",
    hostLine:
      "Smt. Kavita & Shri Rajeshwar Sharma, together with Smt. Nandini & Shri Devendra Mehta",
    bodyLine:
      "cordially invite you and your family to share in the joy, rituals, and sunset vows as our children unite in sacred matrimony by the Arabian Sea.",
    closingLine:
      "Your gracious presence and heartfelt blessings will make every moment truly unforgettable.",
  },
  couple: {
    sectionLabel: "Meet the Bride & Groom",
    sectionTitle: "Two Lives, One Endless Tide",
    bride: {
      name: "Ananya Sharma",
      lineage: "Daughter of Smt. Kavita & Shri Rajeshwar Sharma, Udaipur",
      bio: "An architectural conservationist with a quiet reverence for sunlit courtyards, classical sitar mornings, and handwritten letters. She brings warmth, stillness, and effortless grace to every room she enters.",
      portrait: "/images/couple/bride.jpg",
      alt: "Portrait of the bride Ananya wearing a royal plum and antique gold embroidered lehenga overlooking the sea at golden hour",
    },
    groom: {
      name: "Vikramaditya Mehta",
      lineage: "Son of Smt. Nandini & Shri Devendra Mehta, Mumbai",
      bio: "A clean-energy entrepreneur who finds his greatest joy along coastal roads, old vinyl records, and unhurried family dinners. Grounded, thoughtful, and endlessly devoted, he makes every adventure feel like home.",
      portrait: "/images/couple/groom.jpg",
      alt: "Portrait of the groom Vikramaditya wearing an ivory raw-silk sherwani and golden safa beneath a sandstone palace arch",
    },
    storyHeading: "Our Story",
    story:
      "What began as a chance introduction during a monsoon architecture symposium in Mumbai quietly deepened into four years of shared sunrises, long train journeys between cities, and late-night laughter. By the shores of Goa—where the sky meets the sea—we begin our lifelong journey together.",
  },
  coupleMessage: {
    heading: "A Letter to Our Dearest",
    salutation: "Dearest Family & Friends,",
    paragraphs: [
      "As we stand on the threshold of a new chapter, our hearts are full knowing how deeply each of you has shaped our lives. Whether you have watched us grow from childhood or walked beside us through quiet milestones, you carry a cherished place in our story.",
      "We dreamed of gathering everyone we love under one open sunset sky—unhurried, barefoot by the waves, surrounded by music, prayers, and warmth. Thank you for traveling near and far to bless us as we take our seven vows together.",
    ],
    signOff: "With endless gratitude and love,",
    signature: "Ananya & Vikramaditya",
    image: "/images/couple/couple-letter.jpg",
    imageAlt:
      "Close-up of the bride and groom's intertwined hands adorned with bridal mehndi and antique gold bangles by the sunset ocean",
  },
  familyBlessings: {
    heading: "Family Blessings",
    subheading: "With Reverence, Love & Warmth",
    blessingVerse: "स्नेह, संस्कार एवं आशीर्वाद सहित",
    brideSide: {
      heading: "The Bride's Family",
      city: "Udaipur, Rajasthan",
      elders: ["Late Shri Harishankar Ji & Smt. Sumitra Devi Sharma"],
      parents: "Smt. Kavita & Shri Rajeshwar Sharma",
      welcoming: [
        "Rohan & Meera Sharma",
        "Dr. Arvind & Smt. Priya Saxena",
        "Aarav, Devika & the entire Sharma Parivaar",
      ],
    },
    groomSide: {
      heading: "The Groom's Family",
      city: "Mumbai, Maharashtra",
      elders: ["Shri Suryakant Ji & Smt. Vasundhara Mehta"],
      parents: "Smt. Nandini & Shri Devendra Mehta",
      welcoming: [
        "Aashna & Kabir Malhotra",
        "Shri Vikram & Smt. Sunita Parekh",
        "Rhea, Vivaan & the entire Mehta Parivaar",
      ],
    },
    closingNote: "Awaiting the honour of welcoming you with folded hands and joyous hearts.",
  },
  countdown: {
    heading: "Until Forever Begins",
    subheading: "Counting the moments until we gather beneath the Goa sunset",
    postWeddingTitle: "Forever Has Begun",
    postWeddingMessage:
      "Thank you for blessing our wedding celebration with your love, laughter, and presence.",
    finalNote:
      "Kindly confirm your arrival details and dietary preferences via WhatsApp so our family hospitality team can arrange your warm welcome.",
  },
  scratchReveal: {
    eyebrow: "Reveal Our Wedding Date",
    heading: "Scratch the Heart to Uncover the Date",
    instruction:
      "Your secret save-the-date awaits beneath the golden foil — gently scratch across the heart with your finger or cursor.",
    revealedTimeLabel: "Friday · Five Thirty in the Evening",
    revealedNumericDate: "19 · 02 · 2027",
    revealedCelebrationNote: "The date is yours — we cannot wait to celebrate with you.",
  },
};
