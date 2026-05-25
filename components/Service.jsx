"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * ServicesSection.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Layout follows the Aramco "Discover" reference:
 *   • Eyebrow label (uppercase, tracked) + a large, light-weight
 *     intro paragraph, top-left.
 *   • A row of four tall cards. Each card: full-bleed image with a
 *     dark gradient, an uppercase category label, a white heading,
 *     and a circled arrow button bottom-right.
 *
 * Cards reveal with a staggered rise on scroll; each lifts and its
 * arrow fills on hover.
 *
 * Images: each card takes an `image` path (drop files in /public).
 * Until then a tasteful per-card gradient shows so nothing looks
 * broken.
 *
 * Brand color: #0818A8.
 * Stack: Next.js (App Router), Tailwind, Framer Motion, lucide-react.
 */

const BRAND = "#0818A8";

const SERVICES = [
  {
    eyebrow: "B2B FACILITATION",
    title: "Connecting partners across Nordic and African markets",
    href: "/services#b2b",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    fallback: "linear-gradient(160deg, #0818A8 0%, #2a3a9c 100%)",
  },
  {
    eyebrow: "TRADE & DELEGATIONS",
    title: "Trade fairs, matchmaking trips, and market insight",
    href: "/services#trade",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80",
    fallback: "linear-gradient(160deg, #1b2db5 0%, #4a3f8a 100%)",
  },
  {
    eyebrow: "EDUCATION",
    title: "Student recruitment and study pathways in Sweden",
    href: "/educational-programmes",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    fallback: "linear-gradient(160deg, #2a3a86 0%, #7a5fb0 100%)",
  },
  {
    eyebrow: "TALENT",
    title: "Sourcing and retaining specialised talent for the Nordics",
    href: "/services#talent",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
    fallback: "linear-gradient(160deg, #0b1245 0%, #c9a24a 160%)",
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServicesSection() {
  return (
    <section className="bg-[#f4f4f2]" style={{ color: BRAND }}>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0818A8]/70">
            What We Offer
          </p>
          <p className="mt-6 text-xl font-light leading-snug sm:text-2xl md:text-3xl lg:text-[2.1rem]">
            We bridge Nordic and African enterprise — opening markets, building
            partnerships, and creating opportunities that drive growth across
            both regions.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => (
            <motion.a
              key={s.eyebrow}
              variants={card}
              href={s.href}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative flex aspect-[3/3.6] flex-col overflow-hidden rounded-2xl sm:aspect-[3/4.4]"
            >
              {/* image / fallback */}
              <div className="absolute inset-0" style={{ background: s.fallback }}>
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
              </div>

              {/* gradient for legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(3,6,40,0.45) 0%, rgba(3,6,40,0.05) 32%, rgba(3,6,40,0.15) 60%, rgba(3,6,40,0.75) 100%)",
                }}
              />

              {/* content */}
              <div className="relative flex h-full flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {s.eyebrow}
                </p>
                <h3 className="mt-3 max-w-[14ch] text-xl font-medium leading-snug text-white">
                  {s.title}
                </h3>

                {/* circled arrow, bottom-right */}
                <div className="mt-auto flex justify-end">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/70 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#0818A8]">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}