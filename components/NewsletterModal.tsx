"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed?: () => void;
}

export default function NewsletterModal({ isOpen, onClose, onSubscribed }: NewsletterModalProps) {
  const [email, setEmail] = useState("");
  const [hasConsent, setHasConsent] = useState(false); // unchecked by default per PRD
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!hasConsent) {
      setError("Please check the consent box to receive our Friday ideas.");
      return;
    }

    setError("");
    setIsSuccess(true);
    try {
      localStorage.setItem("friday_has_subscribed", "true");
    } catch {
      // safe fallback
    }
    onSubscribed?.();

    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.5 },
        colors: ["#7C5CFC", "#FF6B5E", "#FFD166", "#A7C557"],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail("");
    setHasConsent(false);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-dark/10 z-10 my-auto text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream hover:bg-dark/10 flex items-center justify-center text-dark/70 hover:text-dark transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSuccess ? (
            <div>
              {/* Confetti / Sparkle top doodle */}
              <div className="flex justify-center mb-3 text-2xl select-none">
                <span className="animate-bounce">✨</span>
              </div>

              <h3 className="font-serif font-black text-2xl sm:text-3xl text-dark tracking-tight">
                Want more Friday ideas?
              </h3>
              <p className="text-dark/70 text-xs sm:text-sm mt-1">
                Get 5 handpicked ideas in your inbox.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 text-left">
                {/* Email Input */}
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="you@example.com"
                    className="w-full bg-cream/60 text-dark placeholder:text-dark/40 px-4 py-3 rounded-2xl border border-dark/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
                  />
                </div>

                {/* Consent Checkbox (Unchecked by default per PRD) */}
                <div className="flex items-start gap-2.5 mb-5 select-none">
                  <input
                    id="marketing-consent"
                    type="checkbox"
                    checked={hasConsent}
                    onChange={(e) => {
                      setHasConsent(e.target.checked);
                      if (error) setError("");
                    }}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/30 border-dark/30 cursor-pointer accent-[#7C5CFC]"
                  />
                  <label
                    htmlFor="marketing-consent"
                    className="text-xs text-dark/70 leading-normal cursor-pointer"
                  >
                    I&apos;d like to receive Friday ideas and occasional updates.{" "}
                    <span className="text-dark/50">(You can unsubscribe anytime.)</span>
                  </label>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-4 flex items-center gap-2 p-2.5 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-dark text-cream font-bold text-sm hover:bg-primary transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Send me ideas</span>
                  <span>→</span>
                </button>

                <p className="text-center text-[11px] text-dark/50 mt-4">
                  No spam. Just better Fridays. <span className="text-secondary">♥</span>
                </p>
              </form>
            </div>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              {/* Paper Airplane Illustration with trail lines matching Screen 4 Mockup */}
              <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm" />
                <motion.div
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="relative z-10 text-primary"
                >
                  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                    <path
                      d="M 6 24 L 42 6 L 28 42 L 22 28 L 6 24 Z"
                      fill="#7C5CFC"
                      stroke="#1F1B24"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 42 6 L 22 28"
                      stroke="#FFF9F2"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Speed dash marks */}
                    <line x1="8" y1="36" x2="16" y2="34" stroke="#FFD166" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="12" y1="42" x2="20" y2="40" stroke="#FF6B5E" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              <h3 className="font-serif font-black text-2xl sm:text-3xl text-dark tracking-tight">
                You&apos;re officially Friday-ready! 🎉
              </h3>
              <p className="text-dark/70 text-sm mt-2">
                Check your inbox for some fresh ideas.
              </p>

              <button
                onClick={handleReset}
                className="mt-6 w-full py-3 px-6 rounded-full bg-dark text-cream font-bold text-sm hover:bg-primary transition-all shadow-sm active:scale-95"
              >
                Find another Friday
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
