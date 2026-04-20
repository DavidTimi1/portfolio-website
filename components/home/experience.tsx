"use client";

import { experiences } from "@/data/experience";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { BrandsCarousel } from "./brands";
import { CertificatesCarousel } from "./certifications";
import { TestimonialsCarousel } from "./testimonials";
import { Button } from "../ui/button";
import { MetricCards } from "./metrics";
import { SectionDetector } from "../ui/section-detector";
import Link from "next/link";

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
            className="md:snap-start w-full flex flex-col md:flex-row mt-0 place-items-center"
        >
            <SectionDetector sectionId="experience" />
            <div className="relative min-h-screen w-full overflow-auto py-10">
                {/* Mouse Follower Gradient (The "Border" Glow) */}
                <div
                    className="absolute hidden md:block inset-0 z-0 pointer-events-none blur-3xl"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--accent), transparent 60%)`
                    }}
                />
                <div className="container flex flex-col ">

                    <div className="flex flex-col md:flex-row w-full h-full gap-3 relative">
                        <div className="flex flex-col w-full md:w-1/2 h-full gap-3">
                            {/* Left Half: Work Experience */}
                            <WorkExperienceSection />

                            <div className="md:h-1/4 min-h-[100px] w-full bg-black relative overflow-hidden hover:shadow-[0_0_1px_1px] shadow-accent/70 rounded-xl border border-zinc-600 hover:border-accent/70 hover:scale-[0.99] transition">
                                <BrandsCarousel />
                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border border-transparent group-hover:border-accent/70 group-hover:shadow-md rounded-xl transition-colors duration-300 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex flex-col w-full md:w-1/2 gap-3">
                            <div className="md:h-2/6 w-full ">
                                <MetricCards />
                            </div>

                            <div className="hidden md:h-2/6 W-full bg-black relative overflow-hidden hover:shadow-[0_0_1px_1px] shadow-accent/70 rounded-xl border border-zinc-600 hover:border-accent/70 hover:scale-[0.99] transition">
                                <TestimonialsCarousel />
                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border border-transparent group-hover:border-accent/70 group-hover:shadow-md rounded-xl transition-colors duration-300 pointer-events-none" />
                            </div>


                            <div className="flex-1 md:h-4/6 w-full bg-black relative overflow-hidden hover:shadow-[0_0_1px_1px] shadow-accent/70 rounded-xl border border-zinc-600 hover:border-accent/70 hover:scale-[0.99] transition">
                                <CertificatesCarousel />
                                <div className="absolute inset-0 border border-transparent group-hover:border-accent/70 group-hover:shadow-md rounded-xl transition-colors duration-300 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

function WorkExperienceSection() {
    return (
        <div className="w-full h-[75vh] bg-black p-4 md:p-6 flex flex-col justify-center rounded-xl border border-zinc-600 hover:shadow-md hover:border-accent/70 hover:scale-[0.99] transition">
            {/* Hover Border Effect for Main Container */}
            <div className="flex flex-col space-y-5 relative w-full h-full overflow-hidden">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter">
                        WORK <span className="text-accent italic">HISTORY</span>
                    </h2>
                    <Button>
                        <Link href="/resume" target="_blank" rel="noopener noreferrer">
                            <span className="hidden md:block">Resume</span>
                            <span className="sr-only">Resume</span>
                            <ArrowUpRightFromSquareIcon />
                        </Link>
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
            className="group/item bg-zinc-900/70 rounded-md border border-zinc-800 transition-colors cursor-pointer relative"
        >
            <div className="relative flex gap-3 justify-between p-3">
                <div className="flex gap-3">
                    <div className="w-12 h-12 shrink-0 bg-zinc-800 rounded-sm overflow-hidden">
                        <img src={data.logo} alt={data.company} className="size-full object-cover" />
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="font-bold text-zinc-200 group-hover/item:text-white transition-colors">
                            {data.role}
                        </h3>
                        <h4 className="text-sm font-medium text-zinc-500 group-hover/item:text-zinc-300 transition-colors">
                            {data.company}
                        </h4>
                    </div>
                </div>
                <div className="flex flex-col grow items-end justify-between">
                    {
                        data.period.reverse().map((month, idx) => (
                            <span key={idx} className="text-xs text-nowrap font-mono text-zinc-600">{month}</span>
                        ))
                    }
                </div>
                {
                    data.period.length > 1 && (
                        <div className="h-3/5 w-px bg-zinc-600 absolute right-1 rounded-full top-1/2 -translate-y-1/2 pseudo-absolute before:bg-zinc-600 after:bg-zinc-600 after:w-1 before:w-1 after:right-px before:right-px after:h-px before:h-px after:bottom-0 group-hover/item:bg-accent group-hover/item:after:bg-accent group-hover/item:before:bg-accent" />
                    )
                }
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 py-2">
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                <ul className="space-y-2 list-disc">
                                    {
                                        data.description.map( (item, i) => (<li key={i}> {item} </li>) )
                                    }
                                </ul>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill) => (
                                    <span key={skill} className="px-2 py-1 bg-zinc-900 rounded-md text-[10px] text-zinc-500 uppercase tracking-wider">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
