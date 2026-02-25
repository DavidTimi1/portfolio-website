"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActiveSection } from "../providers/active-section-context";
import { toast } from "sonner";
import { useTechOptions } from "@/hooks/use-projects";


export const ProjectsFilter = () => {
    const { setActiveSection } = useActiveSection()
    const searchParams = useSearchParams();
    const activeSkill = searchParams.get("skill") || "";
    const router = useRouter();
    const { data: allTech, isLoading, isError, error, refetch: refetchTechOptions } = useTechOptions()

    const errorMessage = isError && error.message;

    useEffect(() => {
        if (isError) {
            const shownError = errorMessage || "Failed to fetch tech options"
            toast(shownError, {
                description: "Please try again later.",
                action: {
                    label: "Retry",
                    onClick: () => refetchTechOptions()
                }
            })
        }
    }, [isError, errorMessage])

    useEffect(() => {
        setActiveSection("featured-projects");
    }, [])

    return (
        <div className="w-full relative gradient-masks-x before:w-5 after:w-5">
            <div className="flex gap-2 mt-6 overflow-y-hidden overflow-x-auto scrollbar-hide">
                <div className="w-2 shrink-0"></div>
                <button
                    onClick={() => handleTechChange(null)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all ${!activeSkill ? "bg-accent sticky left-2 text-black border-accent font-bold" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
                >
                    All
                </button>

                {
                    isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-20 h-8 bg-zinc-800 rounded-full animate-pulse"></div>
                            <div className="w-20 h-8 bg-zinc-800 rounded-full animate-pulse"></div>
                            <div className="w-20 h-8 bg-zinc-800 rounded-full animate-pulse"></div>
                        </div>

                    ) : allTech?.map(tech => (
                        <button
                            key={tech}
                            onClick={() => handleTechChange(tech)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all text-nowrap ${activeSkill === tech ? "sticky left-2 bg-accent text-black border-accent font-bold" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
                        >
                            {tech}
                        </button>
                    ))
                }
            </div>
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