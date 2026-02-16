"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppNav } from "@/hooks/use-app-nav";
import { useActiveSection } from "../providers/active-section-context";


export function GlassNav() {
    const { navItems, handleNavClick, isActiveSection } = useAppNav();
    const { activeSection } = useActiveSection();

    return (
        <motion.nav
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        >
            {/* Nav Container */}
            <div className="group/nav relative flex flex-col gap-6 p-2 rounded-full border border-white/10 shadow-xl bg-zinc-950/30 backdrop-blur-sm">

                {/* Glassy Overlay for specific look */}
                <div className={cn("absolute inset-0 bg-white/5 transition-colors duration-300 rounded-full pointer-events-none z-[-1]",
                    activeSection === "contact" ? "" : "group-hover/nav:bg-zinc-950"
                )} />

                {navItems.map((item) => {
                    const isActive = isActiveSection(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={cn(
                                "group relative flex items-center justify-center bg-transparent border border-transparent w-12 h-12 rounded-full transition-all duration-300",
                                isActive ? "bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)] border-zinc-400" : "hover:bg-white/10"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5 transition-colors duration-300",
                                    isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
                                )}
                            />

                            {/* Tooltip */}
                            <span className="absolute right-full mr-4 px-3 py-1.5 text-sm font-medium text-white bg-black/80 rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
