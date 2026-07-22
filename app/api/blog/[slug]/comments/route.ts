import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { escapeHtml, getOrSetUserId, isValidSlug, sanitizeText } from '@/lib/security';
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

    if (!db) {
      // Fallback: return empty comments list
      return NextResponse.json({
        comments: [],
        is_mock: true,
      });
    }

    const comments = await db`SELECT id, username, content, created_at FROM blog_comments WHERE slug = ${slug} ORDER BY created_at ASC`;

    return NextResponse.json({
      comments,
      is_mock: false,
    });
  } catch (error) {
    console.error('Comments GET error:', error);
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

    // Rate Limiting (5 comments per minute per IP)
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`post_comment:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many comments posted. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username: rawUsername, content: rawContent } = body;

    const username = sanitizeText(rawUsername, 50);
    const content = sanitizeText(rawContent, 1000);

    if (!username || !content) {
      return NextResponse.json({ error: 'Username and content are required' }, { status: 400 });
    }

    const safeUsername = escapeHtml(username);
    const safeContent = escapeHtml(content);

    const cookieStore = await cookies();
    const userId = await getOrSetUserId(cookieStore);

    if (!db) {
      // Fallback mock comment
      return NextResponse.json({
        success: true,
        comment: {
          id: Math.floor(Math.random() * 1000000),
          username: safeUsername,
          content: safeContent,
          created_at: new Date().toISOString(),
        },
        is_mock: true,
      });
    }

    const result = await db`INSERT INTO blog_comments (slug, user_id, username, content) VALUES (${slug}, ${userId}, ${safeUsername}, ${safeContent}) RETURNING id, username, content, created_at`;

    return NextResponse.json({
      success: true,
      comment: result[0],
      is_mock: false,
    });
  } catch (error) {
    console.error('Comments POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

