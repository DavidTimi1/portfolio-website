"use client";

import { useEffect, useState } from "react";

export const useGithubStats = () => {
    const [stats, setStats] = useState({
        repos: 0,
        followers: 0,
        contributions: 0,
        years: 4
    });
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [statsError, setStatsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoadingStats(true);
            setStatsError(null);
            const errors: string[] = [];
            try {
                const [userResult, contributionsResult] = await Promise.allSettled([
                    fetch("https://api.github.com/users/DavidTimi1"),
                    fetch("https://github-contributions-api.jogruber.de/v4/DavidTimi1?y=last")
                ]);
                if (userResult.status === "fulfilled") {
                    const userRes = userResult.value;
                    if (!userRes.ok) {
                        errors.push(`GitHub API Error: ${userRes.status} ${userRes.statusText}`);
                    } else {
                        const data = await userRes.json();
                        setStats(prev => ({
                            ...prev,
                            repos: data.public_repos ?? prev.repos,
                            followers: data.followers ?? prev.followers
                        }));
                    }
                } else {
                    errors.push(
                        userResult.reason instanceof Error
                            ? userResult.reason.message
                            : "GitHub API request failed"
                    );
                }
                if (contributionsResult.status === "fulfilled") {
                    const contribRes = contributionsResult.value;
                    if (!contribRes.ok) {
                        errors.push(`Contributions API Error: ${contribRes.status} ${contribRes.statusText}`);
                    } else {
                        const data = await contribRes.json();
                        const total = data.total?.lastYear ?? 2400;
                        setStats(prev => ({ ...prev, contributions: total }));
                    }
                } else {
                    errors.push(
                        contributionsResult.reason instanceof Error
                            ? contributionsResult.reason.message
                            : "Contributions API request failed"
                    );
                }
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Unexpected error while fetching GitHub stats";
                errors.push(message);
            } finally {
                if (errors.length > 0) {
                    const combinedMessage = errors.join(" | ");
                    setStatsError(combinedMessage);
                    console.error("Error(s) fetching GitHub stats:", combinedMessage);
                }
                setIsLoadingStats(false);
            }
        };
        fetchStats();
    
    }, []);

    return {
        ...stats,
        isLoading: isLoadingStats,
        error: statsError
    };
}