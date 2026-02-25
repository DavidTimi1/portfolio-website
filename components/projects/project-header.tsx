"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const ProjectHeader = () => {
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 100], [1, 0]);
    const headerY = useTransform(scrollY, [0, 100], [0, -20]);
    const headerHeight = useTransform(scrollY, [0, 100], ["auto", 0]);

    return (
        <motion.div
            style={{ opacity: headerOpacity, y: headerY, height: headerHeight }}
            className="overflow-hidden"
        >
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-foreground mb-8 transition-colors group">
                <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>
            <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                    ALL <span className="text-accent italic">PROJECTS</span>
                    <span className="text-sm tracking-normal">{" "} ... well, most of em 😂 </span>
                </h2>
                <p className="text-zinc-400 max-w-2xl">
                    A comprehensive list of things I've built, broken, and fixed again.
                </p>
            </div>
        </motion.div>
    )
}