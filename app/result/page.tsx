"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import ResultScreen from "@/components/ResultScreen";
import SavedIdeasDrawer from "@/components/SavedIdeasDrawer";
import NewsletterModal from "@/components/NewsletterModal";
import { FRIDAY_IDEAS, FridayIdea } from "@/data/fridayData";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ideaId = searchParams.get("id");

  // Lookup current idea from URL query or fallback
  const idea =
    FRIDAY_IDEAS.find((i) => i.id === ideaId) || FRIDAY_IDEAS[0];

  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Sync saved ideas and subscription status from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("friday_sorted_saved");
      if (stored) {
        setSavedIdeaIds(JSON.parse(stored));
      }
      if (localStorage.getItem("friday_has_subscribed") === "true") {
        setHasSubscribed(true);
      }
    } catch {
      // safe fallback
    }

    // Fire celebratory confetti on page load
    import("canvas-confetti").then((module) => {
      module.default({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.4 },
        colors: ["#7C5CFC", "#FF6B5E", "#FFD166", "#A7C557"],
        disableForReducedMotion: true,
      });
    });
  }, [ideaId]);

  const saveToStorage = (ids: string[]) => {
    try {
      localStorage.setItem("friday_sorted_saved", JSON.stringify(ids));
    } catch {
      // safe fallback
    }
  };

  const handleToggleSave = (item: FridayIdea) => {
    const isCurrentlySaved = savedIdeaIds.includes(item.id);
    let updated: string[];

    if (isCurrentlySaved) {
      updated = savedIdeaIds.filter((id) => id !== item.id);
    } else {
      updated = [...savedIdeaIds, item.id];
      // Only prompt newsletter modal if user has NOT subscribed yet
      if (!hasSubscribed) {
        setTimeout(() => {
          setIsNewsletterModalOpen(true);
        }, 900);
      }
    }

    setSavedIdeaIds(updated);
    saveToStorage(updated);
  };

  const handleSurpriseMe = () => {
    const candidates = FRIDAY_IDEAS.filter((i) => i.id !== idea.id);
    const randomPick =
      candidates[Math.floor(Math.random() * candidates.length)] || FRIDAY_IDEAS[0];
    router.push(`/result?id=${randomPick.id}`);
  };

  return (
    <div className="h-screen flex flex-col bg-cream text-dark overflow-hidden">
      {/* Header with Navigation */}
      <Header
        onFindClick={() => router.push("/planner")}
        onHomeClick={() => router.push("/")}
        onSavedClick={() => setIsSavedDrawerOpen(true)}
        savedCount={savedIdeaIds.length}
        currentView="result"
      />

      {/* Full-Page Result View (Screen 3 Mockup - No Scroll) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ResultScreen
          idea={idea}
          isSaved={savedIdeaIds.includes(idea.id)}
          onToggleSave={handleToggleSave}
          onSurpriseMe={handleSurpriseMe}
          onStartOver={() => router.push("/planner")}
          onBackToHome={() => router.push("/")}
        />
      </main>

      {/* Saved Ideas Slide-Over Drawer */}
      <SavedIdeasDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedIds={savedIdeaIds}
        onRemove={(id) => {
          const updated = savedIdeaIds.filter((item) => item !== id);
          setSavedIdeaIds(updated);
          saveToStorage(updated);
        }}
        onSelectIdea={(selected) => {
          router.push(`/result?id=${selected.id}`);
        }}
        onFindIdeas={() => router.push("/planner")}
      />

      {/* Newsletter Popup Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        onSubscribed={() => setHasSubscribed(true)}
      />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center text-dark/60 font-medium">Preparing your Friday plan...</div>}>
      <ResultContent />
    </Suspense>
  );
}
