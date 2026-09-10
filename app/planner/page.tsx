"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import QuizScreen from "@/components/QuizScreen";
import ResultScreen from "@/components/ResultScreen";
import SavedIdeasDrawer from "@/components/SavedIdeasDrawer";
import NewsletterModal from "@/components/NewsletterModal";
import {
  FRIDAY_IDEAS,
  SURPRISE_IDEAS,
  FridayIdea,
  matchFridayIdea,
  getSurpriseIdea,
} from "@/data/fridayData";
import { soundFX } from "@/utils/sound";

function PlannerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMood = searchParams.get("mood");
  const directIdeaId = searchParams.get("id");
  const isSurpriseParam = searchParams.get("surprise") === "true";

  const allAvailableIdeas = [...FRIDAY_IDEAS, ...SURPRISE_IDEAS];

  // Determine initial view & idea: direct id, surprise, or quiz
  const initialIdea = directIdeaId
    ? allAvailableIdeas.find((i) => i.id === directIdeaId) || FRIDAY_IDEAS[0]
    : isSurpriseParam
    ? getSurpriseIdea()
    : FRIDAY_IDEAS[0];

  const [view, setView] = useState<"quiz" | "result">(
    directIdeaId || isSurpriseParam ? "result" : "quiz"
  );
  const [quizKey, setQuizKey] = useState(0);
  const [currentIdea, setCurrentIdea] = useState<FridayIdea>(initialIdea);
  const [matchedIdea, setMatchedIdea] = useState<FridayIdea | null>(null);
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Sync saved ideas & subscription status from localStorage
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
  }, []);

  // Dynamically update idea and view whenever URL searchParams change
  useEffect(() => {
    if (directIdeaId) {
      const found = allAvailableIdeas.find((i) => i.id === directIdeaId);
      if (found) {
        setCurrentIdea(found);
        setView("result");
      }
    } else if (isSurpriseParam) {
      const surprise = getSurpriseIdea();
      setCurrentIdea(surprise);
      setView("result");
    }
  }, [directIdeaId, isSurpriseParam]);

  const saveToStorage = (ids: string[]) => {
    try {
      localStorage.setItem("friday_sorted_saved", JSON.stringify(ids));
    } catch {
      // safe fallback
    }
  };

  // When Quiz completes -> transition directly to Result view in the planner page
  const handleComplete = (answers: {
    mood: string;
    energy: string;
    company: string;
    budget: string;
  }) => {
    const matched = matchFridayIdea(answers);
    setMatchedIdea(matched);
    setCurrentIdea(matched);
    setView("result");

    // Fire celebration confetti
    import("canvas-confetti").then((module) => {
      module.default({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.4 },
        colors: ["#7C5CFC", "#FF6B5E", "#FFD166", "#A7C557"],
        disableForReducedMotion: true,
      });
    });
  };

  // Start fresh from Step 1
  const handleStartOver = () => {
    setQuizKey((prev) => prev + 1);
    setView("quiz");
  };

  // Surprise Me logic using truly unique spontaneous ideas
  const handleSurpriseMe = (specificIdea?: FridayIdea) => {
    const surprisePick = specificIdea || getSurpriseIdea(currentIdea.id);
    setCurrentIdea(surprisePick);
    setView("result");
  };

  // Toggle Save Idea
  const handleToggleSave = (item: FridayIdea) => {
    const isCurrentlySaved = savedIdeaIds.includes(item.id);
    let updated: string[];

    if (isCurrentlySaved) {
      updated = savedIdeaIds.filter((id) => id !== item.id);
    } else {
      updated = [...savedIdeaIds, item.id];
      if (!hasSubscribed) {
        setTimeout(() => {
          setIsNewsletterModalOpen(true);
        }, 900);
      }
    }

    setSavedIdeaIds(updated);
    saveToStorage(updated);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-dark">
      {/* Header */}
      <Header
        onFindClick={handleStartOver}
        onHomeClick={() => router.push("/")}
        onSavedClick={() => setIsSavedDrawerOpen(true)}
        savedCount={savedIdeaIds.length}
        currentView={view}
      />

      {/* Main View: Seamless Switch Between Quiz & Result in Planner */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          {view === "quiz" ? (
            <motion.div
              key={`quiz-${quizKey}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <QuizScreen
                key={quizKey}
                initialMood={initialMood}
                onComplete={handleComplete}
                onBackToLanding={() => router.push("/")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col min-h-0"
            >
              <ResultScreen
                idea={currentIdea}
                matchedIdea={matchedIdea}
                onReturnToMatched={() => {
                  if (matchedIdea) setCurrentIdea(matchedIdea);
                }}
                isSaved={savedIdeaIds.includes(currentIdea.id)}
                onToggleSave={handleToggleSave}
                onSurpriseMe={handleSurpriseMe}
                onStartOver={handleStartOver}
                onBackToHome={() => router.push("/")}
                initialShuffle={isSurpriseParam}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
          setCurrentIdea(selected);
          setView("result");
        }}
        onFindIdeas={handleStartOver}
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

export default function PlannerPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-cream flex items-center justify-center text-dark/60 font-medium">
          Loading your Friday vibe...
        </div>
      }
    >
      <PlannerContent />
    </Suspense>
  );
}
