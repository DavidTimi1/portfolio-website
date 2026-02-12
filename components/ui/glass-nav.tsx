"use client";

import { motion } from "framer-motion";
import { Code2, Briefcase, Mail, Layers, FolderGit, Home, Router } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/providers/active-section-context";

const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Services", icon: Layers, href: "/services" },
    { name: "Experience", icon: Briefcase, href: "/experience" },
    { name: "Skills", icon: Code2, href: "/skills" },
    { name: "Projects", icon: FolderGit, href: "/featured-projects" },
    { name: "Contact", icon: Mail, href: "/contact" },
];

export function GlassNav() {
    const { activeSection, setActiveSection } = useActiveSection();
    const router = useRouter();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const pathname = window.location.pathname;
        const isHomePage = navItems.some(item => item.href.includes(pathname));

        // If on home page, prevent default navigation and scroll smoothly
        if (isHomePage) {
            const targetId = 
                href === '/' ? 'hero' :
                href === '/contact' ? 'contact-end' : 
                href.replace("/", "");
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                // Update URL and state manually for immediate feedback
                window.history.pushState(null, "", href);
                setActiveSection(targetId);
            }

        } else {
            router.push(href);
        }
    };

    return (
        <motion.nav
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block"
        >
            {/* Nav Container */}
            <div className="relative flex flex-col gap-6 p-2 rounded-full border border-white/10 shadow-xl overflow-hidden bg-zinc-950/30 backdrop-blur-sm">

                {/* Glassy Overlay for specific look */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none z-[-1]" />

                {navItems.map((item) => {
                    const isActive = activeSection === item.href.replace("/", "") || 
                        activeSection === 'hero' && item.href === '/';

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
                            <span className="absolute right-full mr-5 px-3 py-1.5 text-sm font-medium text-white bg-black/80 rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10">
                                {item.name}
                            </span>

                            {/* Active Indicator Ring */}
                            {/* {isActive && (
                                <motion.div
                                    layoutId="activeBubble"
                                    className="absolute inset-0 rounded-full border border-white/40"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )} */}
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
