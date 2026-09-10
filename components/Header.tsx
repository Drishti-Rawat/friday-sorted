"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Heart } from "lucide-react";
import { soundFX } from "@/utils/sound";

interface HeaderProps {
  onFindClick?: () => void;
  onHomeClick?: () => void;
  onSavedClick?: () => void;
  savedCount?: number;
  currentView?: "landing" | "quiz" | "result";
}

export default function Header({
  onFindClick,
  onHomeClick,
  onSavedClick,
  savedCount = 0,
  currentView = "landing",
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFX.playPop();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else {
      router.push("/");
    }
    onHomeClick?.();
  };

  // Core navigation links (Ideas, Favorites, Wild Card)
  const navLinks = [
    { name: "Ideas", href: "/#ideas", targetId: "ideas" },
    { name: "Favorites", href: "/#favorites", targetId: "favorites" },
    { name: "Wild Card", href: "/#wildcard", targetId: "wildcard" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    href: string
  ) => {
    soundFX.playPop();

    const isHomePage =
      pathname === "/" ||
      (typeof window !== "undefined" && window.location.pathname === "/");

    if (isHomePage) {
      e.preventDefault();
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
      // From /planner or any other route, push to landing page with hash
      router.push(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md transition-all duration-200 border-b border-dark/5">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 h-14 sm:h-16 lg:h-20 flex items-center justify-between">
        
        {/* Logo (returns to Home) */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center group transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="Friday, Sorted."
            width={140}
            height={38}
            priority
            className="h-7 sm:h-8 lg:h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links: Real links to currently displayed sections */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.targetId, link.href)}
              className="text-dark/80 text-[15px] font-medium transition-colors duration-200 hover:text-primary cursor-pointer py-1 select-none"
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right Area: Saved Capsule & CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* Saved collection drawer trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundFX.playPop();
              onSavedClick?.();
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              savedCount > 0
                ? "bg-white border border-secondary/40 text-secondary shadow-xs hover:bg-secondary/5"
                : "bg-white/60 border border-dark/15 text-dark/70 hover:text-dark hover:border-dark/30"
            }`}
            title="View saved Friday plans"
          >
            <Heart className="w-3.5 h-3.5" fill={savedCount > 0 ? "currentColor" : "none"} />
            <span>Saved {savedCount > 0 ? `(${savedCount})` : ""}</span>
          </motion.button>

          {/* Find My Friday CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundFX.playPop();
              onFindClick?.();
            }}
            className="inline-flex items-center gap-2 bg-dark text-cream text-[15px] font-semibold px-6 py-2.5 rounded-full shadow-sm hover:bg-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
          >
            <span>{currentView === "landing" ? "Find My Friday" : "New Friday Plan"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Mobile Menu Button & Saved Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              soundFX.playPop();
              onSavedClick?.();
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
              savedCount > 0 ? "bg-white border-secondary/40 text-secondary" : "bg-white/60 border-dark/15 text-dark/70"
            }`}
          >
            <Heart className="w-3 h-3" fill={savedCount > 0 ? "currentColor" : "none"} />
            <span>{savedCount}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-xl text-dark hover:bg-dark/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer: Absolute floating overlay that does NOT push the hero section down */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full md:hidden border-b border-dark/15 bg-cream/95 backdrop-blur-xl px-6 py-5 overflow-hidden shadow-2xl z-50"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, link.targetId, link.href);
                  }}
                  className="text-left text-dark text-lg font-medium py-2 px-1 hover:text-primary transition-colors flex items-center justify-between border-b border-dark/5"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onFindClick?.();
                }}
                className="mt-3 flex items-center justify-center gap-2 w-full bg-dark text-cream font-semibold py-3.5 rounded-full text-base hover:bg-primary transition-all cursor-pointer shadow-md"
              >
                <span>{currentView === "landing" ? "Find My Friday" : "New Friday Plan"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
