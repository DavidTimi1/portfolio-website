"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export const ProjectsSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    return (
        <div className="relative w-full md:w-64">
            <input
                type="text"
                aria-label="Search projects"
                placeholder="Search projects..."
                value={inputValue}
                onChange={handleSearchChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 focus:border-accent focus:outline-none transition-colors"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        </div>
    )



    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setInputValue(value)

        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        router.replace(`/projects?${params.toString()}`);
    }
}