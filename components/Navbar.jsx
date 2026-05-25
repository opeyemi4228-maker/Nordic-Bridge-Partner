"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { assets } from "@/assets/assets";

/**
 * Navbar.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Layout follows the Imperial reference (Image 1):
 *   [ wide-tracked wordmark ]  ──rule──  [ search box ] [ Menu ☰ ]
 *   framed by thin horizontal rules top and bottom.
 *
 * Scroll-reactive theming:
 *   • TOP (over hero):   transparent background, WHITE text/rules/icons.
 *   • SCROLLED:          solid WHITE background, BLACK text/rules/icons,
 *                        with a soft shadow.
 *
 * Menu panel background depends on the same scroll state:
 *   • Over hero (not scrolled):  panel bg #0818A8, WHITE text.
 *   • Scrolled (navbar white):   panel bg WHITE, BLACK text.
 *
 * Stack: Next.js (App Router), Tailwind CSS, Framer Motion, lucide-react.
 */

const BRAND = "#0818A8";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Programmes", href: "/educational-programmes" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
];

const panelVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    // Wire to your router if preferred:
    // router.push(`/search?q=${encodeURIComponent(q)}`)
    window.location.href = `/search?q=${encodeURIComponent(q)}`;
  };

  // When scrolled the bar is white → use dark ink. Otherwise it sits
  // over the hero → use white ink. The menu panel follows the same rule.
  const dark = scrolled; // dark === true means "render dark text on white bar"

  const ink = dark ? "text-[#0818A8]" : "text-white";

  const placeholderInk = dark ? "placeholder-[#0818A8]/45" : "placeholder-white/55";
  const searchBoxBg = dark ? "bg-[#0818A8]/[0.04]" : "bg-white/10";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark ? "bg-white shadow-[0_1px_24px_rgba(8,24,168,0.12)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* top rule */}
        <div className="h-[0.5px] w-full bg-white/70" />

        <div
          className={`flex items-stretch justify-between transition-all duration-300 ${
            scrolled ? "h-16 sm:h-20" : "h-20 sm:h-24 lg:h-28"
          }`}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className={`flex min-w-0 items-center gap-3 transition-colors duration-300 ${ink}`}
            aria-label="Nordic Bridge Partners — home"
          >
            {/* Logo — always visible */}
            <Image
              src={assets.logo}
              alt="Nordic Bridge Partners logo"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-9 sm:h-11" : "h-11 sm:h-14"
              }`}
              priority
            />
            {/* Name — always visible, scales with screen */}
            <span className="flex flex-col leading-none transition-all duration-300">
              <span
                className={`block leading-none font-extrabold uppercase tracking-[0.08em] transition-all duration-300 sm:tracking-[0.14em] lg:tracking-[0.2em] ${
                  scrolled
                    ? "text-[0.7rem] sm:text-lg lg:text-2xl"
                    : "text-[0.8rem] sm:text-xl lg:text-3xl"
                }`}
              >
                Nordic{" "}
                <span className={dark ? "text-[#0818A8]/55" : "text-white/70"}>Bridge</span>
              </span>
              <span
                className={`block leading-none font-extrabold uppercase tracking-[0.08em] transition-all duration-300 sm:tracking-[0.14em] lg:tracking-[0.2em] mt-[-0.05em] ${
                  scrolled
                    ? "text-[0.7rem] sm:text-lg lg:text-2xl"
                    : "text-[0.8rem] sm:text-xl lg:text-3xl"
                } ${dark ? "text-[#0818A8]/55" : "text-white/70"}`}
              >
                Partner
              </span>
            </span>
          </Link>

          {/* Right cluster */}
          <div className="flex shrink-0 items-stretch">
            {/* Inline search (desktop) — tinted box like the reference */}
            <form
              onSubmit={handleSearch}
              role="search"
              className={`hidden items-center self-center rounded-sm px-4 py-2.5 transition-colors duration-300 lg:flex ${searchBoxBg} ${ink}`}
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search"
                className={`w-48 bg-transparent text-base outline-none xl:w-64 ${placeholderInk}`}
              />
              <button type="submit" aria-label="Submit search" className="ml-2 shrink-0">
                <Search className="h-5 w-5" />
              </button>
            </form>

            {/* Menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="primary-menu"
              className={`ml-2 flex items-center gap-2 border-l border-white/100 pl-3 text-base font-medium tracking-wide transition-colors duration-300 sm:gap-3 sm:pl-6 sm:text-lg ${ink}`}
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="relative grid h-6 w-6 place-items-center">
                <AnimatePresence initial={false} mode="wait">
                  {open ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
          </div>
        </div>

        {/* bottom rule */}
        <div className="h-[0.5px] w-full bg-white/100" />
      </div>

      {/* ---------- Slide-down menu panel ---------- */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="primary-menu"
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            aria-label="Primary"
            className="overflow-hidden"
            style={{ backgroundColor: dark ? "#ffffff" : BRAND }}
          >
            <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
              {/* Mobile search inside panel */}
              <form
                onSubmit={handleSearch}
                role="search"
                className={`mb-8 flex items-center gap-3 border-b pb-4 lg:hidden ${
                  dark ? "border-[#0818A8]/20" : "border-white/25"
                }`}
              >
                <Search className={`h-5 w-5 ${dark ? "text-[#0818A8]/60" : "text-white/70"}`} />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  aria-label="Search"
                  className={`w-full bg-transparent text-lg outline-none ${
                    dark
                      ? "text-[#0818A8] placeholder-[#0818A8]/45"
                      : "text-white placeholder-white/55"
                  }`}
                />
              </form>

              <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
                {NAV_LINKS.map((link) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between border-b py-3.5 text-xl font-semibold tracking-tight transition-colors sm:py-4 sm:text-2xl lg:text-3xl ${
                        dark
                          ? "border-[#0818A8]/10 text-[#0818A8]/85 hover:text-[#0818A8]"
                          : "border-white/10 text-white/90 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight className="h-6 w-6 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}