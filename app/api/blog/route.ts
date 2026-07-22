import { NextResponse } from 'next/server';
import { getBlogList, getDocContent, BlogMetadata } from '@/lib/blog';

export async function GET() {
  try {
    const slugs = await getBlogList();
    const blogsData = await Promise.all(
      slugs.map(async (slug) => {
        const data = await getDocContent(slug);
        return data ? data.metadata : null;
      })
    );

    const validBlogs = blogsData.filter(Boolean) as BlogMetadata[];
    const sortedBlogs = validBlogs.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(sortedBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
