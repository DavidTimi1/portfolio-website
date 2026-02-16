import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";

export const ProjectItem = ({
    project
}: {
    project: Project;
}) => {
    return (
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
    )
}