"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * AboutSection.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Design adapted from the provided "AboutSection2" pattern:
 *   • A large statement headline that reveals word-group by
 *     word-group with a blur-up animation as it scrolls into view.
 *   • Key phrases are boxed with dotted, colored borders.
 *   • A footer row: a short "who we are" line on the left and a
 *     pill CTA button on the right.
 *
 * This version is self-contained — the original depended on a
 * shadcn `TimelineContent` wrapper and `@/lib/utils` `cn()`. Those
 * are inlined here as a tiny `Reveal` helper using Framer Motion's
 * `useInView`, so it needs no shadcn setup. Matches the project's
 * existing .jsx components.
 *
 * Brand color: #0818A8. Accent boxes use brand blue + a warm gold
 * to echo the Nordic↔African bridge identity.
 * Stack: Next.js (App Router), Tailwind, Framer Motion, lucide-react.
 */

const BRAND = "#0818A8";

const revealVariants = {
  hidden: { filter: "blur(10px)", y: 40, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const textVariants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: (i) => ({
    filter: "blur(0px)",
    opacity: 1,
    transition: { delay: i * 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Small inline replacement for shadcn's TimelineContent. */
function Reveal({ as = "div", num = 0, inView, variants, className, children, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      custom={num}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default function AboutSection({ ctaHref = "/about" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <Reveal
          as="p"
          num={0}
          inView={inView}
          variants={textVariants}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#0818A8]/70 sm:text-sm"
        >
          About Us
        </Reveal>

        {/* Statement headline with boxed keywords */}
        <Reveal
          as="h2"
          num={0}
          inView={inView}
          variants={revealVariants}
          className="text-2xl font-semibold !leading-[125%] text-gray-900 sm:text-4xl md:text-5xl"
        >
          We are{" "}
          <Reveal
            as="span"
            num={1}
            inView={inView}
            variants={textVariants}
            className="inline-block rounded-md border-2 border-dotted px-2 text-[#0818A8]"
            style={{ borderColor: BRAND }}
          >
            bridging
          </Reveal>{" "}
          Nordic and African enterprise — opening markets, building partnerships, and
          empowering businesses to{" "}
          <Reveal
            as="span"
            num={2}
            inView={inView}
            variants={textVariants}
            className="inline-block rounded-md border-2 border-dotted border-amber-500 px-2 text-amber-600"
          >
            grow across borders
          </Reveal>{" "}
          with insight, trust, and a{" "}
          <Reveal
            as="span"
            num={3}
            inView={inView}
            variants={textVariants}
            className="inline-block rounded-md border-2 border-dotted border-emerald-500 px-2 text-emerald-600"
          >
            lower-cost advantage.
          </Reveal>
        </Reveal>

        {/* Footer row: who-we-are + CTA */}
        <div className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal
            as="div"
            num={4}
            inView={inView}
            variants={textVariants}
            className="text-sm sm:text-lg"
          >
            <div className="mb-1 font-medium capitalize text-gray-900">
              We are Nordic Bridge Partners, and we will
            </div>
            <div className="font-semibold uppercase tracking-wide text-gray-600">
              take your business further
            </div>
          </Reveal>

          <Reveal
            as="a"
            num={5}
            inView={inView}
            variants={textVariants}
            href={ctaHref}
            className="group inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 self-start rounded-full px-5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.03] sm:self-auto"
            style={{ backgroundColor: BRAND, boxShadow: "0 10px 25px -8px rgba(8,24,168,0.6)" }}
          >
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            About NBP
          </Reveal>
        </div>
      </div>
    </section>
  );
}