export interface Project {
    id?: string;
    title: string;
    description: string;
    tech?: string[];
    year?: number;
    date?: string;
    is_collab?: boolean;
    is_featured?: boolean;
    image?: string; // Optional for now, can fallback to gradient
    links: {
        live?: string;
        github?: string;
    };
}


export interface ProjectListResponse {
    projects: Project[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}