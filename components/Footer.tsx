"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUp, Heart, Sparkles, Dices, Compass, ArrowRight } from "lucide-react";
import { soundFX } from "@/utils/sound";

interface FooterProps {
  onNavigateIdeas?: () => void;
  onSavedClick?: () => void;
  onSurpriseClick?: () => void;
}

export default function Footer({ onNavigateIdeas, onSavedClick, onSurpriseClick }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (targetId: string) => {
    soundFX.playPop();
    if (pathname === "/" || (typeof window !== "undefined" && window.location.pathname === "/")) {
      const el =
        document.getElementById(targetId) ||
        (targetId === "wildcard" ? document.getElementById("wild-card") : null) ||
        (targetId === "ideas" ? document.getElementById("mood-selector") : null);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${targetId}`);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const scrollToTop = () => {
    soundFX.playPop();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/");
    }
  };

  return (
    <footer className="w-full bg-[#FAF3EC] border-t border-dark/10 pt-10 sm:pt-14 pb-10 mt-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12"
      >

        {/* Main Grid: 1-col → 2-col (md) → 3-col (lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 pb-10 sm:pb-12 border-b border-dark/10">

          {/* Brand Column */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col items-start">
            <Link href="/" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="inline-block group mb-4">
              <Image
                src="/logo.png"
                alt="Friday, Sorted."
                width={150}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain group-hover:scale-[1.02] transition-transform"
              />
            </Link>

            <p className="text-dark/75 text-sm leading-relaxed max-w-xs md:max-w-sm mb-5">
              Your Friday night, officially sorted. Handcrafted adventures, cozy rituals, and spontaneous plans to make your weekend count.
            </p>

            {/* Vibe Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 border border-dark/8 text-xs font-semibold text-dark/70 shadow-2xs">🛋️ Low-Key Chill</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 border border-dark/8 text-xs font-semibold text-dark/70 shadow-2xs">⚡ Full Send</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 border border-dark/8 text-xs font-semibold text-dark/70 shadow-2xs">🎲 Spontaneous</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 border border-dark/8 text-xs font-semibold text-dark/70 shadow-2xs">🍷 Date Night</span>
            </div>
          </div>

          {/* Nav Columns: side-by-side sub-grid on tablet, individual cols on desktop */}
          <div className="md:col-span-1 lg:col-span-7 grid grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* Explore */}
            <div className="lg:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-dark/50 mb-3 sm:mb-4">Explore</h4>
              <ul className="space-y-2.5 sm:space-y-3 text-sm font-semibold text-dark/80">
                <li>
                  <button onClick={() => handleNav("ideas")} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Explore by Mood</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("favorites")} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>Friday Favorites</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("wildcard")} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5">
                    <Dices className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>Wild Card Mode</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Friday Toolkit */}
            <div className="lg:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-dark/50 mb-3 sm:mb-4">Friday Toolkit</h4>
              <ul className="space-y-2.5 sm:space-y-3 text-sm font-semibold text-dark/80">
                <li>
                  <Link href="/planner" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Vibe Quiz</span>
                  </Link>
                </li>
                <li>
                  <Link href="/planner?surprise=true" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5">
                    <Dices className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>Surprise Itinerary</span>
                  </Link>
                </li>
                {onSavedClick && (
                  <li>
                    <button
                      onClick={() => { soundFX.playPop(); onSavedClick(); }}
                      className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5 text-left"
                    >
                      <Heart className="w-3.5 h-3.5 text-secondary shrink-0" fill="currentColor" />
                      <span>Saved Vault</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Strip: Social Icons, Back to Top, Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-dark/65">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/70 border border-dark/8 flex items-center justify-center hover:bg-white hover:text-primary hover:scale-105 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/70 border border-dark/8 flex items-center justify-center hover:bg-white hover:text-primary hover:scale-105 transition-all"
              aria-label="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/70 border border-dark/8 flex items-center justify-center hover:bg-white hover:text-primary hover:scale-105 transition-all"
              aria-label="TikTok"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.25 6.25 0 0 0 1.86-4.48V8.69a8.18 8.18 0 0 0 4.91 1.62v-3.62z" />
              </svg>
            </a>

            <span className="text-xs font-semibold text-dark/50 ml-2">
              Made for Fridays. <span className="text-secondary">♥</span>
            </span>
          </div>

          {/* Right: Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-dark/10 text-xs font-bold text-dark/80 hover:bg-dark hover:text-cream shadow-2xs transition-all duration-200 cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </motion.div>
    </footer>
  );
}
