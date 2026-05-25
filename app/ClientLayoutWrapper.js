'use client';

import Navbar from "@/components/Navbar";

export default function ClientLayoutWrapper() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <Navbar />
    </header>
  );
}
