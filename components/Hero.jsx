"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

/**
 * Hero.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Layout follows the Wickside reference:
 *   • Full-bleed bridge background (defaults to /hero-bridge.svg in
 *     /public — drop your own photo at /public/hero-bridge.jpg and
 *     pass imageSrc="/hero-bridge.jpg").
 *   • Display headline (40px) lower-right, revealed line by line.
 *   • Angular brand card lower-left with supporting copy + CTA.
 *
 * Motion:
 *   • Background: slow Ken-Burns zoom/drift on mount + scroll parallax
 *     (moves up and fades slightly as you scroll past).
 *   • Headline: staggered per-line rise.
 *   • Card: slides in from the left; button arrow nudges on hover.
 *
 * Brand color: #0818A8.
 * Stack: Next.js (App Router), Tailwind, Framer Motion, lucide-react.
 *
 * Props:
 *   imageSrc — background image. Defaults to an Unsplash bridge photo
 *              (hotlinked via the images.unsplash.com CDN). Swap for
 *              your own /public/hero-bridge.jpg in production.
 *   ctaHref  — explore button link.
 */

const BRAND = "#0818A8";

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const lineItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({
  imageSrc = "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=2400&q=80",
  ctaHref = "/about",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll parallax: background drifts up + fades as the hero leaves.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
      {/* ---------- Background (Ken Burns + parallax) ---------- */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={imageSrc}
          alt="Bridge spanning between regions — Nordic and African collaboration"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Legibility wash */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to top, rgba(3,6,40,0.72) 0%, rgba(3,6,40,0.25) 45%, rgba(3,6,40,0) 78%)",
        }}
      />

      {/* ---------- Foreground content ---------- */}
      <motion.div className="absolute inset-0" style={{ y: contentY }}>
        {/* MOBILE / TABLET — stacked: headline → paragraph → card */}
        <div className="flex h-full flex-col justify-end px-5 pb-20 pt-28 sm:px-8 lg:hidden">
          <motion.h1
            variants={lineContainer}
            initial="hidden"
            animate="show"
            className="font-extrabold uppercase leading-[1.1] tracking-tight text-white"
            style={{ fontSize: "clamp(1.8rem, 10vw, 3.25rem)", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
          >
            <motion.span variants={lineItem} className="block text-white">Bridging Opportunities</motion.span>
            <motion.span variants={lineItem} className="block text-white">Between Nordic</motion.span>
            <motion.span variants={lineItem} className="block text-white">African Markets</motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="mt-4 max-w-xl text-white/90"
            style={{ fontSize: "15px", lineHeight: 1.6 }}
          >
            Your gateway to the African market, fostering creative connections and
            innovative solutions worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            className="mt-6 max-w-md p-6 pr-12 sm:p-8 sm:pr-16"
            style={{
              backgroundColor: BRAND,
              clipPath: "polygon(0 0, 88% 0, 100% 14%, 100% 100%, 0 100%)",
            }}
          >
            <p className="text-base font-semibold leading-snug text-white sm:text-lg">
              Find your gateway to cross-border growth between the Nordics and Africa.
            </p>
            <a
              href={ctaHref}
              className="group mt-5 inline-flex items-center gap-3 border border-white bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0818A8] transition-colors hover:bg-transparent hover:text-white sm:text-sm"
            >
              Explore NBP
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </motion.div>
        </div>

        {/* DESKTOP (lg+) — headline → paragraph → card, all bottom-right */}
        <div className="absolute inset-x-0 bottom-0 hidden lg:flex lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-0">
          {/* Angular brand card — bottom-left, flush to bottom */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="max-w-md p-10 pr-20"
            style={{
              backgroundColor: BRAND,
              clipPath: "polygon(0 0, 88% 0, 100% 14%, 100% 100%, 0 100%)",
            }}
          >
            <p className="text-xl font-semibold leading-snug text-white sm:text-2xl">
              Find your gateway to cross-border growth between the Nordics and Africa.
            </p>
            <motion.a
              href={ctaHref}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-7 inline-flex items-center gap-4 border border-white bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0818A8] transition-colors hover:bg-transparent hover:text-white"
            >
              Explore NBP
              <ArrowDownRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </motion.a>
          </motion.div>

          {/* Headline + paragraph + card — bottom-right, stacked */}
          <div className="flex flex-col items-end pb-10">
            <motion.h1
              variants={lineContainer}
              initial="hidden"
              animate="show"
              className="text-right font-extrabold uppercase leading-[1.08] tracking-tight text-white"
              style={{ fontSize: "clamp(2.6rem, 4.5vw, 4.0rem)", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
            >
              <motion.span variants={lineItem} className="block text-white">Bridging Opportunities</motion.span>
              <motion.span variants={lineItem} className="block text-white">Between Nordic</motion.span>
              <motion.span variants={lineItem} className="block text-white">African Markets</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              className="mt-5 max-w-xl text-right text-white/90"
              style={{ fontSize: "18px", lineHeight: 1.6 }}
            >
              Your gateway to the African market, fostering creative connections and
              innovative solutions worldwide.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        style={{ opacity: overlayOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border-2 border-white/60"
        >
          <span className="mx-auto mt-1.5 block h-2 w-0.5 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}