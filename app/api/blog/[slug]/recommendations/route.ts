import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogsMetadata } from '@/lib/blog';
import { db } from '@/lib/db';
import { isValidSlug } from '@/lib/security';
import { getReadingTime } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!isValidSlug(slug)) {
      return NextResponse.json({ error: 'Invalid article slug' }, { status: 400 });
    }

    const allBlogs = await getAllBlogsMetadata();
    const currentPost = allBlogs.find((item) => item.metadata.slug === slug);
    const otherBlogs = allBlogs.filter((item) => item.metadata.slug !== slug);

    if (otherBlogs.length === 0) {
      return NextResponse.json({ recommendations: [] });
    }

    // Retrieve interaction metrics per slug from Neon DB if available
    const statsMap = new Map<string, { claps: number; views: number; score: number }>();

    if (db) {
      try {
        const statsResult = await db`
          SELECT slug, COALESCE(SUM(claps), 0)::int as total_claps, COALESCE(SUM(CASE WHEN views > 0 THEN 1 ELSE 0 END), 0)::int as total_views 
          FROM blog_interactions 
          GROUP BY slug
        `;
        for (const row of statsResult) {
          const claps = row.total_claps || 0;
          const views = row.total_views || 0;
          statsMap.set(row.slug, {
            claps,
            views,
            score: claps * 2 + views,
          });
        }
      } catch (dbError) {
        console.error('Error fetching interaction stats for recommendations:', dbError);
      }
    }

    const available = [...otherBlogs];
    const pickedSlugs = new Set<string>();
    const recommendations: Array<{
      metadata: (typeof available)[0]['metadata'];
      reason: 'top_interacted' | 'related' | 'unexplored';
      readTime: string;
    }> = [];

    // Helper to get stats
    const getStats = (itemSlug: string) => statsMap.get(itemSlug) ?? { claps: 0, views: 0, score: 0 };

    // 1. Top Interacted Post (highest score)
    const sortedByScore = [...available].sort(
      (a, b) => getStats(b.metadata.slug).score - getStats(a.metadata.slug).score
    );

    if (sortedByScore.length > 0) {
      const topPick = sortedByScore[0];
      pickedSlugs.add(topPick.metadata.slug);
      recommendations.push({
        metadata: topPick.metadata,
        reason: 'top_interacted',
        readTime: getReadingTime(topPick.content),
      });
    }

    // 2. Related Topic Post (same category as current post, not yet picked)
    const unpickedAfterTop = available.filter((item) => !pickedSlugs.has(item.metadata.slug));
    if (unpickedAfterTop.length > 0) {
      const currentCategory = currentPost?.metadata.category;
      let relatedPick = unpickedAfterTop.find(
        (item) => currentCategory && item.metadata.category === currentCategory
      );

      // Fallback if no matching category exists among unpicked candidates
      if (!relatedPick) {
        relatedPick = unpickedAfterTop[0];
      }

      pickedSlugs.add(relatedPick.metadata.slug);
      recommendations.push({
        metadata: relatedPick.metadata,
        reason: 'related',
        readTime: getReadingTime(relatedPick.content),
      });
    }

    // 3. Unexplored / Fresh Pick (lowest score or newest date, not yet picked)
    const unpickedAfterRelated = available.filter((item) => !pickedSlugs.has(item.metadata.slug));
    if (unpickedAfterRelated.length > 0) {
      const sortedByFreshness = [...unpickedAfterRelated].sort((a, b) => {
        const scoreDiff = getStats(a.metadata.slug).score - getStats(b.metadata.slug).score;
        if (scoreDiff !== 0) return scoreDiff; // lowest score first
        return new Date(b.metadata.created_at).getTime() - new Date(a.metadata.created_at).getTime(); // newest first
      });

      const freshPick = sortedByFreshness[0];
      pickedSlugs.add(freshPick.metadata.slug);
      recommendations.push({
        metadata: freshPick.metadata,
        reason: 'unexplored',
        readTime: getReadingTime(freshPick.content),
      });
    }

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Recommendations GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
