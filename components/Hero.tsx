"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { MouseEvent } from "react";

interface HeroProps {
  onFindClick?: () => void;
}

export default function Hero({ onFindClick }: HeroProps) {
  // Only enable 3D tilt on large desktop viewports (lg:) to prevent texture rasterization blur on sm/mobile devices
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Smooth mouse-follow 3D tilt for the polaroid collage (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Trigger celebration confetti when clicking "Find My Friday"
  const handleCtaClick = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.62 },
        colors: ["#7C5CFC", "#FF6B5E", "#FFD166", "#A7C557", "#FFF9F2"],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
    onFindClick?.();
  };

  return (
    <section className="relative w-full flex-1 flex items-center justify-center py-2 sm:py-3 lg:py-6 overflow-hidden">
      {/* 1. Background Palm Leaf Silhouette on Top-Left */}
      <div className="absolute -top-16 -left-12 w-72 h-72 sm:w-96 sm:h-96 opacity-[0.08] pointer-events-none select-none -z-10 rotate-12">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-dark">
          <path d="M10 10 Q 70 30, 130 90 Q 80 100, 10 10 Z" />
          <path d="M30 20 Q 100 50, 160 110 Q 100 120, 30 20 Z" />
          <path d="M50 30 Q 120 80, 170 150 Q 110 140, 50 30 Z" />
          <path d="M70 50 Q 130 110, 170 180 Q 120 160, 70 50 Z" />
          <path d="M90 70 Q 140 140, 160 200 Q 120 180, 90 70 Z" />
        </svg>
      </div>

      {/* 2. Soft Ambient Blobs using Tailwind theme colors */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [-10, 15, -10],
          y: [-15, 10, -15],
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-80 bg-primary/14 rounded-full blur-3xl pointer-events-none -z-10 -translate-x-1/3"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [10, -15, 10],
          y: [15, -10, 15],
        }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
        className="absolute left-[42%] top-1/2 -translate-y-1/2 w-80 h-80 bg-primary/14 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [-15, 10, -15],
          y: [10, -15, 10],
        }}
        transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-bl from-primary/15 via-secondary/15 to-accent/20 rounded-full blur-3xl pointer-events-none -z-10"
      />



      {/* 4. Main Content Container */}
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 lg:gap-6 items-center">
          
          {/* Left Column: Typography, Badges & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6 lg:col-span-5 flex flex-col items-start text-left z-10 w-full"
          >
            {/* Wavy squiggle & GOOD VIBES ONLY */}
            <div className="flex flex-col items-start mb-1.5 sm:mb-2">
              <svg viewBox="0 0 70 8" fill="none" className="w-8 sm:w-12 h-2 text-accent mb-1">
                <path d="M2 4 Q 10 0, 18 4 T 34 4 T 50 4 T 66 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-secondary text-[11px] sm:text-sm font-extrabold tracking-[0.2em] uppercase">
                GOOD VIBES ONLY
              </span>
            </div>

            {/* Responsive Fluid Headline — subtle fade-up */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="tracking-tight leading-[0.98] sm:leading-[0.96] text-dark w-full text-left"
            >
              {/* Finally, with yellow double accent dashes */}
              <span className="inline-flex items-center justify-start font-serif font-black text-[38px] xs:text-[46px] sm:text-5xl md:text-5xl lg:text-[72px] xl:text-[82px]">
                Finally,
                {/* Accent dashes */}
                <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-accent ml-2 sm:ml-2.5 -mt-2 sm:-mt-3 shrink-0">
                  <path d="M5 20 C9 14, 11 9, 15 5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M14 24 C18 16, 20 11, 24 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>

              {/* it's Friday. with accent brush underline (behind the letters) */}
              <span className="block font-serif font-black text-[38px] xs:text-[46px] sm:text-5xl md:text-5xl lg:text-[72px] xl:text-[82px] mt-0.5 sm:mt-1.5">
                it&apos;s{" "}
                <span className="relative inline-block text-primary">
                  <span className="relative z-10">Friday.</span>
                  {/* Accent brush highlighter underline strictly behind text */}
                  <svg
                    viewBox="0 0 240 20"
                    fill="none"
                    className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-[94%] h-2.5 sm:h-4 text-accent pointer-events-none z-0"
                  >
                    <path
                      d="M 6 14 Q 110 6, 215 12"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </svg>
                </span>
              </span>

              {/* Let's make it count. */}
              <span className="block font-sans font-black text-xl xs:text-2xl md:text-2xl lg:text-[34px] xl:text-[38px] mt-1.5 sm:mt-3 leading-tight tracking-tight text-dark/95">
                Let&apos;s make it count.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2.5 sm:mt-4 text-dark/75 text-sm md:text-sm lg:text-[17px] font-normal leading-relaxed max-w-[430px] text-left"
            >
              Tell us your mood, your energy, and who you&apos;re with. We&apos;ll find
              fun ideas to make your Friday special.
            </motion.p>

            {/* Primary CTA Button & Radiant Energy Lines */}
            <div className="mt-4 sm:mt-6 flex items-center justify-start gap-3 w-full sm:w-auto select-none">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 30px -8px rgba(124, 92, 252, 0.4)" }}
                whileTap={{ scale: 0.96 }}
                onClick={handleCtaClick}
                className="group w-full xs:w-auto inline-flex items-center justify-center gap-2.5 bg-dark text-cream text-sm sm:text-base font-semibold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:bg-primary cursor-pointer shadow-md shadow-dark/10"
              >
                <span>Find My Friday</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              {/* 3 Accent radiant burst lines \ | / */}
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-8 sm:h-8 text-accent shrink-0 hidden xs:block">
                <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="8" y1="8" x2="24" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="8" y1="24" x2="24" y2="27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Social Proof: 4 Overlapping Avatars & Trust Text */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-start gap-2.5 sm:gap-3 mt-3.5 sm:mt-5 select-none"
            >
              <div className="flex -space-x-2 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=70&h=70&fit=crop&crop=faces"
                  alt="User"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-cream object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop&crop=faces"
                  alt="User"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-cream object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=70&h=70&fit=crop&crop=faces"
                  alt="User"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-cream object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=70&h=70&fit=crop&crop=faces"
                  alt="User"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-cream object-cover"
                />
              </div>
              <span className="text-xs sm:text-[13px] font-medium text-dark/75">
                Join thousands making their Fridays better!
              </span>
            </motion.div>

            {/* Bottom 3 Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:flex flex-wrap items-center justify-start gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 border-t border-dark/10 select-none w-full"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-dark/85 bg-white/75 px-3 py-1 rounded-full border border-dark/5 shadow-2xs cursor-default"
              >
                <span className="text-secondary">✦</span>
                <span>Fun ideas</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-dark/85 bg-white/75 px-3 py-1 rounded-full border border-dark/5 shadow-2xs cursor-default"
              >
                <span className="text-secondary">♡</span>
                <span>No overthinking</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-dark/85 bg-white/75 px-3 py-1 rounded-full border border-dark/5 shadow-2xs cursor-default"
              >
                <span className="text-sage">☺</span>
                <span>Happier Fridays</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Collage Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="md:col-span-6 lg:col-span-7 relative flex items-center justify-center md:justify-end lg:justify-start md:-ml-0 lg:-ml-4 xl:-ml-6 w-full mt-4 md:mt-0"
          >
            {/* Top-Right Doodles: Weekend Starts Now */}
            <div className="absolute -top-5 right-4 hidden xl:flex flex-col items-end select-none pointer-events-none z-20">
              <span className="font-handwriting italic text-xl text-dark/85 -rotate-6">
                Weekend Starts Now 🌴
              </span>
              <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5 text-dark/70 mr-3">
                <path d="M 22 4 C 18 12, 14 18, 6 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M 6 15 L 5 23 L 13 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Far Right Doodles: Pink Heart & Sparkle */}
            <div className="absolute -right-4 top-1/3 hidden lg:flex flex-col items-center gap-4 select-none pointer-events-none z-20">
              {/* Secondary hand-drawn heart */}
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 text-secondary/90 rotate-12">
                <path
                  d="M16 26 C12 22, 4 16, 4 10 C4 6, 7 3, 11 3 C14 3, 15 5, 16 7 C17 5, 18 3, 21 3 C25 3, 28 6, 28 10 C28 16, 20 22, 16 26 Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              {/* Primary 4-point star */}
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 text-primary">
                <path d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Far Right Note: Pure Friday Bliss */}
            <div className="absolute -right-2 bottom-1/4 hidden xl:flex flex-col items-center select-none pointer-events-none z-20">
              <span className="font-handwriting italic text-lg text-dark/85 rotate-3 text-center leading-tight">
                Pure<br />Friday<br />Bliss ✨
              </span>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-dark/70 mt-1">
                <path d="M 12 2 C 14 10, 16 16, 18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Bottom-Right Primary Flower Outline Doodle */}
            <div className="absolute -bottom-6 right-4 hidden lg:block w-16 h-16 text-primary/60 select-none pointer-events-none z-20">
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full stroke-current stroke-[2.5]" strokeLinecap="round">
                <circle cx="32" cy="32" r="5" />
                <path d="M32 10 C28 20, 36 20, 32 27" />
                <path d="M32 54 C28 44, 36 44, 32 37" />
                <path d="M10 32 C20 28, 20 36, 27 32" />
                <path d="M54 32 C44 28, 44 36, 37 32" />
                <path d="M16 16 C26 22, 22 28, 28 28" />
                <path d="M48 48 C38 42, 42 36, 36 36" />
                <path d="M48 16 C42 26, 36 22, 36 28" />
                <path d="M16 48 C22 38, 28 42, 28 36" />
              </svg>
            </div>



            {/* Hero Collage Graphic: 3D Tilt enabled only on desktop (lg:) to prevent texture blur on sm/mobile devices */}
            <motion.div
              style={isDesktop ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative flex items-center justify-center md:justify-end lg:justify-start w-full max-w-[340px] xs:max-w-[420px] sm:max-w-[520px] md:max-w-[480px] lg:max-w-[760px] xl:max-w-[820px] mx-auto lg:mx-0"
            >
              <Image
                src="/hero-image.png"
                alt="Friday, Sorted activities"
                width={880}
                height={920}
                priority
                unoptimized
                className="w-full h-auto max-h-[320px] xs:max-h-[380px] md:max-h-[440px] lg:max-h-[min(600px,76vh)] object-contain drop-shadow-2xl select-none transition-transform duration-500 hover:scale-[1.015]"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
