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
        {/* Section Header with 'See all ideas' */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-[44px] tracking-tight text-dark">
              Friday Favorites
            </h2>
            <p className="text-dark/70 text-sm sm:text-base font-normal mt-1">
              Popular picks to inspire your night
            </p>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onSeeAll();
            }}
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-dark hover:text-primary transition-colors cursor-pointer select-none self-start sm:self-auto"
          >
            <span>See all ideas</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Interactive Energy Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 select-none">
          <span className="text-xs font-bold uppercase tracking-wider text-dark/50 mr-1 hidden sm:inline">
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
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
      </div>
    </section>
  );
}
