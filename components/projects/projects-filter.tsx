"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { useEffect } from "react";
import { useActiveSection } from "../providers/active-section-context";


export const ProjectsFilter = () => {
    const {setActiveSection} = useActiveSection()
    const searchParams = useSearchParams();
    const activeSkill = searchParams.get("skill") || "";
    const router = useRouter();
    
    useEffect(() => {
        setActiveSection("featured-projects");
    }, [])

    // Get all unique technologies
    const allTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies))).sort();

    return (
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
    )


    function handleTechChange(tech: string | null) {
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