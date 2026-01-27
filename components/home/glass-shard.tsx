"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Irregular polygon shapes for shards
const SHARD_SHAPES = [
  // Long knife shard
  "polygon(12% 0%, 88% 6%, 72% 18%, 96% 62%, 54% 100%, 22% 82%, 6% 44%)",

  // Broken plate chunk
  "polygon(0% 18%, 62% 0%, 100% 34%, 82% 100%, 24% 86%, 6% 52%)",

  // Shattered sliver
  "polygon(22% 0%, 74% 8%, 100% 46%, 62% 100%, 18% 84%, 0% 36%)",

  // Micro jagged shard
  "polygon(14% 0%, 86% 12%, 100% 48%, 70% 100%, 28% 86%, 0% 42%)",

  // Uneven fracture
  "polygon(0% 8%, 52% 0%, 92% 22%, 100% 70%, 48% 100%, 10% 78%)",
]

interface GlassShardProps {
    className?: string
    variant?: 0 | 1 | 2 | 3 | 4
    delay?: number
    duration?: number
}

export function GlassShard({
    className,
    variant = 0,
    delay = 0,
    duration = 6,
}: GlassShardProps) {
    const shapeIndex = variant % SHARD_SHAPES.length

    return (
        <motion.div
            initial={{ y: 0, rotate: 0 }}
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
            className={cn(
                "absolute bg-linear-to-br from-white/10 to-transparent backdrop-blur-sm pointer-events-none z-10",
                "border-t border-l border-white/20 shadow-2xl",
                className
            )}
            style={{
                clipPath: SHARD_SHAPES[shapeIndex],
            }}
        >
            {/* Reflection effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent w-full h-full" />
        </motion.div>
    )
}
