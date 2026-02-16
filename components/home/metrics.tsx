"use client";

import { STATS } from "@/data/metrics";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export const MetricCards = () => (
    <div className="grid size-full grid-cols-3 items-center gap-3">
        {
            STATS.map(stat => <MetricCard key={stat.title} stat={stat} index={STATS.indexOf(stat)} />)
        }
    </div>
);




const MetricCard = ({ stat, index }: { stat: typeof STATS[0]; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const integerValue = parseFloat(stat.value);
    const suffix = stat.value.replace(integerValue.toString(), "");

    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate(count, integerValue, {
                        duration: 1.2,
                        delay: index * 0.1,
                        ease: "easeOut",
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.6 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [count, integerValue, index]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-black h-full min-h-[100px] relative overflow-hidden hover:shadow-[0_0_1px_1px] shadow-accent/70 rounded-xl border border-zinc-600 hover:border-accent/70 hover:scale-[0.99] transition"
        >
            <div className="flex flex-col items-center justify-evenly h-full gap-1">
                <span className="text-4xl md:text-5xl font-bold tabular-nums">
                    <motion.span>{rounded}</motion.span>
                    <span>{suffix}</span>
                </span>

                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-zinc-900/50 border border-zinc-800">
                    <stat.icon className="size-4 text-zinc-400" />
                    <span className="text-xs font-medium text-zinc-500">
                        <span> {stat.title.split(" ")[0]} </span>
                        <span className="hidden sm:inline"> {stat.title.split(" ")[1]} </span>
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 bg-linear-to-tr from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
    );
};
