import { Project } from '@/data/projects';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { GithubIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from '../ui/button';
import { MouseEventHandler } from 'react';
import Image from 'next/image';


export const ProjectItem = ({
    project,
    index,
}: {
    project: Project;
    index: number
}) => {
    const ghLink = project.links.github;
    const projectSlug = ghLink?.replace("https://github.com/", "")?.replace("/", "_")?.toLowerCase();
    const imageSrc = project.image || ghLink ? `/assets/projects/${projectSlug}.jpg` : "/assets/projects/placeholder.jpg";

    const handleCardClick = () => {
        if (project.links.live) {
            window.open(project.links.live, "_blank", "noopener, noreferrer");
        } else if (project.links.github) {
            window.open(project.links.github, "_blank", "noopener, noreferrer");
        } else {
            toast.error("No usage link available for this project yet!");
        }
    };

    const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const btnValue = e.currentTarget.value as 'live' | 'github';

        if (btnValue) {
            window.open(project.links[btnValue], "_blank", "noopener, noreferrer");
        }
    };


    return (

        <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="max-h-28 md:max-h-40"
        >
            <div
                onClick={handleCardClick}
                className="group relative h-full w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col justify-between overflow-hidden cursor-pointer hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
            >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-linear-to-br from-zinc-800 to-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative h-full flex gap-3 pr-3">
                    <div className="flex items-center justify-center h-full aspect-square group-hover:scale-110 transition-transform duration-300">
                        <Image
                            src={imageSrc}
                            alt={project.title}
                            height={200}
                            width={200}
                            onError={ e => e.currentTarget.src = "/assets/projects/placeholder.jpg" }
                            className='size-full object-cover'
                        />
                    </div>
                    <div className="py-4 flex gap-3">
                        {/* Middle: Info */}
                        <div className="space-y-3">
                            <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                                {project.title}
                            </h3>
                            <p className="text-zinc-400 text-xs line-clamp-3 mb-4 group-hover:text-zinc-300 transition-colors">
                                {project.description}
                            </p>
                        </div>

                        {/* Top Row: Type & Links */}
                        <div className="flex flex-col justify-between">
                            {project.links.github && (
                                <Button variant="outline" size="icon" value='github'
                                    onClick={handleIconClick}
                                >
                                    <GithubIcon className='w-4 h-4' />
                                    <span className="sr-only">Show in Github</span>
                                </Button>
                            )}
                            {project.links.live && (
                                <Button variant="outline" size="icon" value='live' onClick={handleIconClick}>
                                    <ExternalLinkIcon className='w-4 h-4' />
                                    <span className="sr-only">
                                        View live
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}