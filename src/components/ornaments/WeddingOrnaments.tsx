import React from "react";

interface OrnamentProps {
  className?: string;
}

/**
 * Minimalist fine-line Ganesha & lotus crest for the traditional Ganesh invocation.
 */
export function GaneshCrest({ className = "w-14 h-14" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.45"
      />
      <circle
        cx="40"
        cy="40"
        r="31"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        strokeOpacity="0.5"
      />
      {/* Stylized crown / mukut */}
      <path
        d="M32 24C34 19 37 16 40 14C43 16 46 19 48 24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M28 28C32 25 48 25 52 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Stylized ears */}
      <path
        d="M28 31C21 31 19 38 22 44C24 47 28 47 30 45"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M52 31C59 31 61 38 58 44C56 47 52 47 50 45"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Tilak */}
      <path
        d="M40 27.5V32.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Trunk curve */}
      <path
        d="M34 36C36 33 44 33 45 38C46 43 41 47 41 52C41 56 44 59 48 58"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      {/* Lotus base */}
      <path
        d="M26 61C31 58 49 58 54 61"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <circle cx="40" cy="11.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/**
 * Delicate horizontal lotus & hairline ornament divider.
 */
export function LotusDivider({ className = "w-48 h-6" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 220 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="14"
        x2="86"
        y2="14"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.45"
      />
      <line
        x1="134"
        y1="14"
        x2="220"
        y2="14"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.45"
      />
      <path
        d="M110 5C112.5 9.5 112.5 15 110 21C107.5 15 107.5 9.5 110 5Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M110 21C104 18 100 13.5 100 9.5C104 10 108 13.5 110 21Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path
        d="M110 21C116 18 120 13.5 120 9.5C116 10 112 13.5 110 21Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <circle cx="92" cy="14" r="1.3" fill="currentColor" fillOpacity="0.65" />
      <circle cx="128" cy="14" r="1.3" fill="currentColor" fillOpacity="0.65" />
    </svg>
  );
}

/**
 * Subtle watermark mandala ring used behind traditional invitation & family cards.
 */
export function MandalaWatermark({ className = "w-96 h-96" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="160" cy="160" r="154" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" />
      <circle cx="160" cy="160" r="130" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="160" cy="160" r="102" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="160" cy="160" r="64" stroke="currentColor" strokeWidth="0.6" />
      {Array.from({ length: 16 }).map((_, index) => {
        const angle = (index * 360) / 16;
        return (
          <g key={index} transform={`rotate(${angle} 160 160)`}>
            <path
              d="M160 30C168 56 168 82 160 96C152 82 152 56 160 30Z"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <circle cx="160" cy="18" r="1.5" fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Corner hairline ornament for traditional invitation parchment borders.
 */
export function CornerFiligree({ className = "w-10 h-10" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 30V6C2 3.8 3.8 2 6 2H30"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M8 22V10C8 8.9 8.9 8 10 8H22"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.65"
      />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}
