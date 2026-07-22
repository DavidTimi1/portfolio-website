"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRightIcon, PenToolIcon } from "lucide-react";
import { BlogMetadata } from "@/lib/blog";

function RadiatingPulse() {
    return (
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            {/* Custom Radiating Waves */}
            <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                animate={{
                    scale: [1, 2.5],
                    opacity: [0.8, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeOut",
                }}
            />
            <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                animate={{
                    scale: [1, 2.2],
                    opacity: [0.8, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: 0.6,
                    ease: "easeOut",
                }}
            />
            {/* Core Glowing Orb */}
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent shadow-[0_0_8px_var(--accent)]"></span>
        </span>
    );
}

export function LatestBlogCarousel() {
    const [blogs, setBlogs] = useState<BlogMetadata[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Autoplay logic for sliding carousel (only when not frozen on a new blog post)
    useEffect(() => {
        if (blogs.length <= 1) return;

        const latestBlog = blogs[0];
        const createdDate = new Date(latestBlog.created_at);
        const now = new Date();
        const isNew = (now.getTime() - createdDate.getTime()) < 7 * 24 * 60 * 60 * 1000;

        if (isNew) return; // Do not cycle if frozen on the new post

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % blogs.length);
        }, 3500);

        return () => clearInterval(timer);
    }, [blogs]);

    if (loading) {
        return (
            <div className="w-full h-full min-h-[300px] flex flex-col justify-center items-center relative py-3 bg-zinc-950/20">
                <div className="relative flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
            </div>
        );
    }

    if (!blogs || blogs.length === 0) return null;

    const latestBlog = blogs[0];
    const createdDate = new Date(latestBlog.created_at);
    const now = new Date();
    const isNew = (now.getTime() - createdDate.getTime()) < 7 * 24 * 60 * 60 * 1000;

    if (isNew) {
        // Frozen Mode on New Post
        return (
            <Link
                href={latestBlog.redirect_to || `/blog/${latestBlog.slug}`}
                className="w-full h-full min-h-[300px] flex flex-row relative group overflow-hidden bg-gradient-to-br from-zinc-900/40 to-black/80 rounded-xl"
            >
                {/* Cover Image on Left */}
                {latestBlog.cover_image ? (
                    <div className="absolute left-0 top-0 bottom-0 w-[45%] md:w-[48%] overflow-hidden bg-zinc-950">
                        <img
                            src={latestBlog.cover_image}
                            alt={latestBlog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                        />
                    </div>
                ) : (
                    <div className="absolute left-0 top-0 bottom-0 w-[45%] md:w-[48%] overflow-hidden bg-gradient-to-br from-accent/20 to-zinc-900/50 flex items-center justify-center">
                        <PenToolIcon className="w-10 h-10 text-accent/20" />
                    </div>
                )}

                {/* Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/85 to-zinc-950 z-[5] pointer-events-none" />

                {/* Right-aligned text content */}
                <div className="w-[52%] md:w-[50%] ml-auto h-full flex flex-col justify-between py-5 pr-5 pl-2 z-10 relative">
                    {/* Header inside right side */}
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase flex items-center gap-1">
                            <PenToolIcon className="w-3.5 h-3.5 text-zinc-400" /> Blog
                        </h3>
                        <div className="flex items-center gap-1 bg-accent/5 border border-accent/20 px-2 py-0.5 rounded-full shrink-0">
                            <RadiatingPulse />
                            <span className="text-[8px] font-bold text-accent tracking-wider font-mono">
                                NEW
                            </span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-grow flex flex-col justify-center space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 text-[8px] font-bold font-mono tracking-wider text-accent bg-accent/5 border border-accent/20 rounded uppercase">
                                {latestBlog.category.replace("-", " ")}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-mono">
                                {new Date(latestBlog.created_at).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric"
                                })}
                            </span>
                        </div>
                        <h4 className="text-sm md:text-base font-bold text-white leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2">
                            {latestBlog.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-light leading-relaxed line-clamp-3">
                            {latestBlog.description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-3 border-t border-zinc-900/80 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                        <span className="truncate max-w-[70px]">David U.</span>
                        <span className="text-accent flex items-center gap-0.5 shrink-0 group-hover:translate-x-1 transition-transform duration-300">
                            READ <ArrowUpRightIcon className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    // Sliding Carousel Mode (for older posts)
    const currentBlog = blogs[currentIndex];

    return (
        <Link
            href="/blog"
            className="w-full h-full min-h-[300px] flex flex-col relative group overflow-hidden bg-gradient-to-br from-zinc-900/20 to-black/60 rounded-xl"
        >
            {/* Sliding Content Container */}
            <div className="absolute inset-0 z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 flex flex-row"
                    >
                        {/* Cover Image on Left */}
                        {currentBlog.cover_image ? (
                            <div className="absolute left-0 top-0 bottom-0 w-[45%] md:w-[48%] overflow-hidden bg-zinc-950">
                                <img
                                    src={currentBlog.cover_image}
                                    alt={currentBlog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                                />
                            </div>
                        ) : (
                            <div className="absolute left-0 top-0 bottom-0 w-[45%] md:w-[48%] overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                                <PenToolIcon className="w-10 h-10 text-zinc-800" />
                            </div>
                        )}

                        {/* Gradient Veil */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/85 to-zinc-950 z-[5] pointer-events-none" />

                        {/* Right-aligned text content */}
                        <div className="w-[52%] md:w-[50%] ml-auto h-full flex flex-col justify-between py-5 pr-5 pl-2 z-10 relative">
                            {/* Header inside right side */}
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase flex items-center gap-1">
                                    <PenToolIcon className="w-3.5 h-3.5 text-zinc-400" /> Dev Log
                                </h3>
                                <ArrowUpRightIcon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors duration-300" />
                            </div>

                            {/* Title & Description */}
                            <div className="flex-grow flex flex-col justify-center space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 text-[8px] font-bold font-mono tracking-wider text-zinc-400 bg-zinc-800/50 border border-zinc-700/50 rounded uppercase">
                                        {currentBlog.category.replace("-", " ")}
                                    </span>
                                    <span className="text-[9px] text-zinc-500 font-mono">
                                        {new Date(currentBlog.created_at).toLocaleDateString(undefined, {
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </span>
                                </div>
                                <h4 className="text-sm md:text-base font-bold text-white leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2">
                                    {currentBlog.title}
                                </h4>
                                <p className="text-[11px] text-zinc-400 font-light leading-relaxed line-clamp-3">
                                    {currentBlog.description}
                                </p>
                            </div>

                            {/* Footer with Pagination Dots */}
                            <div className="mt-auto pt-3 border-t border-zinc-900/80 flex justify-between items-center text-[9px] font-mono text-zinc-500 z-10">
                                <div className="flex items-center gap-1">
                                    {blogs.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setCurrentIndex(idx);
                                            }}
                                            className={`transition-all duration-300 rounded-full h-0.5 cursor-pointer ${
                                                idx === currentIndex ? "w-4 bg-white" : "w-1 bg-zinc-700 hover:bg-zinc-500"
                                            }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-zinc-400 group-hover:text-accent flex items-center gap-0.5 group-hover:translate-x-1 transition-all duration-300">
                                    ALL <ArrowUpRightIcon className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Link>
    );
}
