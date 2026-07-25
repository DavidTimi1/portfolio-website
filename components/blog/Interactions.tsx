"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartIcon,
  BookmarkIcon,
  Share2Icon,
  EyeIcon,
  BookmarkCheckIcon,
} from "lucide-react";
import { useBlogInteractions } from "@/hooks/use-blogs";
import { toast } from "sonner";

interface InteractionsProps {
  slug: string;
}

export function Interactions({ slug }: InteractionsProps) {
  const {
    interactions,
    isLoading,
    clap,
    toggleBookmark,
  } = useBlogInteractions(slug);

  const [bubbles, setBubbles] = useState<{ id: number; x: number }[]>([]);

  if (isLoading || !interactions) {
    return (
      <>
      {/* Desktop Sticky Left Bar */}
      <div className="hidden xl:flex flex-col items-center gap-6 fixed bottom-12 md:right-5 md:bottom-auto top-1/3 z-30 p-3 rounded-full border border-white/5 bg-zinc-950/40 backdrop-blur-md shadow-2xl">
          <div className="size-10 rounded-full animate-pulse border border-white/20"></div>
          <div className="size-10 rounded-full animate-pulse border border-white/20"></div>
          <div className="size-10 rounded-full animate-pulse border border-white/20"></div>
      </div>

      {/* Mobile/Tablet Horizontal Bottom Bar */}
      <div className="xl:hidden flex items-center justify-center px-6 py-3 border-y border-zinc-800 bg-zinc-950/20 backdrop-blur-xs my-8">
        <div className="flex items-center gap-6">
          <div className="size-10 rounded-full animate-pulse border border-white/20"></div>
          <div className="size-10 rounded-full animate-pulse border border-white/20"></div>
          <div className="size-10 rounded-full animate-pulse border border-white/20"></div>
        </div>
      </div>
      </>
    );
  }

  const handleClap = () => {
    if (interactions.user_claps >= 50) {
      toast.error("You reached the maximum limit of 50 claps for this post!");
      return;
    }

    // Trigger local animation bubble
    const id = Date.now();
    const x = Math.random() * 30 - 15;
    setBubbles((prev) => [...prev, { id, x }]);
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 1000);

    // Call mutation
    clap(1);
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("Article link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const hasClapped = interactions?.user_claps > 0;
  const isBookmarked = interactions?.user_bookmarked;

  return (
    <>
      {/* Desktop Sticky Left Bar */}
      <div className="hidden xl:flex flex-col items-center gap-6 fixed bottom-12 md:right-5 md:bottom-auto top-1/3 z-30 p-3 rounded-full border border-white/5 bg-zinc-950/40 backdrop-blur-md shadow-2xl">
        {/* Claps */}
        <div className="relative flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleClap}
            className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${
              hasClapped
                ? "border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
            }`}
            title={`Clap (Current: ${interactions.user_claps}/50)`}
          >
            <HeartIcon
              className={`w-5 h-5 ${hasClapped ? "fill-accent" : ""}`}
            />

            {/* Bubble Numbers (+1) */}
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.span
                  key={bubble.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -45, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute -top-6 text-accent font-bold font-mono text-xs pointer-events-none select-none bg-zinc-900 border border-accent/20 px-1.5 py-0.5 rounded-full"
                  style={{ left: `calc(50% + ${bubble.x}px - 10px)` }}
                >
                  +1
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.button>
          <span className="text-xs text-zinc-400 mt-1 font-mono">
            {interactions?.total_claps}
          </span>
        </div>

        {/* Bookmark */}
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleBookmark(isBookmarked)}
            className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${
              isBookmarked
                ? "border-accent/40 bg-accent/10 text-accent shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Post"}
          >
            {isBookmarked ? (
              <BookmarkCheckIcon className="w-5 h-5 fill-accent" />
            ) : (
              <BookmarkIcon className="w-5 h-5" />
            )}
          </motion.button>
          <span className="text-[10px] text-zinc-500 mt-1 font-mono uppercase tracking-widest">
            Save
          </span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer"
            title="Share Post"
          >
            <Share2Icon className="w-5 h-5" />
          </motion.button>
          <span className="text-[10px] text-zinc-500 mt-1 font-mono uppercase tracking-widest">
            Share
          </span>
        </div>

        {/* Views */}
        <div className="flex flex-col items-center border-t border-white/5 pt-4">
          <EyeIcon className="w-4 h-4 text-zinc-500" />
          <span className="text-xs text-zinc-400 mt-1 font-mono">
            {interactions.total_views}
          </span>
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Bottom Bar */}
      <div className="xl:hidden flex items-center justify-between px-6 py-3 border-y border-zinc-800 bg-zinc-950/20 backdrop-blur-xs my-8">
        <div className="flex items-center gap-6">
          {/* Claps */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClap}
              className={`p-2 rounded-full border transition-all duration-300 relative cursor-pointer ${
                hasClapped
                  ? "border-accent/40 bg-accent/5 text-accent"
                  : "border-zinc-800 text-zinc-400"
              }`}
            >
              <HeartIcon
                className={`w-4 h-4 ${hasClapped ? "fill-accent" : ""}`}
              />

              {/* Bubble Numbers (+1) */}
              <AnimatePresence>
                {bubbles.map((bubble) => (
                  <motion.span
                    key={bubble.id}
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -40, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute -top-8 text-accent font-bold font-mono text-[10px] pointer-events-none select-none bg-zinc-900 border border-accent/20 px-1 py-0.5 rounded-full"
                    style={{ left: `calc(50% + ${bubble.x}px - 8px)` }}
                  >
                    +1
                  </motion.span>
                ))}
              </AnimatePresence>
            </button>
            <span className="text-sm text-zinc-300 font-mono">
              {interactions.total_claps}
            </span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-2 text-zinc-400">
            <EyeIcon className="w-4 h-4 text-zinc-500" />
            <span className="text-sm font-mono">{interactions.total_views}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(isBookmarked)}
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
              isBookmarked
                ? "border-accent/40 bg-accent/5 text-accent"
                : "border-zinc-800 text-zinc-400"
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheckIcon className="w-4 h-4 fill-accent" />
            ) : (
              <BookmarkIcon className="w-4 h-4" />
            )}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-full border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <Share2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
