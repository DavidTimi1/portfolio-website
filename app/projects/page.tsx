import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { GlassNav } from "@/components/ui/glass-nav";
import { ProjectsSearch } from "@/components/projects/projects-search";
import { ProjectsList } from "@/components/projects/project-list";
import { ProjectsFilter } from "@/components/projects/projects-filter";
import { Suspense } from "react";
import Preloader from "../loading";
import { ProjectHeader } from "@/components/projects/project-header";


export default function ProjectsPage() {
    return (
        <Suspense fallback={
            <Preloader />
        }>
            <main className="min-h-screen w-full bg-zinc-950 text-foreground selection:bg-blue-500/30">

                <div className="py-10 container">
                    {/* Header */}
                    <ProjectHeader />

                    {/* Sticky Search & Filters */}
                    <div className="sticky top-0 z-20 py-6 bg-zinc-950/80 backdrop-blur-md -mx-4 px-4">
                        <div className="flex justify-end gap-6">
                            <ProjectsSearch />
                        </div>

                        {/* Tech Filters */}
                        <ProjectsFilter />
                    </div>

                    {/* Grid */}
                    <ProjectsList />
                </div>
            </main>
        </Suspense>
    );


}
