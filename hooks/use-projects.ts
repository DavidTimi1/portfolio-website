import { ProjectListResponse } from "@/data/projects"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const useProjectList = (searchParams: string) => {
    return useQuery({
        queryKey: ["projects", searchParams],
        queryFn: () => getProjectList(searchParams),
        placeholderData: keepPreviousData
    })
}

export const useTechOptions = () => {
    return useQuery({
        queryKey: ["projects-options"],
        queryFn: () => getTechOptions()
    })
}



const getProjectList = async (searchParams: string) => {
    const requestUrl = `/api/projects?${searchParams}`
    const res = await fetch(requestUrl)
    const data = await res.json()
    return data as ProjectListResponse
}

const getTechOptions = async () => {
    const res = await fetch("/api/projects", {
        method: "options"
    })
    const data = await res.json()
    return data?.techOptions as string[]
}