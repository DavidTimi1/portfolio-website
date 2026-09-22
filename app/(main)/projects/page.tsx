import { ProjectsSearch } from "@/components/projects/projects-search";
import { ProjectsList } from "@/components/projects/project-list";
import { ProjectsFilter } from "@/components/projects/projects-filter";
import { Suspense } from "react";
import { ProjectHeader } from "@/components/projects/project-header";
import ALL_PROJECTS_DATA from "@/data/projects.json";
import { Project } from "@/data/projects";
import { generateProjectsCollectionSchema } from "@/lib/json-ld";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://davidtimi.tech";
const ALL_PROJECTS = ALL_PROJECTS_DATA as Project[];

export const metadata: Metadata = {
  title: "Projects & Software Portfolio | David Uwagbale",
  description:
    "Explore software engineering projects, web applications, mobile apps, and open-source software built by David Uwagbale (Dev_id)",
  keywords: [
    "David Uwagbale Projects",
    "Dev_id Software",
    "Full Stack Projects",
    "React Native Apps",
    "Open Source",
    "Python Projects",
    "Web Development Portfolio",
  ],
  openGraph: {
    type: "website",
    title: "Projects & Software Portfolio | David Uwagbale",
    description:
      "Explore software engineering projects, web applications, mobile apps, and open-source software built by David Uwagbale (Dev_id).",
    url: `${BASE_URL}/projects`,
    images: `${BASE_URL}/assets/banner.png`,
    siteName: "David Uwagbale Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@DavidTimi_1",
    creator: "@DavidTimi_1",
    title: "Projects & Software Portfolio | David Uwagbale",
    description:
      "Explore software engineering projects, web applications, mobile apps, and open-source software built by David Uwagbale (Dev_id).",
    images: `${BASE_URL}/assets/banner.png`,
  },
  alternates: {
    canonical: `https://davidtimi1-github-io.vercel.app/projects`,
  },
};

export default function ProjectsPage() {
  const collectionSchema = generateProjectsCollectionSchema(ALL_PROJECTS);

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-foreground selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      {/* Semantic SSR structured content for crawlers & GEO AI bots */}
      <section className="sr-only" aria-label="Projects Catalog (SSR Indexable)">
        <h2>Complete Software Engineering Projects Directory</h2>
        {ALL_PROJECTS.map((project) => (
          <article key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.tech && <p>Technologies: {project.tech.join(", ")}</p>}
            {project.year && <p>Year: {project.year}</p>}
            {project.links?.github && (
              <a href={project.links.github} rel="noopener noreferrer">
                GitHub Repository: {project.title}
              </a>
            )}
            {project.links?.live && (
              <a href={project.links.live} rel="noopener noreferrer">
                Live Demo: {project.title}
              </a>
            )}
          </article>
        ))}
      </section>

      <div className="py-10 container">
        {/* Header */}
        <ProjectHeader />

        <Suspense
          fallback={
            <div className="py-20 text-center text-zinc-500">
              Loading projects...
            </div>
          }
        >
          {/* Sticky Search & Filters */}
          <div className="sticky top-0 z-20 py-6 bg-zinc-950/80 backdrop-blur-md -mx-4 px-4">
            <div className="flex justify-end gap-6">
              <ProjectsSearch />
            </div>

            {/* Tech Filters */}
            <ProjectsFilter />
          </div>

          {/* Grid */}
          <ProjectsList />
        </Suspense>
      </div>
    </main>
  );
}
