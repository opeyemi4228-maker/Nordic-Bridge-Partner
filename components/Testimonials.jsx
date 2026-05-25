"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Testimonials.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Adapted from the provided "stagger-testimonials" component:
 *   • A fan of angled, clipped cards; the centre card is the
 *     active one (brand blue), neighbours stagger out to the sides.
 *   • Click any card, use the arrows, drag horizontally, or scroll
 *     horizontally over the stage to advance. Autoplay rotates
 *     gently and pauses on interaction/hover.
 *
 * Converted to .jsx and de-shadcn-ified: the original relied on
 * `@/lib/utils` cn() and design tokens (bg-primary, text-card-
 * foreground, hsl(var(--border))...). Those are replaced with an
 * inline `cx()` join and concrete brand values, so it drops in
 * with no shadcn setup.
 *
 * Brand color: #0818A8.
 * Stack: Next.js (App Router), Tailwind, lucide-react.
 */

const BRAND = "#0818A8";
const SQRT_5000 = Math.sqrt(5000);

const cx = (...c) => c.filter(Boolean).join(" ");

const TESTIMONIALS = [
  {
    tempId: 0,
    testimonial:
      "NBP opened doors in the Nordic market we couldn't have reached alone. Their B2B matchmaking was precise and genuinely valuable.",
    by: "Adaeze, Managing Director, Lagos",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    tempId: 1,
    testimonial:
      "The delegation programme to Sweden was flawlessly organised. Every meeting was relevant, and the follow-ups led to real deals.",
    by: "Erik, Head of Trade, Stockholm",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    tempId: 2,
    testimonial:
      "Their understanding of both cultures made our expansion into Africa far smoother than we expected. A true bridge.",
    by: "Sofia, Expansion Lead, Helsinki",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    tempId: 3,
    testimonial:
      "We placed three of our students in Swedish universities through NBP. Support ran from application all the way to relocation.",
    by: "Tunde, Education Consultant, Abuja",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    tempId: 4,
    testimonial:
      "The market insight reports gave us the confidence to invest. Data-driven, local, and honest.",
    by: "Ingrid, Investment Officer, Oslo",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    tempId: 5,
    testimonial:
      "From talent sourcing to onboarding in the Nordics, NBP handled the complexity so we could focus on growth.",
    by: "Kwame, Operations Director, Accra",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    tempId: 6,
    testimonial:
      "Professional, well-connected, and responsive. Our trade-fair participation paid for itself many times over.",
    by: "Linnea, Export Manager, Gothenburg",
    imgSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
  },
  {
    tempId: 7,
    testimonial:
      "NBP doesn't just make introductions — they stay with you until the partnership actually works.",
    by: "Chinedu, CEO, Port Harcourt",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
];

function TestimonialCard({ position, testimonial, handleMove, cardSize }) {
  const isCenter = position === 0;
  return (
    <div
      onClick={() => handleMove(position)}
      className={cx(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out sm:p-8",
        isCenter ? "z-10 text-white" : "z-0 bg-white text-gray-900 hover:border-[#0818A8]/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        backgroundColor: isCenter ? BRAND : undefined,
        borderColor: isCenter ? BRAND : "#e5e7eb",
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(8,24,168,0.25)" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2, backgroundColor: isCenter ? "rgba(255,255,255,0.4)" : "#e5e7eb" }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(",")[0]}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top"
        style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.12)" }}
      />
      <h3 className={cx("text-sm font-medium sm:text-lg", isCenter ? "text-white" : "text-gray-900")}>
        “{testimonial.testimonial}”
      </h3>
      <p
        className={cx(
          "absolute bottom-6 left-6 right-6 mt-2 text-xs italic sm:bottom-8 sm:left-8 sm:right-8 sm:text-sm",
          isCenter ? "text-white/80" : "text-gray-500"
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(TESTIMONIALS);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef(null);
  const dragStartX = useRef(null);
  const wheelCooldown = useRef(false);

  const handleMove = (steps) => {
    setList((prev) => {
      const next = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = next.shift();
          if (!item) return prev;
          next.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = next.pop();
          if (!item) return prev;
          next.unshift({ ...item, tempId: Math.random() });
        }
      }
      return next;
    });
  };

  // Responsive card size
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      setCardSize(w >= 640 ? 365 : Math.max(230, Math.min(290, w - 90)));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => handleMove(1), 4000);
    return () => clearInterval(t);
  }, [paused]);

  // Horizontal wheel / trackpad scroll to advance
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; // ignore vertical scroll
    if (wheelCooldown.current) return;
    wheelCooldown.current = true;
    handleMove(e.deltaX > 0 ? 1 : -1);
    setTimeout(() => (wheelCooldown.current = false), 450);
  };

  // Drag / swipe to advance
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
    setPaused(true);
  };
  const onPointerUp = (e) => {
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? null;
    if (dragStartX.current != null && endX != null) {
      const delta = endX - dragStartX.current;
      if (Math.abs(delta) > 40) handleMove(delta < 0 ? 1 : -1);
    }
    dragStartX.current = null;
  };

  return (
    <section className="bg-gray-50 px-4 py-20 sm:py-28">
      <div className="mx-auto mb-4 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0818A8]/70 sm:text-sm">
          Testimonials
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-gray-900 sm:text-4xl">
          Trusted across two regions
        </h2>
      </div>

      <div
        ref={stageRef}
        className="relative w-full touch-pan-y select-none overflow-hidden"
        style={{ height: 600 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        {list.map((testimonial, index) => {
          const position =
            list.length % 2
              ? index - (list.length + 1) / 2
              : index - list.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            onClick={() => handleMove(-1)}
            className="flex h-12 w-12 items-center justify-center border-2 border-gray-200 bg-white text-gray-900 transition-colors hover:bg-[#0818A8] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0818A8] focus-visible:ring-offset-2 sm:h-14 sm:w-14"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="flex h-12 w-12 items-center justify-center border-2 border-gray-200 bg-white text-gray-900 transition-colors hover:bg-[#0818A8] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0818A8] focus-visible:ring-offset-2 sm:h-14 sm:w-14"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}