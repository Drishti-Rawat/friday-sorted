"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function FridayCountdownTicker() {
  const [timeLeft, setTimeLeft] = useState<{
    status: "countdown" | "is_friday" | "weekend";
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    status: "countdown",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat

      // Check if it is currently Friday (all day from 12:00 AM midnight to 11:59 PM)
      if (day === 5) {
        setTimeLeft({ status: "is_friday", days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Check if Saturday
      if (day === 6) {
        setTimeLeft({ status: "weekend", days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Otherwise (Sunday through Thursday):
      // Calculate exact time until Friday 12:00 AM Midnight (when Friday starts)
      let daysUntilFriday = (5 - day + 7) % 7;
      if (daysUntilFriday === 0) {
        daysUntilFriday = 7;
      }

      const target = new Date(now);
      target.setDate(now.getDate() + daysUntilFriday);
      target.setHours(0, 0, 0, 0); // 12:00 AM Midnight: the exact moment Friday begins

      const diff = Math.max(0, target.getTime() - now.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        status: "countdown",
        days: d,
        hours: h,
        minutes: m,
        seconds: s,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-dark text-cream py-1.5 px-4 text-xs font-semibold select-none flex items-center justify-center overflow-hidden border-b border-white/10">
      <div className="flex items-center gap-2">
        {timeLeft.status === "is_friday" ? (
          <span className="flex items-center gap-1.5 text-accent font-extrabold animate-pulse">
            <span>🎉</span>
            <span>IT&apos;S FINALLY FRIDAY! Weekend Mode is officially ACTIVE!</span>
            <span>🍻</span>
          </span>
        ) : timeLeft.status === "weekend" ? (
          <span className="flex items-center gap-1.5 text-accent font-bold">
            <span>🌴</span>
            <span>Saturday Adventures Await • Weekend in Full Swing!</span>
            <span>✨</span>
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-accent font-black tracking-wider uppercase text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Countdown to Friday:
            </span>
            <div className="flex items-center gap-1 font-mono font-bold text-white">
              {timeLeft.days > 0 && (
                <span>
                  {timeLeft.days}d{" "}
                </span>
              )}
              <span>{String(timeLeft.hours).padStart(2, "0")}h </span>
              <span>{String(timeLeft.minutes).padStart(2, "0")}m </span>
              <span className="text-accent">{String(timeLeft.seconds).padStart(2, "0")}s</span>
            </div>
            <span className="hidden sm:inline text-white/60 font-normal">
              until Friday 12:00 AM Midnight 🚀
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
