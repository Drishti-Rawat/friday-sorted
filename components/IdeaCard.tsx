"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

export interface IdeaCardData {
  id?: string;
  title: string;
  favoriteTitle?: string;
  description?: string;
  image: string;
  tags?: string[];
  tag?: string;
  peopleCount?: string;
  duration?: string;
  rule?: string;
  surpriseRule?: string;
}

export interface IdeaCardProps {
  idea: IdeaCardData;
  variant?: "standard" | "wildcard";
  isLiked?: boolean;
  onToggleLike?: (e: React.MouseEvent, id: string) => void;
  onClick?: () => void;
  index?: number;
  className?: string;
}

export default function IdeaCard({
  idea,
  variant = "standard",
  isLiked = false,
  onToggleLike,
  onClick,
  index = 0,
  className = "",
}: IdeaCardProps) {
  const topTag = idea.tag || (idea.tags && idea.tags.length > 0 ? idea.tags[0] : null);
  const ruleText = idea.rule || idea.surpriseRule;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 32px -10px rgba(31, 27, 36, 0.12)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onClick={onClick}
      className={`group flex flex-col bg-white rounded-3xl overflow-hidden border border-dark/8 shadow-sm cursor-pointer select-none ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative w-full h-44 sm:h-52 md:h-48 lg:h-56 overflow-hidden bg-cream">
        <Image
          src={idea.image}
          alt={idea.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Tag Pill */}
        {topTag && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs border ${
              variant === "wildcard"
                ? "bg-accent text-dark border-dark/10"
                : "bg-white/95 backdrop-blur-md text-dark border-dark/5"
            }`}>
              {variant === "wildcard" && <span>🎲</span>}
              <span>{topTag}</span>
            </span>
          </div>
        )}

        {/* Heart Like Button (Standard Variant) */}
        {variant === "standard" && onToggleLike && idea.id && (
          <button
            onClick={(e) => onToggleLike(e, idea.id!)}
            className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-dark/70 hover:text-secondary hover:scale-110 active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Save to favorites"
          >
            <Heart
              className="w-4 h-4 transition-colors"
              fill={isLiked ? "#FF6B5E" : "none"}
              stroke={isLiked ? "#FF6B5E" : "currentColor"}
            />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className={`font-serif font-black text-xl sm:text-2xl tracking-tight leading-tight transition-colors ${
            variant === "wildcard"
              ? "text-dark"
              : "text-dark group-hover:text-primary"
          }`}>
            {idea.favoriteTitle || idea.title}
          </h3>

          {/* Standard variant: people count & duration */}
          {variant === "standard" && idea.peopleCount && (
            <p className="text-dark/60 text-xs sm:text-sm font-medium mt-1.5">
              {idea.peopleCount} people would pick this
            </p>
          )}

          {/* Wildcard variant: Spontaneous Golden Rule box */}
          {variant === "wildcard" && ruleText && (
            <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-[#FFF9E6] to-[#FFF3EE] border border-dashed border-amber-200">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#B47B00] block mb-0.5">
                The Spontaneous Rule
              </span>
              <p className="text-xs font-bold text-dark/90 leading-snug">
                {ruleText}
              </p>
            </div>
          )}
        </div>

        {/* Footer Action Prompt */}
        <div className="mt-4 pt-3.5 border-t border-dark/6 flex items-center justify-between text-xs">
          {variant === "standard" ? (
            <>
              <span className="text-dark/50">{idea.duration || "2-3 hours"}</span>
              <span className="font-bold text-primary group-hover:underline inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </>
          ) : (
            <div className="w-full flex items-center justify-between font-bold text-primary group-hover:translate-x-1 transition-transform">
              <span className="text-xs text-dark/60 font-medium">Spontaneous plan</span>
              <span className="inline-flex items-center gap-1 font-bold text-primary">
                <span>View full plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
