"use client";

import { motion } from "framer-motion";
import { MOOD_CATEGORIES, MoodCategory } from "@/data/fridayData";
import { Armchair, Glasses, Sparkles, Sprout, Heart } from "lucide-react";
import React from "react";
import { soundFX } from "@/utils/sound";

interface MoodSelectorProps {
  onSelectMood: (moodId: string) => void;
}

export default function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  const getIcon = (iconName: string, color: string) => {
    const props = { className: "w-7 h-7 sm:w-8 sm:h-8", style: { color } };
    switch (iconName) {
      case "sofa":
        return <Armchair {...props} />;
      case "sunglasses":
        return <Glasses {...props} />;
      case "sparkles":
        return <Sparkles {...props} />;
      case "plant":
        return <Sprout {...props} />;
      case "heart":
        return <Heart {...props} fill="currentColor" fillOpacity={0.2} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const hoverBorderColors: Record<string, string> = {
    couch: "hover:border-[#FF6B5E]/60",
    "main-character": "hover:border-[#7C5CFC]/60",
    chaos: "hover:border-[#D946EF]/60",
    reset: "hover:border-[#A7C557]/70",
    soft: "hover:border-[#FF6B5E]/60",
  };

  return (
    <section id="ideas" className="w-full py-8 lg:py-14 scroll-mt-24 relative">
      <div id="mood-selector" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-[44px] tracking-tight text-dark">
            What kind of Friday are you having?
          </h2>
        </motion.div>

        {/* 5 Mood Cards Grid with buttery smooth 60fps hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {MOOD_CATEGORIES.map((mood, idx) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                scale: 1.025,
                boxShadow: "0 18px 30px -8px rgba(31, 27, 36, 0.1)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundFX.playPop();
                onSelectMood(mood.id);
              }}
              className={`group flex flex-col items-center text-center p-5 sm:p-6 rounded-3xl ${mood.bgColor} border ${mood.borderColor} ${hoverBorderColors[mood.id]} cursor-pointer select-none relative overflow-hidden`}
            >
              {/* Icon Container with subtle smooth scale */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110 shadow-xs"
                style={{ backgroundColor: `${mood.themeColor}18` }}
              >
                {getIcon(mood.icon, mood.themeColor)}
              </div>

              {/* Title */}
              <h3 className="font-sans font-extrabold text-base sm:text-lg text-dark tracking-tight mb-1">
                {mood.title}
              </h3>

              {/* Subtitle */}
              <p className="text-dark/70 text-xs sm:text-sm font-normal leading-snug">
                {mood.subtitle}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
