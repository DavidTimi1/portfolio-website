import { Project } from "@/data/projects";


export const getProjectImage = (project: Project) => {
    const ghLink = project.links.github;
    const projectSlug = ghLink?.replace("https://github.com/", "")?.replace("/", "_")?.toLowerCase();
    const imageSrc = project.image || ghLink ? `/assets/projects/${projectSlug}.jpg` : "/assets/projects/placeholder.jpg";
    return imageSrc;
}