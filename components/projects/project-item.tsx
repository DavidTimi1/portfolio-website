import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { GithubIcon, ExternalLinkIcon, StarIcon } from "lucide-react";
import { Project } from "@/data/projects";
import Image from "next/image";
import { getProjectImage } from "@/lib/get-project-image";
import { Button } from "../ui/button";

export const ProjectItem = ({
    project
}: {
    project: Project;
}) => {
    const imageSrc = getProjectImage(project);
    const placeholderImage = "/assets/projects/placeholder.jpg"

    return (
        <AnimatePresence>
            <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-all duration-300 flex flex-col gap-4"
            >
                <div className="w-full h-40 bg-zinc-800 rounded-t-lg overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={project.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-t-lg transition group-hover:scale-110"
                        onError={e => { e.currentTarget.src = placeholderImage }}
                    />
                </div>
                <div className="w-full flex flex-col gap-2 px-6 pb-4">

                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                            <span className="text-xs font-mono text-zinc-600 mt-1">{project.year} {project.is_collab && "• Collaborative"}</span>
                        </div>
                        <div className="flex gap-2">
                            {project.links.github && (
                                <Button asChild variant="outline" size="icon">
                                    <Link href={project.links.github} target="_blank" rel="noreferrer noopener">
                                        <GithubIcon className='w-4 h-4' />
                                        <span className="sr-only">Show in Github</span>
                                    </Link>
                                </Button>
                            )}
                            {project.links.live && (
                                <Button asChild variant="outline" size="icon">
                                    <Link href={project.links.live} target="_blank" rel="noreferrer noopener">
                                        <ExternalLinkIcon className='w-4 h-4' />
                                        <span className="sr-only">
                                            View live
                                        </span>
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-zinc-400 line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {project.tech?.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 text-[10px] bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
                {
                    project.is_featured && (
                        <div className="absolute right-3 top-3">
                            <StarIcon className="size-5 text-yellow-600 fill-yellow-600" />
                        </div>
                    )
                }
            </motion.div>
        </AnimatePresence>
    )
}