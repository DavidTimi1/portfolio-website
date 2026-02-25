import { NextRequest, NextResponse } from "next/server";
import ALL_PROJECTS from "@/data/projects.json";

// ?search=query&skill=skill&tech=tech&is_collab=true&is_featured=true&year=2022


const getTechMappings = (techList: string[]) => {
    const initialTechList = [...techList]
    let supportList: string[] = [];

    for (let tech of initialTechList) {
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

    const search = searchParams.get("search");
    const tech = searchParams.get("skill");
    const is_collab = searchParams.get("is_collab");
    const is_featured = searchParams.get("is_featured");
    const year = searchParams.get("year");
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 20;


    let filteredProjects = [...ALL_PROJECTS];

    // Example filtering
    if (search) {
        filteredProjects = filteredProjects.filter(project =>
            project.title.toLowerCase().includes(search.toLowerCase())
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
        filteredProjects = filteredProjects.filter(project =>
            project.year === Number(year)
        );
    }

    const sortedProjects = filteredProjects.sort(
        (a, b) => b.rank - a.rank
    );

    const paginatedProjects = sortedProjects.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit)
    );

    return NextResponse.json({ projects: paginatedProjects, meta: { total: sortedProjects.length, page: Number(page), limit: Number(limit) } });
};


export const OPTIONS = () => {
    // RETUEN ALL POSSIBLE TECH 
    const allTech = [ ...new Set(ALL_PROJECTS.flatMap( proj => proj.tech ))]
    return NextResponse.json({ message: "OK", techOptions: allTech });
}