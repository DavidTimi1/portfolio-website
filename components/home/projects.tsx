"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ListIcon } from "lucide-react";
import ALL_PROJECTS from "@/data/projects.json";
import { ProjectItem } from "./project-item";
import Image from "next/image";
import { Button } from "../ui/button";
import { SectionDetector } from "../ui/section-detector";
import { Project } from "@/data/projects";



const featuredProjects = ALL_PROJECTS.filter((project) => project.is_featured);

export default function Projects() {
    const [currentProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    // const { scrollXProgress } = useScroll({ container: containerRef });

    const currentIndex = Math.round(currentProgress * 2);

    // show projects in groups of 4s
    const allProjectsSections = featuredProjects.reduce((acc, project, index) => {
        if (index % 4 === 0) {
            acc.push(featuredProjects.slice(index, index + 4));
        }
        return acc;
    }, [] as Project[][]);

    const handleDotClick = (idx: number) => {
        const container = containerRef.current;
        if (!container) return;

        container.scroll({
            left: idx * container.scrollWidth,
            behavior: "smooth",
        });
    }


    return (
        <section id="featured-projects" className="min-h-screen py-10 snap-start w-full flex flex-col justify-center overflow-hidden relative">
            <SectionDetector sectionId="featured-projects" />

            <div className="w-full container flex flex-col space-y-5 pb-10">

                {/* Header */}
                <div className="w-full flex items-center justify-between">

                    <div className="flex flex-col gap-2">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-2xl md:text-3xl font-bold tracking-tighter"
                        >
                            FEATURED <span className="text-accent italic">PROJECTS</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-400 max-w-xl text-sm"
                        >
                            A selection of my recent work. Swipe to explore more.
                        </motion.p>
                    </div>
                    <div>
                        <Button asChild>
                            <Link href="/projects">
                                <ListIcon className="w-5 h-5" />
                                View All
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative w-full space-y-3">
                    <div
                        ref={containerRef}
                        className="w-full flex gap-6 overflow-y-hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    >
                        {
                            allProjectsSections.slice(0, 2).map((section, sectionIndex) => (
                                <div key={sectionIndex} className="w-full grid snap-start grid-cols-1 md:grid-cols-2 shrink-0 gap-6">
                                    {
                                        section.map((project, index) => (
                                            <ProjectItem
                                                key={index}
                                                project={project}
                                                index={index}
                                            />
                                        ))
                                    }
                                </div>
                            ))
                        }

                        {/* Humor / View All Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="min-w-[85vw] md:min-w-[400px] mx-20 snap-center flex items-center justify-center overflow-hidden"
                        >
                            <Link
                                href="/projects"
                                className="group relative h-full w-full bg-zinc-900 border border-zinc-800 border-dashed rounded-2xl flex flex-col items-center justify-center text-center hover:bg-zinc-800/30 hover:border-zinc-600 hover:scale-105 transition-all duration-300"
                            >
                                <div className="relative w-full max-h-64 bg-zinc-800">
                                    <Image
                                        alt="Humorous meme indicating there are more projects available"
                                        width={200}
                                        height={200}
                                        src="/assets/shy-laugh-meme.jfif"
                                        className="size-full object-top object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-2 text-zinc-100">
                                        Whoa, there&apos;s a lot!
                                    </h3>
                                    <p className="text-zinc-400 max-w-xs mb-8">
                                        I have way more cool stuff than I can fit in this carousel without breaking your scroll wheel.
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:gap-4 transition-all">
                                        View Complete Archive <ArrowUpRight />
                                    </div>

                                </div>
                            </Link>
                        </motion.div>

                        {/* {
                            allProjectsSections.slice(2).map((section, sectionIndex) => (
                                <div key={sectionIndex} className="w-full grid snap-start grid-cols-1 md:grid-cols-2 shrink-0 gap-6">
                                    {
                                        section.map((project, index) => (
                                            <ProjectItem
                                                key={project.id}
                                                project={project}
                                                index={index}
                                            />
                                        ))
                                    }
                                    {
                                        sectionIndex === allProjectsSections.length - 1 && Array.from({ length: 4 - remainderCount }, (_, i) => (
                                            <div className="h-64" key={i} />
                                        ))
                                    }
                                </div>
                            )
                            )} */}
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="h-12 flex items-center justify-center gap-2 pb-4">
                    {featuredProjects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={`transition-all duration-300 rounded-full 
                            ${idx === currentIndex ? "w-8 h-2 bg-white" : "size-2 hover:scale-110 bg-zinc-700 hover:bg-zinc-500"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
