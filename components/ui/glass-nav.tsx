"use client";

import { motion } from "framer-motion";
import { User, Code2, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

const navItems = [
    { name: "Home", icon: User, href: "/" },
    { name: "Skills", icon: Code2, href: "/skills" },
    { name: "Projects", icon: Briefcase, href: "/featured-projects" },
    { name: "Contact", icon: Mail, href: "/contact" },
];

export function GlassNav() {
    return (
        <motion.nav
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        >
            <div className="flex flex-col gap-6 p-2 rounded-full bg-zinc-200/5 backdrop-blur-md border border-white/10 shadow-xl">
                {navItems.map((item, index) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:bg-white/10"
                    >
                        <item.icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />

                        {/* Tooltip */}
                        <span className="absolute right-full mr-5 px-2 py-1 text-sm font-medium text-white bg-black/80 rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                            {item.name}
                        </span>

                        {/* Active Indicator (optional, could interact with scroll state later) */}
                        <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/20 transition-all duration-300" />
                    </Link>
                ))}
            </div>
        </motion.nav>
    );
}
