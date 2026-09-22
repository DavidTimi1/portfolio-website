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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://davidtimi.tech";
const title = "David Uwagbale | Full Stack Engineer & Software Architect | Dev_id";
const description =
  "Developer portfolio of David Uwagbale (Dev_id) — Full Stack Engineer specializing in Next.js, React Native, TypeScript, Python, and scalable modern web and mobile applications.";

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: [
    "David Uwagbale",
    "Dev_id",
    "Full Stack Engineer",
    "Software Engineer",
    "Next.js Developer",
    "React Native Developer",
    "TypeScript",
    "Python Developer",
    "Web Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    title: title,
    description: description,
    url: BASE_URL,
    images: `${BASE_URL}/assets/banner.png`,
    siteName: "David Uwagbale Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@DavidTimi_1",
    creator: "@DavidTimi_1",
    title: title,
    description: description,
    images: `${BASE_URL}/assets/banner.png`,
  },
  alternates: {
    canonical: BASE_URL,
  },
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
