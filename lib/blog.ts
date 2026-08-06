import fs from 'fs';
import path from 'path';

export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  cover_image: string;
  created_at: string;
  category: 'tech' | 'blockchain' | 'personal' | 'philosophy' | 'software-engineering';
  author?: string;
  redirect_to?: string;
  keywords?: string[] | string;
}

const BLOG_DIR = path.join(process.cwd(), 'blog');

export async function getDocContent(slug: string): Promise<{ metadata: BlogMetadata; content: string } | null> {
  try {
    const filename = slug === 'index' || !slug ? 'index.md' : `${slug}.md`;
    const filePath = path.join(BLOG_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = await fs.promises.readFile(filePath, 'utf-8');
    
    // Extract metadata from doc content using 5 backticks
    const parts = content.split('`````');
    if (parts.length < 3) {
      console.warn(`Blog post "${slug}" does not have valid 5-backtick metadata format.`);
      return null;
    }
    
    const rawMetadata = parts[1].trim();
    const blogContent = parts[2].trim();
    const metadata = JSON.parse(rawMetadata) as BlogMetadata;
    
    if (!metadata.title) {
      const match = blogContent.match(/^#\s+(.+)$/m);
      metadata.title = match ? match[1] : slug;
    }

    if (!metadata.cover_image){
      metadata.cover_image = "/assets/blog/" + slug + ".png";
    }

    return { metadata, content: blogContent };

  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error);
    return null;
  }
}

export async function getBlogList(): Promise<string[]> {
    // list all files in a directory
    const dir = await fs.promises.opendir(BLOG_DIR);
    const files: string[] = [];

    for await (const file of dir){
        if (file.name.endsWith('.md')){
            files.push(file.name.replace(/\.md$/, ''));
        }
    }

    return files;
}

export async function getAllBlogsMetadata(): Promise<{ metadata: BlogMetadata; content: string }[]> {
  const slugs = await getBlogList();
  const results = await Promise.all(slugs.map((slug) => getDocContent(slug)));
  return results.filter((item): item is { metadata: BlogMetadata; content: string } => item !== null);
}