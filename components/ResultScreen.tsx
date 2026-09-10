"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Heart,
  RotateCcw,
  Clock,
  Check,
  Share2,
  Dices,
  Undo2,
  MessageCircle,
  Copy,
  X,
  Link2,
  Send,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FridayIdea,
  SURPRISE_IDEAS,
  FRIDAY_IDEAS,
  getSurpriseIdea,
} from "@/data/fridayData";
import { soundFX } from "@/utils/sound";

interface ResultScreenProps {
  idea: FridayIdea;
  matchedIdea?: FridayIdea | null;
  onReturnToMatched?: () => void;
  isSaved: boolean;
  onToggleSave: (idea: FridayIdea) => void;
  onSurpriseMe: (specificIdea?: FridayIdea) => void;
  onStartOver: () => void;
  onBackToHome: () => void;
  initialShuffle?: boolean;
}

export default function ResultScreen({
  idea,
  matchedIdea,
  onReturnToMatched,
  isSaved,
  onToggleSave,
  onSurpriseMe,
  onStartOver,
  onBackToHome,
  initialShuffle = false,
}: ResultScreenProps) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isShuffling, setIsShuffling] = useState(initialShuffle);
  const [activeIdea, setActiveIdea] = useState<FridayIdea>(idea);
  const [showSheen, setShowSheen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  const getPlanUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/planner?id=${activeIdea.id}`;
    }
    return `https://fridaysorted.com/planner?id=${activeIdea.id}`;
  };

  const getInviteMessage = () => {
    const planUrl = getPlanUrl();
    return `🚨 FRIDAY ALERT: Our plan for tonight is locked in! 🎯\n\n✨ Adventure: ${activeIdea.title}\n${
      activeIdea.surpriseRule
        ? `🎲 Golden Rule: ${activeIdea.surpriseRule}\n`
        : `📝 Vibe: ${activeIdea.description}\n`
    }⏰ Starts: ${activeIdea.timeline[0]?.time || "7:00 PM"}\n\n🔗 View full itinerary & plan:\n${planUrl}\n\nWho's in? Drop a 🙋‍♂️ in the chat!\nPlanned on Friday, Sorted.`;
  };

  const handleCopyLink = async () => {
    soundFX.playPop();
    try {
      await navigator.clipboard.writeText(getPlanUrl());
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyInvite = async () => {
    soundFX.playPop();
    try {
      await navigator.clipboard.writeText(getInviteMessage());
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleWhatsAppShare = () => {
    soundFX.playPop();
    const text = encodeURIComponent(getInviteMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleTelegramShare = () => {
    soundFX.playPop();
    const url = encodeURIComponent(getPlanUrl());
    const text = encodeURIComponent(`🚨 Friday Plan: ${activeIdea.title}!\n\n${activeIdea.description}`);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
  };

  const handleSmsShare = () => {
    soundFX.playPop();
    const text = encodeURIComponent(getInviteMessage());
    window.open(`sms:?&body=${text}`, "_blank");
  };

  const handleTwitterShare = () => {
    soundFX.playPop();
    const text = encodeURIComponent(`Our Friday plan is sorted: ${activeIdea.title}! 🎯`);
    const url = encodeURIComponent(getPlanUrl());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  // Keep activeIdea in sync with prop unless currently running shuffle animation
  useEffect(() => {
    if (!isShuffling) {
      setActiveIdea(idea);
    }
  }, [idea, isShuffling]);

  const runShuffleSequence = (onFinish: (winner: FridayIdea) => void) => {
    setIsShuffling(true);
    setShowSheen(false);

    const candidates = [...SURPRISE_IDEAS, ...FRIDAY_IDEAS].filter(
      (item) => item.id !== activeIdea.id
    );
    const targetWinner = getSurpriseIdea(activeIdea.id);

    let count = 0;
    const interval = setInterval(() => {
      soundFX.playTick();
      const randomCandidate = candidates[count % candidates.length] || candidates[0];
      setActiveIdea({
        ...randomCandidate,
        isSurprise: true,
        matchScore: 100,
      });
      count++;

      if (count >= 6) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveIdea(targetWinner);
          setIsShuffling(false);
          setShowSheen(true);
          setTimeout(() => setShowSheen(false), 900);

          onFinish(targetWinner);
          soundFX.playChime();

          import("canvas-confetti").then((module) => {
            module.default({
              particleCount: 55,
              spread: 80,
              origin: { y: 0.45 },
              colors: ["#FFD166", "#7C5CFC", "#FF6B5E", "#A7C557"],
              disableForReducedMotion: true,
            });
          });
        }, 260);
      }
    }, 220);
  };

  // Trigger visible real image blur shuffle on landing if coming directly from surprise mode
  useEffect(() => {
    if (initialShuffle) {
      soundFX.playShuffle();
      runShuffleSequence((winner) => {
        onSurpriseMe(winner);
      });
    }
  }, [initialShuffle]);

  const handleShare = async () => {
    soundFX.playPop();
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Friday, Sorted: ${activeIdea.title}`,
          text: `Check out my Friday plan: ${activeIdea.title} — ${activeIdea.description}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // safe fallback
    }
  };

  // Tactile Real-Image Blur Deal Animation
  const handleSurpriseClick = () => {
    if (isShuffling) return;
    soundFX.playShuffle();

    runShuffleSequence((winner) => {
      onSurpriseMe(winner);
    });
  };

  const isSurprise = Boolean(activeIdea.isSurprise);
  const showReturnToMatch =
    isSurprise && matchedIdea && matchedIdea.id !== activeIdea.id && onReturnToMatched;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-4 px-4 sm:px-8 lg:px-12 max-w-[1020px] mx-auto select-none my-auto">
      
      {/* Top Bar: Navigation Controls & Match Recovery */}
      <div className="w-full flex items-center justify-between mb-2 sm:mb-3 shrink-0">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-dark/70 hover:text-dark transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        {/* Return to Matched Plan Shortcut (Desktop only in top row to avoid mobile collisions) */}
        {showReturnToMatch && (
          <motion.button
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              soundFX.playPop();
              onReturnToMatched();
            }}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-dark px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 transition-all cursor-pointer truncate max-w-[340px]"
          >
            <Undo2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Back to matched plan ({matchedIdea.title})</span>
          </motion.button>
        )}

        <button
          onClick={onStartOver}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-dark/70 hover:text-primary transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start Over</span>
        </button>
      </div>

      {/* Return to Matched Plan Shortcut (Mobile / Tablet dedicated clean row below navigation) */}
      {showReturnToMatch && (
        <div className="w-full md:hidden flex justify-center -mt-0.5 mb-2.5 shrink-0">
          <motion.button
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              soundFX.playPop();
              onReturnToMatched();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-dark px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 transition-all cursor-pointer shadow-2xs max-w-[92%]"
          >
            <Undo2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Back to matched plan ({matchedIdea.title})</span>
          </motion.button>
        </div>
      )}

      {/* Main Headline with Flanking Hand-Drawn Bursts (Matching Screen 3 Mockup) */}
      <div className="relative text-center mb-3 shrink-0">
        
        {/* Left 3-Ray Yellow Burst Doodle */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="hidden sm:block w-6 h-6 sm:w-7 sm:h-7 text-accent absolute -left-10 top-0.5 pointer-events-none"
        >
          <line x1="26" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="8" x2="8" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="24" x2="8" y2="27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Title */}
        <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-[36px] text-dark tracking-tight leading-tight">
          {isShuffling ? (
            <>
              Shuffling Wild Cards... <span className="inline-block animate-spin">🎲</span>
            </>
          ) : isSurprise ? (
            <>
              Wild Card Unlocked! <span className="inline-block animate-bounce">🎲</span>
            </>
          ) : (
            <>
              Your Friday is ready! <span className="text-accent">✨</span>
            </>
          )}
        </h2>

        {/* Right 3-Ray Coral Burst Doodle */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="hidden sm:block w-6 h-6 sm:w-7 sm:h-7 text-secondary absolute -right-10 top-0.5 pointer-events-none"
        >
          <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="8" x2="24" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="24" x2="24" y2="27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>

        <p className="text-dark/70 text-xs sm:text-sm font-normal mt-1">
          {isShuffling
            ? "Cycling through real mystery Friday adventures in blur..."
            : isSurprise
            ? "A spontaneous adventure picked just for tonight."
            : "Here's a plan made for your vibe."}
        </p>
      </div>

      {/* Central Card Container */}
      <div className="relative w-full flex-1 flex flex-col justify-center">
        
        {/* Main Card: Crisp border, no harsh glow, glossy reveal */}
        <motion.div
          animate={
            showSheen
              ? { scale: [0.99, 1.015, 1], y: [0, -3, 0] }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full bg-white rounded-3xl p-4 xs:p-5 sm:p-6 lg:p-7 border border-dark/10 shadow-xl shadow-dark/5 flex flex-col justify-between overflow-hidden"
        >
          {/* Radiant Glossy Light Sheen Sweep upon landing on selected idea */}
          {showSheen && (
            <motion.div
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "240%", opacity: [0, 0.95, 0.95, 0] }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-20 shadow-2xl"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 lg:gap-8 items-stretch flex-1">
            
            {/* Left Column: Proportional Image Container */}
            <div className="md:col-span-5 relative w-full h-48 xs:h-56 sm:h-64 md:h-full min-h-[220px] sm:min-h-[260px] max-h-[440px] rounded-2xl overflow-hidden bg-cream shadow-xs">
              <Image
                src={activeIdea.image}
                alt={activeIdea.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
                className={`object-cover transition-all duration-300 ${
                  isShuffling
                    ? "blur-[10px] scale-105 contrast-105 brightness-95"
                    : "blur-0 scale-100 contrast-100 brightness-100"
                }`}
              />

              {/* Shuffling Active Overlay with Dice */}
              {isShuffling && (
                <div className="absolute inset-0 z-20 bg-dark/25 backdrop-blur-[2px] flex flex-col items-center justify-center text-white pointer-events-none select-none">
                  <motion.div
                    animate={{ rotate: 360, scale: [0.95, 1.2, 0.95] }}
                    transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}
                    className="text-4xl filter drop-shadow-lg mb-2"
                  >
                    🎲
                  </motion.div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-dark/85 text-accent border border-accent/40 shadow-lg">
                    Shuffling Ideas...
                  </span>
                </div>
              )}

              {/* Inner Image Sheen when winner locks in */}
              {showSheen && (
                <motion.div
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "220%", opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 z-25 pointer-events-none bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-20"
                />
              )}

              {/* Top-Left Badge: Matching Screen 3 Mockup */}
              <div className="absolute top-3 left-3 z-10">
                {isShuffling ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-md animate-pulse">
                    <span>🎰</span>
                    <span>Shuffling...</span>
                  </span>
                ) : isSurprise ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFD166] text-dark shadow-xs border border-dark/10">
                    <Sparkles className="w-3.5 h-3.5 text-dark fill-dark" />
                    <span>Wild Card Plan</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFD166] text-dark shadow-xs">
                    <span>🎯</span>
                    <span>{activeIdea.matchScore ? `${activeIdea.matchScore}% Match` : "Perfect Match"}</span>
                  </span>
                )}
              </div>

              {/* Share & Invite button on image */}
              <button
                onClick={() => {
                  soundFX.playPop();
                  setShowInviteModal(true);
                }}
                disabled={isShuffling}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-dark/75 hover:text-dark hover:scale-110 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Invite crew & share plan"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right Column: Details, Spontaneous Rule, Schedule & Actions */}
            <div className="md:col-span-7 flex flex-col justify-between h-full py-0.5">
              <div>
                {/* Category / Spontaneity Pill */}
                <div className="mb-2">
                  {isSurprise ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFF2EE] text-[#FF6B5E] border border-[#FF6B5E]/30">
                      <span>🔥</span>
                      <span>Spontaneous</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <span>🎯</span>
                      <span>Matched Vibe</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`font-serif font-black text-2xl sm:text-3xl text-dark tracking-tight leading-tight transition-all duration-150 ${
                    isShuffling ? "blur-[2px] opacity-70" : "blur-0 opacity-100"
                  }`}
                >
                  {activeIdea.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-dark/75 text-xs sm:text-sm font-normal mt-1.5 leading-relaxed transition-all duration-150 ${
                    isShuffling ? "blur-[1.5px] opacity-70" : "blur-0 opacity-100"
                  }`}
                >
                  {activeIdea.description}
                </p>

                {/* Spontaneous Golden Rule Banner */}
                {activeIdea.surpriseRule && (
                  <div
                    className={`mt-2.5 p-2.5 sm:p-3 rounded-2xl border border-dashed relative overflow-hidden transition-all duration-150 ${
                      isShuffling
                        ? "bg-amber-100/50 border-amber-300/60 blur-[1px]"
                        : "bg-gradient-to-r from-[#FFF9E6] to-[#FFF3EE] border-[#FFD166] blur-0"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#FFD166]/40 flex items-center justify-center shrink-0 mt-0.5 text-sm">
                        🎲
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#B47B00] block">
                          The Spontaneous Rule
                        </span>
                        <p className="text-xs sm:text-[13px] font-bold text-dark/95 leading-snug mt-0.5">
                          {activeIdea.surpriseRule}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Badges Row */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {activeIdea.tags.map((tag, idx) => {
                    const colors = [
                      "bg-[#F3EFFF] text-[#7C5CFC] border-[#7C5CFC]/20",
                      "bg-[#F1F8EE] text-[#557B2F] border-[#A7C557]/30",
                      "bg-[#FFF8E7] text-[#B47B00] border-[#FFD166]/40",
                      "bg-cream text-dark/70 border-dark/10",
                    ];
                    const colorClass = colors[idx % colors.length];
                    return (
                      <span
                        key={tag}
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${colorClass} ${
                          isShuffling ? "opacity-70" : "opacity-100"
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Hourly Schedule Itinerary */}
                <div className="mt-3 pt-2.5 border-t border-dark/8">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-dark/50 block mb-1.5">
                    Suggested Itinerary
                  </span>
                  <div className="space-y-1 sm:space-y-1.5">
                    {activeIdea.timeline.slice(0, 3).map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1, ease: "easeOut" }}
                        className="flex items-start gap-2 text-xs sm:text-[12.5px]"
                      >
                        <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-bold text-dark shrink-0 min-w-[58px]">
                          {item.time}
                        </span>
                        <span className="text-dark/80 leading-snug">{item.activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Clean 2-Button Row (Matching Screen 3 Mockup) */}
              <div className="mt-4 pt-3.5 border-t border-dark/8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 select-none">
                {/* Save Idea Button */}
                <button
                  onClick={() => {
                    soundFX.playPop();
                    onToggleSave(activeIdea);
                  }}
                  disabled={isShuffling}
                  className={`w-full sm:flex-1 py-3 sm:py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all duration-200 cursor-pointer ${
                    isSaved
                      ? "bg-secondary text-white border-secondary shadow-xs scale-[1.01]"
                      : "bg-white text-dark border-dark/20 hover:border-dark hover:bg-dark/5 shadow-xs"
                  } ${isShuffling ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Heart
                    className="w-4 h-4 shrink-0"
                    fill={isSaved ? "currentColor" : "none"}
                  />
                  <span>{isSaved ? "Saved Idea" : "Save Idea"}</span>
                </button>

                {/* Primary Shuffle / Surprise Me Button */}
                <button
                  onClick={handleSurpriseClick}
                  disabled={isShuffling}
                  className={`w-full sm:flex-[1.4] py-3 sm:py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer ${
                    isShuffling
                      ? "bg-dark/80 text-cream/70 cursor-not-allowed"
                      : isSurprise
                      ? "bg-gradient-to-r from-primary via-[#8A63FF] to-secondary text-white hover:opacity-95 shadow-primary/20"
                      : "bg-dark text-cream hover:bg-primary shadow-dark/10"
                  }`}
                >
                  {isSurprise ? (
                    <Dices className={`w-4 h-4 text-accent shrink-0 ${isShuffling ? "animate-spin" : ""}`} />
                  ) : (
                    <Sparkles className={`w-4 h-4 text-accent shrink-0 ${isShuffling ? "animate-spin" : ""}`} />
                  )}
                  <span>
                    {isShuffling
                      ? "Shuffling Ideas... 🎲"
                      : isSurprise
                      ? "Shuffle Another Idea 🎲"
                      : "Surprise Me 🎲"}
                  </span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>

      {/* Invite The Group Chat Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-dark/10 relative"
            >
              <button
                onClick={() => setShowInviteModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream hover:bg-dark/10 flex items-center justify-center text-dark/70 hover:text-dark transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                  💬
                </div>
                <div>
                  <h3 className="font-serif font-black text-2xl text-dark">
                    Invite Your Crew
                  </h3>
                  <p className="text-xs text-dark/60 font-medium">
                    Send the direct link to your group chat so everyone gets the live plan.
                  </p>
                </div>
              </div>

              {/* Mini Plan Preview Card */}
              <div className="my-4 p-3 rounded-2xl bg-[#FFF9F2] border border-dark/8 flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream shrink-0">
                  <Image
                    src={activeIdea.image}
                    alt={activeIdea.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                    {isSurprise ? "✨ Wild Card Plan" : "🎯 Friday Plan"}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-dark truncate">
                    {activeIdea.title}
                  </h4>
                  <p className="text-xs text-dark/60 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-primary" />
                    <span>Starts {activeIdea.timeline[0]?.time || "7:00 PM"} · {activeIdea.tags[0]}</span>
                  </p>
                </div>
              </div>

              {/* Direct Link Share Pill */}
              <div className="mb-4">
                <label className="text-[11px] font-black uppercase tracking-wider text-dark/50 block mb-1.5">
                  Direct Plan Link
                </label>
                <div className="flex items-center gap-2 bg-cream/80 border border-dark/12 rounded-full p-1.5 pl-3.5">
                  <Link2 className="w-4 h-4 text-dark/50 shrink-0" />
                  <span className="text-xs text-dark/80 font-mono truncate flex-1 select-all">
                    {getPlanUrl()}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-full bg-dark text-cream hover:bg-primary text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 1-Tap Messaging App Buttons Grid */}
              <div className="mb-4">
                <label className="text-[11px] font-black uppercase tracking-wider text-dark/50 block mb-2">
                  Share via Apps
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* WhatsApp */}
                  <button
                    onClick={handleWhatsAppShare}
                    className="py-2.5 px-3 rounded-2xl bg-[#E7F8EE] hover:bg-[#D4F3E0] border border-[#25D366]/30 text-[#128C7E] font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>WhatsApp</span>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={handleTelegramShare}
                    className="py-2.5 px-3 rounded-2xl bg-[#E8F4FB] hover:bg-[#D6ECF8] border border-[#229ED9]/30 text-[#0088CC] font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#229ED9]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.198 1.006.128.832.942z"/>
                    </svg>
                    <span>Telegram</span>
                  </button>

                  {/* iMessage / SMS */}
                  <button
                    onClick={handleSmsShare}
                    className="py-2.5 px-3 rounded-2xl bg-[#EEF4FF] hover:bg-[#DCE7FD] border border-[#3B82F6]/30 text-[#1D4ED8] font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#3B82F6]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.42 3.86 7.02-.17.98-.67 2.4-1.84 3.48 1.83.15 3.73-.52 5.08-1.57.94.22 1.91.34 2.9.34 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/>
                    </svg>
                    <span>Messages</span>
                  </button>

                  {/* Twitter / X */}
                  <button
                    onClick={handleTwitterShare}
                    className="py-2.5 px-3 rounded-2xl bg-dark/5 hover:bg-dark/10 border border-dark/15 text-dark font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                  >
                    <span className="text-base font-black">𝕏</span>
                    <span>Post on X</span>
                  </button>
                </div>
              </div>

              {/* Copy Full Text Pitch (Slack/Discord) */}
              <button
                onClick={handleCopyInvite}
                className="w-full py-2.5 px-4 rounded-full bg-cream hover:bg-dark/8 border border-dark/15 text-dark text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {inviteCopied ? (
                  <>
                    <Check className="w-4 h-4 text-primary stroke-[3]" />
                    <span className="text-primary font-bold">Copied Full Message!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-dark/70" />
                    <span>Copy Formatted Invite Text (for Slack & Discord)</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
