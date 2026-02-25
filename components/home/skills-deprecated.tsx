"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Globe,
    Cpu,
    Layers,
    Terminal,
    Layout,
    Server
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Skills() {
    // const iconSize = 40;
    const radius = 160;

    const [, setStats] = useState({
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
        { name: "React", icon: Code2 },
        { name: "Node.js", icon: Server },
        { name: "Next.js", icon: Globe },
        { name: "PostgreSQL", icon: Database },
        { name: "Python", icon: Terminal },
        { name: "Tailwind", icon: Layout },
        { name: "AWS", icon: Cpu },
        { name: "Docker", icon: Layers },
    ];

    return (
        <section id="skills" className="min-h-screen w-full flex flex-col items-center justify-center snap-start bg-black relative overflow-hidden py-20 z-20">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[30px_30px] mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" />

            <div className="z-10 w-full container px-4 flex flex-col gap-24">

                {/* Top Section: 3D Ring & Title */}
                <div className="flex flex-col items-center gap-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold tracking-tighter text-white text-center"
                    >
                        TECHNICAL <span className="text-accent">ARSENAL</span>
                    </motion.h2>

                    <div className="relative w-[400px] h-[400px] flex items-center justify-center perspective-[1000px]">
                        <div className="absolute w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse" />
                        <div className="absolute w-16 h-16 bg-zinc-900 border border-accent rounded-full flex items-center justify-center shadow-[0_0_30px_#00f0ff50]">
                            <Code2 className="text-accent w-8 h-8" />
                        </div>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-full h-full flex items-center justify-center"
                        >
                            {skills.map((skill, index) => {
                                const angle = (index / skills.length) * 2 * Math.PI;
                                const x = radius * Math.cos(angle);
                                const y = radius * Math.sin(angle);

                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute w-14 h-14 bg-zinc-900/80 border border-zinc-700 rounded-xl flex items-center justify-center backdrop-blur-sm hover:border-accent hover:shadow-[0_0_15px_#00f0ff] transition-all duration-300"
                                        style={{
                                            x,
                                            y,
                                            rotate: -360
                                        }}
                                    >
                                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                                            <skill.icon className="text-zinc-400 w-6 h-6" />
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
