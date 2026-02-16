"use client";

import { projects } from "@/data/projects";
import { useSearchParams } from "next/navigation";
import { ProjectItem } from "./project-item";


export const ProjectsList = ({ }) => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const activeSkill = searchParams.get("skill") || "";

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTech = activeSkill ? project.technologies.includes(activeSkill) : true;
        return matchesSearch && matchesTech;
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}

            {filteredProjects.length === 0 && (
                <div className="col-span-full py-20 text-center text-zinc-500">
                    No projects found matching your criteria.
                </div>
            )}
        </div>
    )
}