"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";


export const ProjectsSearch = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const searchValue = searchParams.get("search");
    const [inputValue, setInputValue] = useState(searchValue || '');

    return (
        <form onSubmit={handleSearchChange} className="w-full md:w-84 group relative">
            <input
                type="search"
                aria-label="Search projects"
                placeholder="Search projects..."
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 pr-12 focus:border-accent focus:outline-none transition-colors"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-400">
                <Button className="rounded-md bg-accent/70 group-focus-within:bg-accent text-background" variant="ghost" size="icon">
                    <SearchIcon />
                </Button>
            </div>
        </form>
    )



    function handleSearchChange(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (inputValue) {
            params.set("search", inputValue);
        } else {
            params.delete("search");
        }

        router.replace(`/projects?${params.toString()}`);
    }
}