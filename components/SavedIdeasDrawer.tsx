"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FRIDAY_IDEAS, FridayIdea } from "@/data/fridayData";
import { soundFX } from "@/utils/sound";

interface SavedIdeasDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemove: (id: string) => void;
  onSelectIdea: (idea: FridayIdea) => void;
  onFindIdeas: () => void;
}

export default function SavedIdeasDrawer({
  isOpen,
  onClose,
  savedIds,
  onRemove,
  onSelectIdea,
  onFindIdeas,
}: SavedIdeasDrawerProps) {
  const savedIdeas = FRIDAY_IDEAS.filter((i) => savedIds.includes(i.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/50 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl border-l border-dark/10 flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-dark/8 flex items-center justify-between bg-cream/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <Heart className="w-4 h-4" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-lg sm:text-xl text-dark">
                      Saved Friday Plans
                    </h3>
                    <p className="text-dark/60 text-xs">
                      {savedIdeas.length} {savedIdeas.length === 1 ? "idea" : "ideas"} bookmarked
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center text-dark/70 hover:text-dark transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {savedIdeas.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                    <div className="w-16 h-16 rounded-3xl bg-cream border border-dark/10 flex items-center justify-center text-2xl mb-4 text-dark/40">
                      ♡
                    </div>
                    <h4 className="font-serif font-bold text-lg text-dark">
                      No saved plans yet
                    </h4>
                    <p className="text-dark/60 text-xs sm:text-sm mt-1 max-w-xs leading-relaxed">
                      Explore ideas and tap the heart button to collect your favorite Friday plans here.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onFindIdeas();
                      }}
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark text-cream font-bold text-xs hover:bg-primary transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      <span>Find Friday Ideas</span>
                    </button>
                  </div>
                ) : (
                  savedIdeas.map((idea) => (
                    <motion.div
                      key={idea.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group p-3.5 rounded-2xl bg-cream/50 border border-dark/8 hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-3.5"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-cream">
                        <Image
                          src={idea.image}
                          alt={idea.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-dark truncate">
                          {idea.title}
                        </h4>
                        <p className="text-dark/60 text-xs mt-0.5 truncate">
                          {idea.tags.slice(0, 2).join(" • ")}
                        </p>
                        <button
                          onClick={() => {
                            soundFX.playPop();
                            onClose();
                            onSelectIdea(idea);
                          }}
                          className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          <span>View Plan</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          soundFX.playPop();
                          onRemove(idea.id);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-dark/40 hover:text-secondary hover:bg-secondary/10 transition-colors cursor-pointer shrink-0"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {savedIdeas.length > 0 && (
                <div className="p-4 border-t border-dark/8 bg-cream/30 flex items-center justify-between">
                  <span className="text-xs text-dark/50 font-medium">
                    Saved in your browser
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onFindIdeas();
                    }}
                    className="text-xs font-bold text-dark hover:text-primary transition-colors cursor-pointer"
                  >
                    Find another idea →
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
