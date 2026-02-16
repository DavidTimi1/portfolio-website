"use client";

import { useActiveSection } from "@/components/providers/active-section-context";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface SectionDetectorProps {
    sectionId: string;
}

export function SectionDetector({ sectionId }: SectionDetectorProps) {
    const { setActiveSection } = useActiveSection();
    const ref = useRef<HTMLDivElement>(null);
    const isPositionedAtEnd = sectionId === 'contact'

    // Detect when this element crosses the viewport center
    // We position it at top-1/2 of the section, so when it's in view, the section is centered
    const isInView = useInView(ref, isPositionedAtEnd? {
        amount: 0
    } : {
        margin: "-45% 0px -45% 0px", // Trigger only when it crosses the middle line
        amount: 0 // Trigger as soon as one pixel is in the middle
    });

    useEffect(() => {
        if (isInView) {
            setActiveSection(sectionId);
            // Silent URL update
            const sectionUrl = sectionId === 'hero' ? '/' : `/${sectionId}`
            window.history.replaceState(null, "", sectionUrl);
        }
    }, [isInView, sectionId, setActiveSection]);

    return (
        <div
            ref={ref}
            className="absolute top-1/2 left-0 w-full h-px pointer-events-none opacity-0 -z-50"
            aria-hidden="true"
        />
    );
}
