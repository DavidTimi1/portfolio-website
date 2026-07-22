"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, BookOpenIcon, ArrowUpRightIcon, ArrowLeftIcon } from "lucide-react";
import { BlogMetadata } from "@/lib/blog";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "tech", label: "Tech" },
  { value: "blockchain", label: "Blockchain" },
  { value: "personal", label: "Personal" },
  { value: "philosophy", label: "Philosophy" },
  { value: "software-engineering", label: "Software Engineering" },
];

export function BlogListClient({ blogs }: { blogs: BlogMetadata[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-foreground selection:bg-accent/30 py-16 sm:py-24">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-accent font-mono transition-colors duration-300 mb-2"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
            <span>BACK TO HOME</span>
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
              THE <span className="text-accent italic">DEV LOG</span>
            </h1>
            <p className="text-zinc-400 max-w-xl text-sm sm:text-base font-light">
              Articles, software engineering tutorials, architectural insights, and thoughts on technology.
            </p>
          </div>
        </div>

        {/* Sticky Search and Filters */}
        <div className="sticky top-0 z-20 py-6 bg-zinc-950/80 backdrop-blur-md -mx-4 px-4 border-b border-zinc-900 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:border-accent focus:outline-none transition-colors duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1.5 gradient-masks-x">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 border cursor-pointer ${
                      isActive
                        ? "bg-accent border-accent text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        : "bg-zinc-900/30 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    {cat.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="relative w-full">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center space-y-4"
              >
                <BookOpenIcon className="w-12 h-12 text-zinc-600 mx-auto" />
                <p className="text-zinc-500 text-sm font-mono">
                  No log entries found. Try modifying your search or filters.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredBlogs.map((blog, idx) => {
                  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  const isExternal = !!blog.redirect_to;

                  return (
                    <motion.div
                      key={blog.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="group flex flex-col h-full bg-zinc-900/20 border border-zinc-800/80 rounded-2xl hover:bg-zinc-900/40 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.03)] transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Cover Image on Top */}
                        {blog.cover_image ? (
                          <div className="relative w-full h-48 overflow-hidden bg-zinc-950">
                            <img
                              src={blog.cover_image}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
                          </div>
                        ) : (
                          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                            <BookOpenIcon className="w-12 h-12 text-zinc-800" />
                          </div>
                        )}

                        {/* Shard Glow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="p-6 flex flex-col flex-grow justify-between relative z-10">
                          {/* Top row */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="px-2.5 py-0.5 text-[10px] font-bold font-mono tracking-wider text-accent bg-accent/5 border border-accent/20 rounded-full uppercase">
                              {blog.category.replace("-", " ")}
                            </span>
                            <span className="text-xs text-zinc-500 font-mono">
                              {formattedDate}
                            </span>
                          </div>

                          {/* Card body */}
                          <div className="flex-grow space-y-2 mb-6">
                            <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 flex items-center gap-1.5 leading-tight">
                              {blog.title}
                              {isExternal && (
                                <span className="inline-flex items-center text-xs font-mono text-zinc-500 font-normal">
                                  <ArrowUpRightIcon className="w-4 h-4 text-zinc-500 group-hover:text-accent transition-colors" />
                                  EXTERNAL
                                </span>
                              )}
                            </h3>
                            <p className="text-zinc-400 text-sm font-light leading-relaxed line-clamp-3">
                              {blog.description}
                            </p>
                          </div>

                          {/* Card bottom */}
                          <div className="flex items-center justify-between text-xs font-mono pt-4 border-t border-zinc-900">
                            <span className="text-zinc-500">
                              By {blog.author || "David Uwagbale"}
                            </span>
                            <span className="text-accent group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                              READ ARTICLE &rarr;
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
