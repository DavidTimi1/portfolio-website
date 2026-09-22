import { Metadata } from "next";
import Home from "../page";

const SECTION_TITLES: Record<string, { title: string; description: string }> = {
  experience: {
    title: "Work Experience & History | David Uwagbale",
    description:
      "Explore David Uwagbale's professional experience as a Full Stack Developer, key engineering achievements, and technical contributions.",
  },
  services: {
    title: "Services & Technical Expertise | David Uwagbale",
    description:
      "Full stack web development, mobile app building, API design, performance optimization, and custom AI integration services by David Uwagbale.",
  },
  skills: {
    title: "Technical Skills & Stack | David Uwagbale",
    description:
      "Full list of languages, frameworks, and developer tools used by David Uwagbale, including Next.js, React, TypeScript, Python, and PostgreSQL.",
  },
  contact: {
    title: "Contact & Hire David Uwagbale",
    description:
      "Get in touch with David Uwagbale for freelance projects, full-time engineering roles, technical consultations, or project collaborations.",
  },
  "featured-projects": {
    title: "Featured Software Projects | David Uwagbale",
    description:
      "Highlighting top-tier full stack applications, open-source software, and mobile apps engineered by David Uwagbale.",
  },
  about: {
    title: "About David Uwagbale | Software Engineer",
    description:
      "Learn about David Uwagbale (Dev_id) — background, engineering philosophy, problem-solving approach, and tech journey.",
  },
};

export function generateStaticParams() {
  return [
    { section: "experience" },
    { section: "services" },
    { section: "skills" },
    { section: "contact" },
    { section: "featured-projects" },
    { section: "about" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const sectionKey = resolvedParams.section;
  const sectionInfo = SECTION_TITLES[sectionKey];

  if (!sectionInfo) {
    return {
      title: "David Uwagbale | Full Stack Engineer",
    };
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://davidtimi.tech";
  const canonicalUrl = `${BASE_URL}/${sectionKey}`;

  return {
    title: `${sectionInfo.title}`,
    description: sectionInfo.description,
    openGraph: {
      title: sectionInfo.title,
      description: sectionInfo.description,
      url: canonicalUrl,
      images: `${BASE_URL}/assets/banner.png`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@DavidTimi_1",
      creator: "@DavidTimi_1",
      title: sectionInfo.title,
      description: sectionInfo.description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default Home;
