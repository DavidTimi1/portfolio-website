import { Project } from "@/data/projects";
import { BlogMetadata } from "./blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://davidtimi.tech";
const AUTHOR_NAME = "David Uwagbale";
const AUTHOR_HANDLE = "@DavidTimi_1";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    alternateName: ["Dev_id", "DavidTimi1", "David Timi"],
    jobTitle: "Full Stack Engineer & Software Developer",
    description:
      "Full Stack Software Engineer specializing in Next.js, React Native, TypeScript, Python, and high-performance Web and Mobile Applications.",
    url: SITE_URL,
    sameAs: [
      "https://github.com/DavidTimi1",
      "https://x.com/DavidTimi_1",
      "https://linkedin.com/in/daviduwagbale",
    ],
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Python",
      "Flask",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "Convex",
      "Tailwind CSS",
      "Web Accessibility (a11y)",
      "System Architecture",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "David Uwagbale Portfolio",
    description:
      "Developer portfolio of David Uwagbale (Dev_id) showcasing full stack web projects, mobile apps, software architecture, and technical writing.",
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    inLanguage: "en-US",
  };
}

export function generateProjectsCollectionSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/projects/#collection`,
    url: `${SITE_URL}/projects`,
    name: "Software Engineering Projects & Applications | David Uwagbale",
    description:
      "A curated collection of web applications, mobile apps, open-source utilities, and full-stack projects built by David Uwagbale.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => {
        const projectUrl =
          project.links?.live || project.links?.github || `${SITE_URL}/projects`;
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: project.title,
            description: project.description,
            url: projectUrl,
            codeRepository: project.links?.github,
            applicationCategory: project.tech?.includes("react native")
              ? "MobileApplication"
              : "WebApplication",
            operatingSystem: project.tech?.includes("react native")
              ? "iOS, Android"
              : "Web Browser",
            keywords: project.tech ? project.tech.join(", ") : undefined,
            copyrightYear: project.year,
            author: {
              "@type": "Person",
              name: AUTHOR_NAME,
              url: SITE_URL,
            },
          },
        };
      }),
    },
  };
}

export function generateBlogPostingSchema(metadata: BlogMetadata) {
  const postUrl = `${SITE_URL}/blog/${metadata.slug}`;
  const coverImage = metadata.cover_image
    ? metadata.cover_image.startsWith("http")
      ? metadata.cover_image
      : `${SITE_URL}${metadata.cover_image}`
    : `${SITE_URL}/assets/banner.png`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: metadata.title,
    description: metadata.description,
    image: coverImage,
    datePublished: metadata.created_at,
    author: {
      "@type": "Person",
      name: metadata.author || AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    keywords: Array.isArray(metadata.keywords)
      ? metadata.keywords.join(", ")
      : metadata.keywords,
  };
}
