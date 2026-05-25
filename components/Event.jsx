"use client";

import { ArrowRight } from "lucide-react";
import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * EventsSection.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Adapted from the provided "globe-feature-section":
 *   • A rounded feature panel with copy on the left and an
 *     interactive, draggable WebGL globe on the right.
 *   • Globe markers sit on real Nordic + African hubs plus
 *     Stavanger (ONS 2026 host), so the visual reinforces the
 *     cross-border story.
 *
 * Content: ONS 2026 delegation programme.
 *
 * Converted to .jsx; the shadcn <Button> and cn() are replaced by
 * a plain styled <a> and an inline cx(), so no shadcn setup is
 * needed. Brand color applied to the globe glow/markers and CTA.
 *
 * REQUIRED dependency: `cobe` (npm i cobe). Everything else is
 * already in the project (lucide-react).
 *
 * Stack: Next.js (App Router), Tailwind, lucide-react, cobe.
 */

const BRAND = "#0818A8";
const cx = (...c) => c.filter(Boolean).join(" ");

// Brand blue as 0–1 RGB for cobe.
const BRAND_RGB = [8 / 255, 24 / 255, 168 / 255];

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: BRAND_RGB,
  glowColor: [0.85, 0.88, 1],
  markers: [
    { location: [59.9139, 10.7522], size: 0.08 }, // Oslo
    { location: [58.969, 5.7331], size: 0.1 }, // Stavanger (ONS host)
    { location: [59.3293, 18.0686], size: 0.07 }, // Stockholm
    { location: [60.1699, 24.9384], size: 0.07 }, // Helsinki
    { location: [55.6761, 12.5683], size: 0.06 }, // Copenhagen
    { location: [6.5244, 3.3792], size: 0.1 }, // Lagos
    { location: [9.0765, 7.3986], size: 0.08 }, // Abuja
    { location: [5.6037, -0.187], size: 0.07 }, // Accra
    { location: [-1.2921, 36.8219], size: 0.07 }, // Nairobi
    { location: [30.0444, 31.2357], size: 0.06 }, // Cairo
  ],
};

function Globe({ className }) {
  const canvasRef = useRef(null);
  const phi = useRef(0);
  const width = useRef(0);
  const pointerInteracting = useRef(null);
  const pointerMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointer = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) phi.current += 0.005;
      state.phi = phi.current + r;
      state.width = width.current * 2;
      state.height = width.current * 2;
    },
    [r]
  );

  const onResize = () => {
    if (canvasRef.current) width.current = canvasRef.current.offsetWidth;
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...GLOBE_CONFIG,
      width: width.current * 2,
      height: width.current * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("absolute inset-0 mx-auto aspect-square w-full max-w-[600px]", className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        onPointerDown={(e) => updatePointer(e.clientX - pointerMovement.current)}
        onPointerUp={() => updatePointer(null)}
        onPointerOut={() => updatePointer(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}

export default function EventsSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 px-6 py-14 shadow-md sm:px-10 md:px-16 md:py-20">
        {/* eyebrow */}
        <p className="relative z-10 mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#0818A8]/70 sm:text-sm">
          Upcoming Event · ONS 2026
        </p>

        <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
          {/* Copy */}
          <div className="z-10 max-w-xl text-left">
            <h2 className="text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Experience the Future of Energy at ONS 2026{" "}
              <span className="block pt-3 text-base font-normal leading-relaxed text-gray-500 sm:text-lg">
                Join NBP&apos;s personalised delegation programme for strategic access and
                high-value B2B engagement in Stavanger, Norway.
              </span>
            </h2>

            <a
              href="https://nordicbridgepartner.com/nbp-delegation-ons-2026"
              className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: BRAND, boxShadow: "0 10px 25px -8px rgba(8,24,168,0.6)" }}
            >
              Start Your Tailored ONS Journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Globe */}
          <div className="relative h-[240px] w-full max-w-xl sm:h-[300px] md:h-[260px]">
            <Globe className="md:-bottom-24 md:-right-28 md:scale-150" />
          </div>
        </div>
      </div>
    </section>
  );
}