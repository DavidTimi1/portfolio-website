"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarIcon, ChevronRightIcon, ClockIcon } from "lucide-react";

import { BlogMetadata } from "@/lib/blog";
import { getReadingTime } from "@/hooks/use-blogs";
import { cn } from "@/lib/utils";

interface BlogHeaderProps {
  metadata: BlogMetadata;
  content: string;
}

export function BlogHeader({ metadata, content }: BlogHeaderProps) {
  const readingTime = getReadingTime(content);
  const formattedDate = new Date(metadata.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const crumbs = [{ title: "DEV_ID", href: "/" }, { title: "BLOG", href: "/blog" }, { title: metadata.slug.toUpperCase(), href: `/blog/${metadata.slug}` }]

  return (
    <div className="space-y-6 md:space-y-8 pb-8 border-b border-zinc-800">
      <div className="flex gap-2 items-center">
        {
          crumbs.map((crumb, index) => (
            <>
            <Link
              key={crumb.title}
              href={crumb.href}
              title={index === 0 ? "Return to Portfolio" : index === 1 ? "See all blog posts" : ""}
              className={cn("text-sm text-zinc-400 font-mono transition-colors duration-300", index !== crumbs.length - 1 && "hover:text-accent hover:underline cursor-pointer")}
            >
              <span>{crumb.title}</span>
            </Link>
            {index !== crumbs.length - 1 && <ChevronRightIcon className="w-3 h-3" />}
            </>
          ))
        }
      </div>

      {/* Cover Image Banner */}
      {metadata.cover_image && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/80 shadow-2xl"
        >
          <img
            src={metadata.cover_image}
            alt={metadata.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      )}

      {/* Category & Date */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center gap-3"
      >
        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-accent bg-accent/5 border border-accent/20 rounded-full uppercase font-mono shadow-[0_0_15px_rgba(0,240,255,0.05)]">
          {metadata.category.replace("-", " ")}
        </span>
        <span className="h-4 w-px bg-zinc-800 hidden sm:block" />
        <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
          <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
          {formattedDate}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans"
      >
        {metadata.title}
      </motion.h1>

      {/* Author and Reading Time Meta Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2"
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800">
            <Image
              src="/assets/my-avatar.jpg"
              alt={metadata.author || "David Uwagbale"}
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-200">
              {metadata.author || "David Uwagbale"}
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Full-Stack Software Engineer
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-zinc-500" />
            {readingTime}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
