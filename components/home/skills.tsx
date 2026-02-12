"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython,
    FaGitAlt, FaGithub, FaFigma
} from "react-icons/fa";
import {
    SiTypescript, SiTailwindcss, SiNextdotjs, SiDjango,
    SiBootstrap, SiMysql, SiPostgresql, SiC
} from "react-icons/si";
import { Code2, MessageSquare, BrainCircuit, RefreshCw, Crown } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SectionDetector } from "../ui/section-detector";

export default function Skills() {
    const radius = 175; // Increased radius for more items
    const navigateTo = useRouter().push;

    const [stats, setStats] = useState({
        repos: 0,
        followers: 0,
        contributions: 0,
        years: 4
    });

    useEffect(() => {
        // Fetch basic user stats
        fetch("https://api.github.com/users/DavidTimi1")
            .then(res => res.json())
            .then(data => {
                setStats(prev => ({
                    ...prev,
                    repos: data.public_repos || 45,
                    followers: data.followers || 15
                }));
            })
            .catch(err => console.error("GitHub API Error:", err));

        // Fetch contributions (Using a public proxy for contributions graph)
        fetch("https://github-contributions-api.jogruber.de/v4/DavidTimi1?y=last")
            .then(res => res.json())
            .then(data => {
                const total = data.total?.lastYear || 2400;
                setStats(prev => ({ ...prev, contributions: total }));
            })
            .catch(err => console.error("Contributions API Error:", err));
    }, []);

    const skills = [
        { name: "HTML", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Flask", icon: FaPython, color: "#3776AB" }, // Using Python icon for Flask
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "Django", icon: SiDjango, color: "#092E20" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "Git", icon: FaGitAlt, color: "#F05032" },
        { name: "GitHub", icon: FaGithub, color: "#ffffff" },
        { name: "Figma", icon: FaFigma, color: "#F24E1E" },
        { name: "C", icon: SiC, color: "#A8B9CC" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ];

    return (
        <section id="skills" className="min-h-screen snap-start w-full flex flex-col items-center justify-center bg-zinc-900 relative overflow-hidden z-10">
            <SectionDetector sectionId="skills" />
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[30px_30px] mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" />

            <div className=" w-full container flex flex-col">

                {/* Top Section: 2D Ring & Title */}
                <div className="flex flex-col gap-12">
                    <h2
                        className="text-3xl md:text-4xl font-bold tracking-tighter text-white"
                    >
                        SKILLS <span className="text-accent italic">ARSENAL</span>
                    </h2>

                    <div className="flex flex-col items-center gap-4 max-w-3xl min-w-[80%] self-center">

                        {/* Soft Skills positioned at "edges" */}
                        {/* Top Left */}
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <MessageSquare className="text-emerald-400 w-6 h-6" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Communication</span>
                            </div>

                            {/* Top Right */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <BrainCircuit className="text-amber-400 w-6 h-6" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Problem Solving</span>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center h-[400px] w-[400px]  perspective-[1000px]">
                            <div className="absolute w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse" />
                            <div className="absolute w-16 h-16 bg-zinc-900 border border-accent rounded-full flex items-center justify-center shadow-[0_0_30px_#00f0ff50]">
                                <Code2 className="text-accent w-8 h-8" />
                            </div>

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-full h-full flex items-center justify-center"
                            >
                                {skills.map((skill, index) => {
                                    const angle = (index / skills.length) * 2 * Math.PI;
                                    const x = Math.round(radius * Math.cos(angle));
                                    const y = Math.round(radius * Math.sin(angle));

                                    return (
                                        <motion.div
                                            key={index}
                                            className="absolute w-14 h-14 bg-zinc-900/80 border border-zinc-700 rounded-xl flex items-center justify-center backdrop-blur-sm hover:border-accent hover:shadow-[0_0_15px_#00f0ff] transition-all duration-300 group"
                                            style={{
                                                x,
                                                y,
                                                rotate: -360
                                            }}
                                            onClick={handleClick}
                                            onDoubleClick={() => handleDoubleClick(skill.name)}
                                        >
                                            <motion.div
                                                animate={{ rotate: -360 }}
                                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                                className="relative flex items-center justify-center"
                                            >
                                                <skill.icon className="w-6 h-6 transition-colors duration-300" style={{ color: skill.color }} />

                                                {/* Tooltip */}
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                                    {skill.name}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>


                        {/* Soft Skills positioned at "edges" */}
                        <div className="flex items-center justify-between w-full">
                            {/* Bottom Left */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <RefreshCw className="text-cyan-400 w-6 h-6" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Adaptability</span>
                            </div>

                            {/* Bottom Right */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <Crown className="text-purple-400 w-6 h-6" />
                                </div>
                                <span className="text-zinc-400 text-sm font-medium">Leadership</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );

    function handleClick() {
        toast.info("Double click to view projects");
    }
    function handleDoubleClick(skill: string) {
        if (!skill) return;
        navigateTo(`/projects?skill=${skill}`);
    }
}
