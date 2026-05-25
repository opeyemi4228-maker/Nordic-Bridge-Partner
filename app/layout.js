import { Montserrat, Cormorant_Garamond, Crimson_Pro } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/app/ClientLayoutWrapper";
import { AppContextProvider } from "@/context/AppContext";
import FooterWrapper from "@/app/FooterWrapper";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata = {
  title: {
    default:
      "Nordic Bridge Partners — Building Bridges, Creating Value",
    template: "%s | Nordic Bridge Partners",
  },
  description:
    "A trust-first private property co-investment platform for invited individuals. Participate in carefully selected UK property opportunities through ring-fenced Special Purpose Vehicles. From £500 per share.",
  keywords: [
    "UK property investment",
    "property co-investment platform",
    "SPV property investment",
    "buy-to-let investment UK",
    "fractional property ownership",
    "diaspora property investment UK",
    "private property investment",
    "Nordic Bridge Partners",
    "FCA-aligned property platform",
  ],
  authors: [{ name: "Nordic Bridge Partners" }],
  creator: "Nordic Bridge Partners",
  publisher: "Nordic Bridge Partners",
  metadataBase: new URL("https://nordicbridge.com"),
  alternates: {
    canonical: "https://nordicbridge.com",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://nordicbridge.com",
    siteName: "Nordic Bridge Partners",
    title:
      "Nordic Bridge Partners — Building Bridges, Creating Value",
    description:
      "Private property co-investment in the UK. Ring-fenced SPVs, FCA-aligned framework, full documentation. By invitation only.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nordic Bridge Partners — Building Bridges, Creating Value",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nordic Bridge Partners — Building Bridges, Creating Value",
    description:
      "Private UK property co-investment for invited individuals. From £500 per share.",
    images: ["/og-image.jpg"],
    creator: "@nordicbridge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/icon.jpg" }],
    shortcut: "/icon.jpg",
  },
  category: "finance",
};

export const viewport = {
  themeColor: "#0A1F44", // Brick & Wealth navy for browser chrome
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} ${crimsonPro.variable}`}
    >
      <body
        className="antialiased overflow-x-hidden"
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          backgroundColor: "#F8F4EC",
          color: "#0B1220",
        }}
        suppressHydrationWarning
      >
        {/* ══ GLOBAL JSON-LD: FinancialService + Organization ═════════════ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "Nordic Bridge Partners",
              alternateName: "Nordic Bridge",
              url: "https://nordicbridge.com",
              logo: "https://nordicbridge.com/logo.png",
              image: "https://nordicbridge.com/og-image.jpg",
              description:
                "Private property co-investment platform enabling invited individuals to participate in carefully selected UK property opportunities through ring-fenced Special Purpose Vehicles.",
              telephone: "+44-20-1234-5678",
              email: "investors@nordicbridge.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "London",
                addressCountry: "GB",
              },
              areaServed: {
                "@type": "Country",
                name: "United Kingdom",
              },
              currenciesAccepted: "GBP",
              priceRange: "From £500 per share",
              foundingDate: "2026",
              founder: {
                "@type": "Person",
                name: "Marcel Ngogbehei",
              },
              sameAs: [
                "https://x.com/nordicbridge",
                "https://linkedin.com/company/nordicbridge",
                "https://youtube.com/@nordicbridge",
                "https://instagram.com/nordicbridge",
              ],
            }),
          }}
        />

        {/* ══ Skip-to-main-content link for accessibility ═════════════════ */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-[#0A1F44] focus:font-bold"
        >
          Skip to main content
        </a>

        <AppContextProvider>
          {/* ══ Navigation ══════════════════════════════════════════════════ */}
          <ClientLayoutWrapper />

          {/* ══ Page content ════════════════════════════════════════════════ */}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          {/* ══ Footer ══════════════════════════════════════════════════════ */}
          <FooterWrapper />
        </AppContextProvider>
      </body>
    </html>
  );
}