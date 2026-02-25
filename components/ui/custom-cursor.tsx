"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);
    const [enabled, setEnabled] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const resizeHandler = () => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            const isLargeScreen = window.matchMedia("(min-width: 1280px)").matches;
            if (isMobile) {
                setEnabled(false);
            } else if (isLargeScreen) {
                setEnabled(true);
            }
        };
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    }, [])

    useEffect(() => {
        // Detect real mouse/trackpad devices
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        const supportsHover = window.matchMedia("(hover: hover)").matches;

        if (!hasFinePointer || !supportsHover) return;

        setTimeout(() => setEnabled(true))

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const updateCursorType = () => {
            const hoveredElement = document.querySelector(":hover");

            if (hoveredElement) {
                const styles = window.getComputedStyle(hoveredElement);

                if (
                    styles.cursor === "pointer" ||
                    hoveredElement.tagName === "A" ||
                    hoveredElement.tagName === "BUTTON"
                ) {
                    setIsPointer(true);
                } else {
                    setIsPointer(false);
                }
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", updateCursorType);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", updateCursorType);
        };
    }, [cursorX, cursorY]);

    useEffect(() => {
        if (!enabled){
            document.body.style.cursor = "unset";
        }

    }, [enabled])

    // ❌ Do not render on touch devices
    if (!enabled) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{ x: cursorX, y: cursorY }}
        >
            <motion.div
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    rotate: isPointer ? 45 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="w-full h-full border-2 border-white rounded-full bg-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            />

            <motion.div
                animate={{
                    scale: isPointer ? 2 : 1,
                    opacity: isPointer ? 0.5 : 0.2,
                }}
                className="absolute inset-0 -z-10 bg-blue-500/30 blur-xl rounded-full"
            />
        </motion.div>
    );
}
