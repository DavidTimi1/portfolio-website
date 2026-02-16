"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for window load
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Allow fade out animation to finish before removing from DOM
            setTimeout(() => setIsVisible(false), 500);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-500",
                isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <svg
                viewBox="0 0 150 80"
                className="w-32 h-auto mb-8 animate-pulse"
                stroke="#fff"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* "<" symbol */}
                <path d="M40,0 L0,30 L40,60" strokeWidth="6"></path>
                {/* "/" symbol */}
                <path d="M60,60 L90,0" strokeWidth="6"></path>
                {/* ">" symbol */}
                <path d="M110,0 L150,30 L110,60" strokeWidth="6"></path>
            </svg>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", color: "white", fontSize: "20px" }} className="font-mono">
                <span> Loading &nbsp; </span>
                <span className="dot" style={{ animation: "preloader-blink 1.5s infinite" }}>.</span>
                <span className="dot" style={{ animation: "preloader-blink 1.5s infinite 0.5s" }}>.</span>
                <span className="dot" style={{ animation: "preloader-blink 1.5s infinite 1s" }}>.</span>
            </div>
        </div>
    );
}
