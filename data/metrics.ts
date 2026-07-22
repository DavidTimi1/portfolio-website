import { BriefcaseBusiness, FolderKanban, Globe } from "lucide-react";

const STARTED = new Date('2022-10-03');
const today = new Date();

const years = (today.getTime() - STARTED.getTime()) / (1000 * 60 * 60 * 24 * 365.25)

const experience = Math.floor(years)

export const STATS = [
    {
        title: "Years Experience",
        value: `${experience}+`,
        description: "Building scalable web & mobile apps",
        icon: BriefcaseBusiness
    },
    {
        title: "Projects Completed",
        value: "50+",
        description: "From concept to deployment",
        icon: FolderKanban
    },
    {
        title: "Global Clients",
        value: "10+",
        description: "Trusted by companies worldwide",
        icon: Globe
    }
]