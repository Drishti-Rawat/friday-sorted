"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Check, Mail, Smile } from "lucide-react";

interface NewsletterSectionProps {
  onSuccess?: () => void;
}

export default function NewsletterSection({ onSuccess }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [hasConsent, setHasConsent] = useState(false); // Unchecked by default per PRD
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    try {
      if (localStorage.getItem("friday_has_subscribed") === "true") {
        setIsSubscribed(true);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!hasConsent) {
      setError("Please check the consent box to receive Friday ideas.");
      return;
    }

    setError("");
    setIsSubscribed(true);
    try {
      localStorage.setItem("friday_has_subscribed", "true");
    } catch {
      // safe fallback
    }

    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#7C5CFC", "#FF6B5E", "#FFD166", "#A7C557"],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    onSuccess?.();
  };

  return (
    <section id="newsletter" className="w-full py-10 lg:py-16 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="relative bg-[#FCEEE3] rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden border border-[#FF6B5E]/15 shadow-xs">
          
          {/* Main Grid: Left handwritten arrow, Center content, Right Sticky note */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left handwritten prompt (visible on lg+) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-start select-none">
              <span className="font-handwriting text-2xl xl:text-3xl text-dark/85 -rotate-6 leading-tight">
                More good Fridays<br />coming your way?
              </span>
              {/* Curved SVG hand-drawn arrow pointing to the input form */}
              <svg
                viewBox="0 0 100 60"
                fill="none"
                className="w-20 h-12 text-dark/70 mt-2 ml-4 -rotate-6"
              >
                <path
                  d="M 10 10 Q 50 50, 85 40"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 75 32 L 88 40 L 80 50"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Center: Title, subtitle & subscription form */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-[34px] text-dark tracking-tight leading-tight">
                Get fresh Friday ideas in your inbox.
              </h2>
              <p className="text-dark/70 text-sm sm:text-base font-normal mt-2 max-w-md">
                No spam. Just fun ideas, good vibes, and occasional updates.
              </p>

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 flex items-center gap-2.5 px-6 py-3.5 bg-white/80 rounded-full border border-sage/40 text-dark font-medium text-sm shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-sage text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>You&apos;re in! Fresh Friday ideas are heading your way. 🎉</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 w-full max-w-md flex flex-col"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <div className="relative w-full">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="you@example.com"
                        className="w-full bg-white text-dark placeholder:text-dark/40 px-5 py-3.5 sm:py-4 rounded-full border border-dark/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm sm:text-base transition-all shadow-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto shrink-0 bg-dark text-cream font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-primary transition-all duration-300 text-sm sm:text-base shadow-sm active:scale-95 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>

                  {/* Marketing Consent Checkbox (Unchecked by default per PRD) */}
                  <div className="flex items-start gap-2 mt-3 select-none text-left">
                    <input
                      id="banner-consent"
                      type="checkbox"
                      checked={hasConsent}
                      onChange={(e) => {
                        setHasConsent(e.target.checked);
                        if (error) setError("");
                      }}
                      className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary/30 border-dark/30 cursor-pointer accent-[#7C5CFC]"
                    />
                    <label
                      htmlFor="banner-consent"
                      className="text-xs text-dark/70 leading-normal cursor-pointer"
                    >
                      I&apos;d like to receive Friday ideas and occasional updates.{" "}
                      <span className="text-dark/50">(You can unsubscribe anytime.)</span>
                    </label>
                  </div>
                </form>
              )}

              {error && (
                <p className="text-secondary text-xs sm:text-sm font-medium mt-2">
                  {error}
                </p>
              )}
            </div>

            {/* Right: Angled yellow post-it note */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end select-none">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="w-40 sm:w-44 bg-accent p-5 rounded-2xl shadow-md rotate-3 flex flex-col items-center justify-center text-dark text-center border border-dark/10 cursor-default"
              >
                <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase leading-tight font-sans">
                  GOOD<br />DAYS<br />AHEAD
                </span>
                <Smile className="w-8 h-8 text-dark mt-3 stroke-[2.2]" />
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
