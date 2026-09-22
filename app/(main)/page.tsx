import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import Skills from "@/components/home/skills";
import Projects from "@/components/home/projects";
import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import Services from "@/components/home/services";
import { SectionDetector } from "@/components/ui/section-detector";
import { HomeScrollHandler } from "@/components/home/home-scroll-handler";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  keywords: [
    "David Uwagbale",
    "Dev_id",
    "Full Stack Engineer",
    "Software Engineer",
    "React Native Developer",
    "TypeScript",
    "Python Developer",
    "Web Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Portfolio",
  ],
};

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <main className="h-screen dom-loaded w-full snap-y overflow-y-scroll scrollbar-hide bg-zinc-900 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeScrollHandler />
      <div className="relative space-y-50 bg-zinc-900 text-zinc-100 z-10">
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
