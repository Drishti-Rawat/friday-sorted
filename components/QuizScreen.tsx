"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Cloud,
  PartyPopper,
  Trees,
  Coffee,
  Laptop,
  Heart,
  Users,
  Wallet,
  Check,
  Zap,
  Flame,
  BatteryCharging,
  User,
  HeartHandshake,
  Home,
} from "lucide-react";
import React, { useState } from "react";
import { soundFX } from "@/utils/sound";

interface QuizScreenProps {
  initialMood?: string | null;
  onComplete: (answers: {
    mood: string;
    energy: string;
    company: string;
    budget: string;
  }) => void;
  onBackToLanding: () => void;
}

export default function QuizScreen({
  initialMood,
  onComplete,
  onBackToLanding,
}: QuizScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Map initial mood if provided
  const getInitialMoodValue = () => {
    if (!initialMood) return "Chill";
    const map: Record<string, string> = {
      couch: "Chill",
      "main-character": "Party",
      chaos: "With Friends",
      reset: "Outdoors",
      soft: "Date Night",
    };
    return map[initialMood] || "Chill";
  };

  const [selectedMood, setSelectedMood] = useState<string>(getInitialMoodValue());
  const [selectedEnergy, setSelectedEnergy] = useState<string>("medium");
  const [selectedCompany, setSelectedCompany] = useState<string>("friends");
  const [selectedBudget, setSelectedBudget] = useState<string>("budget");

  // 8 Mood Cards matching Mockup Screen 2
  const moodCards = [
    {
      id: "Chill",
      label: "Chill",
      desc: "Slow down & recharge",
      icon: Cloud,
      iconColor: "#7C5CFC",
      bgColor: "bg-[#F4F6FF]",
      borderHover: "hover:border-[#7C5CFC]/40",
      activeBorder: "border-[#7C5CFC] ring-2 ring-[#7C5CFC]/20 shadow-md",
    },
    {
      id: "Party",
      label: "Party",
      desc: "Let's go out!",
      icon: PartyPopper,
      iconColor: "#FF6B5E",
      bgColor: "bg-[#FFF1EE]",
      borderHover: "hover:border-[#FF6B5E]/40",
      activeBorder: "border-[#FF6B5E] ring-2 ring-[#FF6B5E]/20 shadow-md",
    },
    {
      id: "Outdoors",
      label: "Outdoors",
      desc: "Fresh air & good views",
      icon: Trees,
      iconColor: "#A7C557",
      bgColor: "bg-[#EFF8F2]",
      borderHover: "hover:border-[#A7C557]/40",
      activeBorder: "border-[#A7C557] ring-2 ring-[#A7C557]/20 shadow-md",
    },
    {
      id: "Cozy",
      label: "Cozy",
      desc: "Stay in & unwind",
      icon: Coffee,
      iconColor: "#D97706",
      bgColor: "bg-[#FFF7EC]",
      borderHover: "hover:border-[#D97706]/40",
      activeBorder: "border-[#D97706] ring-2 ring-[#D97706]/20 shadow-md",
    },
    {
      id: "Productive",
      label: "Productive",
      desc: "Get things done",
      icon: Laptop,
      iconColor: "#6366F1",
      bgColor: "bg-[#F6F2FF]",
      borderHover: "hover:border-[#6366F1]/40",
      activeBorder: "border-[#6366F1] ring-2 ring-[#6366F1]/20 shadow-md",
    },
    {
      id: "Date Night",
      label: "Date Night",
      desc: "Quality time",
      icon: Heart,
      iconColor: "#EC4899",
      bgColor: "bg-[#FFF0F5]",
      borderHover: "hover:border-[#EC4899]/40",
      activeBorder: "border-[#EC4899] ring-2 ring-[#EC4899]/20 shadow-md",
    },
    {
      id: "With Friends",
      label: "With Friends",
      desc: "More the merrier",
      icon: Users,
      iconColor: "#8B5CF6",
      bgColor: "bg-[#F4EFFE]",
      borderHover: "hover:border-[#8B5CF6]/40",
      activeBorder: "border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20 shadow-md",
    },
    {
      id: "Cheap & Fun",
      label: "Cheap & Fun",
      desc: "Good times on a budget",
      icon: Wallet,
      iconColor: "#EAB308",
      bgColor: "bg-[#FFFBEB]",
      borderHover: "hover:border-[#EAB308]/40",
      activeBorder: "border-[#EAB308] ring-2 ring-[#EAB308]/20 shadow-md",
    },
  ];

  // Energy Options
  const energyOptions = [
    {
      id: "low",
      label: "Low Energy",
      desc: "Bare minimum movement. Cozy, quiet, and chill.",
      icon: BatteryCharging,
      color: "#7C5CFC",
      bgColor: "bg-[#F4F6FF]",
    },
    {
      id: "medium",
      label: "Medium Energy",
      desc: "Down for dinner, a walk, or casual exploring.",
      icon: Zap,
      color: "#FF6B5E",
      bgColor: "bg-[#FFF1EE]",
    },
    {
      id: "high",
      label: "High Energy",
      desc: "Ready to dance, roam late, and make wild memories!",
      icon: Flame,
      color: "#D946EF",
      bgColor: "bg-[#FDF0FB]",
    },
  ];

  // Company Options
  const companyOptions = [
    {
      id: "solo",
      label: "Solo Mission",
      desc: "Main character energy. Just me, myself, and I.",
      icon: User,
      bgColor: "bg-[#FFF7EC]",
      color: "#D97706",
    },
    {
      id: "partner",
      label: "With My Person",
      desc: "Romantic, cozy, or deep 1-on-1 quality time.",
      icon: HeartHandshake,
      bgColor: "bg-[#FFF0F5]",
      color: "#EC4899",
    },
    {
      id: "friends",
      label: "The Whole Crew",
      desc: "Group chat reunion, laughter, and spontaneous plans.",
      icon: Users,
      bgColor: "bg-[#F4EFFE]",
      color: "#8B5CF6",
    },
    {
      id: "family",
      label: "Family Night",
      desc: "Warm, wholesome, and heartwarming vibes.",
      icon: Home,
      bgColor: "bg-[#EFF8F2]",
      color: "#A7C557",
    },
  ];

  // Budget Options
  const budgetOptions = [
    {
      id: "free",
      label: "Free ($0)",
      desc: "Zero dollars, maximum fun.",
      badge: "$0",
      bgColor: "bg-[#EFF8F2]",
      color: "#A7C557",
    },
    {
      id: "budget",
      label: "Budget-Friendly ($)",
      desc: "A casual bite, coffee, or dessert.",
      badge: "$",
      bgColor: "bg-[#FFFBEB]",
      color: "#EAB308",
    },
    {
      id: "splurge",
      label: "Treat Yourself ($$)",
      desc: "Fine dining, cocktails, or show tickets.",
      badge: "$$$",
      bgColor: "bg-[#FDF0FB]",
      color: "#D946EF",
    },
  ];

  const handleNext = () => {
    soundFX.playPop();
    if (step < 4) {
      setStep((prev) => (prev + 1) as any);
    } else {
      soundFX.playChime();
      onComplete({
        mood: selectedMood,
        energy: selectedEnergy,
        company: selectedCompany,
        budget: selectedBudget,
      });
    }
  };

  const handleBack = () => {
    soundFX.playPop();
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    } else {
      onBackToLanding();
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-between py-3 sm:py-5 px-4 sm:px-8 lg:px-12 max-w-[1200px] mx-auto min-h-[calc(100vh-5rem)] h-full">
      
      {/* 1. Compact Stepper Progress Bar (Screen 2 Mockup) */}
      <div className="w-full max-w-lg mb-3 sm:mb-4 shrink-0">
        <div className="relative flex items-center justify-between">
          
          {/* Connector Line */}
          <div className="absolute top-3.5 sm:top-4 left-6 right-6 h-0.5 bg-dark/15 -z-0">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>

          {/* Step Nodes */}
          {[
            { num: 1, label: "Mood" },
            { num: 2, label: "Energy" },
            { num: 3, label: "Company" },
            { num: 4, label: "Budget" },
          ].map((item) => {
            const isCompleted = step > item.num;
            const isCurrent = step === item.num;
            return (
              <div key={item.num} className="flex flex-col items-center z-10 select-none">
                <button
                  onClick={() => {
                    if (item.num < step) {
                      soundFX.playPop();
                      setStep(item.num as any);
                    }
                  }}
                  disabled={item.num > step}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCurrent
                      ? "bg-primary text-white ring-4 ring-primary/20 shadow-md scale-105"
                      : isCompleted
                      ? "bg-primary text-white cursor-pointer hover:scale-105"
                      : "bg-white text-dark/40 border border-dark/15"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : item.num}
                </button>
                <span
                  className={`text-[11px] sm:text-xs mt-1 font-medium tracking-tight ${
                    isCurrent ? "text-primary font-bold" : "text-dark/60"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* 2. Step 1: Mood */}
      {step === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl flex flex-col items-center flex-1 justify-center"
        >
          {/* Headline with Yellow 3-Ray Burst Doodle */}
          <div className="relative text-center mb-3 sm:mb-5 shrink-0">
            <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-[36px] text-dark tracking-tight leading-tight inline-block relative">
              What&apos;s your Friday vibe?
              {/* Yellow 3-ray burst doodle on top-right of headline */}
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="w-6 h-6 sm:w-7 sm:h-7 text-accent absolute -top-4 -right-7 pointer-events-none"
              >
                <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="8" y1="8" x2="24" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="8" y1="24" x2="24" y2="27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </h2>
            <p className="text-dark/65 text-xs sm:text-sm font-normal mt-0.5">
              Pick a mood that feels right today.
            </p>
          </div>

          {/* 8 Mood Cards (4x2 Grid) - Fits cleanly on screen */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mb-3">
            {moodCards.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedMood === card.id;
              return (
                <motion.button
                  key={card.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundFX.playPop();
                    setSelectedMood(card.id);
                  }}
                  className={`relative p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl ${card.bgColor} border border-dark/6 transition-all duration-200 flex flex-col items-center text-center cursor-pointer select-none ${
                    card.borderHover
                  } ${isSelected ? card.activeBorder : ""}`}
                >
                  {/* Selected checkmark indicator */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${card.iconColor}18` }}
                  >
                    <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" style={{ color: card.iconColor }} />
                  </div>

                  {/* Label */}
                  <h3 className="font-sans font-bold text-sm sm:text-base text-dark tracking-tight mb-0.5">
                    {card.label}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-dark/65 text-[11px] sm:text-xs font-normal leading-tight">
                    {card.desc}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 3. Step 2: Energy */}
      {step === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-xl flex flex-col items-center flex-1 justify-center"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-dark tracking-tight">
              How much battery do you have left?
            </h2>
            <p className="text-dark/65 text-xs sm:text-sm font-normal mt-1">
              Be honest with yourself!
            </p>
          </div>

          <div className="w-full space-y-2.5 sm:space-y-3 mb-4">
            {energyOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedEnergy === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFX.playPop();
                    setSelectedEnergy(opt.id);
                  }}
                  className={`w-full p-4 sm:p-5 rounded-2xl ${opt.bgColor} border border-dark/8 flex items-center gap-4 text-left transition-all cursor-pointer ${
                    isSelected ? "ring-2 ring-primary border-primary shadow-md" : "hover:border-dark/20"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${opt.color}20`, color: opt.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base sm:text-lg text-dark">{opt.label}</h3>
                    <p className="text-dark/70 text-xs sm:text-sm">{opt.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 4. Step 3: Company */}
      {step === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl flex flex-col items-center flex-1 justify-center"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-dark tracking-tight">
              Who are you spending Friday with?
            </h2>
            <p className="text-dark/65 text-xs sm:text-sm font-normal mt-1">
              Every Friday has its company.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {companyOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedCompany === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFX.playPop();
                    setSelectedCompany(opt.id);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl ${opt.bgColor} border border-dark/8 flex items-center gap-3.5 text-left transition-all cursor-pointer ${
                    isSelected ? "ring-2 ring-primary border-primary shadow-md" : "hover:border-dark/20"
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${opt.color}20`, color: opt.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-dark">{opt.label}</h3>
                    <p className="text-dark/65 text-[11px] sm:text-xs mt-0.5">{opt.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 5. Step 4: Budget */}
      {step === 4 && (
        <motion.div
          key="step4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-xl flex flex-col items-center flex-1 justify-center"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-dark tracking-tight">
              What&apos;s the budget vibe?
            </h2>
            <p className="text-dark/65 text-xs sm:text-sm font-normal mt-1">
              Splurge or stay sensible?
            </p>
          </div>

          <div className="w-full space-y-2.5 sm:space-y-3 mb-4">
            {budgetOptions.map((opt) => {
              const isSelected = selectedBudget === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundFX.playPop();
                    setSelectedBudget(opt.id);
                  }}
                  className={`w-full p-4 sm:p-5 rounded-2xl ${opt.bgColor} border border-dark/8 flex items-center gap-4 text-left transition-all cursor-pointer ${
                    isSelected ? "ring-2 ring-primary border-primary shadow-md" : "hover:border-dark/20"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-black text-lg"
                    style={{ backgroundColor: `${opt.color}20`, color: opt.color }}
                  >
                    {opt.badge}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base sm:text-lg text-dark">{opt.label}</h3>
                    <p className="text-dark/70 text-xs sm:text-sm">{opt.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Bottom Navigation Bar (Screen 2 Mockup) - Always visible above fold */}
      <div className="w-full max-w-lg flex items-center justify-between pt-3 sm:pt-4 border-t border-dark/10 select-none shrink-0 mt-auto">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-dark/20 font-bold text-xs sm:text-sm text-dark hover:bg-dark/5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-dark text-cream font-bold text-xs sm:text-sm hover:bg-primary transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
        >
          <span>{step === 4 ? "Reveal My Friday Plan!" : "Next"}</span>
          {step === 4 ? (
            <Sparkles className="w-4 h-4 text-accent" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>

    </div>
  );
}
