"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * SubscribeCTA.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Layout follows the Imperial reference (Image 1):
 *   • Full-width horizontal rules top and bottom.
 *   • Two columns split by a vertical divider.
 *   • LEFT:  large, bold, two-line headline in brand blue.
 *   • RIGHT: a supporting paragraph, then an arrow on its own line.
 *
 * Adapted as a "subscribe" CTA: the right column's arrow reveals
 * an inline email form (kept faithful to the reference at rest —
 * just headline, copy, and arrow — with the form as the action).
 *
 * Brand color: #0818A8 on a white background.
 * Stack: Next.js (App Router), Tailwind CSS, Framer Motion, lucide-react.
 */

const BRAND = "#0818A8";

export default function SubscribeCTA() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Wire to your newsletter endpoint here.
    setDone(true);
  };

  return (
    <section className="bg-white" style={{ color: BRAND }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* top rule */}
        <div className="h-px w-full" style={{ backgroundColor: BRAND }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {/* LEFT: headline */}
          <div className="py-10 sm:py-14 md:py-20 md:pr-12">
            <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Stay connected with{" "}
              <span className="block sm:inline">Nordic Bridge Partners</span>
            </h2>
          </div>

          {/* vertical divider */}
          <div className="relative md:pl-12">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 hidden h-full w-px md:block"
              style={{ backgroundColor: BRAND }}
            />

            {/* RIGHT: supporting copy + arrow → form */}
            <div className="pb-10 sm:py-14 md:py-20">
              <p className="max-w-md text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                Subscribe for market insights, event invitations, and opportunities
                across the Nordic and African business landscape.
              </p>

              {!open && !done && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Subscribe"
                  className="group mt-8 inline-flex h-12 w-12 items-center justify-center -ml-2"
                >
                  <ArrowRight className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              )}

              {open && !done && (
                <motion.form
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={submit}
                  className="mt-8 flex max-w-md items-center border-b-2 pb-2"
                  style={{ borderColor: BRAND }}
                >
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="w-full bg-transparent text-lg outline-none placeholder:text-[#0818A8]/40"
                    style={{ color: BRAND }}
                  />
                  <button type="submit" aria-label="Submit" className="group ml-3 shrink-0">
                    <ArrowRight className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}

              {done && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 text-lg font-semibold"
                >
                  Thank you — you’re subscribed. →
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* bottom rule */}
        <div className="h-px w-full" style={{ backgroundColor: BRAND }} />
      </div>
    </section>
  );
}