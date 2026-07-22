import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { getOrSetUserId, isValidSlug } from '@/lib/security';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!isValidSlug(slug)) {
      return NextResponse.json({ error: 'Invalid article slug' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const userId = await getOrSetUserId(cookieStore);

    if (!db) {
      // Mock / fallback response
      return NextResponse.json({
        total_claps: 0,
        total_views: 0,
        user_claps: 0,
        user_bookmarked: false,
        is_mock: true,
      });
    }

    const statsResult = await db`SELECT COALESCE(SUM(claps), 0)::int as total_claps, COALESCE(SUM(views), 0)::int as total_views FROM blog_interactions WHERE slug = ${slug}`;

    const userResult = await db`SELECT claps, bookmarked FROM blog_interactions WHERE slug = ${slug} AND user_id = ${userId}`;

    const total_claps = statsResult[0]?.total_claps ?? 0;
    const total_views = statsResult[0]?.total_views ?? 0;
    const user_claps = userResult[0]?.claps ?? 0;
    const user_bookmarked = userResult[0]?.bookmarked ?? false;

    return NextResponse.json({
      total_claps,
      total_views,
      user_claps,
      user_bookmarked,
      is_mock: false,
    });
  } catch (error) {
    console.error('Interactions GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!isValidSlug(slug)) {
      return NextResponse.json({ error: 'Invalid article slug' }, { status: 400 });
    }

    // Rate Limiting (30 interaction updates per minute per IP)
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`post_interaction:${clientIp}`, 30, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many interaction requests. Please slow down.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { action, count, value } = body;

    const allowedActions = ['clap', 'bookmark', 'view'];
    if (!action || typeof action !== 'string' || !allowedActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid interaction action' }, { status: 400 });
    }

    // Bounded clap count (1 to 50)
    const safeCount = typeof count === 'number' ? Math.max(1, Math.min(50, Math.floor(count))) : 1;
    const safeValue = Boolean(value);

    const cookieStore = await cookies();
    const userId = await getOrSetUserId(cookieStore);

    if (!db) {
      return NextResponse.json({
        success: true,
        is_mock: true,
        action,
        value: action === 'clap' ? safeCount : safeValue,
      });
    }

    // Default parameters for upsert
    let initialClaps = 0;
    let initialBookmarked = false;
    let initialViews = 0;

    if (action === 'clap') initialClaps = safeCount;
    if (action === 'bookmark') initialBookmarked = safeValue;
    if (action === 'view') initialViews = 1;

    // Upsert query
    const result = await db`
      INSERT INTO blog_interactions (slug, user_id, claps, bookmarked, views)
      VALUES (${slug}, ${userId}, ${initialClaps}, ${initialBookmarked}, ${initialViews})
      ON CONFLICT (slug, user_id)
      DO UPDATE SET
        claps = CASE WHEN ${action} = 'clap' THEN LEAST(50, blog_interactions.claps + ${safeCount}) ELSE blog_interactions.claps END,
        bookmarked = CASE WHEN ${action} = 'bookmark' THEN ${safeValue} ELSE blog_interactions.bookmarked END,
        views = CASE WHEN ${action} = 'view' THEN blog_interactions.views + 1 ELSE blog_interactions.views END,
        updated_at = CURRENT_TIMESTAMP
      RETURNING claps, bookmarked, views
    `;

    const statsResult = await db`SELECT COALESCE(SUM(claps), 0)::int as total_claps, COALESCE(SUM(views), 0)::int as total_views FROM blog_interactions WHERE slug = ${slug}`;

    return NextResponse.json({
      success: true,
      total_claps: statsResult[0]?.total_claps ?? 0,
      total_views: statsResult[0]?.total_views ?? 0,
      user_claps: result[0]?.claps ?? 0,
      user_bookmarked: result[0]?.bookmarked ?? false,
      is_mock: false,
    });
  } catch (error) {
    console.error('Interactions POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

