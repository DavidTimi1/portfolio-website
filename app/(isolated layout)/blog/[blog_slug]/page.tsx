import { getBlogList, getDocContent } from "@/lib/blog";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from 'react';
import { BlogClientPage } from "./BlogClientPage";
import { db } from "@/lib/db";

const getBlogBySlug = cache((slug: string) => {
    return getDocContent(slug);
});

export const generateMetadata = async ({
    params
}: {
    params: Promise<{ blog_slug: string }>
}): Promise<Metadata> => {
    const resolvedParams = await params;
    const blog_slug = resolvedParams.blog_slug;
    const blogData = await getBlogBySlug(blog_slug);

    if (!blogData) {
        return {
            title: "Blog Post Not Found"
        };
    }
    const blogMeta = blogData.metadata;
    return {
        title: `${blogMeta.title} | David Uwagbale`,
        description: blogMeta.description,
        openGraph: {
            type: "article",
            title: blogMeta.title,
            description: blogMeta.description,
            images: blogMeta.cover_image || "/assets/logo.jpg",
        },
        twitter: {
            card: "summary_large_image",
            site: "@Davidtimi_1",
            creator: "@Davidtimi_1",
            images: blogMeta.cover_image || "/assets/logo.jpg"
        }
    };
};

export const generateStaticParams = async () => {
  const blogs = await getBlogList();
  return blogs.map((slug) => ({
    blog_slug: slug,
  }));
};

export default async function BlogPage({
    params
}: {
    params: Promise<{ blog_slug: string }>
}) {
    const resolvedParams = await params;
    const blogSlug = resolvedParams.blog_slug;

    const blogData = await getBlogBySlug(blogSlug);
    if (!blogData) {
        return notFound();
    }

    // Server side redirect logic for external posts (Substack, Medium, etc.)
    if (blogData.metadata.redirect_to) {
        if (db) {
            try {
                await db`
                    INSERT INTO blog_interactions (slug, user_id, views) 
                    VALUES (${blogSlug}, 'ssr-redirect-agent', 1)
                    ON CONFLICT (slug, user_id) 
                    DO UPDATE SET views = blog_interactions.views + 1
                `;
            } catch (error) {
                console.error("Error logging redirect views:", error);
            }
        }
        redirect(blogData.metadata.redirect_to);
    }

    return (
        <BlogClientPage 
            metadata={blogData.metadata} 
            content={blogData.content} 
        />
    );
}