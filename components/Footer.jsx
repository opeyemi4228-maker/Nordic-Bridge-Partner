"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { assets } from "@/assets/assets";

/**
 * Footer.jsx — Nordic Bridge Partners
 * --------------------------------------------------------------
 * Layout follows the IELTS reference (Image 2):
 *   Row 1:  large wordmark (left)        ·  partner / contact block (right)
 *   Row 2:  bold horizontal link row (left)  ·  social icon squares (right)
 *   Row 3:  © copyright line
 *   Row 4:  smaller legal / address fine print
 *
 * Type scale mirrors the reference:
 *   • Wordmark — very large, extra-bold.
 *   • Link row — ~text-xl, bold, generous horizontal spacing.
 *   • Copyright — ~text-lg/xl, regular.
 *   • Fine print — ~text-sm/base, lighter.
 *
 * Background: solid #0818A8. Text: white.
 * Stack: Next.js (App Router), Tailwind CSS, Framer Motion, react-icons.
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

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nordic-bridge-partner/",
    Icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nordicbridgepartners/",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/nordicbridgepartner",
    Icon: FaFacebookF,
  },
];

const PHONES = ["+46 70 029 35 91", "+46 76 051 19 54"];
const EMAIL = "info@nordicbridgepartner.com";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: BRAND }}>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Row 1: wordmark + contact block */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between"
        >
          <Link href="/" aria-label="Nordic Bridge Partners — home" className="inline-flex items-center gap-4">
            {/* Logo — always shown */}
            <Image
              src={assets.logo}
              alt="Nordic Bridge Partners logo"
              className="h-16 w-auto object-contain sm:h-20"
              priority
            />
            {/* Name — always visible, scales with screen */}
            <span className="flex flex-col leading-none">
              <span
                className="block font-extrabold uppercase leading-none text-xl sm:text-4xl lg:text-6xl"
                style={{ letterSpacing: "0.02em" }}
              >
                Nordic Bridge
              </span>
              <span className="block font-extrabold uppercase leading-none text-xl sm:text-4xl lg:text-6xl" style={{ letterSpacing: "0.02em" }}>
                Partner
              </span>
            </span>
          </Link>

          {/* Contact block (top-right, like the partner logos area) */}
          <div className="text-[17px] leading-relaxed text-white/85 lg:text-right">
            <p className="font-semibold text-white">Sweden</p>
            <p>Västra Måttan 3, 74694 Häggeby, Bålsta</p>
            <p className="mt-3 font-semibold text-white">Nigeria</p>
            <p>Block J, House 3, Moore Road, Yaba, Lagos</p>
            <div className="mt-4 space-y-1">
              {PHONES.map((p) => (
                <p key={p}>
                  <a href={`tel:${p.replace(/\s+/g, "")}`} className="hover:text-white">
                    {p}
                  </a>
                </p>
              ))}
              <p>
                <a href={`mailto:${EMAIL}`} className="underline-offset-4 hover:text-white hover:underline">
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-white/15" />

        {/* Row 2: bold link row + social squares */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-lg font-bold sm:gap-x-10 sm:gap-y-4 sm:text-xl">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="grid h-12 w-12 place-items-center rounded-md bg-white text-[#0818A8] transition-transform"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Row 3: copyright */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-16"
        >
          <p className="flex items-center gap-3 text-lg sm:text-xl">
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-full border border-white/60 text-sm"
            >
              ©
            </span>
            {new Date().getFullYear()}. Nordic Bridge Partner — bridging Nordic and African enterprise.
          </p>

          {/* Row 4: fine print */}
          <p className="mt-6 max-w-9xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
            Nordic Bridge Partner AB facilitates cross-border collaboration between Nordic and
            African enterprises through market research, B2B facilitation, trade-fair support,
            education services, and talent solutions. All names, marks, and content on this
            website are the property of Nordic Bridge Partner and may not be copied, reproduced,
            modified, distributed, or republished without prior written permission.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}