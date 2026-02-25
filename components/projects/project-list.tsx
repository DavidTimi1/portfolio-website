"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProjectItem } from "./project-item";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { useProjectList } from "@/hooks/use-projects";
import { Loader2Icon } from "lucide-react";


export const ProjectsList = ({ }) => {
    const searchParams = useSearchParams();
    const { data: projectsData, isLoading, isError, error, refetch: refetchProjects } = useProjectList(searchParams.toString());
    const displayedProjects = projectsData?.projects || [];
    const observerTarget = useRef<HTMLDivElement>(null);
    const errorMessage = isError && error.message;

    const moreToLoad = projectsData && (projectsData?.meta?.total > projectsData?.meta?.limit);

    const router = useRouter();

    useEffect(() => {
        if (isError) {
            const shownError = errorMessage || "Failed to fetch projects"
            toast(shownError, {
                description: "Please try again later.",
                action: {
                    label: "Retry",
                    onClick: () => refetchProjects()
                }
            })
        }
    }, [isError, errorMessage]);

    const updateLimit = () => {
        const limit = projectsData?.meta?.limit;
        if (!limit || !moreToLoad) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", String(limit + 20));

        router.replace(`/projects?${params.toString()}`);
    }

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target.isIntersecting && !isLoading) {
                updateLimit();
            }
        },
        [isLoading, updateLimit]
    );

    useEffect(() => {
        const element = observerTarget.current;
        if (!element) return;

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
            rootMargin: "100px",
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [handleObserver]);


    return (
        <div className=" min-h-screen">
            <div className="flex justify-end -translate-y-10">
                {isLoading ?
                    "Loading projects..." :
                    (
                        `${projectsData?.meta?.total} projects`
                    )
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key="project-list">

                {
                    isLoading && displayedProjects.length === 0 ? (
                        <div className="col-span-full py-20 flex justify-center">
                            <Loader2Icon className="size-12 text-zinc-500 animate-spin" />
                        </div>

                    ) : displayedProjects.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-zinc-500">
                            No projects found matching your criteria.
                        </div>

                    ) : (
                        <>
                            {displayedProjects.map((project) => (
                                <ProjectItem key={project.title} project={project} />
                            ))}

                            {
                                moreToLoad && (
                                    <>
                                        <div key="more1" className="bg-zinc-500 border border-zinc-800 rounded-xl animate-pulse" />
                                        <div key="more2" className="bg-zinc-500 border border-zinc-800 rounded-xl animate-pulse" />
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>

            {/* Sentinel for infinite scroll */}
            <div ref={observerTarget} className="h-10 w-full flex items-center justify-center mt-10">
                {isLoading && displayedProjects.length > 0 && (
                    <Loader2Icon className="size-8 text-zinc-500 animate-spin" />
                )}
            </div>
        </div>
    )
}