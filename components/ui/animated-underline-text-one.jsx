"use client";

import { motion } from "framer-motion";

/**
 * Renders a word with an animated wavy underline drawn via SVG.
 * Props:
 *   color         — text color (default: inherit)
 *   underlineColor — stroke color of the SVG underline
 *   delay         — animation start delay in seconds
 */
export function AnimatedUnderlineWord({
  children,
  color = "inherit",
  underlineColor = "#ffffff",
  delay = 0.6,
}) {
  return (
    <span className="relative inline-block" style={{ color }}>
      {children}
      <motion.svg
        aria-hidden="true"
        className="absolute left-0 w-full overflow-visible"
        style={{ bottom: "-0.18em" }}
        height="0.35em"
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0,6 Q 50,0 100,6 Q 150,12 200,6 Q 250,0 300,6"
          stroke={underlineColor}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay }}
        />
      </motion.svg>
    </span>
  );
}
