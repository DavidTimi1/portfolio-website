"use client";

import { BRANDS } from "@/data/brands";
import { CERTIFICATIONS } from "@/data/certifications";
import { experiences } from "@/data/experience";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ArrowUpRightFromSquareIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BrandsCarousel } from "./brands";
import { CertificatesCarousel } from "./certifications";
import { Button } from "../ui/button";

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            });
        }
    };

    return (
        <section
            id="experience"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="h-dvh w-full z-10 snap-start bg-zinc-900 relative flex flex-col md:flex-row overflow-hidden"
        >
            <div className="relative container h-full overflow-auto mx-auto p-6 flex flex-col">
                {/* Mouse Follower Gradient (The "Border" Glow) */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none blur-3xl"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--accent), transparent 60%)`
                    }}
                />

                <div className="flex flex-col md:flex-row w-full h-full gap-4 relative">
                    <div className="flex flex-col w-full md:w-1/2 h-full gap-4">
                        {/* Left Half: Work Experience */}
                        <WorkExperienceSection />

                        <div className="h-1/4 min-h-[100px] w-full bg-black relative overflow-hidden hover:shadow-[0_0_1px_1px] shadow-accent/70 rounded-xl border border-zinc-600 hover:border-accent/70 hover:scale-[0.99] transition">
                            <BrandsCarousel />
                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-accent/70 group-hover:shadow-md rounded-xl transition-colors duration-300 pointer-events-none" />
                        </div>
                    </div>

                    {/* Right Half: Brands & Certificates */}
                    <div className="flex flex-col w-full md:w-1/2 h-full gap-4">
                        <div className="h-2/5 min-h-[150px] w-full bg-black relative overflow-hidden hover:shadow-[0_0_1px_1px] shadow-accent/70 rounded-xl border border-zinc-600 hover:border-accent/70 hover:scale-[0.99] transition">
                            <BrandsCarousel />
                            {/* Hover Border Effect */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-accent/70 group-hover:shadow-md rounded-xl transition-colors duration-300 pointer-events-none" />
                        </div>

                        {/* Bottom Right: Certificates*/}
                        <div className="flex-1 w-full bg-black relative overflow-hidden hover:shadow-[0_0_1px_1px] shadow-accent/70 rounded-xl border border-zinc-600 hover:border-accent/70 hover:scale-[0.99] transition">
                            <CertificatesCarousel />
                            <div className="absolute inset-0 border border-transparent group-hover:border-accent/70 group-hover:shadow-md rounded-xl transition-colors duration-300 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WorkExperienceSection() {
    return (
        <div className="w-full h-3/4 bg-black p-4 md:p-6 flex flex-col justify-center rounded-xl border border-zinc-600 hover:shadow-md hover:border-accent/70 hover:scale-[0.99] transition">
            {/* Hover Border Effect for Main Container */}
            <div className="flex flex-col space-y-5 relative w-full h-full overflow-hidden">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white tracking-tighter">
                        WORK <span className="text-accent italic">HISTORY</span>
                    </h2>
                    <Button>
                        <span className="hidden md:block">Resume</span>
                        <span className="sr-only">Resume</span>
                        <ArrowUpRightFromSquareIcon />
                    </Button>
                </div>

                <div className="relative overflow-hidden gradient-masks-y before:h-8 after:h-8">
                    <div className="space-y-3 overflow-auto size-full scrollbar-hide">
                        <div className="h-3"></div>
                        {experiences.map((exp, index) => (
                            <ExperienceItem key={index} data={exp} />
                        ))}
                        <div className="h-3"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ExperienceItem({ data }: { data: typeof experiences[0] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            className="group/item bg-zinc-900/70 rounded-md border border-zinc-800 transition-colors cursor-pointer p-4 relative"
        >
            <div className="flex justify-between items-baseline">
                <div className="h-8 w-8 bg-zinc-800 rounded-full">
                    <img src={data.logo} alt={data.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-baseline gap-4">
                    <h3 className="text-lg font-bold text-zinc-200 group-hover/item:text-white transition-colors">
                        {data.company}
                    </h3>
                    <span className="text-xs font-mono text-zinc-600">{data.period}</span>
                </div>
                <h4 className="text-sm font-medium text-zinc-500 group-hover/item:text-zinc-300 transition-colors text-right">
                    {data.role}
                </h4>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                            {data.description[0]} {/* Showing first point as summary, or loop all */}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                                <span key={skill} className="px-2 py-1 bg-zinc-900 rounded-md text-[10px] text-zinc-500 uppercase tracking-wider">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}