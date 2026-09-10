"use client";

import { motion } from "framer-motion";
import { Dices, ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { soundFX } from "@/utils/sound";
import IdeaCard from "@/components/IdeaCard";

interface WildCardSectionProps {
  onRollClick: () => void;
  onSelectIdea: (id: string) => void;
}

export default function WildCardSection({ onRollClick, onSelectIdea }: WildCardSectionProps) {
  const handleRoll = async () => {
    soundFX.playShuffle();
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD166", "#7C5CFC", "#FF6B5E", "#A7C557"],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
    onRollClick();
  };

  const sampleWildcards = [
    {
      id: "coin-toss-odyssey",
      title: "The 50/50 City Odyssey",
      rule: "Flip a coin at every intersection. Heads = Right, Tails = Left.",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
      tag: "City Exploration",
    },
    {
      id: "midnight-market-cookoff",
      title: "Midnight Mystery Cookoff",
      rule: "Raid a 24-hr grocery market. Buy 4 ingredients you cannot pronounce.",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
      tag: "Culinary Roulette",
    },
    {
      id: "secret-speakeasy-hunt",
      title: "Password Speakeasy Hunt",
      rule: "Whisper the secret clue to the doorman in a 1940s film character persona.",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
      tag: "Secret Cocktails",
    },
  ];

  return (
    <section id="wildcard" className="w-full py-8 lg:py-14 select-none scroll-mt-24 relative">
      <div id="wild-card" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-5 mb-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-dark text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Wild Card Mode</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-[44px] text-dark tracking-tight leading-tight">
              Can&apos;t decide? Let Friday pick for you. 🎲
            </h2>
            <p className="text-dark/70 text-sm sm:text-base font-normal mt-1 max-w-xl leading-relaxed mx-auto md:mx-0">
              Skip the questions, skip the group debates. Roll for an unhinged, curated Friday adventure with its own spontaneous golden rule.
            </p>
          </div>

          {/* Roll CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 15px 25px -6px rgba(124, 92, 252, 0.35)" }}
            whileTap={{ scale: 0.96 }}
            onClick={handleRoll}
            className="w-full sm:w-auto self-stretch sm:self-auto inline-flex items-center justify-center gap-2.5 bg-primary text-cream font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-md hover:bg-dark transition-all duration-300 cursor-pointer shrink-0"
          >
            <Dices className="w-5 h-5 text-accent" />
            <span>Roll a Wild Card Plan</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* 3 Wild Card Preview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          {sampleWildcards.map((card, idx) => (
            <IdeaCard
              key={card.title}
              idea={card}
              variant="wildcard"
              index={idx}
              onClick={() => {
                soundFX.playPop();
                onSelectIdea(card.id);
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
