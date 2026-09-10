"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
  RotateCcw,
  Clock,
  Compass,
  Check,
  Flame,
  Coffee,
  PartyPopper,
  TreePine,
  Briefcase,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FRIDAY_IDEAS, FridayIdea } from "@/data/fridayData";

interface FridayPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMood?: string | null;
  onSaveIdeaPrompt?: (idea: FridayIdea) => void;
}

type Step = 1 | 2 | 3 | 4 | 5; // 1: Mood, 2: Energy, 3: Company, 4: Budget, 5: Result

export default function FridayPlannerModal({
  isOpen,
  onClose,
  initialMood,
  onSaveIdeaPrompt,
}: FridayPlannerModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedMood, setSelectedMood] = useState<string>("Chill");
  const [selectedEnergy, setSelectedEnergy] = useState<"low" | "medium" | "high">("medium");
  const [selectedCompany, setSelectedCompany] = useState<"solo" | "partner" | "friends" | "family">("friends");
  const [selectedBudget, setSelectedBudget] = useState<"free" | "budget" | "splurge">("budget");
  const [currentIdea, setCurrentIdea] = useState<FridayIdea>(FRIDAY_IDEAS[0]);
  const [isSaved, setIsSaved] = useState(false);

  // If initialMood is provided, map it or set step
  useEffect(() => {
    if (initialMood) {
      if (initialMood === "couch") setSelectedMood("Chill");
      else if (initialMood === "main-character") setSelectedMood("Party");
      else if (initialMood === "chaos") setSelectedMood("With Friends");
      else if (initialMood === "reset") setSelectedMood("Outdoors");
      else if (initialMood === "soft") setSelectedMood("Date Night");
    }
  }, [initialMood]);

  // Lock body scroll when modal is open
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

  // Options for steps
  const moodOptions = [
    { label: "Chill", desc: "Slow down & recharge", icon: Coffee, color: "#7C5CFC" },
    { label: "Party", desc: "Let's go out!", icon: PartyPopper, color: "#FF6B5E" },
    { label: "Outdoors", desc: "Fresh air & good views", icon: TreePine, color: "#A7C557" },
    { label: "Cozy", desc: "Stay in & unwind", icon: Coffee, color: "#FFD166" },
    { label: "Productive", desc: "Get things done", icon: Briefcase, color: "#7C5CFC" },
    { label: "Date Night", desc: "Quality time", icon: Heart, color: "#FF6B5E" },
    { label: "With Friends", desc: "More the merrier", icon: Users, color: "#7C5CFC" },
    { label: "Cheap & Fun", desc: "Good times on a budget", icon: Wallet, color: "#A7C557" },
  ];

  const energyOptions = [
    { id: "low", label: "Low Energy", desc: "Bare minimum movement, please.", icon: "🛋️" },
    { id: "medium", label: "Medium Energy", desc: "Ready to head out and explore.", icon: "🚶‍♂️" },
    { id: "high", label: "High Energy", desc: "Full send, let's make memories!", icon: "⚡" },
  ];

  const companyOptions = [
    { id: "solo", label: "Solo Mission", desc: "Just me, myself, and I.", icon: "🧘" },
    { id: "partner", label: "With My Person", desc: "Romantic or deep quality time.", icon: "💑" },
    { id: "friends", label: "The Whole Crew", desc: "Laughs, chaos, and group chats.", icon: "👯" },
    { id: "family", label: "Family Night", desc: "Wholesome & heartwarming.", icon: "🏡" },
  ];

  const budgetOptions = [
    { id: "free", label: "Free ($0)", desc: "Zero dollars, pure good times.", icon: "🍃" },
    { id: "budget", label: "Budget-Friendly ($)", desc: "A few snacks or cheap tickets.", icon: "☕" },
    { id: "splurge", label: "Treat Yourself ($$)", desc: "Cocktails, nice dining, or tickets.", icon: "🍸" },
  ];

  // Advance to result and pick best matching idea
  const handleGenerate = () => {
    // Find closest match or default to first
    const matched =
      FRIDAY_IDEAS.find(
        (idea) =>
          idea.mood.toLowerCase() === selectedMood.toLowerCase() ||
          idea.energy === selectedEnergy ||
          idea.company === selectedCompany
      ) || FRIDAY_IDEAS[0];

    setCurrentIdea(matched);
    setCurrentStep(5);
    setIsSaved(false);

    // Fire celebratory confetti
    import("canvas-confetti").then((module) => {
      module.default({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7C5CFC", "#FF6B5E", "#FFD166", "#A7C557"],
        disableForReducedMotion: true,
      });
    });
  };

  // Surprise me randomizer
  const handleSurpriseMe = () => {
    const remaining = FRIDAY_IDEAS.filter((i) => i.id !== currentIdea.id);
    const randomPick = remaining[Math.floor(Math.random() * remaining.length)] || FRIDAY_IDEAS[0];
    setCurrentIdea(randomPick);
    setIsSaved(false);

    import("canvas-confetti").then((module) => {
      module.default({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
        colors: ["#FFD166", "#7C5CFC", "#FF6B5E"],
      });
    });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      onSaveIdeaPrompt?.(currentIdea);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-8 shadow-2xl border border-dark/10 z-10 my-auto overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-cream hover:bg-dark/10 flex items-center justify-center text-dark/70 hover:text-dark transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Stepper Progress Bar (only on steps 1-4) */}
          {currentStep <= 4 && (
            <div className="mb-6 sm:mb-8 pr-10">
              <div className="flex items-center justify-between text-xs font-semibold text-dark/50 mb-2">
                <span className={currentStep >= 1 ? "text-primary font-bold" : ""}>1. Mood</span>
                <span className={currentStep >= 2 ? "text-primary font-bold" : ""}>2. Energy</span>
                <span className={currentStep >= 3 ? "text-primary font-bold" : ""}>3. Company</span>
                <span className={currentStep >= 4 ? "text-primary font-bold" : ""}>4. Budget</span>
              </div>
              <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={false}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Mood */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-dark">
                  What&apos;s your Friday vibe?
                </h3>
                <p className="text-dark/60 text-sm mt-1">Pick a mood that feels right today.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 mb-8">
                {moodOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedMood === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedMood(opt.label)}
                      className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-200 border text-xs sm:text-sm ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-sm scale-[1.02]"
                          : "bg-cream/70 hover:bg-cream border-dark/5 hover:border-dark/15"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${opt.color}20`, color: opt.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-dark">{opt.label}</span>
                      <span className="text-dark/60 text-[11px] mt-0.5 leading-tight">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 bg-dark text-cream font-bold px-7 py-3 rounded-full hover:bg-primary transition-all text-sm"
                >
                  <span>Next: Energy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Energy */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-dark">
                  How much battery do you have left?
                </h3>
                <p className="text-dark/60 text-sm mt-1">Be honest, no judgment here!</p>
              </div>

              <div className="space-y-3 mb-8">
                {energyOptions.map((opt) => {
                  const isSelected = selectedEnergy === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedEnergy(opt.id as any)}
                      className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all border ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-xs"
                          : "bg-cream/70 hover:bg-cream border-dark/5"
                      }`}
                    >
                      <span className="text-3xl">{opt.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-dark text-sm sm:text-base">{opt.label}</div>
                        <div className="text-dark/60 text-xs sm:text-sm">{opt.desc}</div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-primary stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 text-dark/70 hover:text-dark font-semibold text-sm px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 bg-dark text-cream font-bold px-7 py-3 rounded-full hover:bg-primary transition-all text-sm"
                >
                  <span>Next: Company</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Company */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-dark">
                  Who are you spending Friday with?
                </h3>
                <p className="text-dark/60 text-sm mt-1">Set the social stage.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {companyOptions.map((opt) => {
                  const isSelected = selectedCompany === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedCompany(opt.id as any)}
                      className={`p-4 rounded-2xl flex items-center gap-3 text-left transition-all border ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-xs"
                          : "bg-cream/70 hover:bg-cream border-dark/5"
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-dark text-sm">{opt.label}</div>
                        <div className="text-dark/60 text-xs">{opt.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-primary stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 text-dark/70 hover:text-dark font-semibold text-sm px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-2 bg-dark text-cream font-bold px-7 py-3 rounded-full hover:bg-primary transition-all text-sm"
                >
                  <span>Next: Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-6">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-dark">
                  What&apos;s the budget vibe?
                </h3>
                <p className="text-dark/60 text-sm mt-1">Keeping it light or balling out?</p>
              </div>

              <div className="space-y-3 mb-8">
                {budgetOptions.map((opt) => {
                  const isSelected = selectedBudget === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedBudget(opt.id as any)}
                      className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-all border ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-xs"
                          : "bg-cream/70 hover:bg-cream border-dark/5"
                      }`}
                    >
                      <span className="text-3xl">{opt.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-dark text-sm sm:text-base">{opt.label}</div>
                        <div className="text-dark/60 text-xs sm:text-sm">{opt.desc}</div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-primary stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 text-dark/70 hover:text-dark font-semibold text-sm px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 bg-primary text-cream font-bold px-7 py-3 rounded-full hover:bg-dark transition-all text-sm shadow-md active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Reveal My Friday Plan!</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Result ("Your Friday is ready! ✨") */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pr-8">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-black text-2xl sm:text-3xl text-dark">
                      Your Friday is ready!
                    </h3>
                    <span className="text-accent text-xl">✨</span>
                  </div>
                  <p className="text-dark/60 text-xs sm:text-sm">Here&apos;s a plan made for your vibe.</p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-dark/60 hover:text-primary font-semibold flex items-center gap-1 select-none"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Over</span>
                </button>
              </div>

              {/* Card Container: Photo on left, Itinerary on right */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 bg-cream/50 rounded-2xl p-4 sm:p-5 border border-dark/6 mb-5">
                {/* Photo Column */}
                <div className="sm:col-span-5 relative h-48 sm:h-auto rounded-xl overflow-hidden shadow-xs">
                  <Image
                    src={currentIdea.image}
                    alt={currentIdea.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-dark flex items-center gap-1 shadow-xs">
                    <span>🎯</span>
                    <span>Perfect Match</span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="sm:col-span-7 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-dark">
                      {currentIdea.title}
                    </h4>
                    <p className="text-dark/75 text-xs sm:text-sm mt-1 leading-relaxed">
                      {currentIdea.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {currentIdea.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-dark/5 text-dark/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Evening Timeline Itinerary */}
                  <div className="mt-4 pt-3 border-t border-dark/8 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-dark/50 block">
                      Suggested Schedule
                    </span>
                    {currentIdea.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <span className="font-bold text-primary shrink-0 min-w-[54px]">
                          {item.time}
                        </span>
                        <span className="text-dark/80">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Save & Surprise Me */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleSave}
                  className={`w-full sm:flex-1 py-3 px-5 rounded-full font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                    isSaved
                      ? "bg-secondary text-white border-secondary shadow-sm"
                      : "bg-white text-dark border-dark/15 hover:border-secondary hover:text-secondary"
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                  <span>{isSaved ? "Saved to Favorites!" : "Save Idea"}</span>
                </button>

                <button
                  onClick={handleSurpriseMe}
                  className="w-full sm:flex-1 py-3 px-5 rounded-full font-bold text-sm bg-dark text-cream hover:bg-primary flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Surprise Me</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
