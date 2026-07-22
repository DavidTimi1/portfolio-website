import { Metadata } from "next";
import { getBlogList, getDocContent, BlogMetadata } from "@/lib/blog";
import { BlogListClient } from "./BlogListClient";

export const metadata: Metadata = {
  title: "The Engineering Log | David Uwagbale",
  description: "Articles, software engineering tutorials, architectural insights, and thoughts on technology by David Uwagbale.",
  openGraph: {
    type: "website",
    title: "The Engineering Log | David Uwagbale",
    description: "Articles, software engineering tutorials, architectural insights, and thoughts on technology.",
    images: "/assets/blog/index.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Davidtimi_1",
    creator: "@Davidtimi_1",
    images: "/assets/blog/index.png",
  }
};

export default async function BlogArchivePage() {
  const slugs = await getBlogList();
  
  const blogsData = await Promise.all(
    slugs.map(async (slug) => {
      const data = await getDocContent(slug);
      return data ? data.metadata : null;
    })
  );

  // Filter out any nulls
  const validBlogs = blogsData.filter(Boolean) as BlogMetadata[];

  // Sort chronologically: newest first
  const sortedBlogs = validBlogs.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return <BlogListClient blogs={sortedBlogs} />;
}
