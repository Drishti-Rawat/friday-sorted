"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FridayCountdownTicker from "@/components/FridayCountdownTicker";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MoodSelector from "@/components/MoodSelector";
import FridayFavorites from "@/components/FridayFavorites";
import WildCardSection from "@/components/WildCardSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SavedIdeasDrawer from "@/components/SavedIdeasDrawer";

export default function Home() {
  const router = useRouter();
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Smooth scroll to anchor if URL has hash on mount or hashchange
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const target = document.getElementById(id);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  // Sync saved ideas from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("friday_sorted_saved");
      if (stored) {
        setSavedIdeaIds(JSON.parse(stored));
      }
    } catch {
      // safe fallback
    }
  }, []);

  const saveToStorage = (ids: string[]) => {
    try {
      localStorage.setItem("friday_sorted_saved", JSON.stringify(ids));
    } catch {
      // safe fallback
    }
  };

  const handleScrollToIdeas = () => {
    const el = document.getElementById("ideas");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", "#ideas");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-dark">
      {/* Live Weekend Countdown Ticker */}
      <FridayCountdownTicker />

      {/* 1. Header with Live Saved Counter & Actions */}
      <Header
        onFindClick={() => router.push("/planner")}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onSavedClick={() => setIsSavedDrawerOpen(true)}
        savedCount={savedIdeaIds.length}
        currentView="landing"
      />

      {/* 2. Main Landing Page Sections */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Hero Section */}
        <Hero onFindClick={() => router.push("/planner")} />

        {/* What kind of Friday are you having? (Navigates to /planner?mood=...) */}
        <MoodSelector
          onSelectMood={(moodId) => router.push(`/planner?mood=${moodId}`)}
        />

        {/* Friday Favorites (Navigates to /planner?id=... or /planner) */}
        <FridayFavorites
          onSelectIdea={(idea) => router.push(`/planner?id=${idea.id}`)}
          onSeeAll={() => router.push("/planner")}
        />

        {/* Wild Card Spontaneous Mode Section */}
        <WildCardSection
          onRollClick={() => router.push("/planner?surprise=true")}
          onSelectIdea={(id) => router.push(`/planner?id=${id}`)}
        />

        {/* Newsletter Banner with Required Marketing Consent Checkbox */}
        <NewsletterSection />
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigateIdeas={handleScrollToIdeas}
        onSavedClick={() => setIsSavedDrawerOpen(true)}
      />

      {/* 4. Slide-Over Saved Ideas Drawer */}
      <SavedIdeasDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedIds={savedIdeaIds}
        onRemove={(id) => {
          const updated = savedIdeaIds.filter((item) => item !== id);
          setSavedIdeaIds(updated);
          saveToStorage(updated);
        }}
        onSelectIdea={(idea) => {
          router.push(`/planner?id=${idea.id}`);
        }}
        onFindIdeas={() => router.push("/planner")}
      />
    </div>
  );
}
