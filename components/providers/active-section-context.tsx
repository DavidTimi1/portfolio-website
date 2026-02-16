"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ActiveSectionContextType = {
    activeSection: string;
    setActiveSection: (section: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState("hero");

    return (
        <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </ActiveSectionContext.Provider>
    );
}

export function useActiveSection() {
    const context = useContext(ActiveSectionContext);
    if (context === undefined) {
        throw new Error("useActiveSection must be used within an ActiveSectionProvider");
    }
    return context;
}
