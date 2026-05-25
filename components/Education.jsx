"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * EducationSection.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Redesigned to the provided feature-split reference (Image 1):
 *   • LEFT: a tall image card with a rounded "Read more" pill and a
 *     circular arrow button overlaid at the bottom.
 *   • RIGHT: a numbered feature list (01 / 02 / 03) with title +
 *     description rows separated by hairlines, a short intro line,
 *     and a colored stat tile.
 *
 * Content uses NBP's EduNordic education details.
 *
 * Responsive: single column on mobile (image first, then list,
 * then stat), two-column from lg up. Numbered rows reflow so the
 * description sits under the title on small screens and beside it
 * on large screens.
 *
 * Brand color: #0818A8. Stat tile uses brand blue.
 * Stack: Next.js (App Router), Tailwind, Framer Motion, lucide-react.
 */

const BRAND = "#0818A8";

const FEATURES = [
  {
    n: "01",
    title: "Top European Universities",
    desc: "Access diploma and degree pathways through our selected partner institutions across Europe.",
  },
  {
    n: "02",
    title: "International Experience",
    desc: "Gain global exposure, build networks, and develop the competencies that shape future careers.",
  },
  {
    n: "03",
    title: "Full Support, End to End",
    desc: "From application to relocation, we guide you at every step of your study journey.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function EducationSection({
  image = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=85",
  ctaHref = "https://nordicbridgepartner.com/edunordic/",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.p
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fade}
          className="mb-10 text-xs font-semibold uppercase tracking-[0.22em] text-[#0818A8]/70 sm:text-sm"
        >
          Education
        </motion.p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT — image card */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fade}
            className="relative overflow-hidden rounded-3xl"
          >
            <img
              src={image}
              alt="Students studying at a European university"
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-full"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(3,6,40,0.55) 0%, rgba(3,6,40,0) 45%)",
              }}
            />
            {/* overlay action bar */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 sm:inset-x-6 sm:bottom-6">
              <a
                href={ctaHref}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-colors hover:bg-white/90 sm:px-6 sm:py-3.5"
              >
                Read more & apply.
              </a>
              <a
                href={ctaHref}
                aria-label="Apply now"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-gray-900 shadow-lg transition-transform hover:scale-105 sm:h-14 sm:w-14"
              >
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT — feature list + intro + stat */}
          <div className="flex flex-col">
            {/* numbered feature rows */}
            <div>
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.n}
                  custom={i + 2}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fade}
                  className="flex flex-col gap-2 border-b border-gray-200 py-6 first:pt-0 sm:flex-row sm:items-start sm:gap-6 sm:py-7"
                >
                  <div className="flex items-center gap-4 sm:w-1/2">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-300 text-xs font-semibold text-gray-500">
                      {f.n}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                      {f.title}
                    </h3>
                  </div>
                  <p className="pl-[52px] text-sm leading-relaxed text-gray-600 sm:w-1/2 sm:pl-0 sm:text-[15px]">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* intro line + stat tile */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-end">
              <motion.p
                custom={5}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fade}
                className="text-xl font-medium leading-snug text-gray-900 sm:text-2xl"
              >
                Study in Europe — your gateway to knowledge, experience, and career.
              </motion.p>

              <motion.div
                custom={6}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fade}
                className="flex flex-col justify-between rounded-3xl p-6 text-white sm:aspect-square sm:p-7"
                style={{ backgroundColor: BRAND }}
              >
                <span className="text-5xl font-bold leading-none sm:text-6xl">100%</span>
                <span className="mt-6 text-sm leading-snug text-white/85">
                  Full support — from application to relocation. Apply now and start
                  your journey.
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}