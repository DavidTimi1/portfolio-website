import { NextRequest, NextResponse } from "next/server";
import ALL_PROJECTS from "@/data/projects.json";

// ?search=query&skill=skill&tech=tech&is_collab=true&is_featured=true&year=2022


const getTechMappings = (techList: string[]) => {
    const initialTechList = [...techList]
    const supportList: string[] = [];

    for (const tech of initialTechList) {
        switch (tech) {
            case "nextjs":
                supportList.push(
                    "typescript", "javascript", "tailwindcss", "fullstack", "frontend", "backend"
                )
                break;
            case "react":
            case "vue":
                supportList.push(
                    "javascript", "frontend"
                )
                if (!initialTechList.includes("bootstrap") && !initialTechList.includes("css")) {
                    supportList.push(
                        "tailwindcss"
                    )
                }
                break;
            case "react native":
                supportList.push(
                    "typescript", "javascript", "expo", "mobile-app"
                )
                break;
            case "flask":
            case "django":
            case "fastapi":
                supportList.push(
                    "python", "backend"
                )
                break;
            case "express":
                supportList.push(
                    "javascript", "nodejs", "backend"
                )
                break;
            case "supabase":
                supportList.push(
                    "typescript", "backend"
                )
                break;
            case "twig":
                supportList.push(
                    "php", "css", "fullstack"
                )
                break;
        }

    }
    const techMap = [...new Set([...initialTechList, ...supportList])];
    return techMap;
}


export const GET = (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;

    const rawSearch = searchParams.get("search");
    const rawTech = searchParams.get("skill");
    const is_collab = searchParams.get("is_collab");
    const is_featured = searchParams.get("is_featured");
    const year = searchParams.get("year");
    const rawPage = searchParams.get("page");
    const rawLimit = searchParams.get("limit");


    const search = rawSearch ? rawSearch.toLowerCase().trim().slice(0, 100).replace('.', '') : null;
    const tech = rawTech ? rawTech.toLowerCase().trim().slice(0, 50).replace('.', '') : null;

    const page = Math.max(1, parseInt(rawPage || "1", 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(rawLimit || "20", 10) || 20));


    let filteredProjects = [...ALL_PROJECTS];

    // Example filtering
    if (search) {
        filteredProjects = filteredProjects.filter(project =>
            project.title.toLowerCase().includes(search)
        );
    }

    if (tech) {
        filteredProjects = filteredProjects.filter(project => {
            const fullProjectDeps = getTechMappings(project.tech);
            return fullProjectDeps.includes(tech);
        });
    }

    if (is_collab) {
        filteredProjects = filteredProjects.filter(project =>
            project.is_collab === (is_collab === "true")
        );
    }

    if (is_featured) {
        filteredProjects = filteredProjects.filter(project =>
            project.is_featured === (is_featured === "true")
        );
    }

    if (year) {
        const yearNum = parseInt(year, 10);
        if (!isNaN(yearNum)) {
            filteredProjects = filteredProjects.filter(project =>
                project.year === yearNum
            );
        }
    }

    const sortedProjects = filteredProjects.sort(
        (a, b) => b.rank - a.rank
    );

    const paginatedProjects = sortedProjects.slice(
        (page - 1) * limit,
        page * limit
    );

    return NextResponse.json({ projects: paginatedProjects, meta: { total: sortedProjects.length, page, limit } });
};


export const OPTIONS = () => {
    // RETUEN ALL POSSIBLE TECH 
    const allTech = [ ...new Set(ALL_PROJECTS.flatMap( proj => proj.tech ))]
    return NextResponse.json({ message: "OK", techOptions: allTech });
}