"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";
import { toast } from "sonner";

// const DIRECTORY_TREE = [
//     // todo
// ]

const HOST_DOMAIN = "dev_id@portfolio:~"

export function CliWindow() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [input, setInput] = useState("");

    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const lastCommand = commandHistory.slice(-1)[0];
    const [displayTray, setDisplayTray] = useState<string[]>([]);
    const lastDisplayed = displayTray.slice(-1)[0];
    const timeTraverser = useRef(0);

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
        setDisplayTray([...ASCII_ART]);

    }, []);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [lastDisplayed, isOpen]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        resetTraverser();

        const cmd = input.trim().toLowerCase().split(" ")[0];
        const args = input.trim().split(" ").slice(1).join(" ");

        if (lastCommand !== input.trim()) {
            setCommandHistory(prev => [...prev, input.trim()]);
        }
        const newDisplayTray = [...displayTray, `${HOST_DOMAIN}$ ${input}`];

        switch (cmd) {
            case "help":
                newDisplayTray.push(
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
                setDisplayTray([]);
                setInput("");
                return;
            case "whoami":
                newDisplayTray.push("Visitor (You) - Exploring the digital realm of David Uwagbale.");
                break;
            case "ls":
                newDisplayTray.push("Detected Directories:", "  projects/", "  skills/", "  experience/", "  contact/");
                break;
            case "cd":
                newDisplayTray.push(`Navigate to ${args} (Feature in progress...)`);
                break;
            case "rm":
                if (args.includes("-rf") && args.includes("/")) {
                    triggerCriticalError()
                }
                break;
            default:
                newDisplayTray.push(`ERROR Command not found: ${cmd}. Type 'help' for assistance.`);
        }

        setDisplayTray(newDisplayTray);
        setInput("");
    };

    return (
        <>
            {/* Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed hidden bottom-5 right-5 cursor-pointer md:right-8 z-50 p-3 bg-zinc-900 border border-zinc-800 text-accent rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-shadow"
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
                            "fixed hidden z-100 bg-black/90 font-mono backdrop-blur-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col",
                            isFullScreen ? "inset-0" : "bottom-4 right-4 md:right-8"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 font-mono">
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-zinc-500" />
                                <span className="text-sm text-accent"> {HOST_DOMAIN} </span>
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
                                {displayTray.map((line, i) => (
                                    <div key={i} className="whitespace-pre leading-tight">
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
                                onKeyDown={handleKeyDown}
                            />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        let travelled = false;

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            // can go all the way till the -[length] index which gives the full size
            if (timeTraverser.current > -commandHistory.length) {
                timeTraverser.current -= 1;
                travelled = true;
            }

        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            // can come all the way from the -[leghth] index to 0
            if (timeTraverser.current < 0) {
                timeTraverser.current += 1;
                travelled = true;
            }
        }

        if (travelled) 
            handleCommandTraversal();
    }

    function handleCommandTraversal() {
        const index = timeTraverser.current;
        const pastCommand = commandHistory.slice(index)[0];
        if (index >= 0) {
            setInput('')
            return;
        }

        if (pastCommand) {
            setInput(commandHistory.slice(index)[0])
        }
    }

    function resetTraverser() {
        timeTraverser.current = 0;
    }

    function triggerCriticalError() {
        setTimeout(() => {
            setDisplayTray(prev => [...prev, "CRITICAL ERROR: KERNEL PANIC."]);
        }, 500);

        setTimeout(() => {
            document.body.style.opacity = "0";
        }, 1000);

        setTimeout(() => {
            document.body.style.opacity = "1";
            setDisplayTray(prev => [...prev, "Just kidding. Opening contact form..."]);
            window.location.href = "mailto:duwagbale07@gmail.com";
        }, 1500);

    }
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
