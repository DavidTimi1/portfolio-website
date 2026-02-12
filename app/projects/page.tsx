"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, SearchIcon } from "lucide-react";
import { projects } from "@/data/projects";
import { GlassNav } from "@/components/ui/glass-nav";
import { useActiveSection } from "@/components/providers/active-section-context";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectsPage() {
    const {setActiveSection} = useActiveSection();
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const activeSkill = searchParams.get("skill") || "";

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setActiveSection("featured-projects");
    }, [])

    // Get all unique technologies
    const allTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies))).sort();

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTech = activeSkill ? project.technologies.includes(activeSkill) : true;
        return matchesSearch && matchesTech;
    });

    return (
        <main className="min-h-screen w-full bg-zinc-950 text-foreground selection:bg-blue-500/30">
            <GlassNav />

            <div className="pb-20 pt-10 container">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-foreground mb-8 transition-colors group">
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                                ALL <span className="text-accent italic">PROJECTS</span>
                                <span className="text-sm -tracking-normal">{" "} ... well, most of em 😂 </span>
                            </h2>
                            <p className="text-zinc-400 max-w-2xl">
                                A comprehensive list of things I've built, broken, and fixed again.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={inputValue}
                                onChange={handleSearchChange}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:border-accent focus:outline-none transition-colors"
                            />
                            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        </div>
                    </div>

                    {/* Tech Filters */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        <button
                            onClick={() => handleTechChange(null)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all ${!activeSkill ? "bg-accent text-black border-accent font-bold" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
                        >
                            All
                        </button>
                        {allTechnologies.map(tech => (
                            <button
                                key={tech}
                                onClick={() => handleTechChange(tech)}
                                className={`px-3 py-1 text-xs rounded-full border transition-all ${activeSkill === tech ? "bg-accent text-black border-accent font-bold" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <span className="text-sm">Showing {filteredProjects.length} projects... </span>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group relative bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-all duration-300 flex flex-col gap-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                    <span className="text-xs font-mono text-zinc-600 mt-1">{project.date} • {project.type}</span>
                                </div>
                                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    {project.links.github && (
                                        <Link href={project.links.github} target="_blank" className="hover:text-white transition-colors">
                                            <Github size={18} />
                                        </Link>
                                    )}
                                    {project.links.live && (
                                        <Link href={project.links.live} target="_blank" className="hover:text-blue-400 transition-colors">
                                            <ExternalLink size={18} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <p className="text-sm text-zinc-400 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto pt-4">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="px-2 py-0.5 text-[10px] bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {filteredProjects.length === 0 && (
                        <div className="col-span-full py-20 text-center text-zinc-500">
                            No projects found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value
        setInputValue(value)

        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        router.replace(`/projects?${params.toString()}`);
    }

    function handleTechChange(tech: string | null){
        let skillParam;
        if (tech !== activeSkill && tech !== null) {
            skillParam = tech;
        }

        const params = new URLSearchParams(searchParams.toString());

        if (skillParam) {
            params.set("skill", skillParam);
        } else {
            params.delete("skill");
        }

        router.replace(`/projects?${params.toString()}`);
    }
}
