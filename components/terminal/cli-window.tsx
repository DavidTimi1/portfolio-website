"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Maximize2, Minimize2, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";
import { toast } from "sonner";

const DIRECTORY_TREE = [
    // todo
]

const HOST_DOMAIN = "dev_id@portfolio:~"

export function CliWindow() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isOpen && isMobile) {
            toast.error("Open on larger screen to use Terminal");
            setIsOpen(false)
        }
    }, [isOpen, isMobile])

    useEffect(() => {
        const ASCII_ART = [
            "╔═════════════════════════════════════════════════════════════════╗",
            "║  ██████╗ ███████╗██╗   ██╗       ██╗██████╗     ██████╗ ███████╗║",
            "║  ██╔══██╗██╔════╝██║   ██║       ██║██╔══██╗    ██╔══██╗██╔════╝║",
            "║  ██║  ██║█████╗  ██║   ██║       ██║██║  ██║    ██████╔╝█████╗  ║",
            "║  ██║  ██║██╔══╝  ╚██╗ ██╔╝       ██║██║  ██║    ██╔═══╝ ██╔══╝  ║",
            "║  ██████╔╝███████╗ ╚████╔╝ ██████ ██║██████╔╝    ██║     ██║     ║",
            "║  ╚═════╝ ╚══════╝  ╚═══╝  ╚═════╝╚═╝╚═════╝     ╚═╝     ╚═╝     ║",
            "║                                                                 ║",
            "║   ██████╗ ██╗     ██╗                                           ║",
            "║  ██╔════╝ ██║     ██║                                           ║",
            "║  ██║      ██║     ██║                                           ║",
            "║  ██║      ██║     ██║                                           ║",
            "║  ╚██████╗ ███████╗██║                                           ║",
            "║   ╚═════╝ ╚══════╝╚═╝                                           ║",
            "╚═════════════════════════════════════════════════════════════════╝",
            " v2.0.0 [NEON_SHELL] - System Online",
            " Type 'help' for available commands.",
        ];
        setHistory([...ASCII_ART]);
    }, []);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history, isOpen]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase().split(" ")[0];
        const args = input.trim().split(" ").slice(1).join(" ");
        const newHistory = [...history, `${HOST_DOMAIN}$ ${input}`];

        switch (cmd) {
            case "help":
                newHistory.push(
                    "Available commands:",
                    "  help           - Show this help message",
                    "  clear          - Clear terminal",
                    "  whoami         - Display user info",
                    "  cd <section>   - Navigate (e.g., 'cd projects')",
                    "  ls             - List sections",
                    "  contact        - Open contact form",
                    "  rm -rf /       - [DANGER] Do not run this."
                );
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            case "whoami":
                newHistory.push("Visitor (You) - Exploring the digital realm of David Uwagbale.");
                break;
            case "ls":
                newHistory.push("Detected Directories:", "  projects/", "  skills/", "  experience/", "  contact/");
                break;
            case "cd":
                newHistory.push(`Navigate to ${args} (Feature in progress...)`);
                break;
            case "rm":
                if (args.includes("-rf") && args.includes("/")) {
                    newHistory.push("CRITICAL ERROR: KERNEL PANIC.", "Just kidding. Opening contact form...");
                    window.location.href = "mailto:duwagbale07@gmail.com";
                }
                break;
            default:
                newHistory.push(`ERROR Command not found: ${cmd}. Type 'help' for assistance.`);
        }

        setHistory(newHistory);
        setInput("");
    };

    return (
        <>
            {/* Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-4 right-4 md:right-8 z-50 p-4 bg-zinc-900 border border-zinc-800 text-accent rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-shadow"
                    onClick={() => setIsOpen(true)}
                >
                    <Terminal size={24} />
                </motion.button>
            )}

            {/* Terminal Window */}
            <AnimatePresence>
                {isOpen && !isMobile && (
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            height: isFullScreen ? "100vh" : "400px",
                            width: isFullScreen ? "100vw" : "min(800px, 90vw)",
                            borderRadius: isFullScreen ? 0 : "12px"
                        }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed z-100 bg-black/90 font-mono backdrop-blur-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col",
                            isFullScreen ? "inset-0" : "bottom-4 right-4 md:right-8"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 font-mono">
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-zinc-500" />
                                <span className="text-sm text-blue-400"> {HOST_DOMAIN} </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsFullScreen(!isFullScreen)}
                                    className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                                >
                                    {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-red-500/20 rounded text-zinc-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            className="flex-1 p-4 overflow-y-auto scrollbar-hide text-sm cursor-text"
                            onClick={() => document.getElementById("terminal-input")?.focus()}
                        >
                            <div className="space-y-1 text-zinc-300 font-mono text-[10px] md:text-sm">
                                {history.map((line, i) => (
                                    <div key={i} className="whitespace-pre leading-none">
                                        {displayLine(line)}
                                    </div>
                                ))}
                                <div ref={bottomRef} />
                            </div>
                        </div>

                        {/* Input Line */}
                        <form onSubmit={handleCommand} className="p-4 bg-zinc-900/30 border-t border-zinc-800 flex items-center gap-2">
                            <span className="text-accent">➜</span>
                            <span className="text-cyan-200">~</span>
                            <input
                                id="terminal-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                                autoFocus
                                autoComplete="off"
                            />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}


const displayLine = (line: string) => {
    const endOfHost = line.indexOf('$');
    const prompt = line.slice(endOfHost + 2);
    const [executable, ...args] = prompt.split(' ');

    // if it is a normal line, show in grey text
    if (!line.startsWith(HOST_DOMAIN)) {
        if (line.startsWith('ERROR') || line.startsWith('CRITICAL ERROR')) {
            return <span className="text-red-500">{line}</span>
        }
        return line
    }

    return (
        <>
            <span className="">{line.slice(0, endOfHost + 1)}</span>{' '}
            <span className="text-yellow-500">{executable}</span>{' '}
            <span>{args.join(' ')}</span>
        </>
    )

}