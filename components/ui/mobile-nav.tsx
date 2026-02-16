"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MenuIcon, XIcon, HomeIcon, LayersIcon, CodeIcon, FolderIcon, MailIcon } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { useAppNav } from "@/hooks/use-app-nav";
import { useActiveSection } from "../providers/active-section-context"

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)
    const { navItems, handleNavClick, isActiveSection } = useAppNav();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        handleNavClick(e, href);
    }

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <Button
                size="icon"
                variant="ghost"
                className="fixed top-5 right-5 size-12 z-50 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/20"
                onClick={toggleMenu}
            >
                {/* a longer middle stripe in the menu icon */}
                {isOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6 rotate-135 [&>path:nth-child(2)]:scale-x-125" />}
            </Button>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8"
                    >
                        <nav className="flex flex-col gap-8 w-full max-w-sm">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={(e) => handleClick(e, item.href)}
                                        className={cn(
                                            "flex items-center gap-4 text-3xl font-bold text-zinc-400 hover:text-white transition-colors group",
                                            isActiveSection(item.href) && "text-white"
                                        )}
                                    >
                                        <span className="p-3 rounded-xl bg-white/5 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                            <item.icon />
                                        </span>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">
                                            {item.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-12 text-zinc-500 text-sm"
                        >
                            &copy; 2026 Dev_id Portfolio
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
