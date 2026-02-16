import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { GlassNav } from "@/components/ui/glass-nav";
import { ProjectsSearch } from "@/components/projects/projects-search";
import { ProjectsList } from "@/components/projects/project-list";
import { ProjectsFilter } from "@/components/projects/projects-filter";
import { Suspense } from "react";
import Preloader from "../loading";


export default function ProjectsPage() {
    return (
        <Suspense fallback={
            <Preloader />
        }>
            <main className="min-h-screen w-full bg-zinc-950 text-foreground selection:bg-blue-500/30">
                <GlassNav />

                <div className="pb-20 pt-10 container">
                    {/* Header */}
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-foreground mb-8 transition-colors group">
                            <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                                    ALL <span className="text-accent italic">PROJECTS</span>
                                    <span className="text-sm tracking-normal">{" "} ... well, most of em 😂 </span>
                                </h2>
                                <p className="text-zinc-400 max-w-2xl">
                                    A comprehensive list of things I've built, broken, and fixed again.
                                </p>
                            </div>

                            {/* Search Input */}
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
