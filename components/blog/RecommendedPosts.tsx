"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Tag, Sparkles, Clock, Calendar } from "lucide-react";
import { useBlogRecommendations, RecommendedPostItem } from "@/hooks/use-blogs";

interface RecommendedPostsProps {
  slug: string;
}

const REASON_BADGES: Record<
  RecommendedPostItem["reason"],
  { label: string; icon: typeof Flame; style: string }
> = {
  top_interacted: {
    label: "Top Interacted",
    icon: Flame,
    style: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  },
  related: {
    label: "Related Topic",
    icon: Tag,
    style: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]",
  },
  unexplored: {
    label: "Fresh Pick",
    icon: Sparkles,
    style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
  },
};

export function RecommendedPosts({ slug }: RecommendedPostsProps) {
  const { recommendations, isLoading } = useBlogRecommendations(slug);

  if (isLoading) {
    return (
      <div className="border-t border-zinc-800/80 pt-12 mt-12 space-y-6">
        <div className="h-6 w-48 bg-zinc-800/60 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 bg-zinc-900/40 rounded-xl border border-zinc-800 animate-pulse p-4 space-y-3"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const gridColsClass =
    recommendations.length === 1
      ? "grid-cols-1 max-w-xl mx-auto"
      : recommendations.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3";

  return (
    <section className="border-t border-zinc-800/80 pt-12 mt-16 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
            Recommended Next Reads
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 font-mono">
          Explore algorithm-picked articles by Dev_id
        </p>
      </div>

      {/* Cards Grid */}
      <div className={`grid ${gridColsClass} gap-6`}>
        {recommendations.map((item, idx) => {
          const badge = REASON_BADGES[item.reason];
          const BadgeIcon = badge.icon;
          const targetHref = `/blog/${item.metadata.slug}`;

          return (
            <motion.div
              key={item.metadata.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-800/80 hover:border-accent/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Image / Header Graphic */}
                <div className="relative h-40 w-full overflow-hidden bg-zinc-950">
                  {item.metadata.cover_image ? (
                    <Image
                      src={item.metadata.cover_image}
                      alt={item.metadata.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 flex items-center justify-center p-4">
                      <span className="text-zinc-600 text-xs font-mono">
                        {item.metadata.category}
                      </span>
                    </div>
                  )}

                  {/* Recommendation Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${badge.style}`}
                    >
                      <BadgeIcon className="w-3.5 h-3.5" />
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span className="uppercase text-zinc-500 font-bold tracking-wider">
                      {item.metadata.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {
                        !!item.readTime && (
                          <>
                            <Clock className="w-3 h-3 text-zinc-500" />
                            <span>{item.readTime}</span>
                          </>
                        )
                      }
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-zinc-100 group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug">
                    {item.metadata.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-light">
                    {item.metadata.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-zinc-800/40 text-xs font-mono text-zinc-400 mt-auto">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <span>
                    {new Date(item.metadata.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <Link
                  href={targetHref}
                  className="inline-flex items-center gap-1 text-accent font-semibold group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
