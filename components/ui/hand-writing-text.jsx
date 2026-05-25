"use client";

import { motion } from "framer-motion";

/**
 * Renders a word wrapped in an animated hand-drawn oval/circle highlight.
 * Props:
 *   color       — text color (default: inherit)
 *   circleColor — stroke color of the SVG circle
 *   delay       — animation start delay in seconds
 */
export function CircleHighlight({
  children,
  color = "inherit",
  circleColor = "#0818A8",
  delay = 1.0,
}) {
  return (
    <span className="relative inline-block px-[0.15em]" style={{ color }}>
      {/* Hand-drawn oval that encircles the word */}
      <motion.svg
        aria-hidden="true"
        className="absolute overflow-visible"
        style={{
          top: "-0.22em",
          left: "-0.18em",
          width: "calc(100% + 0.36em)",
          height: "calc(100% + 0.44em)",
        }}
        viewBox="0 0 220 70"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 18,35
             C 20,10 60,3 110,3
             C 160,3 200,10 204,35
             C 208,60 168,67 110,67
             C 52,67 14,60 18,35 Z"
          stroke={circleColor}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut", delay }}
        />
      </motion.svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}
