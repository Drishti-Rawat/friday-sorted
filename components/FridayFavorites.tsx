"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FRIDAY_IDEAS, FridayIdea } from "@/data/fridayData";
import { soundFX } from "@/utils/sound";
import IdeaCard from "@/components/IdeaCard";

interface FridayFavoritesProps {
  onSelectIdea: (idea: FridayIdea) => void;
  onSeeAll: () => void;
}

export default function FridayFavorites({ onSelectIdea, onSeeAll }: FridayFavoritesProps) {
  const [selectedEnergy, setSelectedEnergy] = useState<"all" | "low" | "medium" | "high">("all");
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const filteredIdeas = (
    selectedEnergy === "all"
      ? FRIDAY_IDEAS
      : FRIDAY_IDEAS.filter((item) => item.energy === selectedEnergy)
  ).slice(0, 3);

  const energyTabs = [
    { id: "all", label: "All Vibes ✨" },
    { id: "low", label: "🛋️ Chill (Low)" },
    { id: "medium", label: "🚶 Explorer (Med)" },
    { id: "high", label: "⚡ Full Send (High)" },
  ] as const;

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundFX.playPop();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="favorites" className="w-full py-8 lg:py-14 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-3 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Community Loved</span>
            </div>
            <h2 className="font-serif font-black text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] tracking-tight text-dark leading-none">
              Friday Favorites
            </h2>
            <p className="text-dark/70 text-xs sm:text-sm font-medium mt-1">
              Popular picks to inspire your night
            </p>
          </div>

          {/* Desktop/Tablet Only "See all ideas" Link - hidden on mobile */}
          <button
            onClick={() => {
              soundFX.playPop();
              onSeeAll();
            }}
            className="hidden md:inline-flex items-center gap-2 text-sm sm:text-base font-bold text-dark hover:text-primary transition-colors cursor-pointer select-none shrink-0 group"
          >
            <span>See all ideas</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Interactive Energy Filter Pills - Single sleek horizontal row on mobile, wrapping on desktop */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap pb-1.5 sm:pb-0 mb-4 sm:mb-8 select-none">
          <span className="text-xs font-bold uppercase tracking-wider text-dark/50 mr-1 hidden sm:inline shrink-0">
            Energy:
          </span>
          {energyTabs.map((tab) => {
            const isActive = selectedEnergy === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedEnergy(tab.id);
                }}
                className={`text-xs sm:text-[13px] font-bold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap shadow-2xs ${
                  isActive
                    ? "bg-dark text-cream shadow-xs scale-[1.02]"
                    : "bg-white text-dark/70 hover:text-dark border border-dark/10 hover:border-dark/25"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3 Favorites Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredIdeas.map((idea, index) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                variant="standard"
                index={index}
                isLiked={likedIds.includes(idea.id)}
                onToggleLike={toggleLike}
                onClick={() => onSelectIdea(idea)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile-Only Bottom "See all ideas" Button */}
        <div className="mt-5 sm:hidden">
          <button
            onClick={() => {
              soundFX.playPop();
              onSeeAll();
            }}
            className="w-full py-3.5 px-5 rounded-full bg-white border border-dark/15 text-dark font-bold text-sm shadow-xs hover:border-dark transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore All Friday Ideas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
