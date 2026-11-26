import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { weddingConfig } from "@/config/weddingConfig";

const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    {
      path: "./fonts/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
});

const lora = localFont({
  variable: "--font-lora",
  display: "swap",
  src: [
    {
      path: "./fonts/lora-latin-wght-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "./fonts/lora-latin-wght-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
});

const jakarta = localFont({
  variable: "--font-jakarta",
  display: "swap",
  src: [
    {
      path: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/plus-jakarta-sans-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: `${weddingConfig.brideFirstName} & ${weddingConfig.groomFirstName} — Wedding Invitation`,
  description: `You are cordially invited to celebrate the wedding of ${weddingConfig.brideFullName} and ${weddingConfig.groomFullName} on ${weddingConfig.weddingDateDisplay} at ${weddingConfig.weddingLocation}, ${weddingConfig.venueSubtitle}.`,
  openGraph: {
    title: `${weddingConfig.brideFirstName} & ${weddingConfig.groomFirstName} — ${weddingConfig.weddingDateDisplay}`,
    description: `Join us by the Arabian Sea in Goa to celebrate the union of ${weddingConfig.brideFirstName} & ${weddingConfig.groomFirstName}.`,
    images: [weddingConfig.heroImage.src],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F3E9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lora.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen bg-[#F8F3E9] text-[#33251F] antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
