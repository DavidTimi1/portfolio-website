"use client";

import Hero from "@/components/home/hero";
import Skills from "@/components/home/skills";
import Projects from "@/components/home/projects";
import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import Services from "@/components/home/services";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SectionDetector } from "@/components/ui/section-detector";

export default function Home() {
  const [isInitialLoad, setIsLoaded] = useState(false)
  const params = useParams();

  useEffect(() => {
    if (params?.section) {
      const sectionId = params.section === "contact" ? "contact-end" : params.section as string;
      const element = document.getElementById(sectionId);

      if (element && !isInitialLoad) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setIsLoaded(true)
        }, 100);
      }
    }
  }, [params, isInitialLoad]);

  return (
    <main className="h-screen dom-loaded w-full snap-y overflow-y-scroll scrollbar-hide bg-zinc-900 text-zinc-100">
      <Toaster />
      <div className="relative space-y-20 bg-zinc-900 text-zinc-100 z-10">
        <Hero />
        <Services />
        <Experience />
        <Skills />
        <Projects />
      </div>
      <Contact />
      <div id="contact-end" className="relative snap-start -translate-y-5">
        <SectionDetector sectionId="contact" />
      </div>
    </main>
  );
}
