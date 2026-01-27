"use client";

import Hero from "@/components/home/hero";
import Skills from "@/components/home/skills";
import Projects from "@/components/home/projects";
import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import Services from "@/components/home/services";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="h-dvh w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide bg-zinc-900 text-zinc-100">
      <Toaster />
      <Hero />
      <Services />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
